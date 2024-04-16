import React from "react";

const WordleControls = ( {timer, handleStartGame, playing} ) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-700">
      <button onClick={handleStartGame}>
        {playing ? "Restart" : "Start Game"}
      </button>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default WordleControls;
