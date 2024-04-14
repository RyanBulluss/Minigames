import React from "react";

const FlappyBirdControls = ({ timer, score, startGame }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-500">
      <div className="w-2">
        <button onClick={startGame}>Play</button>
      </div>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default FlappyBirdControls;
