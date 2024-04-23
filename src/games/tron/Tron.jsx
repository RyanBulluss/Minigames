import React, { useRef, useState, useEffect } from "react";
import { createState, boardHeight, boardWidth } from "./constants";
import Cell from "./Cell";
import { gameOverSound, winSound, swipeSound, hitSound } from "../../variables/audio";

const directions = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0],
};

const numHorizontalLines = 20;
const numVerticalLines = 20;

const horizontalGap = 100 / numHorizontalLines;
const verticalGap = 100 / numVerticalLines;

const Tron = () => {
  const [state, setState] = useState([[]]);
  const [players, setPlayers] = useState({});
  const [playing, setPlaying] = useState(false);
  const [win, setWin] = useState(false);

  function startGame(numOfPlayers) {
    let [newState, newPlayers] = createState(numOfPlayers);
    setPlayers(newPlayers);
    setState(newState);
    setPlaying(true);
  }

  function gameOver(bool) {
    if (bool) winSound();
    if (!bool) gameOverSound();
    setPlaying(false);
    setWin(bool);
  }

  function checkBoundaries(y, x) {
    if (y < boardHeight && y >= 0 && x >= 0 && x < boardWidth) {
        return true;
    } return false;
  }

  function cpuDirection(p, s) {
    let [dirY, dirX] = directions[p.direction];
    let newY = p.y + dirY;
    let newX = p.x + dirX;
    if (checkBoundaries(newY, newX) && s[newY][newX] === 0) return p;
    let dirArr;
    if (p.direction === "up" || p.direction === "down") {
        dirArr = ["left", "right"];
    } else {
        dirArr = ["up", "down"];
    }

    const randNum = Math.floor(Math.random() * 2);

    [dirY, dirX] = directions[dirArr[randNum]];
    newY = p.y + dirY;
    newX = p.x + dirX;
    if (checkBoundaries(newY, newX) && s[newY][newX] === 0) {
      swipeSound();
      return {...p, direction: dirArr[randNum]};
    } 

    dirArr.splice(randNum, 1);

    [dirY, dirX] = directions[dirArr[0]];
    newY = p.y + dirY;
    newX = p.x + dirX;
    if (checkBoundaries(newY, newX) && s[newY][newX] === 0) {
      swipeSound();
      return {...p, direction: dirArr[0]};
    }

    return p;
  }

  function movePlayers() {
    const newP = { ...players };
    const newS = [...state];

    let lossCheck = false;
    let winCheck = true;

    for (let i = 1; i < 5; i++) {
      let player = newP[i];
      if (!player) continue;
      if (player.dead) continue;
      if (i !== 1) {
        player = cpuDirection(player, newS);
      }
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
        hitSound();
        if (i === 1) lossCheck = true;
        continue;
      }
      if (i === 1) {
        newP[i].lastDirection = newP[i].direction;
      }
      newS[newY][newX] = i;
      newP[i].y = newY;
      newP[i].x = newX;
      newP[i].direction = player.direction;
      if (i !== 1 && !newP[i].dead) winCheck = false;
    }
    if (lossCheck) gameOver(false);
    if (winCheck) gameOver(true);
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
        swipeSound();
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
        swipeSound();
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
        swipeSound();
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
        swipeSound();
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(interval);
    };
  }, [players, state, playing]);

  return (
    <div className="relative h-full w-full">
      {!playing && (
        <div 
          className="h-full w-full absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-2xl gap-8 z-40 font-semibold"
        >
            <h3 className="text-3xl">
                {win ? "You win!" : "You Lose!"}
            </h3>
          <h3>How many opponents?</h3>
          <div className="flex gap-8">
            <button onClick={() => startGame(2)}>1</button>
            <button onClick={() => startGame(3)}>2</button>
            <button onClick={() => startGame(4)}>3</button>
          </div>
        </div>
      )}
            
      <div
        className="h-full w-full grid"
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
