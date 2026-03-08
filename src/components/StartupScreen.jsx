import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

/* TMS9918A palette — the color bars on the real TI-99 boot screen */
const TI_COLORS = [
  '#000000', /* black       */
  '#21c842', /* med green   */
  '#5edc78', /* lt green    */
  '#5455ed', /* dk blue     */
  '#7d76fc', /* lt blue     */
  '#d4524d', /* dk red      */
  '#42ebf5', /* cyan        */
  '#fc5554', /* med red     */
  '#ff7978', /* lt red      */
  '#d4c154', /* dk yellow   */
  '#e6ce80', /* lt yellow   */
  '#21b03b', /* dk green    */
  '#c95bba', /* magenta     */
  '#cccccc', /* gray        */
  '#ffffff', /* white       */
];

/* "DaF" pixel logo — 16 rows x 16 cols, meant to echo the TI map-of-Texas icon */
const DAF_LOGO = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,1,1,1,0,0,0,0,0,0,1,1,1,1,0,0,
  0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,
  0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,
  0,1,0,0,1,0,1,1,0,0,1,1,1,0,0,0,
  0,1,0,0,1,1,0,0,1,0,1,0,0,0,0,0,
  0,1,0,0,1,1,0,0,1,0,1,0,0,0,0,0,
  0,1,0,0,1,1,1,1,1,0,1,0,0,0,0,0,
  0,1,0,0,1,1,0,0,1,0,1,0,0,0,0,0,
  0,1,1,1,0,1,0,0,1,0,1,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Screen = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #40f0f0;
  font-family: "TI", monospace;
  cursor: pointer;
  user-select: none;
`;

const ColorBar = styled.div`
  display: flex;
  height: 24px;
  width: 100%;
  flex-shrink: 0;
`;

const ColorStripe = styled.div`
  flex: 1;
  background: ${(props) => props.color};
`;

const ScreenBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LogoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(16, 3px);
  grid-template-rows: repeat(16, 3px);
  gap: 0;
  margin-bottom: 16px;
`;

const LogoPixel = styled.div`
  width: 3px;
  height: 3px;
  background: ${(props) => (props.on ? '#000000' : 'transparent')};
`;

const Title = styled.div`
  font-size: 1.143rem;
  letter-spacing: 2px;
  line-height: 1.5;
  color: #000000;
  text-align: center;
  margin-bottom: 28px;

  @media (min-width: 640px) {
    font-size: 1.43rem;
  }
`;

const ReadyText = styled.div`
  font-size: 1rem;
  letter-spacing: 2px;
  color: #000000;
  text-align: center;
  animation: ${blink} 1.2s step-end infinite;

  @media (min-width: 640px) {
    font-size: 1.143rem;
  }
`;

const Copyright = styled.div`
  font-size: 0.929rem;
  letter-spacing: 2px;
  color: #000000;
  text-align: center;
  margin-top: 28px;

  @media (min-width: 640px) {
    font-size: 1.071rem;
  }
`;

/* Selection screen styles */
const SelectionBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 40px 20px;

  @media (min-width: 640px) {
    padding: 60px 40px;
  }
`;

const SelectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
`;

const SelectionTitle = styled.div`
  font-size: 1rem;
  letter-spacing: 2px;
  color: #000000;
  line-height: 1.5;

  @media (min-width: 640px) {
    font-size: 1.143rem;
  }
`;

const MenuSection = styled.div`
  margin-left: 24px;
  margin-top: 4px;
`;

const PressLabel = styled.div`
  font-size: 1rem;
  letter-spacing: 2px;
  color: #000000;
  margin-bottom: 8px;

  @media (min-width: 640px) {
    font-size: 1.143rem;
  }
`;

const MenuItem = styled.div`
  font-size: 1rem;
  letter-spacing: 2px;
  padding: 4px 8px;
  cursor: pointer;
  color: #000000;
  margin-left: 16px;

  &:hover {
    background: #000000;
    color: #40f0f0;
  }

  @media (min-width: 640px) {
    font-size: 1.143rem;
    padding: 5px 8px;
  }
`;

const apps = [
  { key: 'sprite-editor', label: 'SPRITE EDITOR', number: 1 },
  { key: 'animation-studio', label: 'ANIMATION STUDIO', number: 2 },
];

function PaletteBar() {
  return (
    <ColorBar>
      {TI_COLORS.map((color, i) => (
        <ColorStripe key={i} color={color} />
      ))}
    </ColorBar>
  );
}

function DafLogo() {
  return (
    <LogoGrid>
      {DAF_LOGO.map((px, i) => (
        <LogoPixel key={i} on={px === 1} />
      ))}
    </LogoGrid>
  );
}

function StartupScreen({ onSelectApp }) {
  const [phase, setPhase] = useState('boot');

  const handleKeyOrClick = useCallback(() => {
    if (phase === 'boot') {
      setPhase('menu');
    }
  }, [phase]);

  useEffect(() => {
    const handleKey = (e) => {
      if (phase === 'boot') {
        setPhase('menu');
      } else if (phase === 'menu') {
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= apps.length) {
          onSelectApp(apps[num - 1].key);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, onSelectApp]);

  if (phase === 'boot') {
    return (
      <Screen onClick={handleKeyOrClick}>
        <PaletteBar />
        <ScreenBody>
          <DafLogo />
          <Title>
            TEXAS INSTRUMENTS
            <br />
            HOME COMPUTER
          </Title>
          <ReadyText>
            READY-PRESS ANY KEY TO BEGIN
          </ReadyText>
          <Copyright>
            DaF SPRITE MAKER
          </Copyright>
        </ScreenBody>
        <PaletteBar />
      </Screen>
    );
  }

  return (
    <Screen>
      <SelectionBody>
        <SelectionHeader>
          <DafLogo />
          <SelectionTitle>
            TEXAS INSTRUMENTS
            <br />
            HOME COMPUTER
          </SelectionTitle>
        </SelectionHeader>
        <MenuSection>
          <PressLabel>PRESS</PressLabel>
          {apps.map((app) => (
            <MenuItem
              key={app.key}
              onClick={() => onSelectApp(app.key)}
            >
              {app.number} FOR {app.label}
            </MenuItem>
          ))}
        </MenuSection>
      </SelectionBody>
    </Screen>
  );
}

export default StartupScreen;
