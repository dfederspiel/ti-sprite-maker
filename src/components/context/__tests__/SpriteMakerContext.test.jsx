import { renderHook, act } from '@testing-library/react-hooks';
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

    it('can get the current hex value', () => {
      const { result } = renderHook(() => {
        const spriteMaker = new SpriteMakerModule();
        return SpriteMakerContext(spriteMaker);
      });
      expect(result.current.getHex()).toEqual('0'.repeat(16));
    });

    it('can toggle pixel state', () => {
      const { result } = renderHook(() => {
        const spriteMaker = new SpriteMakerModule();
        return SpriteMakerContext(spriteMaker);
      });
      act(() => {
        result.current.updateGrid(0, 0);
      });
      expect(result.current.getHex()).toEqual(`8${'0'.repeat(15)}`);

      act(() => {
        result.current.updateGrid(0, 0);
      });
      expect(result.current.getHex()).toEqual('0'.repeat(16));
    });

    it('will render a custom image', () => {
      const { result } = renderHook(() => SpriteMakerContext(new SpriteMakerModule(), 'f0'.repeat(8)));
      expect(result.current.sprite).toEqual('f0'.repeat(8));
      expect(result.current.defaultGrid).toEqual([
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 0],
      ]);
    });
  });
  describe('given a hex value', () => {
    it('can update the grid state', () => {
      const { result } = renderHook(() => {
        const spriteMaker = new SpriteMakerModule();
        return SpriteMakerContext(spriteMaker, 'f0'.repeat(8));
      });
      act(() => {
        result.current.setHex('0f'.repeat(8));
      });
      expect(result.current.sprite).toEqual('0f'.repeat(8));
      expect(result.current.blocks).toEqual([
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
      ]);
    });
  });
});
