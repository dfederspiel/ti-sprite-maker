/* eslint-disable no-plusplus */
import { useState } from 'react';

const SpriteMakerContext = () => {
  const [sprite] = useState('0'.repeat(16));

  const SPRITE_WIDTH = 8;
  const SPRITE_HEIGHT = 8;

  const getDefaultRow = (width) => {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    return row;
  };

  const newGrid = () => {
    const grid = [];
    const row = getDefaultRow(SPRITE_WIDTH);
    for (let x = 0; x < SPRITE_HEIGHT; x++) {
      grid.push(row);
    }
    return grid;
  };

  const getHex = (blocks) => {
    let hex = '';
    for (let x = 0; x < blocks.length; x++) {
      const sequence = blocks[x].join('');
      hex += parseInt(sequence.substring(0, 4), 2).toString(16);
      hex += parseInt(sequence.substring(4), 2).toString(16);
    }
    return hex;
  };

  const defaultGrid = newGrid();

  return {
    sprite,
    getHex,
    defaultGrid,
  };
};

export default SpriteMakerContext;
