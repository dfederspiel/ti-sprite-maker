import React from "react";

const Block = (props) => {

  return (
    <div
      style={{
        backgroundColor: props.state ? `#${props.color}` : "white",
        width: "30px",
        height: "30px",
        margin: "2px",
        transition: "all .5s",
      }}
      className={props.state ? "on" : "off"}
      onClick={() => {
        props.clicked()
      }}
      onMouseOver={() => {
          props.clicked()
      }}
    ></div>
  );
};

export default Block;
