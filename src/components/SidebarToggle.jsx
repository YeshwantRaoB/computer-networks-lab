import React from 'react';
import { useSidebar } from '../hooks/useSidebar';

const SidebarToggle = () => {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 group"
      title={isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
    >
      {/* Animated hamburger/menu icon */}
      <div className="relative w-5 h-5">
        {/* Top line */}
        <span className={`absolute top-0 left-0 w-full h-0.5 bg-white transition-all duration-300 transform ${
          isOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
        }`}></span>

        {/* Middle line */}
        <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-white transition-all duration-300 transform -translate-y-1/2 ${
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}></span>

        {/* Bottom line */}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 transform ${
          isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
        }`}></span>
      </div>

      {/* Tooltip */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}>
        {isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </button>
  );
};

export default SidebarToggle;
