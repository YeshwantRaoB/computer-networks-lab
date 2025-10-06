import React from 'react';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App({ currentExperiment, setCurrentExperiment, experiments }) {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
    }`}>
      <Header />
      <div className="flex flex-1 relative overflow-hidden">
        <div className="flex-1 transition-all duration-300">
          <MainContent currentExperiment={currentExperiment} />
        </div>
        <Sidebar
          currentExperiment={currentExperiment}
          setCurrentExperiment={setCurrentExperiment}
          experiments={experiments}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
