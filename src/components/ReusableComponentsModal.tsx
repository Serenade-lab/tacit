import React, { useState } from 'react';
import { X, Copy, Check, Code2, Terminal, Layers, ExternalLink } from 'lucide-react';
import { ReusableModule } from '../types';

interface ReusableComponentsModalProps {
  modules: ReusableModule[];
  onClose: () => void;
}

export const ReusableComponentsModal: React.FC<ReusableComponentsModalProps> = ({
  modules,
  onClose,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(
    modules[0]?.id || ''
  );
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const activeModule = modules.find((m) => m.id === selectedModuleId) || modules[0];

  const handleCopySnippet = () => {
    if (activeModule?.codeSnippet) {
      navigator.clipboard.writeText(activeModule.codeSnippet);
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  const handleCopyInstall = () => {
    if (activeModule?.installCommand) {
      navigator.clipboard.writeText(activeModule.installCommand);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    }
  };

  if (!activeModule) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Reusable Enterprise Components
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pre-tested internal modules verified for integration without rebuilding from scratch
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Modules List + Right Detail */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Modules Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-slate-800 p-4 space-y-2 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/30">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
              Available Modules ({modules.length})
            </span>
            {modules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedModuleId === mod.id
                    ? 'bg-white dark:bg-slate-800 border-teal-500/50 shadow-xs ring-1 ring-teal-500/30'
                    : 'bg-white/60 dark:bg-slate-900/60 border-slate-200/70 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {mod.name}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600">
                    {mod.reusabilityRating}% fit
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {mod.language}
                </div>
              </button>
            ))}
          </div>

          {/* Module Detailed View */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-5">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeModule.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-semibold">
                  {activeModule.language}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {activeModule.description}
              </p>
            </div>

            {/* Install Command */}
            {activeModule.installCommand && (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-teal-600" />
                    Internal Registry Install
                  </span>
                  <button
                    onClick={handleCopyInstall}
                    className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                  >
                    {copiedInstall ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto border border-slate-800">
                  <code>{activeModule.installCommand}</code>
                </pre>
              </div>
            )}

            {/* Code Snippet */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <span>Usage & Integration Snippet</span>
                <button
                  onClick={handleCopySnippet}
                  className="text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Copied Code</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed max-h-56">
                <code>{activeModule.codeSnippet}</code>
              </pre>
            </div>

            {/* Dependencies */}
            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Verified Dependencies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeModule.dependencies.map((dep) => (
                  <span
                    key={dep}
                    className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {dep}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
