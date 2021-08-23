import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
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
    expect(result.current.sprite).toMatchSnapshot('and has a default sprite state');
  });
});
