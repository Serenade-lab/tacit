import React from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, TrendingUp, Layers, ArrowRight } from 'lucide-react';
import { SimilarityCheckResult } from '../types';

interface FullAnalysisModalProps {
  result: SimilarityCheckResult;
  onClose: () => void;
  onViewComponents: () => void;
}

export const FullAnalysisModal: React.FC<FullAnalysisModalProps> = ({
  result,
  onClose,
  onViewComponents,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              TacitAI Technical Report
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Full Architecture & Reuse Analysis
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Query & Executive Summary */}
          <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/80">
            <div className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase">
              Target Idea
            </div>
            <div className="text-sm font-bold text-teal-950 dark:text-teal-100 mt-0.5">
              &quot;{result.query}&quot;
            </div>
            <div className="text-xs text-teal-900/90 dark:text-teal-200/90 mt-2 leading-relaxed">
              <strong>Recommendation:</strong> {result.aiRecommendation.decision} — {result.aiRecommendation.explanation}
            </div>
          </div>

          {/* Quantified Business & Engineering Savings */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-teal-600">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Estimated Time Saved</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                ~320 hrs
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Approx. 8 dev weeks</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Code Reusability</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                68%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Via 4 verified modules</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 text-indigo-600">
                <Layers className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase">Infra Redundancy</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 tabular-nums">
                Zero
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Utilizes shared clusters</div>
            </div>
          </div>

          {/* Recommended Architecture Plan */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Recommended Technical Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              {result.aiRecommendation.suggestedArchitecture}
            </p>
          </div>

          {/* Past Pitfalls & Risks To Avoid */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-amber-600">
              <AlertTriangle className="w-3.5 h-3.5" />
              Known Risks & Lessons Learned (From Past ADRs)
            </h3>
            <div className="space-y-2">
              {result.aiRecommendation.risksToAvoid.map((risk, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2"
                >
                  <span className="font-bold">•</span>
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
          <button
            onClick={() => {
              onClose();
              onViewComponents();
            }}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Reusable Components</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
