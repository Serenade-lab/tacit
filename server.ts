import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PROJECTS, INITIAL_KNOWLEDGE_ARTICLES } from './src/data/mockData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const geminiApiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (geminiApiKey) {
  aiClient = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Projects API
app.get('/api/projects', (_req: Request, res: Response) => {
  res.json({ projects: INITIAL_PROJECTS });
});

// 2. Knowledge Base & ADRs API
app.get('/api/knowledge', (_req: Request, res: Response) => {
  res.json({ articles: INITIAL_KNOWLEDGE_ARTICLES });
});

// 3. AI Similarity Check API
app.post('/api/similarity-check', async (req: Request, res: Response) => {
  const { query } = req.body;
  const userQuery = String(query || '').trim();

  if (!userQuery) {
    res.status(400).json({ error: 'Query is required' });
    return;
  }

  // Fallback heuristic scoring
  const keywords = userQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const scoredProjects = INITIAL_PROJECTS.map(proj => {
    let score = 25; // baseline
    const targetText = `${proj.title} ${proj.description} ${proj.domain} ${proj.techStack.join(' ')}`.toLowerCase();
    
    keywords.forEach(kw => {
      if (targetText.includes(kw)) {
        score += 18;
      }
    });

    // Check specific logistics/inventory matches
    if (/inventory|warehouse|stock|storage|sku/i.test(userQuery) && /inventory|stock|warehouse/i.test(proj.title + proj.description)) {
      score += 25;
    }
    if (/ai|forecast|predict|ml/i.test(userQuery) && /ai|forecast|ml/i.test(proj.title + proj.description)) {
      score += 20;
    }
    if (/iot|sensor|rfid|device/i.test(userQuery) && /iot|rfid|device/i.test(proj.title + proj.description)) {
      score += 25;
    }

    const clampedScore = Math.min(Math.max(score, 35), 94);
    return {
      ...proj,
      similarityScore: clampedScore,
    };
  }).sort((a, b) => b.similarityScore - a.similarityScore);

  // If Gemini is available, refine analysis with real LLM reasoning
  if (aiClient) {
    try {
      const prompt = `Analyze this proposed software project idea against our internal enterprise projects:
Proposed Idea: "${userQuery}"

Available Internal Projects:
${INITIAL_PROJECTS.map(p => `- ${p.title} (${p.techStack.join(', ')}): ${p.description}`).join('\n')}

Return a valid JSON object in this format:
{
  "tags": ["extracted", "search", "tags", "max 4"],
  "decision": "Reuse with Enhancement" or "Direct Reuse" or "Build New with Shared Components",
  "explanation": "Clear, professional 1-2 sentence recommendation on what to reuse and what to build new.",
  "reusableComponents": ["specific component or module from existing project with origin"],
  "suggestedArchitecture": "Recommended architecture combining best existing internal services.",
  "risksToAvoid": ["Key lesson or pitfall learned from past ADRs/decisions to avoid"]
}`;

      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
      );

      const aiResponsePromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are TacitAI, an enterprise engineering knowledge and project reuse intelligence agent. Analyze project ideas to prevent duplicate engineering effort.',
        },
      });

      const aiResponse = await Promise.race([aiResponsePromise, timeoutPromise]) as any;

      if (aiResponse?.text) {
        const parsed = JSON.parse(aiResponse.text);
        res.json({
          query: userQuery,
          tags: parsed.tags || ['Enterprise', 'Architecture', 'Service'],
          similarProjects: scoredProjects,
          aiRecommendation: {
            decision: parsed.decision || 'Reuse with Enhancement',
            explanation: parsed.explanation || `You can reuse existing components from ${scoredProjects[0].title}.`,
            reusableComponents: parsed.reusableComponents || [`${scoredProjects[0].reusableModules[0]?.name} (from ${scoredProjects[0].title})`],
            suggestedArchitecture: parsed.suggestedArchitecture || `Leverage ${scoredProjects[0].title} backend and API contracts.`,
            risksToAvoid: parsed.risksToAvoid || ['Avoid re-architecting authentication and ledger audit trails from scratch.'],
          },
        });
        return;
      }
    } catch (err) {
      console.warn('Gemini similarity check fallback triggered:', err);
    }
  }

  // Resilient fallback output
  const topMatch = scoredProjects[0];
  const tags = userQuery.split(/\s+/).slice(0, 4).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  res.json({
    query: userQuery,
    tags: tags.length ? tags : ['Logistics', 'Inventory', 'Platform'],
    similarProjects: scoredProjects,
    aiRecommendation: {
      decision: topMatch.similarityScore > 75 ? 'Reuse with Enhancement' : 'Build New with Shared Components',
      explanation: `You can reuse core modules from ${topMatch.title} (${topMatch.techStack.slice(0, 2).join(', ')}). Consider adopting its data pipeline while adapting domain logic.`,
      reusableComponents: topMatch.reusableModules.map(m => `${m.name} (from ${topMatch.title})`),
      suggestedArchitecture: `Combine ${topMatch.title}'s verified service layer with internal microservices to avoid duplication.`,
      risksToAvoid: [
        `Review ADRs in ${topMatch.title} to avoid previously encountered concurrency bottlenecks.`,
        'Ensure compatibility with existing enterprise authentication and audit ledgers.'
      ],
    },
  });
});

