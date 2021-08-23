import React from 'react';
import {
  render, fireEvent, act,
} from '@testing-library/react';
import SpriteMaker from '../SpriteMaker';
import { SpriteMakerProvider } from '../../context/SpriteMakerProvider';

const TestHarness = () => <SpriteMakerProvider><SpriteMaker /></SpriteMakerProvider>;

describe('the sprite maker', () => {
  it('renders as expected', () => {
    const { asFragment } = render(<TestHarness />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('changes tile colors when a tile is clicked', async () => {
    const { findAllByTestId, asFragment } = render(<TestHarness />);
    const tiles = await findAllByTestId('tile');
    expect(asFragment()).toMatchSnapshot();
    act(() => {
      fireEvent.click(tiles[3]);
      fireEvent.click(tiles[18]);
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('updates the grid when a block is clicked', async () => {
    const { findAllByTestId, asFragment } = render(<TestHarness />);
    const blocks = await findAllByTestId('block');
    expect(blocks.length).toEqual(64);

    act(() => {
      blocks.forEach((b) => fireEvent.click(b));
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
