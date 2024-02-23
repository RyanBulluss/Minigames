import React, { useState } from "react";
import BrickBreakerControls from "./BrickBreakerControls"
import { board, startBall, startPaddle } from "./constants"
import { boardHeight } from "../snake/constants";

const BrickBreaker = () => {
  const [paddle, setPaddle] = useState(startPaddle);

  // const handleMouseMove = (e) => {
  //   const mouseX = e.clientX;
  //   const paddleHalfWidth = paddle.width / 2;
  //   const newPaddleX = mouseX - board.margin - paddleHalfWidth;
  //   const leftBound = 0 + board.margin + paddleHalfWidth;
  //   const rightBound = board.width + board.margin - paddleHalfWidth;
  //   if (mouseX < leftBound) return setPaddleX(0);
  //   if (mouseX > rightBound) return setPaddleX(board.width - paddle.width);
  //   setPaddleX(newPaddleX);
  // };

  return (
    <div className="h-full w-full flex flex-col">
      <BrickBreakerControls />
      <div className="h-full flex justify-center items-center bg-sky-700">
        {/* <div style={{backgroundColor: board.color, height: `${board.height}vmin`, width: `${board.width}vmin`}}>
          {/* <div style={{position: "relative", backgroundColor: paddle.color, height: `${paddle.height}vmin`, width: `${paddle.width}vmin`, top: `${board.height - paddle.height}vmin`, left: `${paddle.x}vmin`}}></div> */}
          
          <canvas></canvas>
      </div>
    </div>
  );
};

export default BrickBreaker;
