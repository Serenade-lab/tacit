import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  theme?: 'light' | 'dark';
}

export const TacitLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showTagline = true,
  theme = 'light'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Brain-Tree Emblem */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-500/20 via-emerald-400/20 to-cyan-400/30 border border-teal-500/30 p-1.5 shadow-sm`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-teal-600 dark:text-teal-400"
        >
          {/* Trunk */}
          <path
            d="M24 42V20"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Brain Hemispheric Foliage */}
          <path
            d="M24 30C19 30 14 26 14 20C14 15 17 12 21 12C21 8 24 6 24 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M24 24C20 23 18 20 18 17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Right Brain Hemispheric Foliage */}
          <path
            d="M24 30C29 30 34 26 34 20C34 15 31 12 27 12C27 8 24 6 24 6"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M24 24C28 23 30 20 30 17"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Neural Nodes */}
          <circle cx="14" cy="20" r="2.5" fill="#14B8A6" />
          <circle cx="34" cy="20" r="2.5" fill="#14B8A6" />
          <circle cx="24" cy="6" r="2.5" fill="#2DD4BF" />
          <circle cx="21" cy="12" r="2" fill="#0D9488" />
          <circle cx="27" cy="12" r="2" fill="#0D9488" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${textSizes[size]} leading-none`}>
          Tacit<span className="text-teal-600 dark:text-teal-400">AI</span>
        </span>
        {showTagline && (
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-1">
            Know What You Already Have
          </span>
        )}
      </div>
    </div>
  );
};
