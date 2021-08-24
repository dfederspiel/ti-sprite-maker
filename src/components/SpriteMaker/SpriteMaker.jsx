/* eslint-disable react/no-array-index-key */
import React from 'react';
import Block from './Block';
import MenuStrip from './MenuStrip';
import { useSpriteMaker } from '../context/SpriteMakerProvider';

const SpriteMaker = () => {
  const spriteMaker = useSpriteMaker();

  return spriteMaker.blocks && (
    <>
      <div
        style={{
          justifyContent: 'center',
        }}
      >
        <div>TI-99/4a Sprite Maker</div>
        <div>
          CALL CHAR(123, &quot;
          {spriteMaker.getHex()}
          &quot;)
        </div>
        <MenuStrip />
        <div>
          {spriteMaker.blocks
            && spriteMaker.blocks.map((row, r) => (
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
                      color={spriteMaker.color}
                      clicked={() => spriteMaker.updateGrid(r, c)}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SpriteMaker;
