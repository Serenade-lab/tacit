import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  Code2,
  FileQuestion,
  Bell,
  Clock,
  Layers,
  ChevronRight,
  Compass
} from 'lucide-react';
import { Project, KnowledgeArticle, User } from '../types';

interface EmployeeHomeProps {
  currentUser: User;
  projects: Project[];
  articles: KnowledgeArticle[];
  onTriggerSimilarityCheck: (query: string) => void;
  onNavigateTab: (tab: 'projects' | 'knowledge' | 'assistant') => void;
  onSelectProject: (project: Project) => void;
  onSelectArticle: (article: KnowledgeArticle) => void;
}

export const EmployeeHome: React.FC<EmployeeHomeProps> = ({
  currentUser,
  projects,
  articles,
  onTriggerSimilarityCheck,
  onNavigateTab,
  onSelectProject,
  onSelectArticle,
}) => {
  const [ideaPrompt, setIdeaPrompt] = useState('');

  const quickPrompts = [
    'AI-powered inventory management for warehouse',
    'Real-time fleet route dispatch with geofencing',
    'Retail SKU barcode scanning and checkout',
    'Predictive demand forecasting with ML pipelines',
    'Document parser for shipping manifests and invoices',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ideaPrompt.trim()) {
      onTriggerSimilarityCheck(ideaPrompt.trim());
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-10">
      {/* Welcome & Prompt Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>Internal Knowledge & Project Reuse Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          What would you like to build?
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Describe your application, microservice, or feature. TacitAI will check 12 internal repositories and 124 architecture docs to prevent duplicate effort.
        </p>

        {/* Big Prominent Input Box */}
        <form onSubmit={handleSubmit} className="relative mt-6 max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-3 focus-within:ring-teal-500/30 focus-within:border-teal-500 transition-all">
            <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 ml-4 shrink-0" />
            <input
              type="text"
              value={ideaPrompt}
              onChange={(e) => setIdeaPrompt(e.target.value)}
              placeholder="e.g. AI-powered inventory management with automated stock forecasting..."
              className="w-full py-4 pl-3.5 pr-32 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!ideaPrompt.trim()}
              className="absolute right-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>Check Similarity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Quick Idea Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-medium">Try asking:</span>
          {quickPrompts.slice(0, 3).map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setIdeaPrompt(prompt);
                onTriggerSimilarityCheck(prompt);
              }}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-200/60 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-teal-300 transition-all cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Action Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onTriggerSimilarityCheck('AI-powered inventory management for warehouse')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-3 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            Check Project Ideas
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Run instant vector similarity scans across company repositories to detect overlapping code and architectures.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('projects')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            Find Reusable Modules
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Browse ready-to-import modules (Prophet demand forecasters, virtualized grids, hardware scanner hooks).
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('knowledge')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500/40 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
            Explore Past Decisions
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Understand why teams picked FastAPI over Flask or PostgreSQL over DynamoDB before drafting a new RFC.
          </p>
        </div>
      </div>

      {/* Relevant Alerts & Knowledge Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Knowledge & Review Alerts */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Tacit Knowledge Alerts & Requests
              </h2>
            </div>
            <span className="text-[11px] text-teal-600 font-semibold">2 pending items</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/50 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Pending Tacit Knowledge Capture
                  </span>
                </div>
                <p className="text-xs text-amber-800/90 dark:text-amber-300/90">
                  Cikarang RFID Pilot completed with 99.4% read rate. Budi Santoso requested architecture log review on antenna debouncing.
                </p>
                <div className="text-[10px] text-amber-700/70 dark:text-amber-400">
                  Logistics & IoT Team · 2 hours ago
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('knowledge')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-2xs"
              >
                Review Log
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/70 dark:border-teal-900/50 flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-xs font-bold text-teal-900 dark:text-teal-200">
                    New Reusable Component Published
                  </span>
                </div>
                <p className="text-xs text-teal-800/90 dark:text-teal-300/90">
                  Elena Rostova published <code>@serenade/ui-scanner-hook</code> to internal registry. Works with Zebra & Honeywell scanners.
                </p>
                <div className="text-[10px] text-teal-700/70 dark:text-teal-400">
                  SmartStock Repository · Today
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('projects')}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-2xs"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>

        {/* Featured Architecture Decisions (ADRs) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-teal-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Decisions (ADRs)
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('knowledge')}
              className="text-xs font-semibold text-teal-600 hover:underline cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="space-y-3">
            {articles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {art.title}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                  <span>{art.category}</span>
                  <span>·</span>
                  <span>{art.author}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
