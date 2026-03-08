import React from 'react';
import Block from './Block';
import { useSpriteMaker } from '../context/SpriteMakerProvider';

function SpriteMaker() {
  const spriteMaker = useSpriteMaker();
  return spriteMaker.blocks && (
    <div
      style={{
        justifyContent: 'center',
      }}
    >
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
  );
}

export default SpriteMaker;
