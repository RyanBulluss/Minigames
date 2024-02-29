import React from "react";
import MinesweeperControls from "./MinesweeperControls";

const Minesweeper = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <MinesweeperControls />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(2, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[80vmin] grid"
        ></div>
      </div>
    </div>
  );
};

export default Minesweeper;
