import React from "react";

const BrickBreakerControls = ({ setPlaying }) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-blue-700">
      <div className="w-2">
        <button onClick={() => setPlaying((p) => true)}>Restart</button>
      </div>
      <button>Info</button>
      <div>Score: </div>
      <div>Timer: </div>
    </div>
  );
};

export default BrickBreakerControls;
