import React, { useEffect, useState } from "react";
import NumbersControls from "./NumbersControls";
import GameCell from "./GameCell";
import { board, createState } from "./constants";

const Numbers = ({ currentGame, user, setUpdateLb }) => {
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [state, setState] = useState(createState);

  return (
    <div className="h-full w-full flex flex-col">
      <NumbersControls timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[80vmin] grid"
        >
          {state.map((value) => (
            <GameCell value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
