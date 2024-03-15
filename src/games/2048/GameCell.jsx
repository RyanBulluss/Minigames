import React from "react";

const GameCell = ({ value }) => {
  return (
    <div
      style={{
        color: value === 2 || value === 4 ? "black" : "",
        background:
          value === 2
            ? "#eee4da"
            : value === 4
            ? "#eee1c9"
            : value === 8
            ? "#f3b27a"
            : value === 16
            ? "#f69664"
            : value === 32
            ? "#f77c5f"
            : value === 64
            ? "#f75f3b"
            : value === 128
            ? "#edd073"
            : value === 256
            ? "#edcc62"
            : value === 512
            ? "#edc950"
            : value === 1024
            ? "#edc53f"
            : "#cdc1b4",
      }}
      className="flex justify-center items-center text-white font-bold text-2xl"
    >
      {!!value && value}
    </div>
  );
};

export default GameCell;
