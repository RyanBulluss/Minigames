import React, { useEffect, useState } from "react";
import TetrisControls from "./TetrisControls";
import { board, createState, getRandomPiece } from "./constants";
import GameCell from "./GameCell";

const Tetris = () => {
  const [state, setState] = useState(createState);

  function spawnPiece() {
    const newPiece = getRandomPiece();
    setState((s) => {
      const newState = JSON.parse(JSON.stringify(s));
      let y = 0;
      let x = 0;
      newPiece.forEach((val, idx) => {
        if (idx !== 0 && idx % 4 === 0) {
          y++;
          x = 0;
        }
        newState[y][x] = val;
        x++;
      });
      return newState;
    });
  }

  useEffect(() => {
    spawnPiece();
  }, [])

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
          {state.map((row, yIdx) =>
            row.map((value, xIdx) => (
              <GameCell key={yIdx + xIdx} value={value} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tetris;
