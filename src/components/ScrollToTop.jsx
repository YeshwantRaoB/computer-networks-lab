import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

const ScrollToTop = () => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-cyan-500/25 focus:ring-cyan-400'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/25 focus:ring-blue-400'
          }`}
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          {/* Arrow up icon */}
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>

          {/* Subtle glow effect */}
          <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 hover:opacity-20'
              : 'bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 hover:opacity-20'
          } blur-md`}></div>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;