import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  startingAngle,
  startingZombieSpeed,
  startingZombieSpawnRate,
  tankPlayer,
  sniperPlayer,
  scoutPlayer,
  zombiesArr,
  maxZombies,
  powerUpsArr,
  instantKillData
} from "./constants";
import HealthBar from "./HealthBar";
import "./Zombies.css";
import {
  cannonSound,
  gameOverSound,
  sniperSound,
  gunshotSound,
  zombieHitSound,
  bombSound,
} from "../../variables/audio";
import zombieBite from "../../assets/zombieBite.mp3";

const zba = new Audio(zombieBite);

function playZombieBiteSound() {
  zba.volume = 0.03;
  if (zba.currentTime > 0.4) {
    zba.currentTime = 0;
  }
  if (zba.currentTime === 0) {
    zba.play();
  }
}

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
  const [powerUps, setPowerUps] = useState([]);
  const [currentPowerUps, setCurrentPowerUps] = useState([]);
  const boardRef = useRef(null);

  function gameOver() {
    setPlaying(false);
    gameOverSound();
  }

  function resizeGame() {
    return boardRef.current.getBoundingClientRect();
  }

  function startGame(loadout) {
    setPlaying(true);
    const newBoard = resizeGame();
    const newPlayer = {
      x: newBoard.x + newBoard.width / 2 - newBoard.width / loadout.width / 2,
      y:
        newBoard.y + newBoard.height / 2 - newBoard.height / loadout.height / 2,
      mouseX: 0,
      mouseY: 0,
      xSpeed: 0,
      ySpeed: 0,
      speed: loadout.speed,
      width: newBoard.width / loadout.width,
      height: newBoard.height / loadout.height,
      angle: startingAngle,
      health: loadout.health,
      damage: loadout.bulletDamage,
      startingHealth: loadout.health,
      kills: 0,
      fireRate: loadout.fireRate,
      bulletSpeed: loadout.bulletSpeed,
      bulletSize: loadout.bulletSize,
      shooting: false,
      loadout: loadout.loadout,
    };
    setZombies([]);
    setBullets([]);
    setPowerUps([]);
    setZombieSpeed(startingZombieSpeed);
    setZombieSpawnRate(startingZombieSpawnRate);
    setTimer(0);
    setScore(0);
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

        const angleDegrees = angleRadians * (180 / Math.PI);

        const newZombie = {
          ...zombie,
          xSpeed: zombie.speed * Math.cos(angleRadians),
          ySpeed: zombie.speed * Math.sin(angleRadians),
          angle: angleDegrees,
        };

        if (
          checkCollision(
            {
              y: player.y + player.height / 2,
              x: player.x + player.width / 2,
              height: 1,
              width: 1,
            },
            zombie
          )
        ) {
          let dead = false;
          playZombieBiteSound();
          if (player.health - zombie.damage <= 0) {
            gameOver();
            dead = true;
          }
          setPlayer((p) => {
            return { ...p, health: dead ? 0 : p.health - zombie.damage };
          });
          newZombie.xSpeed = 0;
          newZombie.ySpeed = 0;
          newZombie.distance -= newZombie.speed;
        }

        newZombie.distance += newZombie.speed;
        newZombie.x += newZombie.xSpeed;
        newZombie.y += newZombie.ySpeed;
        // Game over check
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

  function spawnPowerUp(y, x) {
    if (rng(25) !== 0) return;
    const newPU = powerUpsArr[rng(powerUpsArr.length)];
    setPowerUps(pu => [...pu, {
      type: newPU.type,
      height: board.height / newPU.height,
      width: board.width / newPU.width,
      x: x,
      y: y,
    }])
  }

  function moveBullets() {
    setBullets((b) => {
      let newB = [...b];
      setZombies((z) => {
        let newZ = [...z];
        let killIdxs = [];
        newZ.forEach((zombie, zIdx) => {
          let dead = false;
          newB.forEach((bullet, bIdx) => {
            if (checkCollision(zombie, bullet)) {
              if ((zombie.health - bullet.damage <= 0 && !dead) || (currentPowerUps.instantKill && !dead)) {
                if (!killIdxs.includes(zIdx)) {
                  killIdxs.push(zIdx);
                  dead = true;
                  spawnPowerUp(zombie.y, zombie.x);
                }
              } else {
                // some may have under 0 health when dead
                newZ[zIdx].health -= bullet.damage;
              }
              if (player.loadout !== "tank") {
                newB.splice(bIdx, 1);
                zombieHitSound();
              }
            }
          });
        });
        killIdxs.forEach((idx) => {
          newZ.splice(idx, 1);
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
    const angleDegrees = angleRadians * (180 / Math.PI) - 90;
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
    checkPowerUps(newPlayer);

    return newPlayer;
  }

  function checkPowerUps(newPlayer) {
    if (powerUps.length < 1) return;
    const newPowerUps = [...powerUps]
    powerUps.forEach((pu, idx) => {
      if (checkCollision(newPlayer, {x: pu.x + pu.width / 2 - pu.width / 20, y: pu.y + pu.height / 2 - pu.height / 20, width: pu.width / 10, height: pu.height / 10})) {
        if (pu.type === "nuke") nuke();
        if (pu.type === "instant kill") instantKill();
        newPowerUps.splice(idx, 1);
      }
    })
    setPowerUps(newPowerUps);
  }

  function instantKill() {
    if (currentPowerUps.instantKill) return
    setCurrentPowerUps(b => {
      if (b.instantKill) return b;
      return {...b, instantKill: true}
    })
    setTimeout(() => {
      setCurrentPowerUps(b => {
        return {...b, instantKill: false}
      })
    }, instantKillData.time);
  };

  function nuke() {
    setPlayer(p => {
      return {...p, kills: p.kills + zombies.length}
    });
    setZombies([]);
    bombSound();
  }

  function spawnZombie() {
    const zombie = zombiesArr[rng(zombiesArr.length)];
    const newZ = {
      xSpeed: 0,
      ySpeed: 0,
      speed: board.width / zombie.speed,
      width: board.width / zombie.width,
      height: board.height / zombie.height,
      health: zombie.health,
      startingHealth: zombie.health,
      damage: zombie.damage,
      zombieAngle: 0,
      color: zombie.color,
      distance: 0,
    };
    let valid = false;
    let tries = 0;

    // Bad solution for player in dependencies bug
    setPlayer((p) => {
      while (!valid) {
        tries++;
        const x = board.x + rng(board.width - newZ.width);
        const y = board.y + rng(board.width - newZ.height);

        if (
          !checkCollision(
            { ...newZ, x: x, y: y },
            {
              x: p.x - p.width * 3,
              y: p.y - p.height * 3,
              width: p.width * 7,
              height: p.height * 7,
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
      return p;
    });
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
  }, [currentPowerUps, board, playing, bullets]);

  useEffect(() => {
    if (!playing) return;
    const handleKeyPress = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        // if ((e.key === "w" || e.key === "s") && p.ySpeed) return p;
        // if ((e.key === "a" || e.key === "d") && p.xSpeed) return p;
        switch (e.key) {
          case "w":
            return { ...p, ySpeed: -board.height / p.speed };
          case "a":
            return { ...p, xSpeed: -board.height / p.speed };
          case "s":
            return { ...p, ySpeed: board.height / p.speed };
          case "d":
            return { ...p, xSpeed: board.height / p.speed };
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

  const shoot = () => {
    let newBullet;
    setPlayer((p) => {
      const newAngle = p.angle - 90;
      const angleRadians = (newAngle * Math.PI) / 180;
      newBullet = {
        x: p.x + p.width / 2 - p.width / p.bulletSize / 2,
        y: p.y + p.height / 2 - p.height / p.bulletSize / 2,
        xSpeed: (board.height / p.bulletSpeed) * Math.cos(angleRadians),
        ySpeed: (board.height / p.bulletSpeed) * Math.sin(angleRadians),
        width: p.width / p.bulletSize,
        height: p.height / p.bulletSize,
        damage: p.damage,
      };
      return p;
    });
    playShotSound();
    setBullets((b) => [...b, newBullet]);
  };

  function playShotSound() {
    if (player.loadout === "tank") {
      cannonSound();
    } else if (player.loadout === "sniper") {
      sniperSound();
    } else if (player.loadout === "scout") gunshotSound();
  }

  useEffect(() => {
    if (!playing) return;
    let intervalId;

    function startShooting(e) {
      e.preventDefault();
      shoot();
      intervalId = setInterval(shoot, player.fireRate);
    }

    function stopShooting(e) {
      e.preventDefault();
      clearInterval(intervalId);
    }

    const gameBoard = boardRef.current;
    gameBoard.addEventListener("mousedown", startShooting);
    window.addEventListener("mouseup", stopShooting);

    return () => {
      clearInterval(intervalId);
      gameBoard.removeEventListener("mousedown", startShooting);
      gameBoard.removeEventListener("mouseup", stopShooting);
    };
  }, [playing, board]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
      if (timer % 5 === 0) {
        setZombieSpawnRate((zsr) => zsr / 1.05);
        setZombieSpeed((zs) => zs / 1.05);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer, playing]);

  useEffect(() => {
    if (!playing) return;
    if (zombies.length >= maxZombies) return;
    const interval = setInterval(() => {
      spawnZombie();
    }, zombieSpawnRate);

    return () => {
      clearInterval(interval);
    };
  }, [playing, zombieSpawnRate, zombies.length]);

  return (
    <div className="h-full w-full bg-gray-400" ref={boardRef}>
      {!playing ? (
        <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
          <h2 onClick={startGame}>Choose Your Loadout:</h2>
          <button onClick={() => startGame(scoutPlayer)}>Scout</button>
          <button onClick={() => startGame(sniperPlayer)}>Sniper</button>
          <button onClick={() => startGame(tankPlayer)}>Tank</button>
        </div>
      ) : (
        <>
          <div
            className="zBackground"
            style={{
              height: board.height,
              width: board.width,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              left: player.x,
              top: player.y,
              width: player.width,
              height: player.height,
              transform: `rotate(${player.angle}deg)`,
              zIndex: "20",
            }}
            className="zPlayer player0"
          ></div>
          {player.health !== player.startingHealth && (
            <HealthBar user={player} />
          )}
          {bullets.map((bullet, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: bullet.x,
                top: bullet.y,
                width: bullet.width,
                height: bullet.height,
                background: "linear-gradient(to right, #111, #222)",
                borderRadius: "100%",
              }}
            ></div>
          ))}
          {powerUps.map((powerUp, idx) => (
            <div
            key={idx}
            style={{
              position: "absolute",
              left: powerUp.x,
              top: powerUp.y,
              width: powerUp.width,
              height: powerUp.height,
            }}
            className={powerUp.type === "nuke" ? "nuke" : 
          powerUp.type === "instant kill" ? "instant-kill" : ""
          }
          ></div>
          ))}
          {zombies.map((zombie, idx) => (
            <>
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: zombie.x,
                  top: zombie.y,
                  width: zombie.width,
                  height: zombie.height,
                  transform: `rotate(${zombie.angle}deg)`,
                }}
                className={
                  Math.floor(zombie.distance / 5) % 17 === 0
                    ? "zombie0 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 1
                    ? "zombie1 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 2
                    ? "zombie2 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 3
                    ? "zombie3 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 4
                    ? "zombie4 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 5
                    ? "zombie5 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 6
                    ? "zombie6 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 7
                    ? "zombie7 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 8
                    ? "zombie8 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 9
                    ? "zombie9 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 10
                    ? "zombie10 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 11
                    ? "zombie11 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 12
                    ? "zombie12 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 13
                    ? "zombie13 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 14
                    ? "zombie14 zombie"
                    : Math.floor(zombie.distance / 5) % 17 === 15
                    ? "zombie15 zombie"
                    : "zombie16 zombie"
                }
              ></div>
              {zombie.health !== zombie.startingHealth && (
                <HealthBar user={zombie} />
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default Zombies;
