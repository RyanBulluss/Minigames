import React, { useRef, useState, useEffect } from "react";
import { GamePiece, gravity } from "./constants";
import { checkBorders } from "../../variables/boundaries";

const Mario = () => {
  const [staticPieces, setStaticPieces] = useState([]);
  const [player, setPlayer] = useState({ dead: true });
  const [board, setBoard] = useState({});
  const [playing, setPlaying] = useState(true);

  const boardRef = useRef(null);

  function resizeGame() {
    const newBoard = boardRef.current.getBoundingClientRect();
    newBoard.gridSize = 20;
    newBoard.gridHeight = newBoard.height / newBoard.gridSize;
    newBoard.gridWidth = newBoard.width / newBoard.gridSize;
    return newBoard;
  }

  function startGame() {
    setBoard(resizeGame());
  }

  function gameLoop() {
    setPlayer((p) => movePlayer(p));
  }

  function movePlayer(oldP) {
    let newP = { ...oldP };
    
    newP = checkCollision(newP, oldP);
    
    
    newP.y += newP.ySpeed;
    newP.x += newP.xSpeed;
    

    if (newP.y + newP.height >= board.y + board.height) {
      newP.y = board.y + board.height - newP.height;
      newP.ySpeed = 0;
      //   setPlaying(false);
    } 
     

    if (!newP.keyDown) {
      newP.xSpeed *= 0.9;
    }
    return newP;
  }

  function checkCollision(oldP, olderP) {
    const newP = { ...oldP };
    const oldX = olderP.x;
    const oldY = olderP.y;
    const newX = newP.x + newP.xSpeed;
    const newY = newP.y + newP.ySpeed;

    newP.ySpeed += board.height / gravity;
    
    staticPieces.forEach((piece) => {
      if (
        oldX < piece.x + piece.width &&
        newY <= piece.y + piece.height &&
        oldX + newP.width > piece.x &&
        newY + newP.height >= piece.y
      ) {
        if (oldY + newP.height <= piece.y && newY + newP.height >= piece.y) {
          newP.y = piece.y - newP.height;
          newP.ySpeed = 0;
        }
        if (oldY >= piece.y + piece.height && newY <= piece.y + piece.height) {
          newP.y = piece.y + piece.height;
          newP.ySpeed = 0;
        }
      }
      if (
        newX <= piece.x + piece.width &&
        oldY < piece.y + piece.height &&
        newX + newP.width >= piece.x &&
        oldY + newP.height > piece.y
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
    });
  }

  function createPlatform(num, startY, startX) {
    const floor = [];
    let y;
    let x;

    for (let i = 0; i < num; i++) {
      y = board.y + board.height - board.gridHeight * (startY + 1);
      x = board.x + board.gridWidth * (startX + i);
      const newPiece = new GamePiece(
        "brick",
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
        switch (e.key) {
          case " ":
            if (p.ySpeed !== 0) return p;
            return { ...p, ySpeed: -board.height / 50 };
          case "a":
            return { ...p, xSpeed: -board.width / 100, keyDown: true };
          case "d":
            return { ...p, xSpeed: board.width / 100, keyDown: true };
          default:
            return p;
        }
      });
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      setPlayer((p) => {
        const key = e.key;
        if (key === "a" && p.xSpeed < 0) {
          return { ...p, keyDown: false };
        } else if (key === "d" && p.xSpeed > 0) {
          return { ...p, keyDown: false };
        } else return p;
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [board, staticPieces, playing]);

  useEffect(() => {
    startGame();
    window.addEventListener("resize", startGame);

    return () => {
      window.removeEventListener("resize", startGame);
    };
  }, []);

  return (
    <div className="h-full w-full bg-sky-800" ref={boardRef}>
      <button onClick={() => createPlatform(20, 0, 0)}>Create Floor</button>
      <br />
      <button onClick={() => createStairs(5, 1, 10)}>Create Stairs</button>
      <br />
      <button onClick={() => spawnPlayer(0, 0, 10, 15)}>spawnPlayer</button>
      <br />
      {player.xSpeed}
      <br />
      {player.ySpeed}
      {staticPieces.map((piece, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: piece.y,
            left: piece.x,
            height: piece.height,
            width: piece.width,
            backgroundColor: "brown",
            border: "solid black 1px",
            visibility: checkBorders(board, piece) ? "hidden" : "visable",
          }}
        ></div>
      ))}
      {!player.dead && (
        <div
          style={{
            position: "absolute",
            top: player.y,
            left: player.x,
            height: player.height,
            width: player.width,
            backgroundColor: "red",
            border: "solid black 1px",
          }}
        ></div>
      )}
    </div>
  );
};

export default Mario;
