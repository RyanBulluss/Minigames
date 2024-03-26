import React, { useRef, useState, useEffect } from "react";
import DoodleJumpControls from "./DoodleJumpControls";
import "./DoodleJump.css";

const DoodleJump = () => {
  const boardRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState({});
  const [player, setPlayer] = useState({});

  function handleSizeChange() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    setPlayer({
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 20,
      y: newBoard.y + newBoard.height / 1.5,
      ySpeed: 0,
      xSpeed: 0,
      width: newBoard.width / 8,
      height: newBoard.height / 8,
    });
    startGame();
  }

  function startGame() {
    setPlaying(true);
    setTimer(0);
    setScore(0);
  }

  function gameLoop() {
    const newPlayer = { ...player };
    newPlayer.x += newPlayer.xSpeed;
    newPlayer.xSpeed *= 0.95;
    if (newPlayer.x < board.x) newPlayer.x = board.x + board.width - player.width;
    if (newPlayer.x + newPlayer.width > board.x + board.width) newPlayer.x = board.x;
    setPlayer(newPlayer);
  }

  function movePlayer(dir) {
    if (dir === "left") {
      setPlayer({ ...player, xSpeed: -board.width / 100 });
    } else if (dir === "right") {
      setPlayer({ ...player, xSpeed: board.width / 100 });
    }
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
  }, [board, playing, player]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          movePlayer("left");
          break;
        case "ArrowRight":
          movePlayer("right");
          break;
        default:
          return;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board, playing, player]);

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
        </div>
      </div>
    </div>
  );
};

export default DoodleJump;
