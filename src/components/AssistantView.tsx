import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, ExternalLink, ArrowRight } from 'lucide-react';
import { AssistantMessage } from '../types';

interface AssistantViewProps {
  onCheckSimilarityFromAssistant?: (query: string) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ onCheckSimilarityFromAssistant }) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      text: "Hello Fenti! I'm your TacitAI assistant. I have indexed our 12 internal projects, 124 design specs, and recent architecture decisions (ADRs). Ask me about existing libraries, past architectural trade-offs, or check whether someone already solved your problem.",
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Why did we choose FastAPI over Flask for InventoryAI?',
        'How do we handle hardware barcode scanner debouncing in React?',
        'What database strategy did we use for warehouse audit ledgers?',
        'Is there an existing demand forecasting module for SKUs?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (messageText: string) => {
    const textToSend = messageText.trim();
    if (!textToSend || isLoading) return;

    const userMessage: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) throw new Error('Assistant API error');
      const data = await res.json();

      const botMessage: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.reply,
        timestamp: 'Just now',
        sources: data.sources || [
          { title: 'InventoryAI Repository', type: 'Core Internal Service' },
          { title: 'ADR-042 (FastAPI vs Flask)', type: 'Architecture Decision' }
        ]
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Local fallback
      const fallbackBotMessage: AssistantMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `Based on our internal repositories: For warehouse and inventory workflows, review **InventoryAI** (FastAPI + PostgreSQL) and **SmartStock** (React 18). We have reusable modules for SKU forecasting and hardware barcode scanner hooks. Check **ADR-042** and **ADR-038** in the Knowledge tab for full design rationale.`,
        timestamp: 'Just now',
        sources: [
          { title: 'ADR-042 & ADR-038', type: 'Architecture Decision Records' },
          { title: 'Internal Knowledge Graph', type: 'TacitAI Index' }
        ]
      };
      setMessages((prev) => [...prev, fallbackBotMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto h-[calc(100vh-5rem)] flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              TacitAI Conversational Agent
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Grounded in 12 internal repositories, 124 design documents, and team decision records
            </p>
          </div>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-2xl ${msg.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs dark:bg-teal-600'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/80 dark:border-slate-800 shadow-2xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Sources Citation List */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      Sources Cited:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((src, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 flex items-center gap-1"
                        >
                          <strong>{src.title}</strong>
                          <span className="text-[10px] text-slate-400">({src.type})</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up Prompts */}
              {msg.suggestedFollowUps && (
                <div className="flex flex-wrap gap-2 mt-3 pl-1">
                  {msg.suggestedFollowUps.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors cursor-pointer text-left"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-center text-xs text-slate-400">
            <div className="w-8 h-8 rounded-full bg-teal-600/20 text-teal-600 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>TacitAI is querying internal repository ASTs and ADR knowledge base...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="mt-4 relative"
      >
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-teal-500/40">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about existing code, architecture choices, or team decisions..."
            className="w-full pl-4 pr-14 py-3.5 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
