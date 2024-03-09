import React from "react";

const BrickBreakerControls = ({ handleRestart, score, timer, firstGame  }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-blue-700">
      <div className="w-2">
        <button onClick={() => handleRestart()}>
          {firstGame ? "Play" : "Restart"}
        </button>
      </div>
      <button>Info</button>
      <div>Score: {score} </div>
      <div>Timer: {timer} </div>
    </div>
  );
};

export default BrickBreakerControls;
