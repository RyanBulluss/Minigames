import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";
import "./DoodleJump.css";
import {
  gameOverSound,
  jetpackSound,
  popSound,
  snapSound,
  springSound,
} from "../../variables/audio";

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
    gameOverSound();
    setPlaying(false);
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function createStartingPlatforms(newBoard) {
    const arr = [];
    const heightFr = newBoard.height / 16;
    for (let i = 0; i < 8; i++) {
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

  function movePlayerX(oldPlayer) {
    const newPlayer = { ...oldPlayer };
    newPlayer.x += newPlayer.xSpeed;
    if (!direction) {
      newPlayer.xSpeed *= 0.9;
    } else if (direction === "right") {
      newPlayer.xSpeed = board.width / 100;
    } else {
      newPlayer.xSpeed = -board.width / 100;
    }
    if (newPlayer.x < board.x)
      newPlayer.x = board.x + board.width - player.width;
    if (newPlayer.x + newPlayer.width > board.x + board.width)
      newPlayer.x = board.x;
    return newPlayer;
  }

  function movePlayerAndPlatformsY(oldPlayer, oldPlatforms) {
    let [newPlayer, newPlatforms] = [{ ...oldPlayer }, [...oldPlatforms]];

    if (player.y < board.y + board.height / 2 && player.ySpeed < 0) {
      newPlatforms = newPlatforms.map((platform) => {
        if (
          platform.y + platform.height - player.ySpeed >
          board.y + board.height
        ) {
          const num = rng(100);
          const newPlatform = {
            height: board.height / 30,
            width: board.width / 5,
            x: board.x + rng(board.width - board.width / 5),
            y: board.y + board.y + board.height - platform.y,
            xSpeed: num < 20 ? board.width / 200 : 0,
            spring: num > 21 && num < 30 ? true : false,
            jetpack: num > 31 && num < 35 ? true : false,
            breakable: num > 36 && num < 45 ? true : false,
          };
          return newPlatform;
        }
        setScore(score + 1);
        return {
          ...platform,
          y: platform.y - player.ySpeed,
        };
      });
    } else {
      newPlayer.y = player.y + player.ySpeed;
      [newPlayer, newPlatforms] = checkJump(newPlayer, newPlatforms);
      if (newPlayer.y + player.height > board.y + board.height) gameOver();
    }
    newPlayer.ySpeed = newPlayer.ySpeed + board.height / 2500;
    return [newPlayer, newPlatforms];
  }

  function movePlatformsX(oldPlatforms) {
    const newPlatforms = oldPlatforms.map((platform) => {
      const newX = platform.x + platform.xSpeed;
      if (newX < board.x || newX + platform.width > board.x + board.width)
        platform.xSpeed *= -1;
      return { ...platform, x: newX };
    });
    return newPlatforms;
  }

  function gameLoop() {
    if (!playing) return;
    let newPlayer = { ...player };
    let newPlatforms = [...platforms];

    newPlayer = movePlayerX(newPlayer);
    [newPlayer, newPlatforms] = movePlayerAndPlatformsY(
      newPlayer,
      newPlatforms
    );
    newPlatforms = movePlatformsX(newPlatforms);

    setPlatforms(newPlatforms);
    setPlayer(newPlayer);
  }

  function checkJump(oldPlayer, oldPlatforms) {
    const newPlayer = oldPlayer;
    const newPlatforms = oldPlatforms;
    const playerY = oldPlayer.y + oldPlayer.height;
    const platLength = newPlatforms.length;
    for (let idx = 0; idx < platLength; idx++) {
      const platform = newPlatforms[idx];
      if (
        playerY > platform.y &&
        playerY < platform.y + platform.height / 2 &&
        oldPlayer.x < platform.x + platform.width &&
        oldPlayer.x + oldPlayer.width > platform.x
      ) {
        if (platform.spring) {
          newPlayer.ySpeed = -board.height / 25;
          idx = platLength;
          springSound();
        } else if (platform.jetpack) {
          newPlayer.ySpeed = -board.height / 15;
          idx = platLength;
          jetpackSound();
        } else if (platform.broken) {
        } else if (platform.breakable) {
          newPlatforms[idx].broken = true;
          idx = platLength;
          snapSound();
        } else {
          newPlayer.ySpeed = -board.height / 50;
          idx = platLength;
          popSound();
        }
      }
    }
    return [newPlayer, newPlatforms];
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval2 = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval2);
    };
  }, [playing, timer]);

  useEffect(() => {
    window.addEventListener("resize", startGame);

    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      window.removeEventListener("resize", startGame);
      clearInterval(interval);
    };
  }, [board, playing, player, platforms, timer]);

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
      <DoodleJumpControls startGame={startGame} score={score} timer={timer} />
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
            }}
          ></div>
          {!playing && (
            <div className="h-full w-full flex flex-col gap-8 justify-center items-center font-semibold">
              <h2 className="z-30 text-2xl text-black">Game Over</h2>
              <h3 className="z-30 text-xl text-black">Your Score: {score}</h3>
              <button
                className="bg-gray-600 p-3 rounded-full z-30"
                onClick={startGame}
              >
                Play Again
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
                  zIndex: 300,
                }}
                className={player.xSpeed > 0 ? "player" : "player flip-player"}
              ></div>
              {platforms.map((platform, idx) => (
                <>
                  <div
                    style={{
                      position: "absolute",
                      height: platform.height,
                      width: platform.width,
                      left: platform.x,
                      top: platform.y,
                      backgroundColor: platform.broken
                        ? ""
                        : platform.breakable
                        ? "brown"
                        : platform.xSpeed === 0
                        ? "#69b517"
                        : "#2e9fc7",
                      borderRadius: "100px 30px 100px 30px",
                      border: platform.broken ? "" : "solid black",
                    }}
                  ></div>
                  {platform.spring && (
                    <div
                      style={{
                        position: "absolute",
                        height: platform.height / 2,
                        width: platform.width / 6,
                        left: platform.x + platform.width / 2,
                        top: platform.y - platform.height / 2,
                        backgroundColor: "#555",
                      }}
                    ></div>
                  )}
                  {platform.jetpack && (
                    <div
                      style={{
                        position: "absolute",
                        height: platform.height * 3,
                        width: platform.width / 3,
                        left: platform.x + platform.width / 2,
                        top: platform.y - platform.height * 2,
                      }}
                      className="jetpack"
                    ></div>
                  )}
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
