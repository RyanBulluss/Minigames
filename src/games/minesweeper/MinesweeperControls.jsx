import React from "react";

const MinesweeperControls = ({ restartGame, timer, score }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-500">
      <div className="w-2">
        <button onClick={restartGame}>Restart</button>
      </div>
      <button>Info</button>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default MinesweeperControls;
