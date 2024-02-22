import React from "react";
import { useState, useEffect } from "react";
import SnakeControls from "./SnakeControls";
import {
  boardWidth,
  boardHeight,
  gameSpeed,
  createState,
  snakeStartPosition,
  snakeStartLength,
} from "./constants";
import { checkNextPosition, rng } from "./functions";
import GameCell from "./GameCell";

const Snake = () => {
  const [state, setState] = useState(createState());
  const [snake, setSnake] = useState(snakeStartPosition);
  const [snakeLength, setSnakeLength] = useState(snakeStartLength);
  const [direction, setDirection] = useState("RIGHT");
  const [lastDirection, setLastDirection] = useState("RIGHT");
  const [playing, setPlaying] = useState(false);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  function moveSnake() {
    const newPosition = checkNextPosition([...snake[0]], direction);
    setLastDirection(direction);
    const newSnake = [newPosition, ...snake];

    if (snake.length > snakeLength) newSnake.pop();

    if (outOfBounds(newPosition)) return gameOver();
    if (hittingSelf(newPosition)) return gameOver();
    hittingFood(newPosition);

    renderSnake(newSnake);
    setSnake(newSnake);
  }

  function hittingFood(newPosition) {
    if (state[newPosition[0]][newPosition[1]].food) {
      setSnakeLength(snakeLength + 1);
      setScore(score + 1);
      setState((s) => {
        const newState = [...s];
        newState[newPosition[0]][newPosition[1]].food = false;
        return newState;
      });
      spawnFood();
    }
  }

  function spawnFood() {
    let location;
    while (!location) {
      let n1 = rng(boardHeight);
      let n2 = rng(boardWidth);
      if (!state[n1][n2].food && !state[n1][n2].snake) {
        location = [n1, n2];
      }
    }
    setState((s) => {
      let newState = [...s];
      newState[location[0]][location[1]].food = true;
      return newState;
    });
  }

  function hittingSelf(newPosition) {
    if (state[newPosition[0]][newPosition[1]].snake) {
      return true;
    } else return false;
  }

  function outOfBounds(newPosition) {
    if (
      newPosition[0] >= boardHeight ||
      newPosition[1] >= boardWidth ||
      newPosition[0] < 0 ||
      newPosition[1] < 0
    ) {
      return true;
    } else return false;
  }

  function gameOver() {
    setAlive(false);
  }

  function restartGame() {
    setPlaying(true);
    setAlive(true);
    setState(createState());
    setSnake(snakeStartPosition);
    setSnakeLength(snakeStartLength);
    setDirection("RIGHT");
    setLastDirection("RIGHT");
    setTimer(0);
    setScore(0);
  }

  useEffect(() => {
    if (!playing) return;
    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "ArrowUp":
          if (lastDirection === "DOWN") return;
          setDirection("UP");
          break;
        case "ArrowDown":
          if (lastDirection === "UP") return;
          setDirection("DOWN");
          break;
        case "ArrowRight":
          if (lastDirection === "LEFT") return;
          setDirection("RIGHT");
          break;
        case "ArrowLeft":
          if (lastDirection === "RIGHT") return;
          setDirection("LEFT");
          break;
        case "w":
          if (lastDirection === "DOWN") return;
          setDirection("UP");
          break;
        case "s":
          if (lastDirection === "UP") return;
          setDirection("DOWN");
          break;
        case "a":
          if (lastDirection === "RIGHT") return;
          setDirection("LEFT");
          break;
        case "d":
          if (lastDirection === "LEFT") return;
          setDirection("RIGHT");
          break;
          // commented to allow space for comments
        // case " ":
        //   if (alive) {
        //     setPlaying(!playing);
        //   } else restartGame();
        //   break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [lastDirection, playing, alive]);

  useEffect(() => {
    if (!playing) return;
    if (!alive) return;
    const interval = setInterval(() => {
      moveSnake();
    }, gameSpeed);

    return () => clearInterval(interval);
  }, [snake, direction, playing, alive]);

  useEffect(() => {
    if (!playing) return;
    if (!alive) return;
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, alive, timer]);

  function renderSnake(newSnake) {
    setState((s) => {
      const newState = [...s];
      newSnake.forEach((arr) => {
        newState[arr[0]][arr[1]].snake = true;
      });
      if (snake.length > snakeLength) {
        const oldPos = snake[snake.length - 1];
        newState[oldPos[0]][oldPos[1]].snake = false;
      }
      return newState;
    });
  }

  return (
    <div className="h-full w-full flex flex-col">
      <SnakeControls
        score={score}
        setPlaying={setPlaying}
        playing={playing}
        timer={timer}
        restartGame={restartGame}
        alive={alive}
      />
      <div className="h-full flex justify-center items-center snake-background">
        {!playing && alive && (
          <div className="bg-black/50 absolute h-[70vmin] w-[80vmin] z-20 flex flex-col justify-center items-center">
            <h3>Game Paused</h3>
            <h4>Press space to unpause</h4>
          </div>
        )}
        {!alive && (
          <div className="bg-black/60 absolute h-[70vmin] w-[80vmin] z-30 flex flex-col justify-center items-center">
            <h3>You Died!</h3>
            <h3>You score was {score}</h3>
            <h4>Press space to play again</h4>
          </div>
        )}
        <div
          style={{
            gridTemplateColumns: `repeat(${boardWidth}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[80vmin] grid"
        >
          {state.map((arr, yIdx) =>
            arr.map((obj, xIdx) => <GameCell content={obj} y={yIdx} x={xIdx} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Snake;
