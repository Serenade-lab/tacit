import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Lightbulb,
  Check,
  FolderGit2,
  FileText,
  Laptop,
  Cloud,
  Layers,
  Sparkles,
  RefreshCw,
  Edit2
} from 'lucide-react';
import { Project, SimilarityCheckResult, WorkspaceSource } from '../types';

interface SimilarityCheckViewProps {
  result: SimilarityCheckResult;
  sources: WorkspaceSource[];
  isDarkMode: boolean;
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onViewReusableComponents: () => void;
  onViewFullAnalysis: () => void;
  onRecheckQuery: (query: string) => void;
}

export const SimilarityCheckView: React.FC<SimilarityCheckViewProps> = ({
  result,
  sources,
  isDarkMode,
  onBack,
  onSelectProject,
  onViewReusableComponents,
  onViewFullAnalysis,
  onRecheckQuery,
}) => {
  const [activeStage, setActiveStage] = useState(result.processingStage || 3);
  const [isEditingQuery, setIsEditingQuery] = useState(false);
  const [queryInput, setQueryInput] = useState(result.query);
  const [inspectedSource, setInspectedSource] = useState<WorkspaceSource | null>(null);

  // Sync state if prop changes
  useEffect(() => {
    setQueryInput(result.query);
    setActiveStage(result.processingStage || 3);
  }, [result]);

  const stages = [
    { number: 1, title: 'Scanning sources', detail: '12 items indexed' },
    { number: 2, title: 'Analyzing content', detail: 'Projects, documents, code' },
    { number: 3, title: 'Finding similarities', detail: 'Using AI vector graph' },
    { number: 4, title: 'Validating context', detail: 'Tacit knowledge & ADRs' },
    { number: 5, title: 'Preparing recommendations', detail: 'Ready for reuse' },
  ];

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim()) {
      setIsEditingQuery(false);
      onRecheckQuery(queryInput.trim());
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'projects':
        return <Layers className="w-4 h-4 text-amber-500" />;
      case 'repositories':
        return <FolderGit2 className="w-4 h-4 text-emerald-500" />;
      case 'documents':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'workspaces':
        return <Laptop className="w-4 h-4 text-indigo-500" />;
      default:
        return <Cloud className="w-4 h-4 text-cyan-500" />;
    }
  };

  const getSimilarityBadgeColor = (score: number) => {
    if (score >= 80) {
      return 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
    if (score >= 70) {
      return 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    }
    if (score >= 60) {
      return 'bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
    }
    return 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Similarity Check</span>
          </button>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Checking your project idea...
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            TacitAI is searching across your internal projects, repositories, and documents to find similar solutions, relevant components, and past knowledge.
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span className="text-xs font-semibold text-teal-800 dark:text-teal-300">
              AI Agent in Progress
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas (Left/Center) + Similar Projects & AI Recommendation (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left/Center Visual Canvas */}
        <div className="xl:col-span-7 bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 lg:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden min-h-[580px]">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-teal-100/30 dark:bg-teal-900/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-cyan-100/30 dark:bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />

          {/* Interactive Network Diagram Area */}
          <div className="relative w-full h-[400px] flex items-center justify-center my-auto">
            {/* SVG Connecting Flow Lines with Live Animated Pulses */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 700 400"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="glowGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="glowGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.5" />
                </linearGradient>
              </defs>

              {/* Curve: Project Idea -> Central Orb (Center is approx 440, 200) */}
              <path
                d="M 210 180 C 280 180, 360 200, 420 200"
                fill="none"
                stroke="url(#glowGradient1)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="animate-flow-dash"
              />
              {/* Curve: Projects Node (Top) -> Central Orb */}
              <path
                d="M 360 70 C 390 110, 420 140, 440 180"
                fill="none"
                stroke="url(#glowGradient1)"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-flow-dash"
              />
              {/* Curve: Repositories Node (Top-Right) -> Central Orb */}
              <path
                d="M 540 80 C 510 110, 470 140, 450 185"
                fill="none"
                stroke="url(#glowGradient2)"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-flow-dash"
              />
              {/* Curve: Documents Node (Right) -> Central Orb */}
              <path
                d="M 580 200 C 530 200, 490 200, 460 200"
                fill="none"
                stroke="url(#glowGradient1)"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-flow-dash"
              />
              {/* Curve: Workspaces Node (Bottom-Left) -> Central Orb */}
              <path
                d="M 310 320 C 360 300, 410 250, 435 215"
                fill="none"
                stroke="url(#glowGradient2)"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-flow-dash"
              />
              {/* Curve: Other Sources Node (Bottom-Right) -> Central Orb */}
              <path
                d="M 550 320 C 510 300, 470 250, 445 215"
                fill="none"
                stroke="url(#glowGradient1)"
                strokeWidth="2"
                strokeDasharray="5 3"
                className="animate-flow-dash"
              />
            </svg>

            {/* Left Node: Your Project Idea Card */}
            <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-md z-10 transition-all hover:shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Your Project Idea
                  </span>
                </div>
                <button
                  onClick={() => setIsEditingQuery(!isEditingQuery)}
                  className="text-slate-400 hover:text-teal-600 transition-colors p-1 rounded-md cursor-pointer"
                  title="Edit prompt"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {isEditingQuery ? (
                <form onSubmit={handleQuerySubmit} className="space-y-2">
                  <input
                    type="text"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 dark:bg-slate-900 border border-teal-500 rounded-lg text-slate-800 dark:text-slate-100 focus:outline-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setIsEditingQuery(false)}
                      className="px-2 py-0.5 text-[11px] text-slate-500 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-2 py-0.5 text-[11px] bg-teal-600 text-white rounded-md font-medium"
                    >
                      Re-check
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-3">
                  {result.query}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                {result.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Center Core: Glowing TacitAI Orb */}
            <div className="absolute left-[58%] sm:left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 animate-float-slow">
              {/* Outer Glow Ring */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-tr from-teal-400/30 via-emerald-300/20 to-cyan-300/40 p-2 shadow-2xl animate-pulse-glow">
                {/* Inner Glass Sphere */}
                <div className="w-full h-full rounded-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-2 border-teal-400/50 flex flex-col items-center justify-center shadow-inner">
                  {/* Neural emblem */}
                  <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    Tacit<span className="text-teal-600 dark:text-teal-400">AI</span>
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">
                    Analyzing Core
                  </span>
                </div>
              </div>
            </div>

            {/* Connected Node 1: Projects (Top) */}
            <button
              onClick={() => setInspectedSource(sources[0])}
              className="absolute left-[45%] top-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer z-10"
            >
              {getSourceIcon('projects')}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Projects</span>
                <span className="text-[10px] text-slate-400">12 items</span>
              </div>
              <Check className="w-3.5 h-3.5 text-teal-600 ml-1" />
            </button>

            {/* Connected Node 2: Repositories (Top-Right) */}
            <button
              onClick={() => setInspectedSource(sources[1])}
              className="absolute right-6 top-8 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer z-10"
            >
              {getSourceIcon('repositories')}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Repositories</span>
                <span className="text-[10px] text-slate-400">8 connected</span>
              </div>
              <Check className="w-3.5 h-3.5 text-teal-600 ml-1" />
            </button>

            {/* Connected Node 3: Documents (Right) */}
            <button
              onClick={() => setInspectedSource(sources[2])}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer z-10"
            >
              {getSourceIcon('documents')}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Documents</span>
                <span className="text-[10px] text-slate-400">124 items</span>
              </div>
              <Check className="w-3.5 h-3.5 text-teal-600 ml-1" />
            </button>

            {/* Connected Node 4: Team Workspaces (Bottom-Left) */}
            <button
              onClick={() => setInspectedSource(sources[3])}
              className="absolute left-[38%] bottom-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer z-10"
            >
              {getSourceIcon('workspaces')}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Team Workspaces</span>
                <span className="text-[10px] text-slate-400">3 devices</span>
              </div>
              <Check className="w-3.5 h-3.5 text-teal-600 ml-1" />
            </button>

            {/* Connected Node 5: Other Sources (Bottom-Right) */}
            <button
              onClick={() => setInspectedSource(sources[4])}
              className="absolute right-8 bottom-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200/90 dark:border-slate-700 shadow-sm flex items-center gap-2 hover:scale-105 transition-all cursor-pointer z-10"
            >
              {getSourceIcon('other')}
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Other Sources</span>
                <span className="text-[10px] text-slate-400">5 sources</span>
              </div>
              <RefreshCw className="w-3 h-3 text-cyan-600 animate-spin ml-1" />
            </button>
          </div>

          {/* Bottom Processing Stages Stepper */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {stages.map((stg) => {
                const isPassed = stg.number < activeStage;
                const isCurrent = stg.number === activeStage;
                return (
                  <div
                    key={stg.number}
                    onClick={() => setActiveStage(stg.number)}
                    className="flex flex-col cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isPassed
                            ? 'bg-teal-600 text-white'
                            : isCurrent
                            ? 'bg-teal-500 text-white ring-4 ring-teal-500/20 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPassed ? <Check className="w-3 h-3 stroke-[3]" /> : stg.number}
                      </div>
                      <div
                        className={`h-1 flex-1 rounded-full ${
                          isPassed
                            ? 'bg-teal-500'
                            : isCurrent
                            ? 'bg-teal-400 animate-pulse'
                            : 'bg-slate-100 dark:bg-slate-800'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-semibold leading-tight ${
                        isCurrent
                          ? 'text-teal-700 dark:text-teal-300'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {stg.title}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight mt-0.5">
                      {stg.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Similar Projects Found + AI Recommendation */}
        <div className="xl:col-span-5 space-y-5">
          {/* Similar Projects Section */}
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Similar Projects Found
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                  {result.similarProjects.length}
                </span>
              </div>
              <button
                onClick={onViewFullAnalysis}
                className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View all</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Similar Projects */}
            <div className="space-y-3">
              {result.similarProjects.slice(0, 4).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onSelectProject(proj)}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-teal-500/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200/60 dark:border-slate-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {proj.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getSimilarityBadgeColor(
                            proj.similarityScore
                          )} tabular-nums`}
                        >
                          {proj.similarityScore}% Similar
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {proj.description}
                      </p>
                      {/* Tech Stack tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                        {proj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] text-slate-600 dark:text-slate-400 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-teal-600 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/40 transition-colors shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation Box */}
          <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-teal-500/20 dark:border-teal-500/30 p-5 shadow-xs relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-500">
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                AI Recommendation
              </h3>
            </div>

            {/* Decision Banner */}
            <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/60 mb-4 flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <div className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  {result.aiRecommendation.decision}
                </div>
                <p className="text-xs text-teal-800/90 dark:text-teal-300/90 mt-1 leading-relaxed">
                  {result.aiRecommendation.explanation}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={onViewReusableComponents}
                className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
              >
                <span>View reusable components</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onViewFullAnalysis}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                See full analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Source Inspection Modal */}
      {inspectedSource && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getSourceIcon(inspectedSource.type)}
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {inspectedSource.name} Source Details
                </h3>
              </div>
              <button
                onClick={() => setInspectedSource(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Total Indexed: </span>
                <strong className="text-slate-800 dark:text-slate-100">
                  {inspectedSource.count} {inspectedSource.unit}
                </strong>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Status: </span>
                <span className="font-semibold text-emerald-600 capitalize">
                  {inspectedSource.status}
                </span>
                <span className="text-slate-400 ml-2">({inspectedSource.lastSync})</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400">Description: </span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">{inspectedSource.details}</p>
              </div>
            </div>
            <button
              onClick={() => setInspectedSource(null)}
              className="mt-5 w-full py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
