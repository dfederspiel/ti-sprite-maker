import { renderHook } from '@testing-library/react-hooks';
import SpriteMakerProviderProps from '../SpriteMakerProviderProps';

describe('the sprite maker provider props', () => {
  describe('given it is initialized for the first time', () => {
    it('will initialize with a default sprite', () => {
      const { result } = renderHook(() => SpriteMakerProviderProps());
      expect(result.current.sprite).toEqual('0'.repeat(16));
    });
  });
});
