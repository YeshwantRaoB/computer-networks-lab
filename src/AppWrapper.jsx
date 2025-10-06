import { useState } from 'react'
import App from './App.jsx'
import { experiments } from './data/experiments.js'

function AppWrapper() {
  const [currentExperiment, setCurrentExperiment] = useState(experiments[0]);

  return (
    <App
      currentExperiment={currentExperiment}
      setCurrentExperiment={setCurrentExperiment}
      experiments={experiments}
    />
  );
}

export default AppWrapper;
