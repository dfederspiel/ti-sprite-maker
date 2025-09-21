import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

// Utility functions for color manipulation
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const adjustBrightness = (hex, factor) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const newR = Math.max(0, Math.min(255, Math.round(rgb.r * factor)));
  const newG = Math.max(0, Math.min(255, Math.round(rgb.g * factor)));
  const newB = Math.max(0, Math.min(255, Math.round(rgb.b * factor)));
  
  return rgbToHex(newR, newG, newB);
};

const getLuminance = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  // Calculate relative luminance
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;
  
  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const getAccessibleTextColor = (backgroundColor) => {
  const luminance = getLuminance(backgroundColor);
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

const colors = [
  { name: 'Transparent', code: 0, hex: 'ffffff', isTransparent: true },
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

const StyledColorTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  height: 75px;
  background-color: #${(props) => props.$hex};
  background-image: ${(props) => props.$isTransparent ? `
    linear-gradient(45deg, #ddd 25%, transparent 25%), 
    linear-gradient(-45deg, #ddd 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #ddd 75%), 
    linear-gradient(-45deg, transparent 75%, #ddd 75%)
  ` : 'none'};
  background-size: ${(props) => props.$isTransparent ? '10px 10px' : 'auto'};
  background-position: ${(props) => props.$isTransparent ? '0 0, 0 5px, 5px -5px, -5px 0px' : 'auto'};
  color: ${(props) => getAccessibleTextColor(props.$hex)};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 3px solid transparent;
  box-sizing: border-box;
  text-align: center;
  padding: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  
  /* Mobile: 4 tiles per row */
  flex: 0 0 calc(25% - 4px);
  margin: 2px;
  
  /* Tablet: 8 tiles per row */
  @media screen and (min-width: 640px) {
    flex: 0 0 calc(12.5% - 4px);
  }
  
  /* Desktop: 16 tiles per row */
  @media screen and (min-width: 1024px) {
    flex: 0 0 calc(6.25% - 4px);
  }

  &:hover {
    background-color: ${(props) => {
      if (props.$isTransparent) return '#f0f0f0';
      const luminance = getLuminance(props.$hex);
      // Lighten dark colors, darken light colors for better contrast
      return luminance < 0.5 ? adjustBrightness(props.$hex, 1.3) : adjustBrightness(props.$hex, 0.7);
    }};
    border-color: ${(props) => {
      const luminance = getLuminance(props.$hex);
      return luminance > 0.5 ? '#333333' : '#ffffff';
    }};
    box-shadow: ${(props) => {
      const luminance = getLuminance(props.$hex);
      const innerColor = luminance > 0.5 ? '#ffffff' : '#333333';
      return `inset 0 0 0 2px ${innerColor}, 0 2px 8px rgba(0, 0, 0, 0.2)`;
    }};
    transform: translateY(-1px);
  }
`;

const ColorPicker = (props) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      gap: '0px',
    }}
  >
    {colors.map((color) => (
      <StyledColorTile
        data-testid="tile"
        $hex={color.hex}
        $isTransparent={color.isTransparent}
        key={nanoid()}
        onClick={() => props.onColorChange(color.hex)}
      >
        {color.name}
      </StyledColorTile>
    ))}
  </div>
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
