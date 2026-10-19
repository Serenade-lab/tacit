import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Sun, Moon, ChevronDown, Check, LogOut, Shield, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  currentUser: User;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  onSearchSubmit: (query: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onSwitchRole,
  onLogout,
  onSearchSubmit,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
      setSearchInput('');
    }
  };

  return (
    <header className="h-16 px-6 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between gap-6 sticky top-0 z-30 transition-colors">
      {/* Search Input Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Describe your project idea or ask about existing solutions... (Enter to check)"
            className="w-full pl-10 pr-24 py-2 text-sm bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition-all shadow-xs"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5 pointer-events-none">
            <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded shadow-2xs">
              Ctrl K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifMenuRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200/80 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">Notifications</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">3 unread</span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="font-medium text-slate-800 dark:text-slate-200">New Reusable Package</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Elena published @serenade/ui-scanner-hook</div>
                  <div className="text-[10px] text-slate-400 mt-1">20m ago</div>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="font-medium text-slate-800 dark:text-slate-200">Autonomous Agent Sync</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Indexed 12 new files from Dev Team PC</div>
                  <div className="text-[10px] text-slate-400 mt-1">1h ago</div>
                </div>
                <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="font-medium text-slate-800 dark:text-slate-200">Architecture Decision Added</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">ADR-042 (FastAPI throughput) approved</div>
                  <div className="text-[10px] text-slate-400 mt-1">Yesterday</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-2 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all cursor-pointer border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback avatar
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 capitalize leading-tight">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200/80 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">{currentUser.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{currentUser.email}</div>
                <div className="text-[10px] text-teal-600 dark:text-teal-400 font-medium mt-1">{currentUser.title}</div>
              </div>

              {/* Role Switcher */}
              <div className="p-2 border-b border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase px-2 mb-1">
                  Active Role
                </div>
                <button
                  onClick={() => {
                    onSwitchRole('employee');
                    setShowUserMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentUser.role === 'employee'
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-3.5 h-3.5" />
                    Employee
                  </span>
                  {currentUser.role === 'employee' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('admin');
                    setShowUserMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentUser.role === 'admin'
                      ? 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 font-medium'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    Admin
                  </span>
                  {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              </div>

              {/* Sign Out */}
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
