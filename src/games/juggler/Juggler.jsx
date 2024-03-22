import React, { useEffect, useRef, useState } from "react";
import JugglerControls from "./JugglerControls";
import { createScore } from "../../utilities/leaderboards";
import { gameOverSound, pop2Sound } from "../../variables/audio";

const Juggler = ({ currentGame, user, setUpdateLb }) => {
  const boardRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [firstGame, setFirstGame] = useState(true);

  const [lives, setLives] = useState(3);

  const [board, setBoard] = useState({});
  const [paddle, setPaddle] = useState({});
  const [balls, setBalls] = useState([]);

  async function gameOver() {
    setBalls([]);
    setPlaying(false);
    gameOverSound();
    await createScore(currentGame, user, score, timer);
    setUpdateLb((lb) => !lb);
  }

  function handleRestart() {
    setPlaying(true);
    setFirstGame(false);
    createBall();
    setTimer(0);
    setScore(0);
    handleSizeChange();
    setBalls([]);
    setLives(3);
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

  function rng(num) {
    // returns between 0 and num - 1 (for index)
    return Math.floor(Math.random() * num);
  }

  function createBall() {
    if (!playing) return;
    setBalls((b) => [
      ...b,
      {
        y: 0,
        x: rng(board.width - 30) + 1,
        ySpeed: board.height / 500,
        xSpeed: rng(board.width / 50) - board.width / 100,
        width: board.width / 30,
        height: board.height / 30,
        color: "#ddd",
      },
    ]);
    setScore((s) => s + 1);
  }

  function handleSizeChange() {
    const newBoard = boardRef.current.getBoundingClientRect();
    setBoard(newBoard);
    setPaddle({
      y: newBoard.height - newBoard.height / 20,
      x: 0,
      width: newBoard.width / 3,
      height: newBoard.height / 20,
      color: "linear-gradient(to top, #fbf8f7, #aba8a7)",
    });
    // setBalls([
    //   {
    //     y: 0,
    //     x: 0,
    //     ySpeed: newBoard.height / 500,
    //     xSpeed: newBoard.width / 100,
    //     width: newBoard.width / 30,
    //     height: newBoard.height / 30,
    //     color: "#ddd",
    //   },
    //   {
    //     y: newBoard.height * 0.7,
    //     x: newBoard.width * 0.9,
    //     ySpeed: newBoard.height / 500,
    //     xSpeed: -newBoard.width / 100,
    //     width: newBoard.width / 30,
    //     height: newBoard.height / 30,
    //     color: "#ddd",
    //   },
    //   {
    //     y: newBoard.height / 4,
    //     x: newBoard.width / 2,
    //     ySpeed: newBoard.height / 500,
    //     xSpeed: newBoard.width / 100,
    //     width: newBoard.width / 30,
    //     height: newBoard.height / 30,
    //     color: "#ddd",
    //   },
    // ]);
  }

  function checkAngle(idx) {
    const b = balls[idx].x + balls[idx].width / 2;
    const tenth = paddle.width / 10;
    const p = paddle.x;
    let angle = board.width / 50;
    if (b < p + tenth * 10) angle = board.width / 150;
    if (b < p + tenth * 9) angle = board.width / 225;
    if (b < p + tenth * 8) angle = board.width / 225;
    if (b < p + tenth * 7) angle = board.width / 300;
    if (b < p + tenth * 6) angle = board.width / 500;
    if (b < p + tenth * 5) angle = -board.width / 500;
    if (b < p + tenth * 4) angle = -board.width / 300;
    if (b < p + tenth * 3) angle = -board.width / 225;
    if (b < p + tenth * 2) angle = -board.width / 225;
    if (b < p + tenth) angle = -board.width / 150;
    return angle;
  }

  function checkBoundaries() {
    balls.forEach((ball, idx) => {
      const newX = ball.x + ball.xSpeed;
      const newY = ball.y + ball.ySpeed;
      let x = false;
      let y = false;

      if (newX + ball.width >= board.width || newX <= 0) {
        x = true;
      }

      if (newY <= 0) {
        y = true;
      }

      setBalls((bs) => {
        const newBalls = [];
        bs.forEach((obj) => newBalls.push({ ...obj }));
        if (x) newBalls[idx].xSpeed = -bs[idx].xSpeed;
        if (y) newBalls[idx].ySpeed = -bs[idx].ySpeed;
        return newBalls;
      });

      if (newY + ball.height >= board.height) {
        setLives((l) => l - 1);
        if (lives - 1 < 1) gameOver();
        setBalls((b) => {
          const newBalls = [...b];
          newBalls.splice(idx, 1);
          return newBalls;
        });
      }
    });
  }

  function checkPaddle() {
    balls.forEach((ball, idx) => {
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
        const angle = checkAngle(idx);
        setBalls((b) => {
          const newBalls = [...b];
          newBalls[idx].ySpeed = -board.height / 100;
          newBalls[idx].xSpeed = angle;
          return newBalls;
        });
      }
    });
  }

  function moveBall() {
    if (!playing) return;
    checkPaddle();
    checkBoundaries();

    setBalls((bs) => {
      const newBalls = [];
      bs.forEach((b) => {
        const newBall = { ...b };
        newBall.x += b.xSpeed;
        newBall.y += b.ySpeed;
        newBall.ySpeed += 0.05;
        newBalls.push(newBall);
      });
      return newBalls;
    });
  }

  useEffect(() => {
    handleSizeChange();
  }, []);

  useEffect(() => {
    if (balls.length === 0) createBall();
    const ballInterval = setInterval(() => {
      createBall();
    }, 5000);

    const timerInterval = setInterval(() => {
      if (!playing) return;
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(ballInterval);
      clearInterval(timerInterval);
    };
  }, [board, playing]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveBall();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [playing, balls, board]);

  useEffect(() => {
    const newBoard = boardRef.current;
    window.addEventListener("resize", handleSizeChange);
    newBoard.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleSizeChange);
      newBoard.removeEventListener("mousemove", handleMouseMove);
    };
  }, [board, paddle]);

  return (
    <div className="h-full flex flex-col">
      <JugglerControls
        score={score}
        timer={timer}
        lives={lives}
        handleRestart={handleRestart}
        firstGame={firstGame}
      />
      <div className="bg-[#333] h-[80vmin] flex justify-center items-center cursor-none">
        <div className="relative bg-[#666] h-[90%] w-[90%]" ref={boardRef}>
          {balls.map((ball, idx) => (
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
          ))}
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

export default Juggler;
