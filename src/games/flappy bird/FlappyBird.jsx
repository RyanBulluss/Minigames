import React, { useRef, useState, useEffect } from "react";
import FlappyBirdControls from "./FlappyBirdControls";
import "./FlappyBird.css";
import flapAudio from "./assets/flap.MP3";
import hitAudio from "./assets/hit.MP3";
import pointAudio from "./assets/point.MP3";

const flapSound = new Audio(flapAudio);
const hitSound = new Audio(hitAudio);
const pointSound = new Audio(pointAudio);

flapSound.volume = 0.1;
hitSound.volume = 0.1;
pointSound.volume = 0.1;

const FlappyBird = () => {
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [bird, setBird] = useState({});
  const [pipes, setPipes] = useState([]);
  const [firstGame, setFirstGame] = useState(true);

  const canvas = useRef();

  function resizeBoard() {
    const newBoard = canvas.current.getBoundingClientRect();
    setBird({
      x: newBoard.x + newBoard.width / 5,
      y: newBoard.y + newBoard.height / 2,
      ySpeed: 0,
      height: newBoard.height / 12,
      width: newBoard.width / 10,
      color: "orange",
    });
    setPipes([]);
    setBoard(newBoard);
  }

  function createPipes() {
    if (pipes.length > 1) return [...pipes];
    const gap = board.height / 3;
    const pipeHeight =
      Math.floor(Math.random() * (board.height - gap * 2)) + gap / 3;

    const topPipe = {
      x: board.x + board.width - board.width / 8,
      y: board.y,
      height: pipeHeight,
      width: board.width / 8,
      color: "green",
    };
    const bottomPipe = {
      x: board.x + board.width - board.width / 8,
      y: board.y + topPipe.height + gap,
      height: board.height - topPipe.height - gap,
      width: board.width / 8,
      color: "green",
    };

    setPipes([...pipes, topPipe, bottomPipe]);
    return [...pipes, topPipe, bottomPipe];
  }

  function movePipes(oldPipes) {
    let newPipes = oldPipes.map((pipe) => {
      return { ...pipe, x: pipe.x - board.width / 150 };
    });
    newPipes = newPipes.filter((pipe) => pipe.x > board.x);
    if (oldPipes.length !== newPipes.length) {
      setScore((s) => s + 1);
      pointSound.play();
    }
    return newPipes;
  }

  function gameLoop() {
    if (!playing) return;
    let newPipes = createPipes();
    const newBird = moveBird();
    newPipes = movePipes(newPipes);

    if (checkLoss(newBird, newPipes)) {
      setPlaying(false);
      setFirstGame(false);
      hitSound.play();
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
    if (newBird.y < board.y) {
      loss = true;
      setBird({ ...bird, y: board.y });
    }
    if (newBird.y + newBird.height > board.y + board.height) {
      loss = true;
      setBird({ ...bird, y: board.y + board.height - bird.height });
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
    flapSound.pause();
    flapSound.currentTime = 0;
    flapSound.play();
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
    if (!playing) return;
    const interval2 = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(interval2);
    };
  }, [playing, timer]);

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
    setScore(0);
    setTimer(0);
  }

  return (
    <div className="h-full w-full flex flex-col">
      <FlappyBirdControls timer={timer} score={score} startGame={startGame} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div ref={canvas} className="h-[90%] w-[90%]">
          <div className="fb-bg"></div>
          {!firstGame && !playing && (
            <div
              className="absolute h-full w-full bg-[#333]/50 z-30 flex flex-col justify-center items-center gap-4 text-2xl"
              style={{
                left: board.x,
                top: board.y,
                height: board.height,
                width: board.width,
              }}
            >
              <p>SCORE</p>
              <p className="font-bold">{score}</p>
              <p className="text-lg py-4">Press Space To Play Again</p>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              top: bird.y,
              left: bird.x,
              height: bird.height,
              width: bird.width,
            }}
          >
            <div
              className={
                bird.ySpeed > 20
                  ? "bird-plummet bird"
                  : bird.ySpeed > 10
                  ? "bird-down bird"
                  : "bird bird-up"
              }
            ></div>
          </div>
          {pipes.map((pipe, idx) => (
            <>
              <div
                style={{
                  position: "absolute",
                  top: pipe.y,
                  left: pipe.x,
                  height: pipe.height,
                  width: pipe.width,
                  background: "linear-gradient(to right, #35a138, #357138)",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: idx % 2 === 0 ? pipe.y + pipe.height : pipe.y,
                  left: pipe.x - pipe.width / 20,
                  height: pipe.width / 10,
                  width: pipe.width + pipe.width / 10,
                  background: "linear-gradient(to right, #35b138, #358138)",
                }}
              ></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;
