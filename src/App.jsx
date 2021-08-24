import React from 'react';
import SpriteMaker from './components/SpriteMaker';
import './App.css';
import ColorPicker from './components/ColorPicker';
import { SpriteMakerProvider, useSpriteMaker } from './components/context/SpriteMakerProvider';

function AppWrapper() {
  const spriteMaker = useSpriteMaker();
  return (
    <>
      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
      <SpriteMaker />
      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <SpriteMakerProvider hex="00995a3c3c3c2424">
          <AppWrapper />
        </SpriteMakerProvider>
      </header>
    </div>
  );
}

export default App;
