import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";

const DoodleJump = () => {
  const boardRef = useRef();
  const [playing, setPlaying] = useState(true);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});

  useEffect(() => {
    function handleSizeChange() {
      const newBoard = boardRef.current.getBoundingClientRect();
      // setBoard(newBoard);
      console.log(boardRef.current);
    }

    handleSizeChange();

    window.addEventListener("resize", handleSizeChange);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <DoodleJumpControls />
      <div className="h-full flex justify-center items-center snake-background">
        <div className="bg-[#666] h-[90%] w-[90%]" ref={boardRef}></div>
      </div>
    </div>
  );
};

export default DoodleJump;
