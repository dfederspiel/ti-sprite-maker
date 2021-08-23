import React from 'react';
import SpriteMaker from './components/SpriteMaker';
import './App.css';
import { SpriteMakerProvider } from './components/context/SpriteMakerProvider';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <SpriteMakerProvider hex="00995a3c3c3c2424">
          <SpriteMaker />
        </SpriteMakerProvider>
      </header>
    </div>
  );
}

export default App;
