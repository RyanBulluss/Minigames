import React, { useRef, useState, useEffect } from "react";
import { GamePiece, Npc, gravity } from "./constants";
import { level1, levels } from "./levels";
import { checkBorders } from "../../variables/boundaries";
import Brick from "./game-pieces/Brick";
import Pipe from "./game-pieces/Pipe";
import "./Mario.css";
import GameObject from "./game-pieces/GameObject";
import NpcObject from "./game-pieces/NpcObject";

const Mario = () => {
  const [staticPieces, setStaticPieces] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [player, setPlayer] = useState({ dead: true });
  const [board, setBoard] = useState({});
  const [playing, setPlaying] = useState(false);
  const [currentLevel, setCurrentLevel] = useState({
    level: level1,
    column: 0,
  });

  const boardRef = useRef(null);

  function resizeGame() {
    const newBoard = boardRef.current.getBoundingClientRect();
    newBoard.gridSize = 20;
    newBoard.gridHeight = newBoard.height / newBoard.gridSize;
    newBoard.gridWidth = newBoard.width / newBoard.gridSize;
    setBoard(newBoard);
  }

  function startGame() {
    setPlaying(true);
    resizeGame();
    createPlatform(20, 0, 0, "grass");
    createPlatform(20, 20, 0, "sky");
    spawnPlayer(50, 50, 10, 20);
    setNpcs([]);
  }

  function createLevelCol(level, idx, newP) {
    let y;
    let x = board.x + board.width - board.gridWidth;
    if (staticPieces.length) {
      const lastPiece = staticPieces[staticPieces.length - 1];
      x = lastPiece.x + board.gridWidth - newP.xSpeed;
    }
    setStaticPieces((sp) => {
      const newSP = [...sp];
      level[idx].forEach((piece, i) => {
        if (piece) {
          const width =
            piece === "pipe" ? board.gridWidth * 2 : board.gridWidth;
          const height =
            piece === "pipe" ? board.gridHeight * 3 : board.gridHeight;
          y = board.y + board.height - board.gridHeight * (i + 1);
          y = piece === "pipe" ? y - board.gridHeight * 2 : y;
          const newPiece = new GamePiece(piece, y, x, height, width);
          newSP.push(newPiece);
        }
      });

      // add sky limit
      const newPiece = new GamePiece(
        "sky",
        board.y - board.gridHeight,
        x,
        board.gridHeight,
        board.gridWidth
      );
      newSP.push(newPiece);
      return newSP;
    });
  }

  function spawnNpc() {
    setNpcs((n) => {
      const goomba = new Npc(
        "goomba",
        500,
        500,
        board.gridHeight * 1.5,
        board.gridWidth * 1.5
      );
      return [...n, goomba];
    });
  }

  function moveNpcs(newP) {
    setNpcs((n) => {
      const newNpcs = n.map((obj, idx) => {
        if (obj.type === "goomba") return moveGoomba(obj, newP);
        return obj;
      });
      return newNpcs.filter((n) => n.dead === false);
    });
  }

  function moveGoomba(obj, newP) {
    let goomba = { ...obj };
    goomba.xSpeed =
      goomba.xSpeed !== 0
        ? goomba.xSpeed
        : rng(2) === 1
        ? -board.width / 300
        : board.width / 300;
    goomba.ySpeed += board.height / gravity;

    goomba = checkCollision(goomba, obj);

    goomba.y += goomba.ySpeed;
    goomba.x += goomba.xSpeed;

    goomba = checkNpcBoundaries(goomba);

    return goomba;
  }

  function checkNpcBoundaries(oldNpc) {
    const n = { ...oldNpc };
    const newX = n.x + n.xSpeed;
    const newY = n.y + n.ySpeed;
    if (newX + n.width > board.x + board.width - board.gridWidth) {
      n.xSpeed = n.xSpeed > 0 ? -n.xSpeed : n.xSpeed;
    }
    if (newX < board.x + board.gridWidth) {
      n.xSpeed = n.xSpeed < 0 ? -n.xSpeed : n.xSpeed;
    }
    if (newY + n.height > board.y + board.height) {
      n.ySpeed = n.ySpeed > 0 ? -n.ySpeed : n.ySpeed;
      n.dead = true;
    }
    if (newY < board.y) {
      n.ySpeed = n.ySpeed < 0 ? -n.ySpeed : n.ySpeed;
    }
    return n;
  }

  function gameOver() {
    setPlaying(false);
    setPlayer({});
    setStaticPieces([]);
  }

  function gameLoop() {
    setPlayer((p) => movePlayer(p));
  }

  function moveGamePieces(newP) {
    setNpcs((n) => {
      return n.map((npc) => {
        return { ...npc, x: npc.x - newP.xSpeed };
      });
    });

    setStaticPieces((sp) => {
      const newSP = [...sp]
        .map((piece) => {
          return { ...piece, x: piece.x - newP.xSpeed };
        })
        .filter((piece) => piece.x > board.x);
      if (
        sp.length !== newSP.length &&
        currentLevel.level.length > currentLevel.column
      ) {
        createLevelCol(currentLevel.level, currentLevel.column, newP);
        setCurrentLevel((cl) => {
          const newL = { ...cl };
          if (cl.column + 1 >= cl.level.length) {
            newL.level = levels[rng(levels.length)];
            newL.column = 0;
            return newL;
          } else return { ...cl, column: cl.column + 1 };
        });
      }
      return newSP;
    });
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function checkNpcCollision(newP) {
    const px = newP.x + newP.xSpeed;
    const py = newP.y + newP.ySpeed;

    const newPlayer = { ...newP };

    const killIdxs = [];

    npcs.forEach((n, idx) => {
      const nx = n.x + n.xSpeed;
      const ny = n.y + n.ySpeed;

      if (
        px + newP.width >= nx &&
        px <= nx + n.width &&
        py + newP.height >= ny &&
        py <= ny + n.height
      ) {
        if (newP.y + newP.height <= n.y && py + newP.height > ny) {
          newPlayer.ySpeed =
            newPlayer.ySpeed > 0 ? -newPlayer.ySpeed : newPlayer.ySpeed;
          killIdxs.push(idx);
        } else if (newP.y >= n.y + n.height && py < ny + n.height) {
          gameOver();
        } else if (newP.x + newP.width <= n.x && px + newP.width > nx) {
          gameOver();
        } else if (newP.x >= n.x + n.width && px < nx + n.width) {
          gameOver();
        }
      }
    });

    setNpcs((n) => {
      const newNpcs = [...n];
      killIdxs.forEach((kIdx, i) => {
        newNpcs.splice(kIdx - i, 1);
      });
      return newNpcs;
    });

    return newPlayer;
  }

  function movePlayer(oldP) {
    let newP = { ...oldP };

    newP.ySpeed += board.height / gravity;

    newP = checkCollision(newP, oldP);
    newP = checkNpcCollision(newP);
    newP.y += newP.ySpeed;

    if (
      newP.x + newP.width / 2 < board.x + board.width / 2 ||
      newP.xSpeed <= 0
    ) {
      if (newP.x + newP.xSpeed > board.x + board.gridSize) {
        newP.x += newP.xSpeed;
      }
    } else {
      moveGamePieces(newP);
    }

    moveNpcs(newP);

    if (newP.y + newP.height >= board.y + board.height) {
      newP.y = board.y + board.height - newP.height;
      newP.ySpeed = 0;
      gameOver();
    }

    if (!newP.keyDown) {
      if (newP.xSpeed > board.width / 100 || newP.xSpeed < -board.width / 100) {
        newP.xSpeed *= 0.9;
      } else newP.xSpeed = 0;
    } else newP.xSpeed = newP.keyDown;
    return newP;
  }

  function getCoin(idx, arr) {
    const newArr = [...arr];
    setPlayer((p) => {
      return { ...p, score: p.score + 1 };
    });
    newArr.push(idx);
    return newArr;
  }

  function breakBlock(idx, arr) {
    const newArr = [...arr];
    newArr.push(idx);
    return newArr;
  }

  function hitQuestion(idx) {
    setStaticPieces((sp) => {
      let newSP = JSON.parse(JSON.stringify(sp));
      newSP[idx].type = "brick";
      const oldP = newSP[idx];
      const newCoin = new GamePiece(
        "coin",
        oldP.y - board.gridHeight * 2,
        oldP.x,
        board.gridHeight,
        board.gridWidth
      );
      newSP.splice(newSP.length - 2, 0, newCoin);
      return newSP;
    });
  }

  function checkCollision(oldP, olderP) {
    const newP = { ...oldP };
    const oldX = olderP.x;
    const oldY = olderP.y;
    const newX = newP.x + newP.xSpeed;
    const newY = newP.y + newP.ySpeed;

    let deleteIdxs = [];

    staticPieces.forEach((piece, idx) => {
      const isCoin = piece.type === "coin";
      if (
        oldX < piece.x + piece.width &&
        newY <= piece.y + piece.height &&
        oldX + newP.width > piece.x &&
        newY + newP.height >= piece.y &&
        piece.type !== "coin"
      ) {
        if (oldY + newP.height <= piece.y && newY + newP.height >= piece.y) {
          newP.y = piece.y - newP.height;
          newP.ySpeed = 0;
        }
        if (oldY >= piece.y + piece.height && newY <= piece.y + piece.height) {
          if (piece.type === "breakable") {
            deleteIdxs = breakBlock(idx, deleteIdxs);
          } else if (piece.type === "question") {
            hitQuestion(idx);
          }
          newP.y = piece.y + piece.height;
          newP.ySpeed = 0;
        }
      }
      if (
        newX <= piece.x + piece.width &&
        oldY < piece.y + piece.height &&
        newX + newP.width >= piece.x &&
        oldY + newP.height > piece.y &&
        piece.type !== "coin"
      ) {
        if (oldX + newP.width <= piece.x && newX + newP.width >= piece.x) {
          newP.x = piece.x - newP.width;
          newP.xSpeed = 0;
        }
        if (oldX >= piece.x + piece.width && newX <= piece.x + piece.width) {
          newP.x = piece.x + piece.width;
          newP.xSpeed = 0;
        }
      }

      // Fail safe incase player is inside a block
      if (
        oldX < piece.x + piece.width &&
        oldY < piece.y + piece.height &&
        oldX + newP.width > piece.x &&
        oldY + newP.height > piece.y
      ) {
        if (!isCoin) {
          const distBottom = piece.y + piece.height - oldY;
          const distTop = oldY + newP.height - piece.y;
          newP.ySpeed = 0;
          if (distTop < distBottom) {
            newP.y = piece.y - newP.height;
          } else newP.y = piece.y + piece.height;
        } else {
          deleteIdxs = getCoin(idx, deleteIdxs);
        }
      }
    });

    if (!deleteIdxs.length) return newP;
    setStaticPieces((sp) => {
      const newSP = [...sp];
      deleteIdxs.forEach((idx, idx2) => {
        newSP.splice(idx - idx2, 1);
      });
      return newSP;
    });

    return newP;
  }

  function spawnPlayer(y, x, height, width) {
    setPlayer({
      y: board.y + y,
      x: board.x + x,
      height: board.height / height,
      width: board.width / width,
      ySpeed: 0,
      xSpeed: 0,
      dead: false,
      score: 0,
    });
  }

  function createPlatform(num, startY, startX, type) {
    const floor = [];
    let y;
    let x;

    for (let i = 0; i < num; i++) {
      y = board.y + board.height - board.gridHeight * (startY + 1);
      x = board.x + board.gridWidth * (startX + i);
      const newPiece = new GamePiece(
        type,
        y,
        x,
        board.gridHeight,
        board.gridWidth
      );
      floor.push(newPiece);
    }
    setStaticPieces((s) => {
      return [...s, ...floor];
    });
  }

  function createStairs(num, startY, startX) {
    const floor = [];
    let y = board.y + board.height - board.gridHeight * startY;
    let x = board.x + board.gridWidth * startX;

    for (let i = 0; i < num; i++) {
      y = board.y + board.height - board.gridHeight * (startY + 1 + i);
      for (let j = i; j < num; j++) {
        x = board.x + board.gridWidth * (startX + j);
        const newPiece = new GamePiece(
          "brick",
          y,
          x,
          board.gridHeight,
          board.gridWidth
        );
        floor.push(newPiece);
      }
    }

    setStaticPieces((s) => {
      return [...s, ...floor];
    });
  }

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    const handleKeyPress = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        const k = e.key;
        if (k === " ") {
          if (p.ySpeed !== 0) return { ...p };
          return { ...p, ySpeed: -board.height / 50 };
        }
        if (k === "a" || k === "A" || k === "ArrowLeft")
          return {
            ...p,
            xSpeed: -board.width / 100,
            keyDown: -board.width / 100,
          };
        if (k === "d" || k === "D" || k === "ArrowRight")
          return {
            ...p,
            xSpeed: board.width / 100,
            keyDown: board.width / 100,
          };
        return p;
      });
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        const k = e.key;
        if ((k === "a" || k === "A" || k === "ArrowLeft") && p.xSpeed < 0) {
          return { ...p, keyDown: 0 };
        } else if (
          (k === "d" || k === "D" || k === "ArrowRight") &&
          p.xSpeed > 0
        ) {
          return { ...p, keyDown: 0 };
        } else return { ...p };
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [board, staticPieces, playing, currentLevel, npcs]);

  useEffect(() => {
    resizeGame();
    window.addEventListener("resize", startGame);

    return () => {
      window.removeEventListener("resize", startGame);
    };
  }, []);

  return (
    <div onClick={spawnNpc} className="h-full w-full bg-sky-400" ref={boardRef}>
      <div
        style={{
          position: "absolute",
          top: board.y,
          left: board.x,
          height: board.height,
          width: board.width,
        }}
      ></div>

      <div
        className="text-4xl z-50 font-semibold"
        style={{
          position: "absolute",
          top: board.y + board.gridHeight,
          left: board.x + board.gridWidth * 2,
          height: board.height,
          width: board.width,
        }}
      >
        <div
          className="coin"
          style={{ width: board.gridWidth * 0.9, height: board.gridHeight }}
        ></div>
        <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player.score}</h3>
      </div>

      {!playing && (
        <div
          style={{
            position: "absolute",
            top: board.y,
            left: board.x,
            height: board.height,
            width: board.width,
            backgroundColor: "black",
            zIndex: 60,
          }}
          className="flex justify-center items-center"
        >
          <button onClick={startGame}>Start Game</button>
        </div>
      )}
      {playing && (
        <>
          <div
            style={{
              position: "absolute",
              top: board.y,
              left: board.x,
              height: board.height,
              width: board.width / board.gridSize,
              backgroundColor: "#262422",
              zIndex: 60,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: board.y,
              left: board.x + board.width - board.width / board.gridSize,
              height: board.height,
              width: board.width / board.gridSize,
              backgroundColor: "#262422",
              zIndex: 60,
            }}
          ></div>
        </>
      )}
      {staticPieces.map((piece, idx) => (
        <>
          {piece.type === "brick" ? (
            <Brick
              key={idx}
              brick={piece}
              visable={checkBorders(board, piece)}
            />
          ) : piece.type === "pipe" ? (
            <Pipe
              key={idx}
              brick={piece}
              visable={checkBorders(board, piece)}
              isTop={false}
            />
          ) : (
            <GameObject
              key={idx}
              object={piece}
              visable={checkBorders(board, piece)}
            />
          )}
        </>
      ))}
      {npcs.map((npc, idx) => (
        <NpcObject key={idx} npc={npc} />
      ))}
      {playing && (
        <div
          style={{
            position: "absolute",
            top: player.y,
            left: player.x,
            height: player.height,
            width: player.width,
            transform: player.xSpeed < 0 ? "scaleX(-1)" : "scaleX(1)",
          }}
          className={
            player.ySpeed
              ? "mario-jump"
              : player.xSpeed
              ? "mario-run"
              : "mario-still"
          }
        ></div>
      )}
    </div>
  );
};

export default Mario;
