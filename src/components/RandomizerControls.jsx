import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PixelBlock = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'filled',
})`
  width: 4px;
  height: 4px;
  background-color: ${(props) => (props.filled ? 'var(--ti-iconColor)' : 'transparent')};
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
  background-color: var(--ti-btnBg);
  border: 1px solid var(--ti-btnBorder);
  color: var(--ti-btnText);
  padding: 4px;
  margin: 4px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;

  &:hover { background-color: var(--ti-btnHoverBg); }
  &:active { background-color: var(--ti-btnActiveBg); }
  &:disabled { background-color: var(--ti-btnDisabledBg); color: var(--ti-btnDisabledText); cursor: not-allowed; }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 8px;
  font-family: "TI", sans-serif;
  font-size: 11px;
  color: var(--ti-textMuted);
`;

const TISlider = styled.input`
  -webkit-appearance: none;
  width: 140px;
  height: 6px;
  background: var(--ti-sliderTrack);
  border: 1px solid var(--ti-sliderBorder);
  outline: none;
  margin: 4px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: var(--ti-sliderThumb);
    cursor: pointer;
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: var(--ti-sliderThumb);
    cursor: pointer;
    border: none;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 8px 0;
  font-family: "TI", sans-serif;
`;

function RandomizerIcon() {
  const dicePattern = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  return (
    <IconGrid>
      {dicePattern.map((pixel, index) => (
        <PixelBlock key={`dice-${index}`} filled={pixel === 1} />
      ))}
    </IconGrid>
  );
}

function PlayIcon() {
  const playPattern = [
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
      {playPattern.map((pixel, index) => (
        <PixelBlock key={`play-${index}`} filled={pixel === 1} />
      ))}
    </IconGrid>
  );
}

function PauseIcon() {
  const pausePattern = [
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
      {pausePattern.map((pixel, index) => (
        <PixelBlock key={`pause-${index}`} filled={pixel === 1} />
      ))}
    </IconGrid>
  );
}

function RandomizerControls({ onRandomize }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frameRate, setFrameRate] = useState(5);
  const intervalRef = useRef(null);

  const togglePlayPause = () => { setIsPlaying(!isPlaying); };
  const handleRandomize = () => { onRandomize(); };
  const handleFrameRateChange = (event) => {
    setFrameRate(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = 1000 / frameRate;
      intervalRef.current = setInterval(() => { onRandomize(); }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, frameRate, onRandomize]);

  return (
    <ControlsContainer>
      <TIButton onClick={handleRandomize} type="button">
        <RandomizerIcon />
        <span>Random</span>
      </TIButton>
      <SliderContainer>
        <label htmlFor="frame-rate-slider">
          {`Frame Rate: ${frameRate} FPS`}
        </label>
        <TISlider
          id="frame-rate-slider"
          type="range"
          min="1"
          max="30"
          value={frameRate}
          onChange={handleFrameRateChange}
        />
      </SliderContainer>
      <TIButton onClick={togglePlayPause} type="button">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        <span>{isPlaying ? 'Pause' : 'Play'}</span>
      </TIButton>
    </ControlsContainer>
  );
}

RandomizerControls.propTypes = {
  onRandomize: PropTypes.func.isRequired,
};

export default RandomizerControls;