// 4. Conversational Assistant API
app.post('/api/assistant', async (req: Request, res: Response) => {
  const { message } = req.body;
  const userMsg = String(message || '').trim();

  if (!userMsg) {
    res.status(400).json({ error: 'Message cannot be empty' });
    return;
  }

  if (aiClient) {
    try {
      const prompt = `User question: "${userMsg}"

Enterprise Internal Knowledge Grounding:
- InventoryAI: FastAPI + Python + PostgreSQL. Prophet ML forecasting module. ADR-042 explains picking FastAPI for 4000 req/sec ASGI throughput. ADR-038 details PostgreSQL declarative monthly partitioning over DynamoDB to cut $14k/mo in capacity costs and maintain strict audit ACID transactions.
- SmartStock: React 18 + Node.js + MySQL. Includes virtualized table component for 100k items (ADR-029) and @serenade/ui-scanner-hook for hardware barcode scanners without character drop.
- AssetMonitor: Flutter + Firebase + Go IoT edge daemon. Solved RFID ping storm flooding via sliding window LRU cache (ADR-019).
- SupplyChain Hub: Python + Tableau + S3 Parquet exports. ADR-055 stopped direct production DB query spikes.

Provide a helpful, precise, and authoritative answer. Cite the relevant project, ADR number, or reusable module.`;

      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
      );

      const aiResponsePromise = aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are TacitAI Assistant, helping engineers navigate internal proprietary knowledge, past architectural decisions, and reusable libraries. Be concise, technical, and cite internal sources.',
        },
      });

      const aiResponse = await Promise.race([aiResponsePromise, timeoutPromise]) as any;

      if (aiResponse?.text) {
        res.json({
          reply: aiResponse.text,
          sources: [
            { title: 'ADR-042 (FastAPI vs Flask)', type: 'Architecture Decision Record' },
            { title: 'InventoryAI Repository', type: 'Core Internal Service' },
            { title: 'Logistics Engineering Design Docs', type: 'Internal Notion' },
          ],
        });
        return;
      }
    } catch (err) {
      console.warn('Gemini assistant fallback triggered:', err);
    }
  }

  // Resilient heuristic answer
  let fallbackReply = `Based on TacitAI's index of 12 internal projects and 124 architecture documents: `;
  if (/inventory|warehouse|sku|forecast/i.test(userMsg)) {
    fallbackReply += `You should refer to **InventoryAI** (FastAPI + PostgreSQL) and **SmartStock** (React). For SKU demand forecasting, our production-tested \`prophet-demand-forecaster\` module is ready for reuse. See **ADR-042** for why FastAPI was chosen for high-throughput scanning.`;
  } else if (/database|postgres|dynamo|sql/i.test(userMsg)) {
    fallbackReply += `Review **ADR-038** in the Knowledge section. We benchmarked DynamoDB vs PostgreSQL Declarative Partitioning for inventory ledgers; relational monthly partitions reduced index bloat by 74% and preserved GAAP audit integrity.`;
  } else if (/scanner|barcode|rfid|hardware/i.test(userMsg)) {
    fallbackReply += `For hardware scanners, do not write custom keyboard event listeners. Use our pre-built \`@serenade/ui-scanner-hook\` from SmartStock which handles scanner debouncing (under 15ms) and WebHID. For RFID portals, check **ADR-019** on edge deduplication.`;
  } else {
    fallbackReply += `I have scanned our connected repositories and knowledge base. For similar workflows, look into **InventoryAI** and **SmartStock**, which contain approved architectural patterns and reusable components.`;
  }

  res.json({
    reply: fallbackReply,
    sources: [
      { title: 'Internal Knowledge Graph', type: 'TacitAI Index' },
      { title: 'ADR-042 & ADR-038', type: 'Architecture Decision Records' }
    ],
  });
});

// Setup Vite middleware in dev or static serving in prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TacitAI server is running on http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

