import React from 'react';
import SpriteMaker from './components/SpriteMaker';
import './App.css';
import ColorPicker from './components/ColorPicker';
import RandomizerControls from './components/RandomizerControls';
import { SpriteMakerProvider, useSpriteMaker } from './components/context/SpriteMakerProvider';

function AppWrapper() {
  const spriteMaker = useSpriteMaker();

  const handleRandomize = () => {
    const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    spriteMaker.setHex(genRanHex(16));
  };

  return (
    <>
      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
      <div>
        <div>TI-99/4a Sprite Maker</div>
        <div>
          CALL CHAR(123, &quot;
          {spriteMaker.getHex()}
          &quot;)
        </div>
      </div>
      <SpriteMaker />
      <RandomizerControls onRandomize={handleRandomize} />
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
