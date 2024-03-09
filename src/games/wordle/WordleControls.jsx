import React from "react";

const WordleControls = ( {timer} ) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-700">
      <div>Timer: {timer}</div>
    </div>
  );
};

export default WordleControls;
