import SpriteMakerModule from '../SpriteMakerModule';

describe('the sprite maker', () => {
  it('exists', () => {
    const maker = new SpriteMakerModule();
    expect(maker).toBeDefined();
  });

  it('can create a new grid', () => {
    const maker = new SpriteMakerModule();
    const grid = maker.newGrid();
    expect(grid.length).toEqual(8);
  });

  describe('given a grid array', () => {
    it('can convert the array to a hex value', () => {
      const maker = new SpriteMakerModule();
      const grid = maker.newGrid();
      expect(SpriteMakerModule.getHex(grid)).toEqual('0'.repeat(16));
    });
  });

  describe('given a hex value', () => {
    it('can initialize with an image', () => {
      const maker = new SpriteMakerModule();
      const grid = maker.newGrid('fac1234aabd47891');
      expect(SpriteMakerModule.getHex(grid)).toEqual('fac1234aabd47891');
    });

    it('the grid is correct', () => {
      const maker = new SpriteMakerModule();
      expect(maker.getGridFromHex('fac1234aabd47891')).toEqual(
        [
          [1, 1, 1, 1, 1, 0, 1, 0],
          [1, 1, 0, 0, 0, 0, 0, 1],
          [0, 0, 1, 0, 0, 0, 1, 1],
          [0, 1, 0, 0, 1, 0, 1, 0],
          [1, 0, 1, 0, 1, 0, 1, 1],
          [1, 1, 0, 1, 0, 1, 0, 0],
          [0, 1, 1, 1, 1, 0, 0, 0],
          [1, 0, 0, 1, 0, 0, 0, 1],
        ],
      );
    });
  });
});
