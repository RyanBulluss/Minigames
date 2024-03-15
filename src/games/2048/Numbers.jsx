import React, { useEffect, useState } from "react";
import NumbersControls from "./NumbersControls";
import GameCell from "./GameCell";
import { board, createState, spawnNewNumber } from "./constants";

const Numbers = ({ currentGame, user, setUpdateLb }) => {
  const [playing, setPlaying] = useState(true);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [state, setState] = useState(createState());

  function makeMove(direction) {
    if (!playing) return;
    let newState = JSON.parse(JSON.stringify(state));
    if (direction === "DOWN") {
      newState = moveDown(newState);
    } else if (direction === "UP") {
      newState = moveUp(newState);
    } else if (direction === "RIGHT") {
      newState = moveRight(newState);
    } else if (direction === "LEFT") {
      newState = moveLeft(newState);
    }
    if (checkLoss(newState)) {
      gameOver();
    } else {
      newState = spawnNewNumber(newState);
    }
    setState(newState);
  }

  function checkLoss(newState) {
    let loss = true
    newState.forEach(arr => arr.forEach(num => {
      if (num === 0) loss = false;
    }))
    return loss
  }

  function gameOver() {
    setPlaying(false);
  }

  function restartGame() {
    setState(createState());
    setPlaying(true);
    setTimer(0);
    setScore(0);
  }


  function moveDown(newState) {
    for (let j = 0; j < 3; j++) {
      for (let i = 1; i < newState.length + 1; i++) {
        const y = newState.length - i;
        newState[y].forEach((num, x) => {
          if (y + 1 < 4 && newState[y + 1][x] === 0) {
            newState[y + 1][x] = num;
            newState[y][x] = 0;
          } else if (y + 1 < 4 && newState[y + 1][x] === num ) {
            newState[y][x] = 0;
            newState[y + 1][x] = num * 2;
          }
        });
      }
    }
    return newState
  }
  
  function moveUp(newState) {
    for (let j = 0; j < 3; j++) {
      for (let i = 1; i < newState.length; i++) {
        const y = i;
        newState[y].forEach((num, x) => {
          if (y - 1 >= 0 && newState[y - 1][x] === 0) {
            newState[y - 1][x] = num;
            newState[y][x] = 0;
          } else if (y - 1 >= 0 && newState[y - 1][x] === num ) {
            newState[y][x] = 0;
            newState[y - 1][x] = num * 2;
          }
        });
      }
    }
    return newState
  }
  function moveLeft(newState) {
    for (let j = 0; j < 3; j++) {
      for (let i = 1; i < newState.length; i++) {
        const x = i;
        for (let y = 0; y < newState.length; y++) {
          let num = newState[y][x]
          if (x - 1 >= 0 && newState[y][x - 1] === 0) {
            newState[y][x - 1] = num;
            newState[y][x] = 0;
          } else if (x - 1 >= 0 && newState[y][x - 1] === num ) {
            newState[y][x] = 0;
            newState[y][x - 1] = num * 2;
          }
        }
      }
    }
    return newState
  }
  
  function moveRight(newState) {
    for (let j = 0; j < 3; j++) {
      for (let i = 1; i < newState.length + 1; i++) {
        const x = newState.length - i;
        for (let y = 0; y < newState.length; y++) {
          let num = newState[y][x]
          if (x + 1 < 4 && newState[y][x + 1] === 0) {
            newState[y][x + 1] = num;
            newState[y][x] = 0;
          } else if (x + 1 < 4 && newState[y][x + 1] === num ) {
            newState[y][x] = 0;
            newState[y][x + 1] = num * 2;
          }
        }
      }
    }
    return newState
  }


  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          makeMove("UP");
          break;
        case "ArrowDown":
          makeMove("DOWN");
          break;
        case "ArrowRight":
          makeMove("RIGHT");
          break;
        case "ArrowLeft":
          makeMove("LEFT");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [state]);

  return (
    <div className="h-full w-full flex flex-col">
      <NumbersControls timer={timer} score={score} restartGame={restartGame} />
      <div className="h-full flex justify-center items-center bg-[#bbada0]">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[70vmin] grid p-[10vmin] gap-4"
        >
          {state.map((arr) => arr.map((value) => <GameCell value={value} />))}
        </div>
      </div>
    </div>
  );
};

export default Numbers;
