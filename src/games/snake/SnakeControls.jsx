import React from "react";

const SnakeControls = ({ timer, playing, setPlaying, score }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center snake-controls">
      <div className="w-2">
        <button onClick={() => setPlaying(!playing)}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
      <button>Info</button>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default SnakeControls;
