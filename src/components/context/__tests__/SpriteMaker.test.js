import SpriteMaker from '../SpriteMaker';

describe('the sprite maker', () => {
  it('exists', () => {
    const maker = new SpriteMaker();
    expect(maker).toBeDefined();
  });

  it('can create a new grid', () => {
    const maker = new SpriteMaker();
    const grid = maker.newGrid();
    expect(grid.length).toEqual(8);
  });

  describe('given a grid array', () => {
    it('can convert the array to a hex value', () => {
      const maker = new SpriteMaker();
      const grid = maker.newGrid();
      expect(SpriteMaker.getHex(grid)).toEqual('0'.repeat(16));
    });
  });
});
