import React, { useState, useRef, useEffect } from "react";
import BrickBreakerControls from "./BrickBreakerControls";
import { level1, bricksPerRow } from "./constants";
import Brick from "./Brick";

const BrickBreaker = () => {
  const boardRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [board, setBoard] = useState({});
  const [paddle, setPaddle] = useState({});
  const [ball, setBall] = useState({});
  const [bricks, setBricks] = useState([]);

  function checkBoundaries() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;

    if (newX + ball.width >= board.width || newX <= 0) {
      setBall({ ...ball, xSpeed: -ball.xSpeed });
    }

    if (newY <= 0) {
      setBall({ ...ball, ySpeed: -ball.ySpeed });
    }

    if (newY + ball.height >= board.height) setPlaying(false);
  }

  function createBricks(level) {
    let newBricks = [];
    let x = 0;
    let y = 0;
    level.forEach((brick, idx) => {
      if ((idx) % bricksPerRow === 0) {
        y += board.height / 12;
        x = 0;
      }
      newBricks.push({
        hitsRemaining: brick,
        x: x,
        y: y,
        height: board.height / 12,
        width: board.width / bricksPerRow,
      });

      x += board.width / bricksPerRow;
    });
    setBricks(newBricks);
  }

  function checkPaddle() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;

    if (
      newX <= paddle.x + paddle.width &&
      newX + ball.width >= paddle.x &&
      newY + ball.height <= paddle.y + paddle.height &&
      newY + ball.height > paddle.y
    ) {
      if (ball.ySpeed < 0) return;
      const angle = checkAngle();
      setBall((b) => {
        const newBall = { ...b };
        newBall.ySpeed *= -1;
        newBall.xSpeed = angle;
        return newBall;
      });
    }
  }

  function checkAngle() {
    const b = ball.x + ball.width / 2;
    const tenth = paddle.width / 10;
    const p = paddle.x;
    let angle = board.width / 50;
    if (b < p + tenth * 10) angle = board.width / 50;
    if (b < p + tenth * 9) angle = board.width / 100;
    if (b < p + tenth * 8) angle = board.width / 150;
    if (b < p + tenth * 7) angle = board.width / 225;
    if (b < p + tenth * 6) angle = board.width / 300;
    if (b < p + tenth * 5) angle = -board.width / 300;
    if (b < p + tenth * 4) angle = -board.width / 225;
    if (b < p + tenth * 3) angle = -board.width / 150;
    if (b < p + tenth * 2) angle = -board.width / 100;
    if (b < p + tenth) angle = -board.width / 50;
    return angle;
  }

  function checkBrick() {}

  function moveBall() {
    if (!playing) return;
    checkPaddle();
    checkBoundaries();
    checkBrick();

    setBall((b) => {
      const newBall = { ...b };
      newBall.x += b.xSpeed;
      newBall.y += b.ySpeed;
      return newBall;
    });
  }

  function resizeBoard() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    setPaddle({
      y: newBoard.height - newBoard.height / 20,
      x: 0,
      width: newBoard.width / 5,
      height: newBoard.height / 20,
      color: "black",
    });
    setBall({
      y: 0,
      x: 0,
      ySpeed: newBoard.height / 100,
      xSpeed: newBoard.width / 100,
      width: newBoard.width / 30,
      height: newBoard.height / 30,
      color: "black",
    });
  }

  const handleMouseMove = (event) => {
    const rect = boardRef.current.getBoundingClientRect();
    const left = event.clientX - rect.left;

    if (left - paddle.width / 2 < 0) {
      setPaddle((p) => {
        return { ...p, x: 0 };
      });
    } else if (left > board.width - paddle.width / 2) {
      setPaddle((p) => {
        return { ...p, x: board.width - paddle.width };
      });
    } else
      setPaddle((p) => {
        return { ...p, x: left - paddle.width / 2 };
      });
  };

  useEffect(() => {
    resizeBoard();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [ball.x]);

  useEffect(() => {
    const newBoard = boardRef.current;
    window.addEventListener("resize", resizeBoard);
    newBoard.addEventListener("mousemove", handleMouseMove);
    createBricks(level1);
    return () => {
      window.removeEventListener("resize", resizeBoard);
      newBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board]);

  return (
    <div className="h-full flex flex-col">
      <BrickBreakerControls setPlaying={setPlaying} />
      <div className="bg-[#333] h-[80vmin] flex justify-center items-center cursor-none">
        <div className="relative bg-[#666] h-[90%] w-[90%]" ref={boardRef}>
          {bricks.map((brick, idx) => (
            <Brick key={idx} brick={brick} />
          ))}
          <div
            className="flex justify-center items-center"
            style={{
              position: "absolute",
              height: ball.height,
              width: ball.width,
              top: ball.y,
              left: ball.x,
              background: ball.color,
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              height: paddle.height,
              width: paddle.width,
              top: paddle.y,
              left: paddle.x,
              background: paddle.color,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default BrickBreaker;
