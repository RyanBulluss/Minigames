import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";
import "./DoodleJump.css";

const DoodleJump = () => {
  const boardRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [direction, setDirection] = useState(null);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [player, setPlayer] = useState({});
  const [platforms, setPlatforms] = useState([]);

  function handleSizeChange() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    setPlayer({
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 20,
      y: newBoard.y + newBoard.height / 1.5,
      ySpeed: -newBoard.height / 100,
      xSpeed: 0,
      width: newBoard.width / 8,
      height: newBoard.height / 8,
    });
    setPlatforms(createStartingPlatforms(newBoard));
    startGame();
  }

  function startGame() {
    setPlaying(true);
    setTimer(0);
    setScore(0);
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function createStartingPlatforms(newBoard) {
    const arr = [];
    const heightFr = newBoard.height / 6;
    for (let i = 0; i < 6; i++) {
      arr.push({
        height: newBoard.height / 30,
        width: newBoard.width / 5,
        x: newBoard.x + rng(newBoard.width - newBoard.width / 5),
        y: newBoard.y + i * heightFr + rng(heightFr),
        xSpeed: 0,
      });
    }

    return arr;
  }

  function gameLoop() {
    const newPlayer = { ...player };
    newPlayer.x += newPlayer.xSpeed;
    if (!direction) {
      newPlayer.xSpeed *= 0.95;
    } else if (direction === "right") {
      newPlayer.xSpeed = board.width / 75;
    } else {
      newPlayer.xSpeed = -board.width / 75;
    }

    if (player.y < board.y + board.height / 2 && player.ySpeed < 0) {
      const oldPlatforms = [...platforms];
      const newPlatforms = oldPlatforms.map((platform) => {
        if (platform.y + player.ySpeed > board.y + board.height)
          return {
            height: board.height / 30,
            width: board.width / 5,
            x: board.x + rng(board.width - board.width / 5),
            y: board.y + board.height / 30,
            xSpeed: 0,
          };
        return {
          ...platform,
          y: platform.y - player.ySpeed,
        };
      });
      setPlatforms(newPlatforms);
    } else {
      newPlayer.y = player.y + player.ySpeed
    }
    
    if (newPlayer.x < board.x)
      newPlayer.x = board.x + board.width - player.width;
    if (newPlayer.x + newPlayer.width > board.x + board.width)
      newPlayer.x = board.x;
    setPlayer(newPlayer);
  }

  useEffect(() => {
    handleSizeChange();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSizeChange);

    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
      clearInterval(interval);
    };
  }, [board, playing, player, platforms]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          if (direction === "left") return;
          setDirection("left");
          break;
        case "ArrowRight":
          if (direction === "right") return;
          setDirection("right");
          break;
        default:
          return;
      }
    };

    const handleKeyUp = (e) => {
      setDirection(null);
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [board, playing, player, direction]);

  return (
    <div className="h-full w-full flex flex-col">
      <DoodleJumpControls />
      <div className="h-full flex justify-center items-center snake-background">
        <div className="bg-[#666] h-[90%] w-[90%]" ref={boardRef}>
          {!playing && (
            <div className="h-full w-full bg-gray-800 flex flex-col gap-4 justify-center items-center">
              <button
                className="bg-gray-600 p-3 rounded-xl"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}
          <div
            style={{
              position: "absolute",
              height: player.height,
              width: player.width,
              left: player.x,
              top: player.y,
            }}
            className={player.xSpeed > 0 ? "player flip-player" : "player"}
          ></div>
          {platforms.map((platform, idx) => (
            <div
              style={{
                position: "absolute",
                height: platform.height,
                width: platform.width,
                left: platform.x,
                top: platform.y,
                backgroundColor: "lightgreen",
              }}
              className="rounded-xl"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
