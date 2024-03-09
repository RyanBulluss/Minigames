import React, { useEffect, useState } from "react";
import MinesweeperControls from "./MinesweeperControls";
import GameCell from "./GameCell";
import { createState, board, adjacents } from "./constants";
import { createScore } from "../../utilities/leaderboards";

const Minesweeper = ({ currentGame, user, setUpdateLb }) => {
  const [state, setState] = useState(createState);
  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  

  function handleCellClick(y, x) {
    if (!playing) return;
    const newState = JSON.parse(JSON.stringify(state));
    if (newState[y][x].isRevealed) return;
    newState[y][x].isRevealed = true;
    if (state[y][x].adjacentMines === 0 && !newState[y][x].isMine) {
      floodCells(y, x, newState);
    } else if (!newState[y][x].isMine) setScore(s => s + 1);
    setState(newState);
    if (newState[y][x].isMine || checkWin(newState)) gameOver();
  }

  function handleRightClick(e, y, x) {
    e.preventDefault();
    if (!playing) return;
    setState((s) => {
      const newState = JSON.parse(JSON.stringify(s));
      newState[y][x].isFlagged = !newState[y][x].isFlagged;
      return newState;
    });
  };

  async function gameOver() {
    await createScore(currentGame, user, score, timer);
    setUpdateLb(lb => !lb);
    revealMines();
    setPlaying(false);
  }

  function revealMines() {
    setState(s => {
      const newState = JSON.parse(JSON.stringify(s));
      newState.forEach((arr, y) => arr.forEach((obj, x) => {
        if (newState[y][x].isMine) newState[y][x].isRevealed = true;
      }))
      return newState;
    })
  }

  function checkWin(newState) {
    let win = true;
    newState.forEach(arr => arr.forEach(obj => {
      if (!obj.isMine && !obj.isRevealed) {
        win = false
      }
    }));
    return win;
  }

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [playing, timer])

  function restartGame() {
    setTimer(0);
    setScore(0);
    setState(createState);
    setPlaying(true);
  }


  function floodCells(y, x, newState) {
    if (newState[y][x].isMine) return newState;
    newState[y][x].isRevealed = true;
    setScore(s => s + 1);
    adjacents.forEach((adj) => {
      const newY = y + adj[0];
      const newX = x + adj[1];
      if (
        newY >= 0 &&
        newY < newState.length &&
        newX >= 0 &&
        newX < newState[0].length &&
        !newState[newY][newX].isRevealed &&
        !newState[newY][newX].isMine
        ) {
          if (newState[newY][newX].adjacentMines === 0 && !newState[newY][newX].isRevealed) floodCells(newY, newX, newState);
          if (!newState[newY][newX].adjacentMines !== 0 && !newState[newY][newX].isRevealed) {
            newState[newY][newX].isRevealed = true;
            setScore(s => s + 1);
          }
      }
    });
  };

  return (
    <div className="h-full w-full flex flex-col">
      <MinesweeperControls restartGame={restartGame} timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] w-[80vmin] grid"
        >
          {state.map((row, yIdx) =>
            row.map((obj, xIdx) => (
              <GameCell
                obj={obj}
                y={yIdx}
                x={xIdx}
                handleCellClick={handleCellClick}
                handleRightClick={handleRightClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Minesweeper;
