import React from 'react';
import { X, ExternalLink, Code2, Users, Layers, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
  onInspectModules: () => void;
  onRunSimilarityWithThis: (project: Project) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
  onInspectModules,
  onRunSimilarityWithThis,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Banner with Image */}
        <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                {project.domain}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/90 text-white backdrop-blur-md">
              {project.similarityScore}% Match
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Description
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Stack & Team Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Team</span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {project.team}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Lead Engineer</span>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {project.leadEngineer}
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Repository</span>
              <div className="text-xs font-mono text-teal-600 dark:text-teal-400 truncate mt-0.5">
                {project.repositoryUrl}
              </div>
            </div>
          </div>

          {/* Why it matches */}
          {project.matchReasons && project.matchReasons.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Why TacitAI Recommends This Match
              </h3>
              <div className="space-y-1.5">
                {project.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reusable Modules summary */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exported Reusable Modules ({project.reusableModules.length})
              </h3>
              <button
                onClick={onInspectModules}
                className="text-xs text-teal-600 dark:text-teal-400 font-semibold hover:underline cursor-pointer"
              >
                Inspect Code Snippets →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.reusableModules.map((mod) => (
                <div
                  key={mod.id}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <div className="font-bold text-slate-900 dark:text-white">{mod.name}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{mod.description}</div>
                  <div className="text-[10px] text-teal-600 mt-1 font-semibold">{mod.language}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Architectural Decisions (ADRs) */}
          {project.pastDecisions && project.pastDecisions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Documented ADRs & Lessons Learned
              </h3>
              <div className="space-y-2">
                {project.pastDecisions.map((dec) => (
                  <div
                    key={dec.id}
                    className="p-3.5 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs space-y-1"
                  >
                    <div className="font-bold text-amber-950 dark:text-amber-200">{dec.title}</div>
                    <div className="text-amber-900/80 dark:text-amber-300/80">{dec.reason}</div>
                    <div className="text-[10px] text-slate-400 mt-1">Author: {dec.author} · {dec.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
          <button
            onClick={() => {
              onClose();
              onRunSimilarityWithThis(project);
            }}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Scan similarity against this repository</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
