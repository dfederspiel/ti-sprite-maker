import React from "react";
import styled from "styled-components";

const colors = [
  { name: "Black", code: 1, hex: "000000" },
  { name: "Green", code: 2, hex: "21c842" },
  { name: "Light Green", code: 3, hex: "5edc78" },
  { name: "Blue", code: 4, hex: "5455ed" },
  { name: "Light Blue", code: 5, hex: "7d76fc" },
  { name: "Dark Red", code: 6, hex: "d4524d" },
  { name: "Cyan", code: 7, hex: "42ebf5" },
  { name: "Red", code: 8, hex: "fc5554" },
  { name: "Light Red", code: 9, hex: "ff7978" },
  { name: "Dark Yellow", code: 10, hex: "d4c154" },
  { name: "Light Yellow", code: 11, hex: "e6ce80" },
  { name: "Dark Green", code: 12, hex: "21b03b" },
  { name: "Magenta", code: 13, hex: "c95bba" },
  { name: "Gray", code: 14, hex: "cccccc" },
  { name: "White", code: 15, hex: "ffffff" },
];

const StyledColorTile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  height: 75px;
  background-color: #${(props) => props.hex};
  flex: 1 1 20%;

  @media screen and (min-width: 640px) {
    flex: 0 0 ${100 / colors.length}%;
  }
`;

const ColorPicker = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {colors.map((color, i) => (
        <StyledColorTile
          hex={color.hex}
          key={i}
          onClick={() => props.onColorChange(color.hex)}
        >{color.name}</StyledColorTile>
      ))}
    </div>
  );
};

export default ColorPicker;
