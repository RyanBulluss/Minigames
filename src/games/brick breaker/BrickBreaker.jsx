import React, { useState, useRef, useEffect } from "react";
import BrickBreakerControls from "./BrickBreakerControls";
import { startBoard, startBall, startPaddle } from "./constants";

const BrickBreaker = () => {
  const [paddle, setPaddle] = useState(startPaddle);
  const [board, setBoard] = useState(startBoard);


  useEffect(() => {
    const resizeCanvas = () => {

      setBoard({ width: "90%", height: "90%", color: "#445" });
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [paddle]);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const newPaddleX = mouseX;
    // const leftBound = 0 + board.margin + paddleHalfWidth;
    // const rightBound = board.width + board.margin - paddleHalfWidth;
    // if (mouseX < leftBound) return setPaddleX(0);
    // if (mouseX > rightBound) return setPaddleX(board.width - paddle.width);
    setPaddle((p) => {
      const newP = p;
      newP.x = newPaddleX;
      return newP;
    });
  };

  return (
    <div
      className="h-full w-full flex flex-col"
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <BrickBreakerControls />
      <div
        className="h-full flex justify-center items-center bg-sky-700"
      >
        <div
          style={{
            height: board.height,
            width: board.width,
            background: board.color,
          }}
        >
          <div style={{ position: "relative", height: paddle.height, width: paddle.width, left: paddle.x, top: "95%", background: paddle.color}}></div>
        </div>
      </div>
    </div>
  );
};

export default BrickBreaker;
