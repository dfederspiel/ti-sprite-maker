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

  static hex2bin(hex) {
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');
  }

  getDefaultGrid() {
    const grid = [];
    const row = SpriteMakerModule.getDefaultRow(this.SPRITE_WIDTH);
    for (let x = 0; x < this.SPRITE_HEIGHT; x++) {
      grid.push(row);
    }
    return grid;
  }

  getGridFromHex(hex) {
    const grid = [];
    const sections = hex.split('');

    let pixels = '';
    sections.forEach((h) => {
      pixels += SpriteMakerModule.hex2bin(h);
    });
    let currentRow = [];
    pixels.split('').forEach((p, idx) => {
      currentRow.push(parseInt(p, 2));
      if (idx !== 0 && ((idx + 1) % this.SPRITE_WIDTH === 0)) {
        grid.push(currentRow);
        currentRow = [];
      }
    });
    return grid;
  }

  newGrid(hex) {
    return hex ? this.getGridFromHex(hex) : this.getDefaultGrid();
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
