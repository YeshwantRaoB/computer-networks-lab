import React from 'react';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  const { isDarkMode } = useTheme();

  const handleDeveloperClick = () => {
    window.open('https://yrb-portfolio.netlify.app/', '_blank');
  };

  const handleLinkClick = (url) => {
    window.open(url, '_blank');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative transition-all duration-500 overflow-hidden ${
      isDarkMode
        ? 'bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 shadow-2xl shadow-slate-900/50'
        : 'bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 shadow-lg'
    }`}>
      {/* Enhanced animated background pattern */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-all duration-1000 ${
        isDarkMode
          ? 'from-purple-500/8 via-blue-500/8 to-cyan-500/8'
          : 'from-purple-600/12 via-blue-600/12 to-cyan-600/12'
      } animate-pulse`}></div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-ping ${
              isDarkMode ? 'bg-cyan-400/30' : 'bg-blue-400/40'
            }`}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          ></div>
        ))}
      </div>

      {/* Top accent line with shimmer effect */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-500 ${
        isDarkMode
          ? 'from-purple-400 via-blue-500 to-cyan-500'
          : 'from-purple-500 via-blue-600 to-cyan-600'
      } animate-pulse`}>
        <div className={`absolute inset-0 bg-gradient-to-r animate-pulse ${
          isDarkMode
            ? 'from-transparent via-white/20 to-transparent'
            : 'from-transparent via-white/30 to-transparent'
        }`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Left Section - Brand & Copyright */}
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
              isDarkMode ? 'text-cyan-300' : 'text-blue-300'
            }`}>
              Computer Networks Lab
            </h3>
            <p className={`text-sm mb-4 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-300'
            }`}>
              Interactive learning platform for network simulation experiments
            </p>
            <p className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-400'
            }`}>
              © {currentYear} Computer Networks Lab Manual. All rights reserved.
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <div className="text-center">
            <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-200'
            }`}>
              Resources
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => handleLinkClick('https://www.isi.edu/nsnam/ns/')}
                className={`block w-full text-xs transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-cyan-400'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                NS2 Documentation
              </button>
              <button
                onClick={() => handleLinkClick('https://www.nsnam.org/')}
                className={`block w-full text-xs transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-cyan-400'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                NS3 Official Site
              </button>
              <button
                onClick={() => handleLinkClick('https://github.com/sajidhasanapon/NS2')}
                className={`block w-full text-xs transition-all duration-300 transform hover:scale-105 hover:translate-x-1 ${
                  isDarkMode
                    ? 'text-slate-400 hover:text-cyan-400'
                    : 'text-slate-300 hover:text-blue-400'
                }`}
              >
                GitHub Repository
              </button>
            </div>
          </div>

          {/* Right Section - Developer & Social */}
          <div className="text-center md:text-right">
            <h4 className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-200'
            }`}>
              Connect
            </h4>
            <div className="flex justify-center md:justify-end items-center space-x-4 mb-3">
              {/* Theme Toggle */}
              <div className="flex flex-col items-center space-y-1">
                <span className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-300'
                }`}>
                  Theme
                </span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => handleLinkClick('https://www.linkedin.com/in/yeshwant-rao-b-9a9125288/')}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400'
                    : 'bg-slate-600/50 hover:bg-blue-500/20 text-slate-300 hover:text-blue-500'
                }`}
                title="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </button>
              <button
                onClick={() => handleLinkClick('https://github.com/YeshwantRaoB')}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-slate-600/30 text-slate-400 hover:text-slate-300'
                    : 'bg-slate-600/50 hover:bg-slate-500/30 text-slate-300 hover:text-slate-200'
                }`}
                title="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 14.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-4.589 8.199-9.086 8.199-14.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </button>
              <button
                onClick={() => handleLinkClick('mailto:byeshwantrao@gmail.com')}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-green-600/20 text-slate-400 hover:text-green-400'
                    : 'bg-slate-600/50 hover:bg-green-500/20 text-slate-300 hover:text-green-500'
                }`}
                title="Email"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-300'
            }`}>
              Developed by{' '}
              <span
                className={`font-semibold cursor-pointer px-2 py-1 rounded-md transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  isDarkMode
                    ? 'text-cyan-400 bg-gradient-to-r from-cyan-500/10 to-blue-500/20 hover:from-cyan-500/20 hover:to-blue-500/30 hover:shadow-lg hover:shadow-cyan-500/25'
                    : 'text-blue-400 bg-gradient-to-r from-blue-500/10 to-purple-500/20 hover:from-blue-500/20 hover:to-purple-500/30 hover:shadow-lg hover:shadow-blue-500/25'
                }`}
                onClick={handleDeveloperClick}
                title="Visit Portfolio"
              >
                <span className="relative">
                  Yeshwant Rao B
                  <span className={`absolute inset-0 rounded-md transition-all duration-500 ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-400 opacity-20 blur-md animate-pulse'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-md animate-pulse'
                  }`}></span>
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced decorative elements */}
        <div className="flex justify-center">
          <div className={`flex space-x-3 transition-all duration-300 ${
            isDarkMode ? 'opacity-70' : 'opacity-60'
          }`}>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-cyan-400' : 'bg-blue-400'
            }`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-purple-400' : 'bg-purple-500'
            }`} style={{ animationDelay: '200ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-blue-400' : 'bg-cyan-400'
            }`} style={{ animationDelay: '400ms' }}></div>
            <div className={`w-2 h-2 rounded-full animate-bounce ${
              isDarkMode ? 'bg-green-400' : 'bg-green-500'
            }`} style={{ animationDelay: '600ms' }}></div>
          </div>
        </div>
      </div>

      {/* Bottom accent with enhanced animation and shimmer */}
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-500 ${
        isDarkMode
          ? 'from-purple-400 via-blue-500 to-cyan-500'
          : 'from-purple-500 via-blue-600 to-cyan-600'
      } animate-pulse`}>
        <div className={`absolute inset-0 bg-gradient-to-r animate-pulse ${
          isDarkMode
            ? 'from-transparent via-white/20 to-transparent'
            : 'from-transparent via-white/30 to-transparent'
        }`}></div>
      </div>
    </footer>
  );
};

export default Footer;