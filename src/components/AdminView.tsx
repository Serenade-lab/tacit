import React, { useState } from 'react';
import {
  ShieldCheck,
  Activity,
  FolderGit2,
  FileText,
  Laptop,
  Cloud,
  RefreshCw,
  Play,
  Pause,
  CheckCircle2,
  Users,
  Sliders,
  Database
} from 'lucide-react';
import { WorkspaceSource, UserRole } from '../types';

interface AdminViewProps {
  sources: WorkspaceSource[];
  onTriggerSync: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ sources, onTriggerSync }) => {
  const [isAgentRunning, setIsAgentRunning] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [scanFrequency, setScanFrequency] = useState('Continuous (Real-time Webhook)');

  const teamMembers: { name: string; email: string; role: UserRole; dept: string; lastActive: string }[] = [
    { name: 'Fenti Irnawati', email: 'fenti@serenadedata.com', role: 'employee', dept: 'Core Logistics', lastActive: '5m ago' },
    { name: 'Marcus Vance', email: 'admin@serenadedata.com', role: 'admin', dept: 'Architecture', lastActive: 'Active now' },
    { name: 'Ahmad Faisal', email: 'ahmad@serenadedata.com', role: 'employee', dept: 'Logistics ML', lastActive: '2h ago' },
    { name: 'Elena Rostova', email: 'elena@serenadedata.com', role: 'employee', dept: 'Retail Frontend', lastActive: '1d ago' },
    { name: 'Budi Santoso', email: 'budi@serenadedata.com', role: 'employee', dept: 'IoT Hardware', lastActive: '3h ago' },
  ];

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onTriggerSync();
    }, 1200);
  };

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Administrator Control Center</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Workspace & Knowledge Agent Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Configure enterprise workspace connections, monitor autonomous indexing crawlers, and manage user roles.
          </p>
        </div>

        {/* Global Manual Re-sync */}
        <button
          onClick={handleSyncNow}
          disabled={isSyncing}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm disabled:opacity-60 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Indexing Workspaces...' : 'Re-index Workspaces'}</span>
        </button>
      </div>

      {/* Autonomous Agent Status Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/15 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Autonomous Knowledge Agent
                </h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isAgentRunning ? 'Active & Watching' : 'Paused'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Continuously analyzes AST code changes, pull requests, and documentation for reusable components.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAgentRunning(!isAgentRunning)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              {isAgentRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Agent</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Resume Agent</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Indexing Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Repositories Indexed
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              8 connected
            </div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">100% parsed AST</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Architecture Docs
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              124 items
            </div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">Confluence + Notion</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Extracted Modules
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              48 modules
            </div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">Ready for reuse</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tacit Decisions (ADRs)
            </div>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
              19 records
            </div>
            <div className="text-[10px] text-teal-600 dark:text-teal-400 mt-0.5">Trade-offs preserved</div>
          </div>
        </div>
      </div>

      {/* Connected Workspace Sources */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Connected Enterprise Sources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sources.map((src) => (
            <div
              key={src.id}
              className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-teal-600 shadow-2xs">
                  {src.type === 'repositories' && <FolderGit2 className="w-4 h-4" />}
                  {src.type === 'documents' && <FileText className="w-4 h-4" />}
                  {src.type === 'workspaces' && <Laptop className="w-4 h-4" />}
                  {src.type === 'projects' && <Database className="w-4 h-4" />}
                  {src.type === 'other' && <Cloud className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {src.name}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold tabular-nums">
                      {src.count} {src.unit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {src.details}
                  </p>
                  <span className="text-[11px] text-slate-400 block mt-1">
                    Last synchronised: {src.lastSync}
                  </span>
                </div>
              </div>

              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 capitalize">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {src.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Access & User Roles Management */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              User Access & Role Allocation
            </h3>
          </div>
          <span className="text-xs text-slate-400">5 active team members</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2.5 font-semibold">User</th>
                <th className="py-2.5 font-semibold">Department</th>
                <th className="py-2.5 font-semibold">Role</th>
                <th className="py-2.5 font-semibold">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {teamMembers.map((member, i) => (
                <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-3">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{member.email}</div>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-400">{member.dept}</td>
                  <td className="py-3">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] font-bold capitalize ${
                        member.role === 'admin'
                          ? 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 tabular-nums">{member.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
