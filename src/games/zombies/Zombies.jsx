import React, { useRef, useState, useEffect } from "react";
import { startingHealth, startingAngle } from "./constants";

const Zombies = () => {
  const [playing, setPlaying] = useState(false);
  const [board, setBoard] = useState({});
  const [player, setPlayer] = useState({});
  const [bullets, setBullets] = useState([]);
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
      mouseX: 0,
      mouseY: 0,
      xSpeed: 0,
      ySpeed: 0,
      width: newBoard.width / 15,
      height: newBoard.height / 15,
      angle: startingAngle,
      health: startingHealth,
    };
    setBoard(newBoard);
    setPlayer(newPlayer);
  }

  function gameLoop() {
    setPlayer((p) => {
      let newPlayer = movePlayer(p);
      newPlayer = aimPlayer(newPlayer);
      return newPlayer;
    });
    moveBullets();
  }

  function checkBoundaries(obj) {
    const newX = obj.x + obj.xSpeed;
    const newY = obj.y + obj.ySpeed;
    if (
      newX + obj.width > board.x + board.width ||
      newX < board.x ||
      newY + obj.height > board.y + board.height ||
      newY < board.y
    ) {
      return false;
    } else return true;
  }

  function moveBullets() {
    setBullets((b) => {
      let newB = [...b];
      newB = newB.filter((bullet) => checkBoundaries(bullet));
      newB = newB.map((bullet) => {
        return {
          ...bullet,
          x: bullet.x + bullet.xSpeed,
          y: bullet.y + bullet.ySpeed,
        };
      });
      return newB;
    });
  }

  function aimPlayer(oldPlayer) {
    const newPlayer = { ...oldPlayer };
    const playerY = newPlayer.y + newPlayer.height / 2;
    const playerX = newPlayer.x + newPlayer.width / 2;

    const dx = playerX - newPlayer.mouseX;
    const dy = playerY - newPlayer.mouseY;

    const angleRadians = Math.atan2(dy, dx);
    const angleDegrees = angleRadians * (180 / Math.PI) - 45;
    newPlayer.angle = angleDegrees;
    return newPlayer;
  }

  function movePlayer(p) {
    const newPlayer = { ...p };
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
      newPlayer.y = board.y + board.height - newPlayer.height;
      newPlayer.ySpeed = 0;
    }
    if (newY < board.y) {
      newPlayer.y = board.y;
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
  }, [board, playing, bullets]);

  useEffect(() => {
    if (!playing) return;
    const handleKeyPress = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        // if ((e.key === "w" || e.key === "s") && p.ySpeed) return p;
        // if ((e.key === "a" || e.key === "d") && p.xSpeed) return p;
        switch (e.key) {
          case "w":
            return { ...p, ySpeed: -board.height / 100 };
          case "a":
            return { ...p, xSpeed: -board.height / 100 };
          case "s":
            return { ...p, ySpeed: board.height / 100 };
          case "d":
            return { ...p, xSpeed: board.height / 100 };
          default:
            return p;
        }
      });
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        switch (e.key) {
          case "w":
            return { ...p, ySpeed: 0 };
          case "a":
            return { ...p, xSpeed: 0 };
          case "s":
            return { ...p, ySpeed: 0 };
          case "d":
            return { ...p, xSpeed: 0 };
          default:
            return p;
        }
      });
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      const [x, y] = [e.clientX, e.clientY];

      setPlayer((p) => aimPlayer({ ...p, mouseX: x, mouseY: y }));
    };

    const gameBoard = boardRef.current;

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);
    gameBoard.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
      gameBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board, playing]);

  useEffect(() => {
    if (!playing) return;
    const shoot = (e) => {
      e.preventDefault();
      const newAngle = player.angle - 135
      const angleRadians = newAngle * Math.PI / 180
      const newBullet = {
        x: player.x + player.width / 2 - player.width / 10,
        y: player.y + player.height / 2 - player.height / 10,
        xSpeed: (board.height / 100) * Math.cos(angleRadians),
        ySpeed: (board.height / 100) * Math.sin(angleRadians),
        width: player.width / 5,
        height: player.height / 5,
      };
      setBullets((b) => [...b, newBullet]);
    };

    const gameBoard = boardRef.current;
    gameBoard.addEventListener("click", shoot);

    return () => {
      gameBoard.removeEventListener("click", shoot);
    };
  }, [player, playing]);

  return (
    <div className="h-full w-full bg-gray-400" ref={boardRef}>
      {!playing ? (
        <div className="h-full w-full flex justify-center items-center">
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <>
          <div
            style={{
              position: "absolute",
              left: player.x,
              top: player.y,
              width: player.width,
              height: player.height,
              backgroundColor: "brown",
              borderRadius: "20% 100% 100% 100%",
              transform: `rotate(${player.angle}deg)`,
              zIndex: "20",
            }}
          ></div>
          {bullets.map((bullet, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: bullet.x,
                top: bullet.y,
                width: bullet.width,
                height: bullet.height,
                backgroundColor: "black",
                borderRadius: "100%",
              }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default Zombies;
