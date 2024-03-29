import React from "react";

const DoodleJumpControls = ({ timer, score, startGame }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center snake-controls">
      <div className="w-2">
        <button onClick={startGame}>Play</button>
      </div>
      <button>Info</button>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default DoodleJumpControls;
