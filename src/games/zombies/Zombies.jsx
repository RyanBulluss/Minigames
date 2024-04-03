import React, { useRef, useState, useEffect } from "react";
import {
  startingHealth,
  startingAngle,
  startingZombieSpeed,
  playerSize,
  zombieSize,
  startingBulletSpeed,
  startingZombieSpawnRate,
} from "./constants";
import { gameOverSound } from "../../variables/audio";

const Zombies = () => {
  const [playing, setPlaying] = useState(false);
  const [board, setBoard] = useState({});
  const [player, setPlayer] = useState({});
  const [zombies, setZombies] = useState([]);
  const [bullets, setBullets] = useState([]);
  const [zombieSpeed, setZombieSpeed] = useState(startingZombieSpeed);
  const [zombieSpawnRate, setZombieSpawnRate] = useState(
    startingZombieSpawnRate
  );
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
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
      width: newBoard.width / playerSize,
      height: newBoard.height / playerSize,
      angle: startingAngle,
      health: startingHealth,
      kills: 0,
    };
    setBoard(newBoard);
    setPlayer(newPlayer);
  }

  function movePlayer() {
    setPlayer((p) => {
      let newPlayer = walkPlayer(p);
      newPlayer = aimPlayer(newPlayer);
      return newPlayer;
    });
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function moveZombies() {
    setZombies((z) => {
      return z.map((zombie, idx) => {
        const dy = player.y - zombie.y;
        const dx = player.x - zombie.x;
        const angleRadians = Math.atan2(dy, dx);

        const angleDegrees = angleRadians * (180 / Math.PI) + 135;

        const newZombie = {
          ...zombie,
          xSpeed: (board.width / zombieSpeed) * Math.cos(angleRadians),
          ySpeed: (board.height / zombieSpeed) * Math.sin(angleRadians),
          angle: angleDegrees,
        };

        newZombie.x += newZombie.xSpeed;
        newZombie.y += newZombie.ySpeed;
        // Game over check
        // if (checkCollision(player, zombie)) {
        //   setPlaying(false);
        //   gameOverSound()
        // }

        return newZombie;
      });
    });
  }

  function gameLoop() {
    movePlayer();
    moveBullets();
    moveZombies();
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
      setZombies((z) => {
        let newZ = [...z];
        z.forEach((zombie, zIdx) => {
          b.forEach((bullet, bIdx) => {
            if (checkCollision(zombie, bullet)) {
              // Possible bug when a bullet hits multiple enemies
              newZ.splice(zIdx, 1);
              newB.splice(bIdx, 1);
            }
          });
        });
        return newZ;
      });
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

  function checkCollision(obj1, obj2) {
    if (
      obj1.x + obj1.width > obj2.x &&
      obj1.x < obj2.x + obj2.width &&
      obj1.y + obj1.height > obj2.y &&
      obj1.y < obj2.y + obj2.height
    )
      return true;
    return false;
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

  function walkPlayer(p) {
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

  function spawnZombie() {
    const newZ = {
      xSpeed: 0,
      ySpeed: 0,
      width: board.width / zombieSize,
      height: board.height / zombieSize,
      zombieAngle: 0,
    };
    let valid = false;
    let tries = 0;

    // Bad solution for player in dependencies bug
    setPlayer(p => {
      while (!valid) {
        tries++;
        const x = board.x + rng(board.width - newZ.width);
        const y = board.y + rng(board.width - newZ.height);
  
        if (
          !checkCollision(
            { ...newZ, x: x, y: y },
            {
              x: p.x - p.width * 2,
              y: p.y - p.height * 2,
              width: p.width * 5,
              height: p.height * 5,
            }
          )
        ) {
          newZ.x = x;
          newZ.y = y;
          valid = true;
          setZombies((z) => [...z, newZ]);
        } else if (tries > 1000) {
          valid = true;
          alert("Error: Cannot find valid position for zombie");
        }
      }
      return p
    })
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
        const key = e.key;
        if (key === "w" && p.ySpeed < 0) {
          return { ...p, ySpeed: 0 };
        } else if (key === "a" && p.xSpeed < 0) {
          return { ...p, xSpeed: 0 };
        } else if (key === "s" && p.ySpeed > 0) {
          return { ...p, ySpeed: 0 };
        } else if (key === "d" && p.xSpeed > 0) {
          return { ...p, xSpeed: 0 };
        } else return p;
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
      const newAngle = player.angle - 135;
      const angleRadians = (newAngle * Math.PI) / 180;
      const newBullet = {
        x: player.x + player.width / 2 - player.width / 10,
        y: player.y + player.height / 2 - player.height / 10,
        xSpeed: (board.height / startingBulletSpeed) * Math.cos(angleRadians),
        ySpeed: (board.height / startingBulletSpeed) * Math.sin(angleRadians),
        width: player.width / 5,
        height: player.height / 5,
      };
      setBullets((b) => [...b, newBullet]);
    };

    const gameBoard = boardRef.current;
    gameBoard.addEventListener("click", shoot);
    gameBoard.addEventListener("contextmenu", spawnZombie);

    return () => {
      gameBoard.removeEventListener("click", shoot);
      gameBoard.removeEventListener("contextmenu", spawnZombie);
    };
  }, [player, playing, zombies]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
      if (timer % 5 === 0) {
        setZombieSpawnRate((zsr) => zsr / 1.01);
        setZombieSpeed((zs) => zs / 1.01);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, playing]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      spawnZombie();
    }, zombieSpawnRate);

    return () => {
      clearInterval(interval);
    };
  }, [playing, zombieSpawnRate]);

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
              border: "solid black 1px",
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
          {zombies.map((zombie, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: zombie.x,
                top: zombie.y,
                width: zombie.width,
                height: zombie.height,
                backgroundColor: "green",
                border: "solid black 1px",
                borderRadius: "40% 100% 100% 100%",
                transform: `rotate(${zombie.angle}deg)`,
              }}
            ></div>
          ))}
        </>
      )}
    </div>
  );
};

export default Zombies;
