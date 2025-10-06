import React from 'react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    console.log('Theme toggle clicked! Current mode:', isDarkMode);
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
        isDarkMode
          ? 'bg-gradient-to-r from-slate-700 to-slate-600 focus:ring-slate-400'
          : 'bg-gradient-to-r from-slate-300 to-slate-400 focus:ring-slate-300'
      }`}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {/* Toggle knob */}
      <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-lg transform transition-all duration-500 ease-in-out ${
        isDarkMode
          ? 'translate-x-5 bg-gradient-to-r from-cyan-400 to-blue-500'
          : 'translate-x-0.5 bg-gradient-to-r from-yellow-400 to-orange-500'
      }`}>
        {/* Icon inside knob */}
        <div className="w-full h-full flex items-center justify-center">
          {isDarkMode ? (
            // Moon icon for dark mode
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>

      {/* Background pattern */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-r from-slate-800/20 to-slate-700/20'
          : 'bg-gradient-to-r from-slate-200/20 to-slate-100/20'
      }`}></div>
    </button>
  );
};

export default ThemeToggle;
