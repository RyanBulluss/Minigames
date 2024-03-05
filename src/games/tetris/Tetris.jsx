import React, { useEffect, useState } from "react";
import TetrisControls from "./TetrisControls";
import { board, createState, getRandomPiece } from "./constants";
import GameCell from "./GameCell";

const Tetris = () => {
  const [playing, setPlaying] = useState(false);
  const [state, setState] = useState(createState);
  const [currentPiece, setCurrentPiece] = useState([]);

  function spawnPiece() {
    const newPiece = getRandomPiece();
    setState((s) => {
      const newState = JSON.parse(JSON.stringify(s));
      const newCurrent = [];
      let y = 0;
      let x = 0;
      newPiece.forEach((val, idx) => {
        if (idx !== 0 && idx % 4 === 0) {
          y++;
          x = 0;
        }
        newState[y][x] = val;
        if (val) newCurrent.push([y, x, val]);
        x++;
      });
      setCurrentPiece(newCurrent);
      return newState;
    });
  }

  function movePiece(num) {
    let validPos = true;
    let newPosition = [];
    currentPiece.forEach((piece) => {
      if (piece[1] + num >= state[0].length || piece[1] + num < 0) {
        validPos = false;
      } else {
        newPosition.push([piece[0], piece[1] + num, piece[2]]);
      }
    });
    if (validPos) {
      setState((s) => {
        const newState = JSON.parse(JSON.stringify(s));
        currentPiece.forEach((val) => {
          newState[val[0]][val[1]] = 0;
        });
        newPosition.forEach((val) => {
          newState[val[0]][val[1]] = val[2];
        });
        return newState;
      });
    }
    setCurrentPiece(newPosition);
  }

  function gameLoop() {
    if (currentPiece.length < 1) return spawnPiece();
    const newLocation = currentPiece.map((piece) => [
      piece[0] + 1,
      piece[1],
      piece[2],
    ]);
    setState((s) => {
      if (newLocation[newLocation.length - 1][0] > state.length - 1) {
        setCurrentPiece([]);
        return state;
      }
      const newState = JSON.parse(JSON.stringify(s));
      let collision = false;

      currentPiece.forEach((val) => {
        newState[val[0]][val[1]] = 0;
      });
      newLocation.forEach((val) => {
        if (val[2] !== 0 && newState.length < val[0]) {
          collision = true;
        }
        if (newState[val[0]][val[1]] !== 0) {
          collision = true;
        }
        newState[val[0]][val[1]] = val[2];
      });

      if (collision) {
        setCurrentPiece([]);
        return s;
      } else {
        setCurrentPiece(newLocation);
        return newState;
      }
    });
  }

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      gameLoop();
    }, 300);

    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "a":
          movePiece(-1);
          break;
        case "d":
          movePiece(1);
          break;
        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playing, currentPiece]);




  return (
    <div className="h-full w-full flex flex-col">
      <TetrisControls setPlaying={setPlaying} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] grid w-[35vmin]"
        >
          {state.map((row, yIdx) =>
            row.map((value, xIdx) => (
              <GameCell key={yIdx + xIdx} value={value} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tetris;
