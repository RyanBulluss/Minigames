import { useState, useEffect, useRef } from "react";
import Rocket from "./Rocket";

const Lander = ({ currentGame, user, setUpdateLb }) => {
  const [rocket, setRocket] = useState({
    angle: 0,
    spinSpeed: 0,
    width: 10,
    height: 5,
    x: 10,
    y: 10,
    rightKeyDown: false,
    leftKeyDown: false,
  });
  const [board, setBoard] = useState({});
  const [playing, setPlaying] = useState(true);

  const boardRef = useRef(null);

  function gameLoop() {
    rotateRocket();
  }

  function startGame() {
    setBoard(resizeGame());
    setRocket({
      angle: 0,
      spinSpeed: 0,
      width: 10,
      height: 5,
      x: 10,
      y: 10,
    });

    setPlaying(true);
  }

  function rotateRocket() {
    const newRocket = { ...rocket };
    if (rocket.leftKeyDown && newRocket.spinSpeed - 0.1 > -5) {newRocket.spinSpeed -= 0.1};
    if (rocket.rightKeyDown && newRocket.spinSpeed + 0.1 < 5) {newRocket.spinSpeed += 0.1};

    if (newRocket.spinSpeed < 0.1 && newRocket.spinSpeed > -0.1) {
      setRocket((r) => {
        return { ...r, spinSpeed: 0 };
      });
      return;
    }

    newRocket.angle += rocket.spinSpeed;

    if (newRocket.spinSpeed > 0) {
      newRocket.spinSpeed -= 0.05;
    } else if (newRocket.spinSpeed < 0) {
      newRocket.spinSpeed += 0.05;
    }

    setRocket(newRocket);
  }

  function resizeGame() {
    const newBoard = boardRef.current.getBoundingClientRect();
    console.log(newBoard)
    return newBoard;
  }

  // Keybinds
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") {
        setRocket((r) => {
          return { ...r, leftKeyDown: true };
        });
      }
      if (k === "d" || k === "D" || k === "ArrowRight") {
        setRocket((r) => {
          return { ...r, rightKeyDown: true };
        });
      }
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") {
        setRocket((r) => {
          return { ...r, leftKeyDown: false };
        });
      }
      if (k === "d" || k === "D" || k === "ArrowRight") {
        setRocket((r) => {
          return { ...r, rightKeyDown: false };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [rocket]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [playing, rocket]);

  useEffect(() => {
    setBoard(resizeGame());
    window.addEventListener("resize", startGame);

    return () => {
      window.removeEventListener("resize", startGame);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full absoloute bg-gray-500" ref={boardRef}>
        <Rocket rocket={rocket} board={board} />
        {/* {rocket.angle} */}
        {/* {rocket.spinSpeed} */}
        {rocket.leftKeyDown === false ? 1 : 2}
        {rocket.rightKeyDown === false ? 1 : 2}
      </div>
    </div>
  );
};

export default Lander;
