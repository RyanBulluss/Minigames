import React, { useEffect, useState } from "react";
import NumbersControls from "./NumbersControls";
import GameCell from "./GameCell";
import { board, createState, spawnNewNumber, adjacents } from "./constants";

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
    newState = checkLoss(newState)


    setState(newState);
  }

  function checkLoss(newState) {
    let loss = true
    newState.forEach((arr, y) => arr.forEach((num, x) => {
      if (num === 0) loss = false;
  
      adjacents.forEach(adj => {
        if (loss) {
          const newY = y + adj[0];
          const newX = x + adj[1];
          if (newX >= 0 && newX < 4 && newY >= 0 && newY < 4 && newState[newY][newX] === num) {
            loss = false
          }
        }
      })
      
    }))
    if (loss) {
      gameOver();
    } else {
      if (stateChanged(newState)) {
        newState = spawnNewNumber(newState);
        setScore(s => s + 1)
      }
    }

    return newState
  }

  function stateChanged(newState) {
    let changed = false;
    newState.forEach((arr, y) => arr.forEach((num, x) => {
      if (!changed && state[y][x] !== num) {
        changed = true;
      }
    }))
    return changed;
  }

  function gameOver() {
    console.log("Game Over")
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
    if (!playing) return;
    const timerInterval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [playing]);


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
