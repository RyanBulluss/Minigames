import React, { useRef, useState, useEffect } from "react";
import FlappyBirdControls from "./FlappyBirdControls";

const FlappyBird = () => {
  const [playing, setPlaying] = useState(0);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [bird, setBird] = useState({});

  const canvas = useRef();

  function resizeBoard() {
    const newBoard = canvas.current.getBoundingClientRect();
    setBird({
        x: newBoard.x,
        y: newBoard.y + newBoard.height / 2,
        ySpeed: 0,
        height: newBoard.height / 20,
        width: newBoard.width / 20,
        color: "orange",
    })

    setBoard(newBoard);
  }

  function gameLoop() {
    setBird(b => {
        const newBird = {...bird};
        newBird.y += bird.ySpeed;
        newBird.ySpeed -= board.height / 100;
        return newBird;
    })
  }

  useEffect(() => {
    resizeBoard();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeBoard);

    const interval = setInterval(() => {
        gameLoop();
    }, 100)

    return () => {
      window.removeEventListener("resize", resizeBoard);
      clearInterval(interval);
    };
  }, [board, playing]);

  return (
    <div className="h-full w-full flex flex-col">
      <FlappyBirdControls timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div ref={canvas} className="h-[90%] w-[90%] bg-sky-500">
          <div style={{
            position: "absolute",
            top: bird.y,
            left: bird.x,
            height: bird.height,
            width: bird.width,
            background: bird.color,
          }} className="rounded-full">
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;
