import React from "react";

const Background = ({ board }) => {
  return (
    <div
      className="zBackground"
      style={{
        height: board.height,
        width: board.width,
      }}
    ></div>
  );
};

export default Background;
