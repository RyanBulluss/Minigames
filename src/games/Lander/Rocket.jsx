import React from "react";
import "./lander.css";

const Rocket = ({ rocket, board }) => {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        rotate: `${rocket.angle}deg`,
        position: "relative",
        width: board.width / rocket.width,
        height: board.height / rocket.height,
        left: rocket.x,
        top: rocket.y,
      }}
    >
      <div className="flex flex-col items-center h-full w-full">
        {/* Rocket Nose */}
        <div
          className="h-2/6 w-2/5 bg-gray-800"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>

        {/* Rocket Body */}
        <div className="h-full w-2/5 bg-gray-900"></div>

        {/* Rocket Flames */}
      </div>
      <div
        className="flex h-1/6 w-2/5 relative"
      >
        <div
          className="h-full w-1/3 bg-red-500"
          style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}
        ></div>
        <div
          className="h-full w-1/3 bg-red-500"
          style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}
        ></div>
        <div
          className="h-full w-1/3 bg-red-500"
          style={{ clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)" }}
        ></div>
      </div>
    </div>
  );
};

export default Rocket;
