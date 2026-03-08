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
 * Desktop (>=768px):
 * ┌───────────────────────────────────────────────────┐
 * │              TI-99/4A SPRITE MAKER                │
 * ├──────────┬─────────────────────────┬──────────────┤
 * │ EXAMPLES │    8x8 SPRITE GRID      │  ANIMATION   │
 * │          │    hex output            │  player      │
 * │ SAVED    │    palette               │  transport   │
 * │          │    randomizer            │  frame tools │
 * │ CREATE   │                          │  export      │
 * └──────────┴─────────────────────────┴──────────────┘
 *
 * Mobile (<768px): single column, stacked.
 */

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #1a1a2e;
`;

const TitleBar = styled.div`
  background: #0f0f23;
  border-bottom: 2px solid #40f0f0;
  padding: 8px 16px;
  font-family: "TI", sans-serif;
  font-size: 18px;
  color: #40f0f0;
  text-align: center;
  letter-spacing: 2px;
`;

const WorkArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 8px;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 12px;
    padding: 12px 16px;
  }
`;

const Panel = styled.div`
  background: #16213e;
  border: 1px solid #333;
  border-radius: 2px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const LeftPanel = styled(Panel)`
  @media (min-width: 768px) {
    width: 220px;
    min-width: 180px;
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
    width: auto;
  }
`;

const RightPanel = styled(Panel)`
  @media (min-width: 768px) {
    width: 300px;
    min-width: 260px;
    flex-shrink: 0;
  }
`;

const CanvasArea = styled(Panel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0f0f23;
  border-color: #444;
  padding: 12px;
`;

const HexDisplay = styled.div`
  font-family: "TI", monospace;
  font-size: 12px;
  background: #000;
  color: #40f0f0;
  padding: 4px 10px;
  border: 1px solid #40f0f0;
  margin: 6px 0;
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
    <Shell>
      <TitleBar>TI-99/4A Sprite Maker</TitleBar>

      <WorkArea>
        <LeftPanel>
          <AnimationSelector />
        </LeftPanel>

        <CenterPanel>
          <CanvasArea>
            <HexDisplay>
              {`CALL CHAR(123,"${spriteMaker.getHex()}")`}
            </HexDisplay>
            <SpriteMaker />
            <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
            <RandomizerControls onRandomize={handleRandomize} />
          </CanvasArea>
        </CenterPanel>

        <RightPanel>
          {hasAnimation ? (
            <>
              <AnimationPlayer />
              <FrameEditor />
              <TIBasicExport />
            </>
          ) : (
            <PanelPlaceholder>
              Select an animation or create a new one to get started
            </PanelPlaceholder>
          )}
        </RightPanel>
      </WorkArea>
    </Shell>
  );
}

const PanelPlaceholder = styled.div`
  color: #666;
  font-family: "TI", sans-serif;
  font-size: 11px;
  text-align: center;
  padding: 20px 8px;
`;

function App() {
  return (
    <SpriteMakerProvider hex="00995a3c3c3c2424">
      <AnimationProvider>
        <AppWrapper />
      </AnimationProvider>
    </SpriteMakerProvider>
  );
}

export default App;
