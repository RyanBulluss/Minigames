import React from "react";

const NumbersControls = ({ timer, score, restartGame }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-[#8f7a66]">
      <div className="w-2">
        <button onClick={restartGame}>Play</button>
      </div>
      <button>Info</button>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default NumbersControls;
