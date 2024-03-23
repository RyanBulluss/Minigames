import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";

const DoodleJump = () => {
  const [playing, setPlaying] = useState(true);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);

  const boardRef = useRef(null);

  return (
    <div className="h-full w-full flex flex-col">
      <DoodleJumpControls />
      <div className="h-full flex justify-center items-center snake-background">
        <div
          className="relative bg-[#666] h-[90%] w-[90%]"
          ref={boardRef}
        >
            
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
