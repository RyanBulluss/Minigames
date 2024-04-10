import React, { useState, useRef, useEffect } from "react";
import BrickBreakerControls from "./BrickBreakerControls";
import { levels, bricksPerRow } from "./constants";
import Brick from "./Brick";
import { createScore } from "../../utilities/leaderboards";
import { popSound, pop2Sound, gameOverSound } from "../../variables/audio";

const BrickBreaker = ({ currentGame, user, setUpdateLb }) => {
  const boardRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [board, setBoard] = useState({});
  const [paddle, setPaddle] = useState({});
  const [ball, setBall] = useState({});
  const [bricks, setBricks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [firstGame, setFirstGame] = useState(true);

  async function gameOver() {
    setBricks([]);
    setPlaying(false);
    gameOverSound();
    await createScore(currentGame, user, score, timer);
    setUpdateLb((lb) => !lb);
  }

  function handleRestart() {
    setFirstGame(false);
    setTimer(0);
    setScore(0);
    resizeBoard();
    setBricks([]);
    setPlaying(true);
  }

  function checkBoundaries() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;

    if (newX + ball.width >= board.width || newX <= 0) {
      setBall({ ...ball, xSpeed: -ball.xSpeed });
    }

    if (newY <= 0) {
      setBall({ ...ball, ySpeed: -ball.ySpeed });
    }

    if (newY + ball.height >= board.height) gameOver();
  }

  function createBricks(level) {
    let newBricks = [];
    let x = 0;
    let y = 0;
    level.forEach((brick, idx) => {
      if (idx % bricksPerRow === 0) {
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
      pop2Sound();
      const angle = checkAngle();
      setBall((b) => {
        const newBall = { ...b };
        newBall.ySpeed *= -1;
        newBall.xSpeed = angle;
        return newBall;
      });
      if (
        bricks.length === 0 ||
        bricks.every((brick) => brick.hitsRemaining === 0)
      ) {
        if (bricks.length !== 0) {
          setScore(score + 1000);
        }
        createBricks(levels[Math.floor(Math.random() * levels.length)]);
      }
    }
  }

  function updateDifficulty() {
    setPaddle((p) => {
      const newPaddle = { ...p };
      newPaddle.width = board.width / (5 + score / 5000);
      return newPaddle;
    });
    setBall((b) => {
      const newBall = { ...b };
      newBall.ySpeed =
        b.ySpeed > 0
          ? board.height / (100 - score / 200)
          : -board.height / (100 - score / 200);
      return newBall;
    });
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
      y: newBoard.height - newBoard.height / 25,
      x: 0,
      width: newBoard.width / 5,
      height: newBoard.height / 25,
      color: "linear-gradient(to top, #fbf8f7, #aba8a7)",
    });
    setBall({
      y: 0,
      x: 0,
      ySpeed: newBoard.height / 100,
      xSpeed: newBoard.width / 100,
      width: newBoard.width / 30,
      height: newBoard.height / 30,
      color: "linear-gradient(to top, #fbf8f7, #ebe8e7)",
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
    const interval2 = setInterval(() => {
      if (!playing) return;
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval2);
    };
  }, [timer, playing]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [ball, playing]);

  useEffect(() => {
    const newBoard = boardRef.current;
    window.addEventListener("resize", resizeBoard);
    newBoard.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeBoard);
      newBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board, paddle]);


  function checkBrick() {
    const newX = ball.x + ball.xSpeed;
    const newY = ball.y + ball.ySpeed;
    const ballRight = newX + ball.width;
    const ballLeft = newX;
    const ballBottom = newY + ball.height;
    const ballTop = newY;

    for (let idx = 0; idx < bricks.length; idx++) {
      const brick = bricks[idx];
      const brickLeft = brick.x;
      const brickRight = brick.x + brick.width;
      const brickTop = brick.y;
      const brickBottom = brick.y + brick.height;


      if (
        ballRight >= brickLeft &&
        ballLeft <= brickRight &&
        ballBottom > brickTop &&
        ballTop < brickBottom &&
        brick.hitsRemaining > 0
      ) {

        const distTop = brickTop - ballBottom;
        const distBottom = ballTop - brickBottom;
        const distRight = ballLeft - brickRight;
        const disLeft = brickLeft - ballRight;
        popSound();
        setScore(score + 100);
        if (distTop >= distBottom && distTop >= distRight && distTop >= disLeft) {
          setBall({
            ...ball,
            ySpeed: ball.ySpeed > 0 ? -ball.ySpeed : ball.ySpeed,
          })
        } else if (
          distBottom >= distTop &&
          distBottom >= distRight &&
          distBottom >= disLeft
        ) {
          setBall({
            ...ball,
            ySpeed: ball.ySpeed < 0 ? -ball.ySpeed : ball.ySpeed,
          });
        } else if (
          distRight >= distBottom &&
          distRight >= distTop &&
          distRight >= disLeft
        ) {
          setBall({
            ...ball,
            xSpeed: ball.xSpeed > 0 ? ball.xSpeed : -ball.xSpeed,
          });
        } else if (disLeft >= distBottom && disLeft >= distRight && disLeft >= distTop) {
          setBall({
            ...ball,
            xSpeed: ball.xSpeed < 0 ? ball.xSpeed : -ball.xSpeed,
          });
        }
        setBricks((b) => {
          const newBricks = [...b];
          newBricks[idx] = { ...brick, hitsRemaining: brick.hitsRemaining - 1 };
          return newBricks;
        });
      }
      updateDifficulty();
    }
  }

  return (
    <div className="h-full flex flex-col">
      <BrickBreakerControls
        handleRestart={handleRestart}
        timer={timer}
        score={score}
        firstGame={firstGame}
      />
      <div className="bg-[#333] h-[80vmin] flex justify-center items-center cursor-none">
        <div className="relative bg-[#555] h-[90%] w-[90%]" ref={boardRef}>
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
          {!playing && (
            <div
              style={{
                position: "absolute",
                width: "100%",
                textAlign: "center",
                top: board.height / 2,
              }}
              className="text-2xl font-semibold"
            >
              {firstGame ? "Press Play To Start" : "Game Over"}
            </div>
          )}
          <div
            style={{
              position: "absolute",
              height: paddle.height,
              width: paddle.width,
              top: paddle.y,
              left: paddle.x,
              background: paddle.color,
              borderRadius: "100% 100% 0 0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default BrickBreaker;
