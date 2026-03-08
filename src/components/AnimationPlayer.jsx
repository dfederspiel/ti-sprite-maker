import React, { useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useAnimation } from './context/AnimationProvider';
import { useSpriteMaker } from './context/SpriteMakerProvider';
import { getFrameHex } from '../models/AnimationModel';
import SpriteMakerModule from './context/SpriteMakerModule';

const PixelBlock = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'filled',
})`
  width: 4px;
  height: 4px;
  background-color: ${(props) => (props.filled ? '#40f0f0' : 'transparent')};
  border: none;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 4px);
  grid-template-rows: repeat(8, 4px);
  gap: 0;
  width: 32px;
  height: 32px;
`;

const TIButton = styled.button`
  background-color: #2a2a4a;
  border: 1px solid #444;
  color: #ccc;
  padding: 4px;
  margin: 3px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;

  &:hover { background-color: #3a3a5a; color: #fff; }
  &:active { background-color: #1a1a3a; }
  &:disabled { background-color: #1a1a2e; color: #555; cursor: not-allowed; }
`;

const SmallButton = styled(TIButton)`
  min-width: 32px;
  padding: 2px 6px;
  font-size: 11px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
  font-family: "TI", sans-serif;
  font-size: 11px;
  color: #aaa;
`;

const TISlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  max-width: 200px;
  height: 6px;
  background: #333;
  border: 1px solid #555;
  outline: none;
  margin: 4px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    background: #40f0f0;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: #40f0f0;
    cursor: pointer;
    border: none;
  }
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "TI", sans-serif;
  width: 100%;
  box-sizing: border-box;
`;

const TransportBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2px;
  margin: 4px 0;
`;

const FrameIndicator = styled.div`
  font-size: 12px;
  margin: 2px 0;
  font-family: "TI", sans-serif;
  color: #aaa;
`;

const FilmStrip = styled.div`
  display: flex;
  gap: 2px;
  margin: 4px 0;
  padding: 4px;
  background: #0a0a1a;
  border: 1px solid #333;
  overflow-x: auto;
  max-width: 100%;
  box-sizing: border-box;
`;

const Thumbnail = styled.div.withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})`
  width: 32px;
  height: 32px;
  min-width: 32px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.active ? '#40f0f0' : '#333')};
  background: #000;
  display: grid;
  grid-template-columns: repeat(8, 4px);
  grid-template-rows: repeat(8, 4px);
  gap: 0;
`;

const ThumbPixel = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'on',
})`
  width: 4px;
  height: 4px;
  background: ${(props) => (props.on ? '#40f0f0' : '#000')};
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-family: "TI", sans-serif;
  color: #40f0f0;
  margin: 4px 0 2px;
  border-bottom: 1px solid #333;
  padding-bottom: 2px;
  width: 100%;
  text-align: center;
`;

// --- Icons ---
function PlayIcon() {
  const p = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 0, 0, 0,
    0, 1, 1, 1, 0, 0, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 0, 0,
  ];
  return (
    <IconGrid>
      {p.map((px, i) => <PixelBlock key={`play-${i}`} filled={px === 1} />)}
    </IconGrid>
  );
}

function PauseIcon() {
  const p = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  return (
    <IconGrid>
      {p.map((px, i) => <PixelBlock key={`pause-${i}`} filled={px === 1} />)}
    </IconGrid>
  );
}

const spriteMakerInstance = new SpriteMakerModule();

function FrameThumbnail({ hex, active, onClick }) {
  const grid = spriteMakerInstance.getGridFromHex(hex);
  return (
    <Thumbnail active={active} onClick={onClick}>
      {grid.flat().map((px, i) => (
        <ThumbPixel key={i} on={px === 1} />
      ))}
    </Thumbnail>
  );
}

function AnimationPlayer() {
  const anim = useAnimation();
  const spriteMaker = useSpriteMaker();
  const intervalRef = useRef(null);

  const {
    currentAnimation,
    currentFrameIndex,
    totalFrames,
    isPlaying,
    setIsPlaying,
    nextFrame,
    prevFrame,
    goToFrame,
  } = anim;

  const syncFrameToEditor = useCallback(() => {
    const hex = anim.getCurrentHex();
    spriteMaker.setHex(hex);
  }, [anim, spriteMaker]);

  useEffect(() => {
    if (currentAnimation) {
      syncFrameToEditor();
    }
  }, [currentAnimation, currentFrameIndex]);

  useEffect(() => {
    if (isPlaying && currentAnimation) {
      const currentFrame = currentAnimation.frames[currentFrameIndex];
      const interval = currentFrame?.duration || (1000 / currentAnimation.frameRate);
      intervalRef.current = setInterval(() => {
        nextFrame();
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentAnimation, currentFrameIndex, nextFrame]);

  if (!currentAnimation) {
    return null;
  }

  const handleFrameRateChange = (e) => {
    anim.setFrameRate(parseInt(e.target.value, 10));
  };

  return (
    <PlayerContainer>
      <SectionLabel>{currentAnimation.name}</SectionLabel>

      <FrameIndicator>
        {`Frame ${currentFrameIndex + 1} / ${totalFrames}`}
      </FrameIndicator>

      <FilmStrip>
        {currentAnimation.frames.map((frame, idx) => (
          <FrameThumbnail
            key={idx}
            hex={getFrameHex(frame)}
            active={idx === currentFrameIndex}
            onClick={() => {
              goToFrame(idx);
              if (isPlaying) setIsPlaying(false);
            }}
          />
        ))}
      </FilmStrip>

      <TransportBar>
        <SmallButton
          type="button"
          onClick={() => { goToFrame(0); if (isPlaying) setIsPlaying(false); }}
          disabled={!totalFrames}
        >
          |&lt;
        </SmallButton>
        <SmallButton type="button" onClick={prevFrame} disabled={!totalFrames}>
          &lt;
        </SmallButton>
        <TIButton type="button" onClick={() => setIsPlaying(!isPlaying)} disabled={!totalFrames}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </TIButton>
        <SmallButton type="button" onClick={nextFrame} disabled={!totalFrames}>
          &gt;
        </SmallButton>
        <SmallButton
          type="button"
          onClick={() => { goToFrame(totalFrames - 1); if (isPlaying) setIsPlaying(false); }}
          disabled={!totalFrames}
        >
          &gt;|
        </SmallButton>
      </TransportBar>

      <SliderContainer>
        <label htmlFor="anim-frame-rate">
          {`Speed: ${currentAnimation.frameRate} FPS`}
        </label>
        <TISlider
          id="anim-frame-rate"
          type="range"
          min="1"
          max="30"
          value={currentAnimation.frameRate}
          onChange={handleFrameRateChange}
        />
      </SliderContainer>
    </PlayerContainer>
  );
}

export default AnimationPlayer;
