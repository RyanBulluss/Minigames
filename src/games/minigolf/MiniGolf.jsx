import React, { useRef, useState, useEffect } from "react";
import GamePiece from "./GamePiece";
import { checkBorders } from "../../variables/boundaries";

const MiniGolf = () => {
  const [boundaries, setBoundaries] = useState([]);
  const [ball, setBall] = useState({});
  const [board, setBoard] = useState({});
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
  }

  function gameLoop() {
    setBall(b => {
      return {
        ...b,
        y: b.y + b.ySpeed,
        x: b.x + b.xSpeed,
      }
    })
  }

  function handleMouseDown(e) {
    e.preventDefault();
    setMouse((m) => {
      return { ...m, mouseDown: true };
    });
  }

  function handleMouseUp(e) {
    e.preventDefault();
    setMouse((m) => {
      setBall(b => {
        return { ...b, ySpeed: m.dy / 1000, xSpeed: m.dx / 1000 }
      })
      return { ...m, mouseDown: false };
    });
  }

  function handleMouseMove(e) {
    const newMouse = {...mouse, y: e.clientY - board.y, x: e.clientX - mouse.width / 2};
    const newLine = {...line};

    let dy = ball.y + ball.height / 2 - (newMouse.y + newMouse.height / 2);
    let dx = ball.x  + ball.width / 2 - (newMouse.x + newMouse.width / 2);

    
    const angleRadians = Math.atan2(dy, dx);
    
    const angleDegrees = angleRadians * (180 / Math.PI);

    newMouse.dy = dy;
    newMouse.dx = dx;
    
    dy = dy > 0 ? dy : -dy;
    dx = dx > 0 ? dx : -dx;

    const distance = Math.sqrt(dx * dx + dy * dy);
    
    newLine.angle = angleDegrees - 90;
    newLine.height = distance;

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
  }, [mouse]);

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
              zIndex: checkBorders(board, mouse) ? "-30" : "30",
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
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default MiniGolf;
