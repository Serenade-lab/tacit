import React from 'react';
import { Home, FolderGit2, Search, Lightbulb, MessageSquare, Settings, ShieldCheck, Activity } from 'lucide-react';
import { TacitLogo } from './TacitLogo';
import { UserRole } from '../types';

export type NavTab = 'home' | 'projects' | 'similarity' | 'knowledge' | 'assistant' | 'admin';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  userRole: UserRole;
  isDarkMode: boolean;
  onOpenAgentModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  userRole,
  isDarkMode,
  onOpenAgentModal,
}) => {
  const navItems = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'projects' as NavTab, label: 'Projects', icon: FolderGit2 },
    { id: 'similarity' as NavTab, label: 'Similarity Check', icon: Search, badge: 'Core' },
    { id: 'knowledge' as NavTab, label: 'Knowledge', icon: Lightbulb },
    { id: 'assistant' as NavTab, label: 'AI Assistant', icon: MessageSquare },
    { id: 'admin' as NavTab, label: userRole === 'admin' ? 'Admin Console' : 'Settings & Admin', icon: userRole === 'admin' ? ShieldCheck : Settings },
  ];

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/90 backdrop-blur-md p-5 select-none transition-colors z-20">
      {/* Brand Header */}
      <div>
        <div className="px-2 pt-1 pb-6">
          <TacitLogo size="md" theme={isDarkMode ? 'dark' : 'light'} />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-500/10 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 font-semibold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-teal-600 dark:text-teal-400 stroke-[2.2]' : 'text-slate-400 dark:text-slate-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[10px] text-teal-600/90 dark:text-teal-400/90 font-medium tracking-wide">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Agent Widget & Footer */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        {/* Autonomous Agent Card */}
        <div
          onClick={onOpenAgentModal}
          className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-cyan-500/10 dark:from-teal-950/40 dark:to-slate-900/60 border border-teal-500/20 hover:border-teal-500/40 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                Autonomous Knowledge Agent
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/30 animate-pulse" />
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Running
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pl-1">
            Discovering · Connecting · Learning · Recommending.
          </p>
        </div>

        {/* Sponsor / Attribution */}
        <div className="flex items-center gap-2 px-1 text-slate-500 dark:text-slate-400">
          <div className="w-5 h-5 rounded bg-blue-600/90 flex items-center justify-center text-[10px] text-white font-bold tracking-tighter">
            IB
          </div>
          <div className="text-[11px] leading-tight">
            <span className="text-slate-400 dark:text-slate-500">Built with </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">IBM Bob</span>
            <div className="text-[10px] text-slate-400">by Serenade Data</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
