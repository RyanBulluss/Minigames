import React, { useState } from "react";
import MinesweeperControls from "./MinesweeperControls";
import GameCell from "./GameCell";
import { createState, board, adjacents } from "./constants";

const Minesweeper = () => {
  const [state, setState] = useState(createState);
  const [playing, setPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  function handleCellClick(y, x) {
    if (!playing) return;
    setState((s) => {
      const newState = JSON.parse(JSON.stringify(s));
      newState[y][x].isRevealed = true;
      if (state[y][x].adjacentMines === 0) floodCells(y, x, newState);
      if (newState[y][x].isMine || checkWin(newState)) gameOver();
      return newState;
    });
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

  function gameOver() {
    revealMines();
    setPlaying(false);
    // Create leaderboard score
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

  function restartGame() {
    setTimer(0);
    setScore(0);
    setState(createState);
    setPlaying(true);
  }


  function floodCells(y, x, newState) {
    if (newState[y][x].isMine) return newState;
    newState[y][x].isRevealed = true;
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
        newState[newY][newX].isRevealed = true;
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
