import React, { useState } from 'react';
import Block from './Block';
import ColorPicker from '../ColorPicker';
import MenuStrip from './MenuStrip';
import {
  getHex,
  defaultGrid,
} from './constants';

const SpriteMaker = () => {
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem('ti99-matrix')) || defaultGrid,
  );
  const [color, setColor] = useState('000000');

  const updateGrid = (xPos, yPos) => {
    const newGridState = blocks.map((row, x) => row.map((pixel, y) => {
      if (x === xPos && y === yPos) {
        return pixel === 0 ? 1 : 0;
      }
      return pixel;
    }));
    localStorage.setItem('1', JSON.stringify(newGridState));
    setBlocks(newGridState);
  };

  return (
    <>
      <ColorPicker onColorChange={(color) => setColor(color)} />
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <div>TI-99/4a Sprite Maker</div>
        <div>
          CALL CHAR(123, &quot;
          {getHex(blocks)}
          &quot;)
        </div>
        <MenuStrip />
        <div>
          {blocks
            && blocks.map((row, r) => (
              <div
                key={r}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {row
                  && row.map((cell, c) => (
                    <Block
                      key={`${r}-${c}`}
                      state={cell}
                      color={color}
                      clicked={() => updateGrid(r, c)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
      <ColorPicker onColorChange={(color) => setColor(color)} />
    </>
  );
};

export default SpriteMaker;
