import React, { useRef, useState, useEffect } from 'react'
import { createState, boardHeight, boardWidth } from "./constants"
import Cell from './Cell';

const directions = {
    left: [0, -1],
    right: [0, 1],
    up: [-1, 0],
    down: [1, 0],
}

const Tron = () => {
    const [state, setState] = useState([[]]);
    const [players, setPlayers] = useState({});
    const [playing, setPlaying] = useState(false);

    function startGame() {
        let [newState , newPlayers] = createState(1);
        setPlayers(newPlayers);
        setState(newState);
        setPlaying(true);
    }

    function gameOver() {
        setPlaying(false);
    }

    function movePlayers() {
        const newP = {...players};
        const newS = [...state];

        let lossCheck = false;
        
        for (let i = 1; i < 5; i++) {
            const player = newP[i];
            if (!player) continue;
            if (player.dead) continue;
            let [newY, newX] = directions[player.direction]
            newY += player.y;
            newX += player.x;
            if (newY < 0 || newY > boardHeight || newX < 0 || newX > boardWidth || newS[newY][newX] ) {
                newP[i].dead = true;
                if (i === 1) lossCheck = true;
                continue;
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
        startGame()
    }, []);

    useEffect(() => {
        if (!playing) return
        const interval = setInterval(() => {
            gameLoop();
        }, 100);

        function handleKeyPress(e) {
            e.preventDefault();
            const k = e.key;

            if (k === "W" || k === "w" || k === "ArrowUp") {
                setPlayers({...players, 1: {...players[1], direction: "up"}});
            }
            if (k === "S" || k === "s" || k === "ArrowDown") {
                setPlayers({...players, 1: {...players[1], direction: "down"}});
            }
            if (k === "A" || k === "a" || k === "ArrowLeft") {
                setPlayers({...players, 1: {...players[1], direction: "left"}});
            }
            if (k === "D" || k === "d" || k === "ArrowRight") {
                setPlayers({...players, 1: {...players[1], direction: "right"}});
            }
        }

        window.addEventListener("keydown", handleKeyPress);
        
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
            clearInterval(interval);
        }
    }, [players, state, playing]);

  return (
    <div className="h-full w-full bg-sky-500 grid gap-[1px]" style={{gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(20, 1fr)'}}>
        {state.map((arr, yIdx) => arr.map((value, xIdx) => (
            <Cell key={yIdx + xIdx} value={value} />
        )))}
    </div>
  )
}

export default Tron