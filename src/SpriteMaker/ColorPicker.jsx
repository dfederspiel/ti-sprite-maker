import React from "react";

const ColorPicker = (props) => {
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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "400px",
      }}
    >
      {colors.map((color, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
            width: "20px",
            height: "20px",
            padding: "10px",
            margin: "5px",
            backgroundColor: `#${color.hex}`,
          }}
          onClick={() => props.onColorChange(color.hex)}
        >
          {/* {color.name} */}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
