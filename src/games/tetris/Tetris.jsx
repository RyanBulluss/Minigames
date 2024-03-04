import React, { useState } from "react";
import TetrisControls from "./TetrisControls";
import { board, createState, pieces } from "./constants";
import GameCell from "./GameCell";

const Tetris = () => {
    const [state, setState] = useState(createState);

  return (
    <div className="h-full w-full flex flex-col">
      <TetrisControls />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] grid w-[35vmin]"
        >
            {state.map((row, yIdx) => row.map((value, xIdx) => (
                <GameCell key={yIdx + xIdx} value={value} />
            )))}
        </div>
      </div>
    </div>
  );
};

export default Tetris;
