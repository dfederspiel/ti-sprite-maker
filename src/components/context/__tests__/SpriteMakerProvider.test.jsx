import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { SpriteMakerProvider, useSpriteMaker } from '../SpriteMakerProvider';

describe('the sprite maker provider', () => {
  it('renders as expected', () => {
    const { asFragment } = render(
      <SpriteMakerProvider>TEST</SpriteMakerProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('the sprite maker hook', () => {
  const wrapper = ({ children }) => (
    <SpriteMakerProvider>{children}</SpriteMakerProvider>
  );
  it('exposes the underlying context', () => {
    const { result } = renderHook(() => useSpriteMaker(), { wrapper });
    expect(result.current).toMatchSnapshot('and has a default state');
  });

  it('can mutate a simple state value', () => {
    const { result } = renderHook(() => useSpriteMaker(), { wrapper });
    act(() => {
      result.current.doThing(420);
    });
    expect(result.current).toMatchSnapshot('and reflects the mutated state');
  });
});
