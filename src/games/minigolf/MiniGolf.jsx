import React, { useRef, useState, useEffect } from "react";
import GamePiece from "./GamePiece";
import { checkBorders, checkBoundaries } from "../../variables/boundaries";
import { levels } from "./constants";

const MiniGolf = () => {
  const [boundaries, setBoundaries] = useState([]);
  const [board, setBoard] = useState({});
  const [ball, setBall] = useState({});
  const [hole, setHole] = useState({});
  const [mouse, setMouse] = useState({});
  const [line, setLine] = useState({});
  const [walls, setWalls] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [playing, setPlaying] = useState(false);

  const boardRef = useRef();

  function resizeBoard() {
    return boardRef.current.getBoundingClientRect();
  }

  function startGame() {
    const newBoard = resizeBoard();
    setScore(0);
    setPlaying(true);
    setBoard(newBoard);
    setMouse({
      type: "mouse",
      height: newBoard.height / 15,
      width: newBoard.width / 15,
      y: newBoard.y + newBoard.height / 2,
      x: newBoard.x + newBoard.width / 2,
    });
    setLine({
      type: "line",
      height: newBoard.height / 4,
      width: newBoard.width / 200,
      y: newBoard.y + newBoard.height / 2,
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 250,
      angle: 0,
    });
    createLevel(levels[0], newBoard);
    setCurrentLevel(1);
  }

  function createLevel(level, newBoard) {
    if (currentLevel >= levels.length) {
      setPlaying(false);
      setCurrentLevel(0);
      return;
    } 

    const newWalls = level.walls.map(w => {
      return {
        ...w,
        height: newBoard.height / w.height,
        width: newBoard.width / w.width,
        y: newBoard.y + newBoard.height / w.y,
        x: newBoard.x + newBoard.width / w.x,
      }
    })
    const newBall = {...level.ball};
    newBall.height = newBoard.height / newBall.height;
    newBall.width = newBoard.width / newBall.width;
    newBall.y = newBoard.y + newBoard.height / newBall.y - newBall.height / 2;
    newBall.x = newBoard.x + newBoard.width / newBall.x - newBall.width / 2;
    newBall.ySpeed = 0;
    newBall.xSpeed = 0;

    const newHole = {...level.hole};
    newHole.height = newBoard.height / newHole.height;
    newHole.width = newBoard.width / newHole.width;
    newHole.y = newBoard.y + newBoard.height / newHole.y - newHole.height / 2;
    newHole.x = newBoard.x + newBoard.width / newHole.x - newHole.width / 2;

    
    setHole(newHole);
    setWalls(newWalls);
    setBall(newBall);
    setCurrentLevel(l => {
      return l + 1;
    });
    

  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function checkWalls(oldB) {
    const newB = {...oldB};
    walls.forEach((wall, idx) => {
      if (
        newB.x + newB.width > wall.x &&
        newB.x < wall.x + wall.width &&
        newB.y + newB.height > wall.y &&
        newB.y < wall.y + wall.height
      ) {
        const top = newB.y + newB.height - wall.y;
        const bottom = wall.y + wall.height - newB.y;
        const left = newB.x + newB.width - wall.x;
        const right = wall.x + wall.width - newB.x;

        if (top < bottom && top < left && top < right) {
          newB.ySpeed = newB.ySpeed > 0 ? -newB.ySpeed : newB.ySpeed;
        } else if (bottom < left && bottom < right) {
          newB.ySpeed = newB.ySpeed > 0 ? newB.ySpeed : -newB.ySpeed;
        } else if (left < right) {
          newB.xSpeed = newB.xSpeed > 0 ? -newB.xSpeed : newB.xSpeed;
        } else {
          newB.xSpeed = newB.xSpeed > 0 ? newB.xSpeed : -newB.xSpeed;
        }
      }
    })

    return newB;
  }

  function gameLoop() {
    let newB = { ...ball };
    newB = checkBoundaries(board, newB);
    newB.xSpeed *= 0.995;
    newB.ySpeed *= 0.995;
    if (newB.ySpeed || newB.xSpeed) {
      if (
        newB.ySpeed < board.height / 100000 &&
        newB.ySpeed > -board.height / 100000 &&
        newB.xSpeed < board.width / 100000 &&
        newB.xSpeed > -board.width / 100000
      ) {
        newB.xSpeed = 0;
        newB.ySpeed = 0;
      }
    }
    newB = checkWalls(newB);

    newB = {
      ...newB,
      y: newB.y + newB.ySpeed,
      x: newB.x + newB.xSpeed,
    };

    const posY = newB.ySpeed > 0 ? newB.ySpeed : -newB.ySpeed;
    const posX = newB.xSpeed > 0 ? newB.xSpeed : -newB.xSpeed;

    const newWalls = walls.map(wall => {
      if (!wall.moving) return wall;

      wall.x += board.width / wall.speed;
      if (wall.x + wall.width > board.x + board.width / 1.43) {
        wall.speed = -3000;
        } else if (wall.x < board.x + board.width / 4 + board.width / 20) {
        wall.speed = 3000;
      }
      return wall;
    })

    if (
      newB.x + newB.width <= hole.x + hole.width &&
      newB.x >= hole.x &&
      newB.y + newB.height <= hole.y + hole.height &&
      newB.y >= hole.y &&
      posY + posX < board.height / 1000
    ) {
      createLevel(levels[currentLevel], board);
    } else {
      setBall(newB);
    }
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setLine((l) => {
      return { ...l, x: ball.x + ball.width / 3, y: ball.y + ball.height / 2 };
    });
    setMouse((m) => {
      return {
        ...m,
        mouseDown: true,
        y: e.clientY - m.height / 2,
        x: e.clientX - m.width / 2,
      };
    });
  }

  function handleMouseUp(e) {
    e.preventDefault();
    if (!mouse.mouseDown) return;
    setScore(s => s + 1);
    setMouse((m) => {
      setBall((b) => {
        return { ...b, ySpeed: m.dy / 50, xSpeed: m.dx / 50 };
      });
      return { ...m, mouseDown: false };
    });
  }

  function handleMouseMove(e) {
    const newMouse = {
      ...mouse,
      y: e.clientY - mouse.height / 2,
      x: e.clientX - mouse.width / 2,
    };
    const newLine = { ...line };

    let dy = ball.y + ball.height / 2 - (newMouse.y + newMouse.height / 2);
    let dx = ball.x + ball.width / 2 - (newMouse.x + newMouse.width / 2);

    const angleRadians = Math.atan2(dy, dx);

    const angleDegrees = angleRadians * (180 / Math.PI);

    newMouse.dy = dy;
    newMouse.dx = dx;

    dy = dy > 0 ? dy : -dy;
    dx = dx > 0 ? dx : -dx;

    let distance = Math.sqrt(dx * dx + dy * dy);
    distance = distance > board.height / 4 ? board.height / 4 : distance;

    newLine.angle = angleDegrees - 90;
    newLine.height = distance;

    setMouse(newMouse);
    setLine(newLine);
  }

  useEffect(() => {
    startGame();
    window.addEventListener("resize", startGame);

    return () => {
      window.removeEventListener("resize", startGame);
    };
  }, []);

  useEffect(() => {
    if (ball.ySpeed || ball.xSpeed || !playing) return;
    const newBoard = boardRef.current;

    newBoard.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      newBoard.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ball, walls, line, playing]);

  useEffect(() => {
    if (!mouse.mouseDown || ball.ySpeed || ball.xSpeed) return;
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse, ball, walls, line]);

  useEffect(() => {
    const interval = setInterval(() => {
      gameLoop();
    });

    return () => {
      clearInterval(interval);
    };
  }, [ball, currentLevel, walls, hole]);

  return (
    <div className="h-full w-full bg-[#89a934]" ref={boardRef}>
      <GamePiece piece={ball} />
      {walls.map((wall, idx) => (
      <GamePiece key={idx} piece={wall} />
      ))}
      {!playing && 
        <div
        style={{
          position: "absolute",
          top: board.y,
          left: board.x,
          width: board.width,
          height: board.height,
          backgroundColor: "#89a934",
          zIndex: 50,
        }}
        className="flex flex-col justify-evenly items-center font-semibold text-2xl"
        >
          <h4>Course Finished!</h4>
          <h4 className="text-xl">You completed the course in {score} Strokes</h4>
          <button onClick={() => startGame()} className="hover:text-gray-300">Play Again</button>
        </div>}
      <div
        style={{
          position: "absolute",
          top: board.y,
          left: board.x,
        }}
        className="flex gap-4 md:p-2 p-1 font-semibold"
      >
        <h4>Strokes: {score}</h4>
        <h4>Hole: {currentLevel} / {levels.length}</h4>
      </div>
      <div
        style={{
          position: "absolute",
          top: hole.y,
          left: hole.x,
          width: hole.width,
          height: hole.height,
          backgroundColor: "black",
          borderRadius: "50%",
          zIndex: 0,
        }}
      ></div>
      {mouse.mouseDown && (
        <>
          <div
            style={{
              position: "absolute",
              top: mouse.y,
              left: mouse.x,
              height: mouse.height,
              width: mouse.width,
              borderRadius: "50%",
              border: "dashed white 3px",
              display: checkBorders(board, mouse) ? "none" : "block",
              zIndex: 50,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: line.y,
              left: line.x,
              width: line.width,
              height: line.height,
              // backgroundColor: "white",
              // border: "dashed white",
              transformOrigin: "top center",
              transform: `rotate(${line.angle}deg)`,
              zIndex: 50,
            }}
            className="border-[2px] md:border-[3px] border-dashed border-white"
          ></div>
        </>
      )}
    </div>
  );
};

export default MiniGolf;
