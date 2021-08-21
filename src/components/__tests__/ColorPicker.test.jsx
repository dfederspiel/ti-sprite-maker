import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import ColorPicker from '../ColorPicker';

describe('the color picker', () => {
  it('renders as expected', () => {
    const { asFragment } = render(<ColorPicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('calls back with the color changed when a tile is clicked', async () => {
    let counter = 0;
    const { findAllByTestId } = render(<ColorPicker onColorChange={() => {
      // eslint-disable-next-line no-plusplus
      counter++;
    }}
    />);
    const tiles = await findAllByTestId('tile');
    act(() => {
      tiles.forEach((tile) => {
        fireEvent.click(tile);
      });
    });
    expect(counter).toEqual(tiles.length);
  });
});
