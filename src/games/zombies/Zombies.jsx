import React, { useRef, useState, useEffect } from "react";
import { startingHealth } from "./constants";

const Zombies = () => {
  const [playing, setPlaying] = useState(false);
  const [board, setBoard] = useState({});
  const [player, setPlayer] = useState({});
  const boardRef = useRef(null);

  function resizeGame() {
    return boardRef.current.getBoundingClientRect();
  }

  function startGame() {
    setPlaying(true);
    const newBoard = resizeGame();
    const newPlayer = {
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 30,
      y: newBoard.y + newBoard.height / 2 - newBoard.height / 30,
      xSpeed: 0,
      ySpeed: 0,
      width: newBoard.width / 15,
      height: newBoard.height / 15,
      health: startingHealth,
    };
    setBoard(newBoard);
    setPlayer(newPlayer);
  }

  function gameLoop() {
    const newPlayer = movePlayer();
    setPlayer(newPlayer);
  }

  function movePlayer() {
    const newPlayer = { ...player };
    const newX = newPlayer.x + newPlayer.xSpeed;
    const newY = newPlayer.y + newPlayer.ySpeed;
    newPlayer.x = newPlayer.x + newPlayer.xSpeed;
    newPlayer.y = newPlayer.y + newPlayer.ySpeed;

    if (newX + newPlayer.width > board.x + board.width) {
      newPlayer.x = board.x + board.width - player.width;
      newPlayer.xSpeed = 0;
    }
    if (newX < board.x) {
      newPlayer.x = board.x;
      newPlayer.xSpeed = 0;
    }
    if (newY + newPlayer.height > board.y + board.height) {
      newPlayer.y = board.y + board.height;
      newPlayer.ySpeed = 0;
    }
    if (newY < board.y) {
      newPlayer.y = board.y + board.height;
      newPlayer.ySpeed = 0;
    }

    return newPlayer;
  }

  useEffect(() => {
    window.addEventListener("resize", startGame);

    const interval = setInterval(() => {
      if (!playing) return;
      gameLoop();
    }, 16);

    return () => {
      window.removeEventListener("resize", startGame);
      clearInterval(interval);
    };
  }, [board, player, playing]);

  return (
    <div className="h-full w-full bg-gray-400" ref={boardRef}>
      {!playing ? (
        <div className="h-full w-full flex justify-center items-center">
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: player.x,
            top: player.y,
            width: player.width,
            height: player.height,
            backgroundColor: "brown",
            borderRadius: "100%"
          }}
        ></div>
      )}
    </div>
  );
};

export default Zombies;
