import { renderHook } from '@testing-library/react-hooks';
import SpriteMakerContext from '../SpriteMakerContext';

describe('the sprite maker provider props', () => {
  describe('given it is initialized for the first time', () => {
    it('will initialize with a default sprite', () => {
      const { result } = renderHook(() => SpriteMakerContext());
      expect(result.current.sprite).toEqual('0'.repeat(16));
    });
  });
});
