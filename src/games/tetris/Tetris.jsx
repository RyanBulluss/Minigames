import React, { useEffect, useState } from "react";
import TetrisControls from "./TetrisControls";
import { board, createState, getRandomPiece } from "./constants";
import GameCell from "./GameCell";
import { createScore } from "../../utilities/leaderboards";

const Tetris = ({ currentGame, user, setUpdateLb }) => {
  const [playing, setPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [state, setState] = useState(createState);
  const [currentPiece, setCurrentPiece] = useState([]);
  const [pieceAngle, setPieceAngle] = useState([]);

  function spawnPiece() {
    const newState = checkRows();
    if (checkLoss(newState)) return gameOver();
    const newPiece = getRandomPiece();
    setPieceAngle(newPiece);
    setState((s) => {
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

  function startGame() {
    setTimer(0);
    setScore(0);
    setState(createState);
    setCurrentPiece([]);
    setPieceAngle([]);
    setPlaying(true);
  }

  function checkRows() {
    const newState = JSON.parse(JSON.stringify(state));

    state.forEach((arr, idx) => {
      if (arr.every((n) => n)) {
        newState.splice(idx, 1);
        newState.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setScore((s) => s + 100);
      }
    });

    return newState;
  }

  function checkLoss(newState) {
    const loss = newState[3].some((n) => n !== 0);
    return loss;
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
        let collision = false;
        currentPiece.forEach((val) => {
          newState[val[0]][val[1]] = 0;
        });
        newPosition.forEach((val) => {
          if (newState[val[0]][val[1]] !== 0) {
            collision = true;
          }
          newState[val[0]][val[1]] = val[2];
        });
        if (collision) return s;

        setCurrentPiece(newPosition);
        return newState;
      });
    }
  }

  function rotatePiece() {
    if (currentPiece.length < 1) return;
    const newPiece = [];
    for (let i = 0; i < 4; i++) {
      newPiece.push(pieceAngle.slice(i * 4, i * 4 + 4));
    }

    const transposedGrid = newPiece[0].map((_, colIndex) =>
      newPiece.map((row) => row[colIndex])
    );

    const reversedGrid = transposedGrid.reverse();

    const rotatedPiece = reversedGrid.flat();

    setPieceAngle(rotatedPiece);

    setState((s) => {
      const newState = JSON.parse(JSON.stringify(s));
      let anotherPiece = [];
      let collision = false;

      currentPiece.forEach((val) => {
        newState[val[0]][val[1]] = 0;
      });

      let [y, x] = [currentPiece[0][0], currentPiece[0][1] - 1];
      const oldX = x;
      rotatedPiece.forEach((num, idx) => {
        if (y > state.length - 1) return (collision = true);
        if (num !== 0) {
          if (newState[y][x] !== 0) collision = true;
          newState[y][x] = num;
          anotherPiece.push([y, x, num]);
        }
        const idxPlus = idx + 1;
        if (idxPlus % 4 === 0) {
          y += 1;
          x = oldX;
        } else {
          x += 1;
        }
      });

      if (collision) return state;

      setPieceAngle(rotatedPiece);
      setCurrentPiece(anotherPiece);
      return newState;
    });
  }

  async function gameOver() {
    setPlaying(false);
    await createScore(currentGame, user, score, timer);
    setUpdateLb((lb) => !lb);
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
    const timerInterval = setInterval(() => {
      if (!playing) return;
      setTimer((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [playing]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!playing) return;
      gameLoop();
    }, 200);

    const handleKeyPress = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "a":
          movePiece(-1);
          break;
        case "d":
          movePiece(1);
          break;
        case "s":
          gameLoop();
          break;
        case "w":
          rotatePiece();
          break;
        case "ArrowUp":
          rotatePiece();
          break;
        case "ArrowLeft":
          movePiece(-1);
          break;
        case "ArrowRight":
          movePiece(1);
          break;
        case "ArrowDown":
          gameLoop();
          break;
        case " ":
          startGame();
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
      <TetrisControls startGame={startGame} timer={timer} score={score} />
      <div className="h-full flex justify-center items-center bg-gray-600">
        <div
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
          }}
          className="h-[70vmin] grid w-[35vmin] bg-black p-4 rounded-2xl"
        >
          {state.map((row, yIdx) =>
            row.map((value, xIdx) => (
              <GameCell key={yIdx + xIdx} y={yIdx} value={value} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Tetris;
