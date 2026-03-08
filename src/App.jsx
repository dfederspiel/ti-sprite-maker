import React from 'react';
import styled from 'styled-components';
import SpriteMaker from './components/SpriteMaker';
import './App.css';
import ColorPicker from './components/ColorPicker';
import RandomizerControls from './components/RandomizerControls';
import AnimationPlayer from './components/AnimationPlayer';
import AnimationSelector from './components/AnimationSelector';
import FrameEditor from './components/FrameEditor';
import TIBasicExport from './components/TIBasicExport';
import { SpriteMakerProvider, useSpriteMaker } from './components/context/SpriteMakerProvider';
import { AnimationProvider, useAnimation } from './components/context/AnimationProvider';

/*
 * Desktop layout (>=768px):
 *   ┌──────────────────────────────────────────┐
 *   │            Color Picker (full)           │
 *   ├────────────┬────────────┬────────────────┤
 *   │  Anim      │  Editor    │  Player /      │
 *   │  Selector  │  Grid +    │  Frame Editor  │
 *   │            │  Hex +     │  + Export       │
 *   │            │  Randomizer│                │
 *   ├────────────┴────────────┴────────────────┤
 *   │            Color Picker (full)           │
 *   └──────────────────────────────────────────┘
 *
 * Mobile (<768px): single column, stacked.
 */

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const WorkArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 8px;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 16px;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: 240px;
    min-width: 200px;
    flex-shrink: 0;
  }
`;

const CenterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    flex: 0 0 auto;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: 300px;
    min-width: 260px;
    flex-shrink: 0;
  }
`;

const Title = styled.div`
  font-family: "TI", sans-serif;
  font-size: calc(10px + 2vmin);
  margin: 4px 0;
`;

const HexDisplay = styled.div`
  font-family: "TI", monospace;
  font-size: 12px;
  background: #000;
  color: #40f0f0;
  padding: 4px 8px;
  border: 2px solid #000;
  margin: 4px 0;
  word-break: break-all;
  text-align: center;
`;

function AppWrapper() {
  const spriteMaker = useSpriteMaker();
  const anim = useAnimation();

  const handleRandomize = () => {
    const genRanHex = (size) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    spriteMaker.setHex(genRanHex(16));
  };

  const hasAnimation = !!anim.currentAnimation;

  return (
    <AppLayout>
      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />

      <WorkArea>
        <LeftPanel>
          <AnimationSelector />
        </LeftPanel>

        <CenterPanel>
          <Title>TI-99/4a Sprite Maker</Title>
          <HexDisplay>
            {`CALL CHAR(123,"${spriteMaker.getHex()}")`}
          </HexDisplay>
          <SpriteMaker />
          <RandomizerControls onRandomize={handleRandomize} />
        </CenterPanel>

        <RightPanel>
          {hasAnimation && (
            <>
              <AnimationPlayer />
              <FrameEditor />
              <TIBasicExport />
            </>
          )}
        </RightPanel>
      </WorkArea>

      <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
    </AppLayout>
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <SpriteMakerProvider hex="00995a3c3c3c2424">
          <AnimationProvider>
            <AppWrapper />
          </AnimationProvider>
        </SpriteMakerProvider>
      </header>
    </div>
  );
}

export default App;
