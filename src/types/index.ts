export type UserRole = 'employee' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title: string;
  department: string;
}

export interface ReusableModule {
  id: string;
  name: string;
  description: string;
  language: string;
  installCommand?: string;
  codeSnippet: string;
  dependencies: string[];
  reusabilityRating: number; // 1-100
}

export interface PastDecision {
  id: string;
  title: string;
  summary: string;
  reason: string;
  date: string;
  author: string;
  category: 'architecture' | 'database' | 'infrastructure' | 'security';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  similarityScore: number;
  techStack: string[];
  domain: string;
  lastUpdated: string;
  repositoryUrl: string;
  documentsCount: number;
  image: string;
  reusableModules: ReusableModule[];
  pastDecisions: PastDecision[];
  status: 'production' | 'internal' | 'archived';
  team: string;
  leadEngineer: string;
  matchReasons: string[];
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: string;
  summary: string;
  source: string;
  author: string;
  date: string;
  tags: string[];
  keyTakeaways: string[];
  relatedProjectId?: string;
  readTime: string;
}

export interface WorkspaceSource {
  id: string;
  name: string;
  type: 'projects' | 'repositories' | 'documents' | 'workspaces' | 'other';
  count: number;
  unit: string;
  status: 'active' | 'syncing' | 'completed';
  details: string;
  iconType: string;
  lastSync: string;
}

export interface SimilarityCheckResult {
  query: string;
  tags: string[];
  similarProjects: Project[];
  aiRecommendation: {
    decision: 'Reuse with Enhancement' | 'Direct Reuse' | 'Build New with Shared Components';
    explanation: string;
    reusableComponents: string[];
    suggestedArchitecture: string;
    risksToAvoid: string[];
  };
  processingStage: number; // 1 to 5
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: { title: string; type: string; link?: string }[];
  suggestedFollowUps?: string[];
}
