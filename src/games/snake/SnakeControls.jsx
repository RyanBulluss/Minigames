import React from "react";

const SnakeControls = ({
  timer,
  playing,
  setPlaying,
  score,
  restartGame,
  alive,
}) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center snake-controls">
      <div className="w-2">
        {alive && (
          <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
          </button>
        )}
        {!alive && <button onClick={() => restartGame()}>Restart</button>}
      </div>
      <div>Score: {score}</div>
      <div>Timer: {timer}</div>
    </div>
  );
};

export default SnakeControls;
