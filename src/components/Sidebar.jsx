import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useSidebar } from '../hooks/useSidebar';

const Sidebar = ({ currentExperiment, setCurrentExperiment, experiments }) => {
  const { isDarkMode } = useTheme();
  const { isOpen, closeSidebar } = useSidebar();
  const [expandedItems, setExpandedItems] = useState(new Set([1])); // Start with first item expanded

  const toggleDescription = (experimentId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(experimentId)) {
      newExpanded.delete(experimentId);
    } else {
      newExpanded.add(experimentId);
    }
    setExpandedItems(newExpanded);
  };

  const handleExperimentClick = (experiment) => {
    setCurrentExperiment(experiment);
    // Auto-expand the clicked experiment
    setExpandedItems(new Set([experiment.id]));

    // Notify rest of app that an experiment was selected (MainContent will scroll to top)
    window.dispatchEvent(new CustomEvent('experimentSelected', { detail: { experimentId: experiment.id } }));
  };

  // Don't render if sidebar is closed
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isOpen
            ? 'bg-black/50 backdrop-blur-sm opacity-100'
            : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar panel */}
      <div className={`fixed left-0 top-0 h-full w-80 z-50 transform transition-all duration-500 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Main sidebar container */}
        <div className={`relative h-full overflow-hidden ${
          isDarkMode
            ? 'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl'
            : 'bg-gradient-to-b from-white via-slate-50 to-white shadow-2xl'
        }`}>

          {/* Animated background elements */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            isDarkMode
              ? 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5'
              : 'bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-green-600/10'
          } animate-pulse`}></div>

          {/* Top accent line */}
          <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-500 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500'
          } animate-pulse`}></div>

          {/* Header with glass morphism effect */}
          <div className={`relative border-b transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-slate-700/50'
              : 'bg-gradient-to-r from-white/90 to-slate-50/90 border-slate-200/50'
          } backdrop-blur-sm`}>
            <div className={`absolute inset-0 transition-all duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10'
                : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'
            }`}></div>
            <div className="relative p-5 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 shadow-lg transition-all duration-300 transform hover:scale-110 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}>
                <svg className="w-6 h-6 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className={`text-lg font-bold tracking-wide mb-1 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-100' : 'text-slate-800'
              }`}>
                Lab Experiments
              </h3>
              <p className={`text-xs opacity-80 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Interactive Network Simulations
              </p>

              {/* Close button */}
              <button
                onClick={closeSidebar}
                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode
                    ? 'bg-slate-700/50 hover:bg-slate-600/70 text-slate-300 hover:text-white'
                    : 'bg-slate-200/50 hover:bg-slate-300/70 text-slate-600 hover:text-slate-800'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation items with advanced animations */}
          <nav className="relative p-2 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
            {experiments.map((experiment, index) => {
              const isExpanded = expandedItems.has(experiment.id);
              const isActive = currentExperiment?.id === experiment.id;

              return (
                <div
                  key={experiment.id}
                  className={`group relative transform transition-all duration-300 hover:scale-[1.02] ${
                    isActive ? 'z-10' : 'z-0'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'slideInFromLeft 0.5s ease-out forwards'
                  }}
                >
                  {/* Glow effect for active item */}
                  {isActive && (
                    <div className={`absolute -inset-1 rounded-xl blur opacity-30 animate-pulse transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}></div>
                  )}

                  <div
                    className={`relative cursor-pointer transition-all duration-300 rounded-xl overflow-hidden ${
                      isActive
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-500/20'
                          : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 shadow-lg shadow-blue-500/20'
                        : isDarkMode
                          ? 'bg-gradient-to-r from-slate-800/50 to-slate-700/50 hover:from-slate-700/70 hover:to-slate-600/70 border border-slate-600/30 hover:border-slate-500/50'
                          : 'bg-gradient-to-r from-slate-100/50 to-slate-50/50 hover:from-slate-200/70 hover:to-slate-100/70 border border-slate-200/30 hover:border-slate-300/50'
                    }`}
                    onClick={() => handleExperimentClick(experiment)}
                  >
                    {/* Animated border */}
                    <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-400 animate-pulse opacity-20'
                          : 'bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse opacity-20'
                        : 'opacity-0'
                    }`}></div>

                    {/* Content */}
                    <div className="relative p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`flex items-center space-x-3 transition-all duration-300 ${
                          isActive ? 'transform scale-105' : 'group-hover:transform group-hover:scale-105'
                        }`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                            isActive
                              ? isDarkMode
                                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg animate-bounce'
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg animate-bounce'
                              : isDarkMode
                                ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-slate-200 group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:text-white'
                                : 'bg-gradient-to-r from-slate-400 to-slate-300 text-slate-700 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white'
                          }`}>
                            {experiment.id}
                          </div>
                          <h4 className={`font-semibold text-sm transition-all duration-300 ${
                            isActive
                              ? isDarkMode ? 'text-cyan-100' : 'text-white'
                              : isDarkMode
                                ? 'text-slate-200 group-hover:text-cyan-100'
                                : 'text-slate-700 group-hover:text-slate-800'
                          }`}>
                            {experiment.title}
                          </h4>
                        </div>

                        {/* Expand/collapse button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescription(experiment.id);
                          }}
                          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? isDarkMode
                                ? 'bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-100'
                                : 'bg-white/20 hover:bg-white/30 text-white'
                              : isDarkMode
                                ? 'bg-slate-600/50 hover:bg-slate-500/70 text-slate-300 hover:text-cyan-100'
                                : 'bg-slate-300/50 hover:bg-slate-400/70 text-slate-600 hover:text-slate-800'
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {/* Animated description */}
                      <div className={`transition-all duration-300 overflow-hidden ${
                        isExpanded ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className={`pt-2 border-t transition-all duration-300 ${
                          isActive
                            ? isDarkMode ? 'border-cyan-400/30' : 'border-blue-400/30'
                            : isDarkMode ? 'border-slate-600/30' : 'border-slate-300/30'
                        }`}>
                          <p className={`text-xs leading-relaxed transition-all duration-300 ${
                            isActive
                              ? isDarkMode ? 'text-cyan-200' : 'text-blue-100'
                              : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                          }`}>
                            {experiment.description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      isActive
                        ? isDarkMode
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                          : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                        : 'bg-gradient-to-r from-transparent to-transparent group-hover:from-blue-500/10 group-hover:to-purple-500/10'
                    }`}></div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Bottom decoration */}
          <div className={`absolute bottom-0 left-0 w-full h-1 transition-all duration-500 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-green-500'
          }`}></div>

          {/* Bottom padding for scrollbar */}
          <div className="h-4"></div>
        </div>

        {/* Right edge glow effect */}
        <div className={`absolute right-0 top-0 h-full w-1 transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500'
            : 'bg-gradient-to-b from-blue-500 via-purple-500 to-green-500'
        } shadow-lg`}></div>
      </div>
    </>
  );
};

export default Sidebar;
