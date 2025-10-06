import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContextValue';

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Default to light mode, but check localStorage
    try {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
    }
    // Always default to light mode
    return false;
  });

  useEffect(() => {
    try {
      // Apply theme to document
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    console.log('Toggling theme from:', isDarkMode);
    setIsDarkMode(prev => {
      const newMode = !prev;
      console.log('New theme mode:', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
