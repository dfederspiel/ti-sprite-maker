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

export const getHex = (blocks) => {
  let hex = "";
  for (let x = 0; x < blocks.length; x++) {
    let sequence = blocks[x].join("");
    hex += parseInt(sequence.substring(0, 4), 2).toString(16);
    hex += parseInt(sequence.substring(4), 2).toString(16);
  }
  return hex;
};

export const defaultGrid = newGrid();