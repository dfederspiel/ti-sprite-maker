import React from 'react';
import { render, renderHook } from '@testing-library/react';
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
  it('exposes the underlying context', () => {
    const wrapper = ({ children }) => (
      <SpriteMakerProvider hex="ffff0000ffff0000">{children}</SpriteMakerProvider>
    );
    const { result } = renderHook(() => useSpriteMaker(), { wrapper });
    expect(result.current.sprite).toMatchSnapshot('and has a default sprite state');
  });

  it('can initialize with an image', () => {
    const wrapper = ({ children }) => (
      <SpriteMakerProvider hex="0123456789abcdef">{children}</SpriteMakerProvider>
    );
    const { result } = renderHook(() => useSpriteMaker(), { wrapper });
    expect(result.current.sprite).toMatchSnapshot('and has a preset sprite state');
    expect(result.current.blocks).toMatchSnapshot();
  });
});
