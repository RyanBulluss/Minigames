import React from "react";

const WordleControls = ( {timer} ) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-700">
      <div className="w-2">
        <button>Play</button>
      </div>
      <button>Info</button>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default WordleControls;
