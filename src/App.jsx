import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import SpriteMaker from './components/SpriteMaker';
import './App.css';
import ColorPicker from './components/ColorPicker';
import AnimationPlayer from './components/AnimationPlayer';
import AnimationSelector from './components/AnimationSelector';
import FrameEditor from './components/FrameEditor';
import TIBasicExport from './components/TIBasicExport';
import StartupScreen from './components/StartupScreen';
import { SpriteMakerProvider, useSpriteMaker } from './components/context/SpriteMakerProvider';
import { AnimationProvider, useAnimation } from './components/context/AnimationProvider';
import { ThemeProvider, useTheme } from './components/context/ThemeContext';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--ti-shellBg);
`;

const TitleBar = styled.div`
  background: var(--ti-titleBarBg);
  border-bottom: 2px solid var(--ti-titleBarBorder);
  padding: 8px 16px;
  font-family: "TI", sans-serif;
  font-size: 1.3rem;
  color: var(--ti-titleBarText);
  text-align: center;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
`;

const ThemeToggle = styled.button`
  background: var(--ti-btnBg);
  border: 1px solid var(--ti-btnBorder);
  color: var(--ti-btnText);
  padding: 4px 10px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0;

  &:hover { background: var(--ti-btnHoverBg); }
`;

const BackButton = styled(ThemeToggle)`
  position: absolute;
  left: 16px;
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
  background: var(--ti-panelBg);
  border: 1px solid var(--ti-panelBorder);
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
  background: var(--ti-canvasBg);
  border-color: var(--ti-canvasBorder);
  padding: 12px;
`;

const HexDisplay = styled.div`
  font-family: "TI", monospace;
  font-size: 0.857rem;
  background: var(--ti-hexBg);
  color: var(--ti-hexText);
  padding: 4px 10px;
  border: 1px solid var(--ti-hexBorder);
  margin: 6px 0;
  word-break: break-all;
  text-align: center;
`;

const PanelPlaceholder = styled.div`
  color: var(--ti-placeholderText);
  font-family: "TI", sans-serif;
  font-size: 0.8rem;
  text-align: center;
  padding: 20px 8px;
`;

function AppToolbar({ title, onBack }) {
  const { themeName, toggleTheme } = useTheme();

  return (
    <TitleBar>
      {onBack && (
        <BackButton type="button" onClick={onBack}>
          QUIT
        </BackButton>
      )}
      <span>{title}</span>
      <ThemeToggle type="button" onClick={toggleTheme}>
        {themeName === 'classic' ? 'Dark' : 'Classic'}
      </ThemeToggle>
    </TitleBar>
  );
}

function SpriteEditorView({ onBack }) {
  const spriteMaker = useSpriteMaker();

  return (
    <Shell>
      <AppToolbar title="SPRITE EDITOR" onBack={onBack} />
      <WorkArea>
        <CenterPanel>
          <CanvasArea>
            <HexDisplay>
              {`CALL CHAR(123,"${spriteMaker.getHex()}")`}
            </HexDisplay>
            <SpriteMaker />
            <ColorPicker onColorChange={(newColor) => spriteMaker.setColor(newColor)} />
          </CanvasArea>
        </CenterPanel>
      </WorkArea>
    </Shell>
  );
}

function AnimationStudioView({ onBack }) {
  const anim = useAnimation();
  const hasAnimation = !!anim.currentAnimation;
  const spriteMaker = useSpriteMaker();

  return (
    <Shell>
      <AppToolbar title="ANIMATION STUDIO" onBack={onBack} />
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

function AppContent() {
  const [screen, setScreen] = useState('startup');

  const handleSelectApp = useCallback((appKey) => {
    setScreen(appKey);
  }, []);

  const handleBack = useCallback(() => {
    setScreen('startup');
  }, []);

  if (screen === 'startup') {
    return <StartupScreen onSelectApp={handleSelectApp} />;
  }

  if (screen === 'sprite-editor') {
    return <SpriteEditorView onBack={handleBack} />;
  }

  if (screen === 'animation-studio') {
    return <AnimationStudioView onBack={handleBack} />;
  }

  return null;
}

function App() {
  return (
    <ThemeProvider defaultTheme="classic">
      <SpriteMakerProvider hex="00995a3c3c3c2424">
        <AnimationProvider>
          <AppContent />
        </AnimationProvider>
      </SpriteMakerProvider>
    </ThemeProvider>
  );
}

export default App;
