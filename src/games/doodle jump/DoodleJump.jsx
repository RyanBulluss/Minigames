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

  function startGame() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    setPlayer({
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 20,
      y: newBoard.y + newBoard.height / 1.5,
      ySpeed: -newBoard.height / 50,
      xSpeed: 0,
      width: newBoard.width / 8,
      height: newBoard.height / 8,
    });
    setPlatforms(createStartingPlatforms(newBoard));
    setPlaying(true);
    setTimer(0);
    setScore(0);
  }

  function gameOver() {
    setPlaying(false);
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function createStartingPlatforms(newBoard) {
    const arr = [];
    const heightFr = newBoard.height / 12;
    for (let i = 0; i < 6; i++) {
      arr.push({
        height: newBoard.height / 30,
        width: newBoard.width / 5,
        x: newBoard.x + rng(newBoard.width - newBoard.width / 5),
        y: newBoard.y + i * 2 * heightFr + rng(heightFr),
        xSpeed: 0,
      });
    }

    return arr;
  }

  function gameLoop() {
    if (!playing) return;
    let newPlayer = { ...player };
    newPlayer.x += newPlayer.xSpeed;
    if (!direction) {
      newPlayer.xSpeed *= 0.9;
    } else if (direction === "right") {
      newPlayer.xSpeed = board.width / 100;
    } else {
      newPlayer.xSpeed = -board.width / 100;
    }

    if (player.y < board.y + board.height / 2 && player.ySpeed < 0) {
      const oldPlatforms = [...platforms];
      const newPlatforms = oldPlatforms.map((platform) => {
        if (
          platform.y + platform.height - player.ySpeed >
          board.y + board.height
        ) {
          return {
            height: board.height / 30,
            width: board.width / 5,
            x: board.x + rng(board.width - board.width / 5),
            y: board.y + rng(board.height / 20),
            xSpeed: 0,
          };
        }
        setScore(score + 10);
        return {
          ...platform,
          y: platform.y - player.ySpeed,
        };
      });
      setPlatforms(newPlatforms);
    } else {
      newPlayer.y = player.y + player.ySpeed;
      newPlayer = checkJump(newPlayer);
      if (newPlayer.y + player.height > board.y + board.height) gameOver();
    }

    newPlayer.ySpeed = newPlayer.ySpeed + board.height / 2500;

    if (newPlayer.x < board.x)
      newPlayer.x = board.x + board.width - player.width;
    if (newPlayer.x + newPlayer.width > board.x + board.width)
      newPlayer.x = board.x;
    setPlayer(newPlayer);
  }

  function checkJump(oldPlayer) {
    const newPlayer = oldPlayer;
    const playerY = oldPlayer.y + oldPlayer.height;
    platforms.forEach((platform) => {
      if (
        playerY > platform.y &&
        playerY < platform.y + platform.height / 2 &&
        oldPlayer.x < platform.x + platform.width &&
        oldPlayer.x + oldPlayer.width > platform.x
      ) {
        newPlayer.ySpeed = -board.height / 50;
      }
    });
    return newPlayer;
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", startGame);

    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      window.removeEventListener("resize", startGame);
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
        <div className="h-[90%] w-[90%]" ref={boardRef}>
          <div
            className="background"
            style={{
              position: "absolute",
              height: board.height,
              width: board.width,
              left: board.x,
              top: board.y,
              transform: `translate(${score}px 0)`,
            }}
          ></div>
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
          {playing && (
            <>
              <div
                style={{
                  position: "absolute",
                  height: player.height,
                  width: player.width,
                  left: player.x,
                  top: player.y,
                }}
                className={player.xSpeed > 0 ? "player" : "player flip-player"}
              ></div>
              {platforms.map((platform, idx) => (
                <div
                  style={{
                    position: "absolute",
                    height: platform.height,
                    width: platform.width,
                    left: platform.x,
                    top: platform.y,
                    backgroundColor: "#69b517",
                    borderRadius: "100px 30px 100px 30px",
                  }}
                ></div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
