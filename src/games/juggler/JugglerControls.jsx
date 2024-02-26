import React from "react";

const JugglerControls = ({ score, timer  }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-blue-700">
      <div className="w-2">
        <button>Play</button>
      </div>
      <button>Info</button>
      <div>Score: {score} </div>
      <div>Timer: {timer} </div>
    </div>
  );
};

export default JugglerControls;
