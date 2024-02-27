import React from "react";

const JugglerControls = ({ score, timer, lives, handleRestart }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-blue-700">
      <div className="w-2">
        <button onClick={handleRestart}>Play</button>
      </div>
      <button>Lives: {lives}</button>
      <div>Score: {score} </div>
      <div>Timer: {timer} </div>
    </div>
  );
};

export default JugglerControls;
