import React from "react";

const BrickBreakerControls = ({}) => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-sky-600">
      <div className="w-2">
        <button>Restart</button>
      </div>
      <button>Info</button>
      <div>Score: </div>
      <div>Timer: </div>
    </div>
  );
};

export default BrickBreakerControls;
