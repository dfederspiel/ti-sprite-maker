/* eslint-disable no-plusplus */
import { useState } from 'react';
import SpriteMakerModule from './SpriteMakerModule';

const SpriteMakerContext = (spriteMaker, hex) => {
  const defaultGrid = spriteMaker.newGrid(hex);
  const [sprite] = useState(hex || 'f'.repeat(16));
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem('ti99-matrix')) || defaultGrid,
  );
  const getHex = () => SpriteMakerModule.getHex(blocks);

  const updateGrid = (xPos, yPos) => {
    const newGridState = blocks.map((row, x) => row.map((pixel, y) => {
      if (x === xPos && y === yPos) {
        return pixel === 0 ? 1 : 0;
      }
      return pixel;
    }));
    localStorage.setItem('ti99-matrix', JSON.stringify(newGridState));
    setBlocks(newGridState);
  };

  return {
    sprite,
    blocks,
    getHex,
    updateGrid,
    defaultGrid,
  };
};

export default SpriteMakerContext;
