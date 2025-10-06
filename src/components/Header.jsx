import React from 'react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import SidebarToggle from './SidebarToggle';

const Header = () => {
  const { isDarkMode } = useTheme();

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-slate-900/50'
        : 'bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg'
    }`}>
      {/* Animated background pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
        isDarkMode
          ? 'from-blue-500/5 via-purple-500/5 to-green-500/5'
          : 'from-blue-600/10 via-purple-600/10 to-green-600/10'
      } animate-pulse`}></div>

      {/* Top accent line */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-500 ${
        isDarkMode
          ? 'from-cyan-400 via-blue-500 to-purple-500'
          : 'from-blue-500 via-purple-500 to-green-500'
      } animate-pulse`}></div>

      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and title section */}
          <div className="flex items-center space-x-4">
            {/* Sidebar toggle button */}
            <SidebarToggle />

            {/* Logo icon with animation */}
            <div className={`relative transition-all duration-500 transform hover:scale-110 ${
              isDarkMode ? 'text-cyan-400' : 'text-blue-400'
            }`}>
              <div className="absolute inset-0 bg-current opacity-20 blur-lg animate-pulse"></div>
              <svg className="relative w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            {/* Title */}
            <div className="hidden sm:block">
              <h1 className={`font-bold tracking-wide transition-all duration-300 ${
                isDarkMode
                  ? 'text-slate-100 text-sm md:text-base'
                  : 'text-white text-sm md:text-base'
              }`}>
                COMPUTER SCIENCE AND ENGINEERING
              </h1>
              <h2 className={`font-medium opacity-90 tracking-wide transition-all duration-300 ${
                isDarkMode
                  ? 'text-slate-300 text-xs'
                  : 'text-slate-200 text-xs'
              }`}>
                Computer Networks Lab Manual
              </h2>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle with enhanced styling */}
            <div className="relative">
              <ThemeToggle />

              {/* Floating particles effect */}
              <div className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none ${
                isDarkMode ? 'opacity-30' : 'opacity-20'
              }`}>
                <div className={`absolute top-0 left-2 w-1 h-1 rounded-full animate-ping ${
                  isDarkMode ? 'bg-yellow-400' : 'bg-slate-400'
                }`}></div>
                <div className={`absolute bottom-1 right-1 w-1 h-1 rounded-full animate-pulse ${
                  isDarkMode ? 'bg-orange-400' : 'bg-slate-500'
                }`}></div>
                <div className={`absolute top-2 right-2 w-0.5 h-0.5 rounded-full animate-bounce ${
                  isDarkMode ? 'bg-yellow-300' : 'bg-slate-300'
                }`}></div>
              </div>
            </div>

            {/* Status indicator */}
            <div className={`hidden md:flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-800/50 border border-slate-700/50'
                : 'bg-white/10 border border-white/20'
            }`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                isDarkMode ? 'bg-green-400' : 'bg-green-500'
              }`}></div>
              <span className={`text-xs font-medium ${
                isDarkMode ? 'text-slate-300' : 'text-slate-200'
              }`}>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Mobile title (shown when sidebar is hidden on small screens) */}
        <div className="sm:hidden mt-2 text-center">
          <h1 className={`font-bold tracking-wide transition-all duration-300 ${
            isDarkMode ? 'text-slate-100 text-sm' : 'text-white text-sm'
          }`}>
            COMPUTER SCIENCE AND ENGINEERING
          </h1>
          <h2 className={`font-medium opacity-90 tracking-wide transition-all duration-300 ${
            isDarkMode ? 'text-slate-300 text-xs' : 'text-slate-200 text-xs'
          }`}>
            Computer Networks Lab Manual
          </h2>
        </div>
      </div>

      {/* Bottom accent with animation */}
      <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r transition-all duration-500 ${
        isDarkMode
          ? 'from-cyan-400 via-blue-500 to-purple-500'
          : 'from-blue-500 via-purple-500 to-green-500'
      } animate-pulse`}></div>
    </header>
  );
};

export default Header;
