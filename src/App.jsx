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
      <div>
        <div>TI-99/4a Sprite Maker</div>
        <div>
          CALL CHAR(123, &quot;
          {spriteMaker.getHex()}
          &quot;)
        </div>
      </div>
      <SpriteMaker />
      <button
        type="button"
        onClick={() => {
          const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          spriteMaker.setHex(genRanHex(16));
        }}
      >
        click to randomize
      </button>
      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <SpriteMakerProvider hex="4299244a42249942">
          <AppWrapper />
        </SpriteMakerProvider>
      </header>
    </div>
  );
}

export default App;
