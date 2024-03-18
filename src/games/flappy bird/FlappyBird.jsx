import React, { useRef, useState, useEffect } from "react";
import FlappyBirdControls from "./FlappyBirdControls";

const FlappyBird = () => {
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [bird, setBird] = useState({});
  const [pipes, setPipes] = useState([]);

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
    setPipes([]);
    console.log(newBoard);
    setBoard(newBoard);
  }

  function createPipes() {
    if (pipes.length > 1) return [...pipes];
    const gap = board.height / 3;
    const pipeHeight =
      Math.floor(Math.random() * (board.height - gap * 2)) + gap / 3;

    const topPipe = {
      x: board.x + board.width - board.width / 10,
      y: board.y,
      height: pipeHeight,
      width: board.width / 10,
      color: "green",
    };
    const bottomPipe = {
      x: board.x + board.width - board.width / 10,
      y: board.y + topPipe.height + gap,
      height: board.height - topPipe.height - gap,
      width: board.width / 10,
      color: "green",
    };

    setPipes([...pipes, topPipe, bottomPipe]);
    return [...pipes, topPipe, bottomPipe];
  }

  function movePipes(oldPipes) {
    let newPipes = oldPipes.map((pipe) => {
      return { ...pipe, x: pipe.x - board.width / 100 };
    });
    newPipes = newPipes.filter((pipe) => pipe.x > board.x);
    return newPipes;
  }

  function gameLoop() {
    if (!playing) return;
    let newPipes = createPipes();
    const newBird = moveBird();
    newPipes = movePipes(newPipes);

    if (checkLoss(newBird, newPipes)) {
      setPlaying(false);
    } else {
      setPipes(newPipes);
      setBird(newBird); 
    }
  }

  function moveBird() {
    const newBird = { ...bird };
    newBird.y += bird.ySpeed;
    newBird.ySpeed += board.height / 1000;
    return newBird;
  }

  function checkLoss(newBird, newPipes) {
    let loss = false;
    if ( newBird.y < board.y ) {
      loss = true;
      setBird({...bird, y: board.y})
    }
    if ( newBird.y + newBird.height > board.y + board.height ) {
      loss = true;
      setBird({...bird, y: board.y + board.height - bird.height})
    }

    newPipes.forEach((pipe) => {
      if (
        pipe.x < bird.x + bird.width &&
        pipe.x + pipe.width > bird.x &&
        pipe.y < bird.y + bird.height &&
        pipe.y + pipe.height > bird.y
      ) {
        loss = true;
      }
    });
    return loss;
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
          if (!playing) startGame();
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

  function startGame() {
    resizeBoard();
    setPlaying(true);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <FlappyBirdControls timer={timer} score={score} startGame={startGame} />
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
            className=""
          ></div>
          {pipes.map((pipe, idx) => (
            <div
              style={{
                position: "absolute",
                top: pipe.y,
                left: pipe.x,
                height: pipe.height,
                width: pipe.width,
                background: pipe.color,
              }}
              className=""
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;
