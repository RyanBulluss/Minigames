import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";

const DoodleJump = () => {
  const boardRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});

  function handleSizeChange() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    startGame();
  }

  function startGame() {
    setPlaying(true);
    setTimer(0);
    setScore(0);
  }

  useEffect(() => {
    handleSizeChange();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSizeChange);
    
    return () => {
      window.removeEventListener("resize", handleSizeChange);
    };
  }, [board]);

  return (
    <div className="h-full w-full flex flex-col">
      <DoodleJumpControls />
      <div className="h-full flex justify-center items-center snake-background">
        <div className="bg-[#666] h-[90%] w-[90%]" ref={boardRef}>
          {!playing && 
          <div className="h-full w-full bg-gray-800 flex flex-col gap-4 justify-center items-center">
            <button className="bg-gray-600 p-3 rounded-xl" onClick={startGame}>Start Game</button>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
