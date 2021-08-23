/* eslint-disable no-plusplus */
export default class SpriteMakerModule {
  constructor() {
    this.SPRITE_WIDTH = 8;
    this.SPRITE_HEIGHT = 8;
  }

  static getDefaultRow(width) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(0);
    }
    return row;
  }

  newGrid() {
    const grid = [];
    const row = SpriteMakerModule.getDefaultRow(this.SPRITE_WIDTH);
    for (let x = 0; x < this.SPRITE_HEIGHT; x++) {
      grid.push(row);
    }
    return grid;
  }

  static getHex(blocks) {
    let hex = '';
    blocks?.forEach((row) => {
      const sequence = row.join('');
      hex += parseInt(sequence.substring(0, 4), 2).toString(16);
      hex += parseInt(sequence.substring(4), 2).toString(16);
    });
    return hex;
  }
}
