import React from "react";

const MinesweeperControls = () => {
  return (
    <div className="w-full h-[10vmin] flex justify-around items-center bg-gray-500">
      <div className="w-2">
        <button>Play</button>
      </div>
      <button>Info</button>
      <div>Score: 00</div>
      <div>Timer: 00</div>
    </div>
  );
};

export default MinesweeperControls;
