import React, { useRef, useState, useEffect } from "react";
import { createState, boardHeight, boardWidth } from "./constants";
import Cell from "./Cell";

const directions = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0],
};

const Tron = () => {
  const [state, setState] = useState([[]]);
  const [players, setPlayers] = useState({});
  const [playing, setPlaying] = useState(false);

  function startGame(numOfPlayers) {
    let [newState, newPlayers] = createState(numOfPlayers);
    setPlayers(newPlayers);
    setState(newState);
    setPlaying(true);
  }

  function gameOver() {
    setPlaying(false);
  }

  function movePlayers() {
    const newP = { ...players };
    const newS = [...state];

    let lossCheck = false;

    for (let i = 1; i < 5; i++) {
      const player = newP[i];
      if (!player) continue;
      if (player.dead) continue;
      let [newY, newX] = directions[player.direction];
      newY += player.y;
      newX += player.x;
      if (
        newY < 0 ||
        newY >= boardHeight ||
        newX < 0 ||
        newX >= boardWidth ||
        newS[newY][newX]
      ) {
        newP[i].dead = true;
        if (i === 1) lossCheck = true;
        continue;
      }
      if (i === 1) {
        newP[i].lastDirection = newP[i].direction;
      }
      newS[newY][newX] = i;
      newP[i].y = newY;
      newP[i].x = newX;
    }
    if (lossCheck) gameOver();
    return [newS, newP];
  }

  function gameLoop() {
    const [newState, newPlayers] = movePlayers();
    setPlayers(newPlayers);
    setState(newState);
  }

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      gameLoop();
    }, 50);

    function handleKeyPress(e) {
      e.preventDefault();
      const k = e.key;
      const dir = players[1].direction;
      const lastDir = players[1].lastDirection;

      if (k === "W" || k === "w" || k === "ArrowUp") {
        if (
          dir === "up" ||
          dir === "down" ||
          lastDir === "up" ||
          lastDir === "down"
        )
          return;
        setPlayers({ ...players, 1: { ...players[1], direction: "up" } });
      }
      if (k === "S" || k === "s" || k === "ArrowDown") {
        if (
          dir === "up" ||
          dir === "down" ||
          lastDir === "up" ||
          lastDir === "down"
        )
          return;
        setPlayers({ ...players, 1: { ...players[1], direction: "down" } });
      }
      if (k === "A" || k === "a" || k === "ArrowLeft") {
        if (
          dir === "left" ||
          dir === "right" ||
          lastDir === "left" ||
          lastDir === "right"
        )
          return;
        setPlayers({ ...players, 1: { ...players[1], direction: "left" } });
      }
      if (k === "D" || k === "d" || k === "ArrowRight") {
        if (
          dir === "left" ||
          dir === "right" ||
          lastDir === "left" ||
          lastDir === "right"
        )
          return;
        setPlayers({ ...players, 1: { ...players[1], direction: "right" } });
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(interval);
    };
  }, [players, state, playing]);

  return (
    <div className="relative h-full w-full bg-sky-500 ">
      {!playing && (
        <div 
          className="h-full w-full absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-2xl gap-8"
        >
          <h3>How many opponents?</h3>
          <div className="flex gap-8">
            <button onClick={() => startGame(2)}>1</button>
            <button onClick={() => startGame(3)}>2</button>
            <button onClick={() => startGame(4)}>3</button>
          </div>
        </div>
      )}
      <div
        className="h-full w-full grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
          gridTemplateRows: `repeat(${boardHeight}, 1fr)`,
        }}
      >
        {state.map((arr, yIdx) =>
          arr.map((value, xIdx) => <Cell key={yIdx + xIdx} value={value} />)
        )}
      </div>
    </div>
  );
};

export default Tron;
