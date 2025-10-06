import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';

const MainContent = ({ currentExperiment }) => {
  const { isDarkMode } = useTheme();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const containerRef = useRef(null);

  // Listen for selection events from Sidebar and scroll main container to top smoothly
  useEffect(() => {
    const onExperimentSelected = () => {
      if (containerRef.current && typeof containerRef.current.scrollTo === 'function') {
        containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('experimentSelected', onExperimentSelected);
    return () => window.removeEventListener('experimentSelected', onExperimentSelected);
  }, []);

  // Also scroll when currentExperiment changes (fallback)
  useEffect(() => {
    if (containerRef.current && typeof containerRef.current.scrollTo === 'function') {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentExperiment]);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Syntax highlighting function for TCL code
  const highlightTCL = (code) => {
    if (!code) return '';

    // TCL syntax patterns
    const patterns = [
      { regex: /\b(set|proc|global|if|else|for|foreach|while|return|break|continue|switch)\b/g, class: 'tcl-keyword' },
      { regex: /\b(new|Simulator|node|duplex-link|attach-agent|connect|trace-all|namtrace-all)\b/g, class: 'tcl-function' },
      { regex: /(["'])(.*?)\1/g, class: 'tcl-string' },
      { regex: /(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, class: 'tcl-variable' },
      { regex: /(#.*$)/gm, class: 'tcl-comment' },
      { regex: /(\d+\.?\d*)/g, class: 'tcl-number' },
    ];

    let highlighted = code;

    patterns.forEach(({ regex, class: className }) => {
      highlighted = highlighted.replace(regex, `<span class="${className}">$&</span>`);
    });

    return highlighted;
  };

  if (!currentExperiment) {
    return (
      <main ref={containerRef} style={{ scrollBehavior: 'smooth' }} className={`flex-1 p-6 overflow-y-auto transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100'
          : 'bg-white text-slate-900'
      }`}>
        <div className="text-center py-12">
          <h2 className={`text-3xl font-light mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-cyan-300' : 'text-slate-600'
          }`}>
            Welcome to Computer Networks Lab Manual
          </h2>
          <p className={`text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Select an experiment from the sidebar to view its details, code, and instructions.
          </p>
        </div>
      </main>
    );
  }

  // If experiment doesn't have detailed content yet, show coming soon
  if (!currentExperiment.content) {
    return (
      <main ref={containerRef} style={{ scrollBehavior: 'smooth' }} className={`flex-1 p-6 overflow-y-auto transition-all duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100'
          : 'bg-white text-slate-900'
      }`}>
        <div className={`mb-6 pb-4 border-b-2 transition-colors duration-300 ${
          isDarkMode ? 'border-slate-700' : 'border-slate-200'
        }`}>
          <h2 className={`text-2xl font-medium mb-2 leading-tight transition-colors duration-300 ${
            isDarkMode ? 'text-cyan-300' : 'text-slate-800'
          }`}>
            {currentExperiment.title}
          </h2>
          <p className={`text-base leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {currentExperiment.description}
          </p>
        </div>
        <div className="text-center py-12">
          <h3 className={`text-2xl font-light mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-cyan-300' : 'text-slate-600'
          }`}>
            Coming Soon
          </h3>
          <p className={`text-base leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            This experiment is currently under development and will be available soon.
          </p>
        </div>
      </main>
    );
  }

  const { content } = currentExperiment;

  return (
    <main ref={containerRef} style={{ scrollBehavior: 'smooth' }} className={`flex-1 p-6 overflow-y-auto transition-all duration-500 ${
      isDarkMode
        ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100'
        : 'bg-white text-slate-900'
    }`}>
      <div className={`mb-6 pb-4 border-b-2 transition-colors duration-300 ${
        isDarkMode ? 'border-slate-700' : 'border-slate-200'
      }`}>
        <h2 className={`text-2xl font-medium mb-2 leading-tight transition-colors duration-300 ${
          isDarkMode ? 'text-cyan-300' : 'text-slate-800'
        }`}>
          {currentExperiment.title}
        </h2>
        <p className={`text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {currentExperiment.description}
        </p>
      </div>

      <div className="max-w-4xl">
        <div className={`mb-6 p-4 rounded-lg border-l-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-cyan-400'
            : 'bg-slate-50 border-blue-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
            isDarkMode ? 'text-cyan-300' : 'text-slate-800'
          }`}>
            Objective
          </h3>
          <p className={`leading-relaxed transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {content.objective}
          </p>
        </div>

        <div className={`mb-6 p-4 rounded-lg border-l-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-green-400'
            : 'bg-slate-50 border-green-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-green-300' : 'text-slate-800'
          }`}>
            Software Requirements
          </h3>
          <ul className="space-y-1">
            {content.softwareRequirements.map((req, index) => (
              <li key={index} className={`flex items-start transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-green-400' : 'bg-green-500'
                }`}></span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className={`mb-6 p-4 rounded-lg border-l-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-purple-400'
            : 'bg-slate-50 border-purple-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-purple-300' : 'text-slate-800'
          }`}>
            Step-by-Step Instructions
          </h3>
          <div className="space-y-4">
            {content.steps.map((step) => (
              <div key={step.number} className={`flex gap-3 p-3 rounded-lg shadow-sm border transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-700/50 border-slate-600/50 shadow-slate-900/20'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gradient-to-r from-green-400 to-green-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                }`}>
                  {step.number}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {step.title}
                  </h4>
                  <p className={`leading-relaxed mb-2 transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    {step.content}
                  </p>
                  {step.code && (
                    <div className={`relative mb-3 rounded-lg overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-slate-900 border border-slate-600'
                        : 'bg-slate-800'
                    }`}>
                      {/* Header with copy button */}
                      <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                        isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-700 bg-slate-700'
                      }`}>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-200'
                        }`}>
                          Code
                        </span>
                        <button
                          onClick={() => copyToClipboard(step.code, `code-${step.number}`)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                            copiedIndex === `code-${step.number}`
                              ? 'bg-green-600 text-white'
                              : isDarkMode
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                          }`}
                          title="Copy code"
                        >
                          {copiedIndex === `code-${step.number}` ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                          <span>{copiedIndex === `code-${step.number}` ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Code content */}
                      <div className={`p-4 overflow-x-auto transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-900' : 'bg-slate-800'
                      }`}>
                        <pre className={`text-sm leading-relaxed font-mono transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-100'
                        }`}>
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* TCL Code Block with Syntax Highlighting */}
                  {step.tclCode && (
                    <div className={`relative mb-3 rounded-lg overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-slate-900 border border-slate-600'
                        : 'bg-slate-800'
                    }`}>
                      {/* Header with copy button */}
                      <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                        isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-700 bg-slate-700'
                      }`}>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-200'
                        }`}>
                          TCL Script
                        </span>
                        <button
                          onClick={() => copyToClipboard(step.tclCode, `tcl-${step.number}`)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                            copiedIndex === `tcl-${step.number}`
                              ? 'bg-green-600 text-white'
                              : isDarkMode
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                          }`}
                          title="Copy code"
                        >
                          {copiedIndex === `tcl-${step.number}` ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                          <span>{copiedIndex === `tcl-${step.number}` ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* Code content with syntax highlighting */}
                      <div className={`p-4 overflow-x-auto transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-900' : 'bg-slate-800'
                      }`}>
                        <pre className={`text-sm leading-relaxed font-mono transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-100'
                        }`}>
                          <code dangerouslySetInnerHTML={{ __html: highlightTCL(step.tclCode) }} />
                        </pre>
                      </div>
                    </div>
                  )}

                  {step.codeBlock && (
                    <div className={`relative mb-3 rounded-lg overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-slate-900 border border-slate-600'
                        : 'bg-slate-800'
                    }`}>
                      <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                        isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-700 bg-slate-700'
                      }`}>
                        <span className={`text-xs font-medium transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-200'
                        }`}>
                          Code Changes
                        </span>
                        <button
                          onClick={() => copyToClipboard(`${step.codeBlock.from}\n\n${step.codeBlock.to}`, `block-${step.number}`)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-all duration-300 transform hover:scale-105 ${
                            copiedIndex === `block-${step.number}`
                              ? 'bg-green-600 text-white'
                              : isDarkMode
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-slate-600 text-slate-200 hover:bg-slate-500'
                          }`}
                          title="Copy code"
                        >
                          {copiedIndex === `block-${step.number}` ? (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )}
                          <span>{copiedIndex === `block-${step.number}` ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className={`p-4 overflow-x-auto transition-colors duration-300 ${
                        isDarkMode ? 'bg-slate-900' : 'bg-slate-800'
                      }`}>
                        <div className={`text-sm font-mono transition-colors duration-300 ${
                          isDarkMode ? 'text-slate-100' : 'text-slate-100'
                        }`}>
                          <p className={`mb-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-300'
                          }`}>
                            Change from:
                          </p>
                          <pre className="mb-3 p-2 bg-slate-800/50 rounded text-xs">{step.codeBlock.from}</pre>
                          <p className={`mb-2 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-400' : 'text-slate-300'
                          }`}>
                            To:
                          </p>
                          <pre className="p-2 bg-slate-800/50 rounded text-xs">{step.codeBlock.to}</pre>
                        </div>
                      </div>
                    </div>
                  )}
                  {step.note && (
                    <div className={`mt-2 p-2 rounded-lg border transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-yellow-900/20 border-yellow-700/30'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <p className={`italic text-sm transition-colors duration-300 ${
                        isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
                      }`}>
                        <strong>Note:</strong> {step.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-lg border-l-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-orange-400'
            : 'bg-slate-50 border-orange-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-orange-300' : 'text-slate-800'
          }`}>
            Expected Output
          </h3>
          <ul className="space-y-1">
            {content.expectedOutput.map((output, index) => (
              <li key={index} className={`flex items-start transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-orange-400' : 'bg-orange-500'
                }`}></span>
                {output}
              </li>
            ))}
          </ul>
        </div>

        <div className={`mb-6 p-4 rounded-lg border-l-4 transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-red-400'
            : 'bg-slate-50 border-red-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-red-300' : 'text-slate-800'
          }`}>
            Key Observations
          </h3>
          <ul className="space-y-1">
            {content.keyObservations.map((observation, index) => (
              <li key={index} className={`flex items-start transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode ? 'bg-red-400' : 'bg-red-500'
                }`}></span>
                {observation}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
