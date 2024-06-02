import React, { useRef, useState, useEffect } from "react";
import GamePiece from "./GamePiece";
import { checkBorders, checkBoundaries } from "../../variables/boundaries";

const MiniGolf = () => {
  const [boundaries, setBoundaries] = useState([]);
  const [board, setBoard] = useState({});
  const [ball, setBall] = useState({});
  const [hole, setHole] = useState({});
  const [mouse, setMouse] = useState({});
  const [line, setLine] = useState({});

  const boardRef = useRef();

  function resizeBoard() {
    return boardRef.current.getBoundingClientRect();
  }

  function startGame(loadout) {
    const newBoard = resizeBoard();
    setBoard(newBoard);
    setBall({
      type: "ball",
      height: newBoard.height / 50,
      width: newBoard.width / 50,
      y: newBoard.y + newBoard.height / 2 - newBoard.height / 100,
      x: newBoard.x + newBoard.width / 2 - newBoard.width / 100,
      ySpeed: 0,
      xSpeed: 0,
    });
    setMouse({
      type: "mouse",
      height: newBoard.height / 10,
      width: newBoard.width / 10,
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
    setHole({
      type: "hole",
      height: newBoard.height / 25,
      width: newBoard.width / 25,
      y: newBoard.y + rng(newBoard.width - newBoard.height / 25),
      x: newBoard.x + rng(newBoard.width - newBoard.width / 25),
    });
  }

  function rng(n) {
    return Math.floor(Math.random() * n);
  }

  function gameLoop() {
    setBall(b => {
      let newB = {...b};
      newB = checkBoundaries(board, newB);
      newB.xSpeed *= 0.995;
      newB.ySpeed *= 0.995;
      if (newB.ySpeed || newB.xSpeed) {
        if ((newB.ySpeed < board.height / 100000 && newB.ySpeed > -board.height / 100000)
           && (newB.xSpeed < board.width / 100000 && newB.xSpeed > -board.width / 100000)) {
          newB.xSpeed = 0;
          newB.ySpeed = 0;
        }
      }
      return {
        ...newB,
        y: newB.y + newB.ySpeed,
        x: newB.x + newB.xSpeed,
      }
    })
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setLine((l) => {
      return {...l, x: ball.x + ball.width / 2 - board.width / 250, y: ball.y + ball.height / 2}
    })
    setMouse((m) => {
      return {
        ...m,
        mouseDown: true,
        y: e.clientY - m.height / 2, 
        x: e.clientX - m.width / 2
       };
    });
  }

  function handleMouseUp(e) {
    e.preventDefault();
    if (!mouse.mouseDown) return;
    setMouse((m) => {
      setBall(b => {
        return { ...b, ySpeed: m.dy / 100, xSpeed: m.dx / 100 }
      })
      return { ...m, mouseDown: false };
    });
  }

  function handleMouseMove(e) {
    const newMouse = {...mouse, y: e.clientY - mouse.height / 2, x: e.clientX - mouse.width / 2};
    const newLine = {...line};

    let dy = ball.y + ball.height / 2 - (newMouse.y + newMouse.height / 2);
    let dx = ball.x  + ball.width / 2 - (newMouse.x + newMouse.width / 2);

    
    const angleRadians = Math.atan2(dy, dx);
    
    const angleDegrees = angleRadians * (180 / Math.PI);

    newMouse.dy = dy;
    newMouse.dx = dx;
    
    dy = dy > 0 ? dy : -dy;
    dx = dx > 0 ? dx : -dx;

    let distance = Math.sqrt(dx * dx + dy * dy);
    distance = distance > board.height / 2 ? board.height / 2 : distance;
    
    newLine.angle = angleDegrees - 90;
    newLine.height = distance / 2;

    setMouse(newMouse);
    setLine(newLine);
  }

  useEffect(() => {
    startGame();
  }, [])

  useEffect(() => {
    if (ball.ySpeed || ball.xSpeed) return;
    const newBoard = boardRef.current;

    newBoard.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      newBoard.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [ball]);

  useEffect(() => {
    if (!mouse.mouseDown || ball.ySpeed || ball.xSpeed) return;
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse, ball]);

  useEffect(() => {
    const interval = setInterval(() => {
      gameLoop()
    })

    return () => {
      clearInterval(interval);
    }
  })
  
  return (
    <div className="h-full w-full bg-[#89a934]" ref={boardRef}>
      <GamePiece piece={ball} />
      <div
        style={{
          position: "absolute",
          top: hole.y,
          left: hole.x,
          width: hole.width,
          height: hole.height,
          backgroundColor: "black",
          borderRadius: "50%",
          zIndex: 0
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
              zIndex: 50
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
              border: "dashed white 3px",
              transformOrigin: "top center",
              transform: `rotate(${line.angle}deg)`,
              zIndex: 50
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default MiniGolf;
