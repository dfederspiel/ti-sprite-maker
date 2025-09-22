import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TI-style pixel block component (8x8 pixels scaled up)
const PixelBlock = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'filled',
})`
  width: 4px;
  height: 4px;
  background-color: ${(props) => (props.filled ? '#000000' : 'transparent')};
  border: none;
`;

// 8x8 grid container for TI-style icons
const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 4px);
  grid-template-rows: repeat(8, 4px);
  gap: 0;
  width: 32px;
  height: 32px;
`;

// Button wrapper with TI-style border
const TIButton = styled.button`
  background-color: #cccccc;
  border: 2px solid #000000;
  padding: 4px;
  margin: 8px;
  cursor: pointer;
  font-family: "TI", sans-serif;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  
  &:hover {
    background-color: #ffffff;
  }
  
  &:active {
    background-color: #999999;
  }

  &:disabled {
    background-color: #888888;
    cursor: not-allowed;
  }
`;

// Slider container with TI-style design
const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 8px;
  font-family: "TI", sans-serif;
  font-size: 12px;
`;

const TISlider = styled.input`
  -webkit-appearance: none;
  width: 200px;
  height: 8px;
  background: #cccccc;
  border: 2px solid #000000;
  outline: none;
  margin: 8px 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #000000;
    cursor: pointer;
    border: 1px solid #000000;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #000000;
    cursor: pointer;
    border: 1px solid #000000;
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 16px 0;
  font-family: "TI", sans-serif;
`;

// TI-style randomizer icon (dice pattern)
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

// TI-style play icon (triangle)
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

// TI-style pause icon (two bars)
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

  // Handle play/pause toggle
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle manual randomize
  const handleRandomize = () => {
    onRandomize();
  };

  // Handle frame rate change
  const handleFrameRateChange = (event) => {
    setFrameRate(parseInt(event.target.value, 10));
  };

  // Auto-randomize effect
  useEffect(() => {
    if (isPlaying) {
      const interval = 1000 / frameRate; // Convert FPS to milliseconds
      intervalRef.current = setInterval(() => {
        onRandomize();
      }, interval);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, frameRate, onRandomize]);

  return (
    <ControlsContainer>
      <TIButton onClick={handleRandomize} type="button">
        <RandomizerIcon />
        <span>Random</span>
      </TIButton>

      <SliderContainer>
        <label htmlFor="frame-rate-slider">
          Frame Rate:
          {frameRate}
          {' '}
          FPS
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
