import React from 'react';
import {
  render, fireEvent, act,
} from '@testing-library/react';
import SpriteMaker from '../SpriteMaker';
import { SpriteMakerProvider } from '../../context/SpriteMakerProvider';

const withContext = (children) => render(<SpriteMakerProvider>{children}</SpriteMakerProvider>);

describe('the sprite maker', () => {
  it('renders as expected', () => {
    const { asFragment } = withContext(<SpriteMaker />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('given a hex value', () => {
    it('defaults to an image', () => {
      const { asFragment } = withContext(<SpriteMaker hex="ffffffffffffffff" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('updates the grid when a block is clicked', async () => {
    const { findAllByTestId, asFragment } = withContext(<SpriteMaker />);
    const blocks = await findAllByTestId('block');
    expect(blocks.length).toEqual(64);

    act(() => {
      blocks.forEach((b) => fireEvent.click(b));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
