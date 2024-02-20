import React from "react";

const WordleControls = ({}) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-700">
      <div className="w-2">
        <button>Play</button>
      </div>
      <button>Info</button>
      <div>Score: 0</div>
      <div>Timer: 0</div>
    </div>
  );
};

export default WordleControls;
