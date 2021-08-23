/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import Block from './Block';
import ColorPicker from '../ColorPicker';
import MenuStrip from './MenuStrip';
import { useSpriteMaker } from '../context/SpriteMakerProvider';

const SpriteMaker = () => {
  const spriteMaker = useSpriteMaker();
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem('ti99-matrix')) || spriteMaker.defaultGrid,
  );
  const [color, setColor] = useState('000000');

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

  return (
    <>
      <ColorPicker onColorChange={(newColor) => setColor(newColor)} />
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <div>TI-99/4a Sprite Maker</div>
        <div>
          CALL CHAR(123, &quot;
          {spriteMaker.getHex(blocks)}
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
                      state={cell !== 0}
                      color={color}
                      clicked={() => updateGrid(r, c)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
      <ColorPicker onColorChange={(newColor) => setColor(newColor)} />
    </>
  );
};

export default SpriteMaker;
