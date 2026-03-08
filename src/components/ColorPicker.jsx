import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const colors = [
  { name: 'Black', code: 1, hex: '000000' },
  { name: 'Green', code: 2, hex: '21c842' },
  { name: 'Light Green', code: 3, hex: '5edc78' },
  { name: 'Blue', code: 4, hex: '5455ed' },
  { name: 'Light Blue', code: 5, hex: '7d76fc' },
  { name: 'Dark Red', code: 6, hex: 'd4524d' },
  { name: 'Cyan', code: 7, hex: '42ebf5' },
  { name: 'Red', code: 8, hex: 'fc5554' },
  { name: 'Light Red', code: 9, hex: 'ff7978' },
  { name: 'Dark Yellow', code: 10, hex: 'd4c154' },
  { name: 'Light Yellow', code: 11, hex: 'e6ce80' },
  { name: 'Dark Green', code: 12, hex: '21b03b' },
  { name: 'Magenta', code: 13, hex: 'c95bba' },
  { name: 'Gray', code: 14, hex: 'cccccc' },
  { name: 'White', code: 15, hex: 'ffffff' },
];

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  padding: 6px 0;
  width: 100%;
`;

const StyledColorTile = styled.div`
  width: 28px;
  height: 28px;
  background-color: #${(props) => props.hex};
  cursor: pointer;
  border: 2px solid #333;
  box-sizing: border-box;

  &:hover {
    border-color: #fff;
    transform: scale(1.15);
  }

  @media screen and (min-width: 640px) {
    width: 24px;
    height: 24px;
  }
`;

const ColorPicker = (props) => (
  <PaletteContainer>
    {colors.map((color) => (
      <StyledColorTile
        data-testid="tile"
        hex={color.hex}
        key={nanoid()}
        onClick={() => props.onColorChange(color.hex)}
        title={color.name}
      />
    ))}
  </PaletteContainer>
);

ColorPicker.propTypes = {
  /**
   * callback that returns the hex string
   * @param callback
   * @returns string
   */
  onColorChange: PropTypes.func,
};

ColorPicker.defaultProps = {
  onColorChange: null,
};

export default ColorPicker;
