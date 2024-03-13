import React, { useEffect, useState } from "react";
import NumbersControls from "./NumbersControls";
import GameCell from "./GameCell";
import { board, createState } from "./constants";

const Numbers = ({ currentGame, user, setUpdateLb }) => {
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [state, setState] = useState(createState);

  function makeMove(direction) {
    console.log(direction)
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          makeMove("UP");
          break;
        case "ArrowDown":
          makeMove("DOWN");
          break;
        case "ArrowRight":
          makeMove("RIGHT");
          break;
        case "ArrowLeft":
          makeMove("LEFT");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <NumbersControls timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[80vmin] grid p-[10vmin]"
        >
          {state.map((arr) => arr.map(value =>
            <GameCell value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
