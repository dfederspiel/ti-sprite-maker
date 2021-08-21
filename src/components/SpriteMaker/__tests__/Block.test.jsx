import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Block from '../Block';

describe('the block', () => {
  it('defaults to off', () => {
    const { asFragment } = render(<Block />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can initialize to on', () => {
    const { asFragment } = render(<Block state />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('can initialize with a color', () => {
    const { asFragment } = render(<Block state color="369" />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('when the block is clicked', () => {
    it('fires the click handler', async () => {
      let timesClicked = 0;
      const { getByTestId } = render(<Block clicked={() => {
        // eslint-disable-next-line no-plusplus
        timesClicked++;
      }}
      />);
      const block = getByTestId('block');
      act(() => {
        fireEvent.click(block);
        expect(timesClicked).toEqual(1);
        fireEvent.click(block);
        expect(timesClicked).toEqual(2);
      });
    });
  });
});
