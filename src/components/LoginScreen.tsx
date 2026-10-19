import React, { useState } from 'react';
import { Search, Link as LinkIcon, Zap, Eye, EyeOff, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { TacitLogo } from './TacitLogo';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  isDarkMode: boolean;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, isDarkMode }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('employee');
  const [email, setEmail] = useState('fenti@serenadedata.com');
  const [password, setPassword] = useState('tacitai2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'employee') {
      setEmail('fenti@serenadedata.com');
    } else {
      setEmail('admin@serenadedata.com');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(selectedRole);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-[#F4F9F8] dark:bg-[#080E17] flex flex-col lg:flex-row transition-colors">
      {/* Left Column: Visual Storytelling & 3D Illustration */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-14 relative overflow-hidden">
        {/* Subtle decorative background gradient glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-200/40 dark:bg-teal-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-cyan-200/30 dark:bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <TacitLogo size="lg" theme={isDarkMode ? 'dark' : 'light'} />
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <button className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer">About</button>
            <button className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer">Features</button>
            <button className="hover:text-teal-700 dark:hover:text-teal-400 transition-colors cursor-pointer">Security</button>
          </div>
        </div>

        {/* Hero Narrative */}
        <div className="relative z-10 my-8 max-w-xl">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
            Turn hidden knowledge into <span className="text-teal-700 dark:text-teal-400">real business value.</span>
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            TacitAI finds your existing projects, connects the right knowledge, and helps you build smarter, not duplicate work.
          </p>

          {/* 3 Core Pillars */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200/70 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Search className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Discover</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Find existing internal projects</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <LinkIcon className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Connect</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Uncover tacit architecture logs</p>
            </div>

            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Zap className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-slate-100">Recommend</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">Reuse, improve, or build new</p>
            </div>
          </div>
        </div>

        {/* 3D Visual Rendering with Live Floating Markers */}
        <div className="relative z-10 w-full rounded-2xl overflow-hidden border border-white/60 dark:border-slate-800 shadow-xl group my-4">
          <img
            src="/src/assets/images/tacitai_desk_scene_1792393427597.jpg"
            alt="TacitAI Workspace Scene"
            className="w-full h-64 lg:h-80 object-cover group-hover:scale-[1.02] transition-transform duration-700"
            referrerPolicy="no-referrer"
          />

          {/* Floating Live Annotations */}
          <div className="absolute top-4 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 dark:border-slate-700 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Documents</span>
            <span className="text-[11px] text-slate-400">124 items</span>
          </div>

          <div className="absolute top-8 right-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/60 dark:border-slate-700 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Repositories</span>
            <span className="text-[11px] text-slate-400">8 connected</span>
          </div>

          <div className="absolute bottom-6 left-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/60 dark:border-slate-700 shadow-md">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Live Core Detection
            </div>
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              Similar Projects Found: <span className="text-teal-600">InventoryAI (86%)</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center gap-2 pt-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="w-4 h-4 rounded bg-blue-600 flex items-center justify-center text-[9px] text-white font-bold">
            IB
          </div>
          <span>Built with <strong className="text-slate-700 dark:text-slate-300">IBM Bob</strong> by Serenade Data</span>
        </div>
      </div>

      {/* Right Column: Minimal Clean Login Card */}
      <div className="w-full lg:w-[480px] xl:w-[520px] bg-white dark:bg-slate-900/95 p-8 lg:p-14 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200/80 dark:border-slate-800 shadow-2xl relative">
        <div className="my-auto max-w-sm w-full mx-auto">
          {/* Welcome Heading */}
          <div className="text-left mb-6">
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Welcome to
            </span>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Tacit<span className="text-teal-600 dark:text-teal-400">AI</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange('employee')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === 'employee'
                  ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500/60 shadow-xs ring-1 ring-teal-500/30'
                  : 'bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${selectedRole === 'employee' ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Employee
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                Explore knowledge and build smarter
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-teal-50/80 dark:bg-teal-950/40 border-teal-500/60 shadow-xs ring-1 ring-teal-500/30'
                  : 'bg-slate-50/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${selectedRole === 'admin' ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-snug">
                Manage workspaces and agents
              </p>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Work Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-2.5 bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 bg-slate-50/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500"
                />
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Separator */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-xs text-slate-400 uppercase tracking-wider font-medium">
              Or continue with
            </span>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onLogin(selectedRole)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => onLogin(selectedRole)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              <span>Microsoft</span>
            </button>
          </div>
        </div>

        {/* Mint Wave Decorative Bottom Banner */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            Preserve knowledge · Prevent duplicate projects · Build what&apos;s next.
          </div>
        </div>
      </div>
    </div>
  );
};
