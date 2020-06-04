import React, { useState } from "react";
import Block from "./Block";
import ColorPicker from "./ColorPicker";

const SPRITE_WIDTH = 8;
const SPRITE_HEIGHT = 8;

const getDefaultRow = (width) => {
  let row = [];
  for (let x = 0; x < width; x++) {
    row.push(0);
  }
  return row;
};

const newGrid = () => {
  let grid = [];
  let row = getDefaultRow(SPRITE_WIDTH);
  for (let x = 0; x < SPRITE_HEIGHT; x++) {
    grid.push(row);
  }
  return grid;
};

const getHex = (blocks) => {
  let hex = "";
  for (let x = 0; x < blocks.length; x++) {
    let sequence = blocks[x].join("");
    hex += parseInt(sequence.substring(0, 4), 2).toString(16);
    hex += parseInt(sequence.substring(4), 2).toString(16);
  }
  return hex;
};

const defaultGrid = newGrid();

const SpriteMaker = () => {
  const [blocks, setBlocks] = useState(
    JSON.parse(localStorage.getItem("1")) || defaultGrid
  );
  const [color, setColor] = useState("000000");

  const updateGrid = (rowPos, cellPos) => {
    const newGridState = blocks.map((row, i) => {
      return row.map((pixel, j) => {
        if (i === rowPos && j === cellPos) {
          return pixel === 0 ? 1 : 0;
        } else {
          return pixel;
        }
      });
    });
    localStorage.setItem("1", JSON.stringify(newGridState));
    setBlocks(newGridState);
  };
  return (
    <>
      <ColorPicker onColorChange={(color) => setColor(color)} />
      <div
        style={{
          justifyContent: "center",
        }}
      >
        <div>TI-99/4a Sprite Maker</div>
        <div>CALL CHAR(123, "{getHex(blocks)}")</div>
        {blocks &&
          blocks.map((row, r) => (
            <div
              key={r}
              style={{
                display: "flex",
                justifyContent: "center"
              }}
            >
              {row &&
                row.map((cell, c) => (
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
      <ColorPicker onColorChange={(color) => setColor(color)} />
    </>
  );
};

export default SpriteMaker;
