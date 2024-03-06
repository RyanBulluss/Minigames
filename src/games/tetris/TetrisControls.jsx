import React from "react";

const TetrisControls = ({ startGame, timer, score }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-500">
      <div className="w-2">
        <button onClick={startGame}>Play</button>
      </div>
      <button>Info</button>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default TetrisControls;
