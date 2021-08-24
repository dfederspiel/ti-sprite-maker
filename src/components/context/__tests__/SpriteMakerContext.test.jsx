import { renderHook } from '@testing-library/react-hooks';
import SpriteMakerModule from '../SpriteMakerModule';
import SpriteMakerContext from '../SpriteMakerContext';

describe('the sprite maker context', () => {
  describe('given it is initialized for the first time', () => {
    it('will initialize with a default sprite', () => {
      const { result } = renderHook(() => {
        const spriteMaker = new SpriteMakerModule();
        return SpriteMakerContext(spriteMaker);
      });

      expect(result.current.sprite).toEqual('f'.repeat(16));
      expect(result.current.blocks).toEqual(
        [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ],
      );
    });
  });
});
