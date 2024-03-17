import React, { useRef, useState, useEffect } from "react";
import FlappyBirdControls from "./FlappyBirdControls";

const FlappyBird = () => {
  const [playing, setPlaying] = useState(true);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [bird, setBird] = useState({});

  const canvas = useRef();

  function resizeBoard() {
    const newBoard = canvas.current.getBoundingClientRect();
    setBird({
      x: newBoard.x + newBoard.width / 5,
      y: newBoard.y + newBoard.height / 2,
      ySpeed: 0,
      height: newBoard.height / 20,
      width: newBoard.width / 20,
      color: "orange",
    });
    console.log(newBoard);
    setBoard(newBoard);
  }

  function gameLoop() {
    if (!playing) return;
    const newBird = { ...bird };
    newBird.y += bird.ySpeed;
    newBird.ySpeed += board.height / 1000;
    if (checkLoss(newBird)) setPlaying(false);
    setBird(newBird);
  }

  function checkLoss(newBird) {
    if (
      newBird.y < board.y ||
      newBird.y + newBird.height > board.y + board.height
    )
      return true;
    return false;
  }

  function flap() {
    setBird((b) => {
      const newBird = { ...b };
      newBird.ySpeed = -board.height / 50;
      return newBird;
    });
    console.log(board);
  }

  useEffect(() => {
    resizeBoard();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeBoard);

    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      window.removeEventListener("resize", resizeBoard);
      clearInterval(interval);
    };
  }, [board, playing, bird]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case " ":
          flap();
          break;
        default:
          return;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board, playing, bird]);

  return (
    <div className="h-full w-full flex flex-col">
      <FlappyBirdControls timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div ref={canvas} className="h-[90%] w-[90%] bg-sky-500">
          <div
            style={{
              position: "absolute",
              top: bird.y,
              left: bird.x,
              height: bird.height,
              width: bird.width,
              background: bird.color,
            }}
            className="rounded-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;
