import React, { useState, useRef, useEffect } from "react";
import BrickBreakerControls from "./BrickBreakerControls";

const BrickBreaker = () => {
  const boardRef = useRef(null);

  const [playing, setPlaying] = useState(true);
  const [board, setBoard] = useState({})
  const [paddle, setPaddle] = useState({})
  const [ball, setBall] = useState({})

  function checkBoundaries() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;
    
    if (newX + ball.width >= board.width || newX <= 0) {
      setBall({...ball, xSpeed: -ball.xSpeed});
    }
    
    if (newY <= 0) {
      setBall({...ball, ySpeed: -ball.ySpeed});
    }

    if (newY + ball.height >= board.height) setPlaying(false);
  }

  function checkPaddle() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;

    if (
      newX + ball.width <= paddle.x + paddle.width &&
      newX >= paddle.x &&
      newY + ball.height <= paddle.y + paddle.height &&
      newY + ball.height > paddle.y
      ) {
        if (ball.ySpeed < 0) return;
        console.log("hit")
        setBall(b => {
          const newBall = {...b};
          newBall.ySpeed *= -1;
          return newBall
        })
      }
  }

  function checkBrick() {

  }

  function moveBall() {
    if (!playing) return;
    checkPaddle();
    checkBoundaries();
    checkBrick();

    setBall(b => {
      const newBall = {...b};
      newBall.x += b.xSpeed;
      newBall.y += b.ySpeed;
      return newBall;
    })
  }

  function resizeBoard() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard)
    setPaddle({
      y: newBoard.height - newBoard.height / 20,
      x: 0,
      width: newBoard.width / 5,
      height: newBoard.height / 20,
      color: 'white',
    })
    setBall({
      y: 0,
      x: 0,
      ySpeed: newBoard.height / 200,
      xSpeed: newBoard.width / 100,
      width: newBoard.width / 50,
      height: newBoard.height / 50,
      color: 'blue',
    })
  }

  const handleMouseMove = (event) => {
    const rect = boardRef.current.getBoundingClientRect();
    const left = event.clientX - rect.left;

    if (left - paddle.width / 2 < 0) {
      setPaddle(p => {
        return {...p, x: 0}
      })
    } else if (left > board.width - paddle.width / 2) {
      setPaddle(p => {
        return {...p, x: board.width - paddle.width}
      })
    } else setPaddle(p => {
      return {...p, x: left - paddle.width / 2}
    })
  };

  useEffect(() => {
    resizeBoard();
  }, [])
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [ball.x])
  
  useEffect(() => {
    const newBoard = boardRef.current
    window.addEventListener('resize', resizeBoard);
    newBoard.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', resizeBoard);
      newBoard.removeEventListener('mousemove', handleMouseMove);
    };
  }, [board]);
 

  return (
    <div className="h-full flex flex-col">
      <BrickBreakerControls setPlaying={setPlaying} />
      <div className="bg-[#333] h-[80vmin] flex justify-center items-center cursor-none">
        <div className="relative bg-[#666] h-[90%] w-[90%] border" ref={boardRef}>
          <div style={{position: "absolute", height: ball.height, width: ball.width, top: ball.y, left: ball.x, background: ball.color, borderRadius: "50%"}}></div>
          <div style={{position: "absolute", height: paddle.height, width: paddle.width, top: paddle.y, left: paddle.x, border: "solid"}}></div>
        </div>
      </div>
    </div>
  );
};
export default BrickBreaker;
