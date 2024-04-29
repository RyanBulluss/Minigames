import React, { useRef, useState, useEffect } from 'react'
import { GamePiece } from './constants';
import { checkBorders } from "../../variables/boundaries"

const Mario = () => {
    const [staticPieces, setStaticPieces] = useState([]);
    const [board, setBoard] = useState({});

    const boardRef = useRef(null);

    function resizeGame() {
        const newBoard = boardRef.current.getBoundingClientRect();
        newBoard.gridSize = 20;
        newBoard.gridHeight = newBoard.height / newBoard.gridSize;
        newBoard.gridWidth = newBoard.width / newBoard.gridSize;
        return newBoard;
    }

    function startGame() {
        setBoard(resizeGame());
    }

    function createFloor() {
        const floor = [];

        for (let i = 0; i < board.gridSize; i++) {
            const newPiece = new GamePiece("brick", board.y + board.height - board.gridHeight, board.x + (board.gridWidth * i), board.gridHeight, board.gridWidth);
            floor.push(newPiece);
        }
        setStaticPieces(s => {
            return [...s, ...floor];
        })
    }

    function createStairs(num, startY, startX) {
        const floor = [];
        let y = board.y + board.height - board.gridHeight * startY;
        let x = board.x + board.gridWidth * startX;

        for (let i = 0; i < num; i++) {
            y = board.y + board.height - board.gridHeight * (startY + i);
            x = board.x + board.gridWidth * startX;
            for (let j = i; j < num; j++) {
                const newPiece = new GamePiece("brick", y, x, board.gridHeight, board.gridWidth);
                floor.push(newPiece);
                x -= board.gridWidth;
            }
        }

        setStaticPieces(s => {
            return [...s, ...floor];
        })
    }

    useEffect(() => {
        startGame();
        window.addEventListener("resize", startGame);

        return () => {
            window.removeEventListener("resize", startGame);
        }
    }, []);

  return (
    <div className="h-full w-full bg-sky-800" ref={boardRef}>
        <button onClick={createFloor}>Create Floor</button>
        <button onClick={() => createStairs(10, 2, 19)}>Create Stairs</button>
        {staticPieces.map((piece, idx) => (
            <div key={idx}
            style={{
                position: "absolute",
                top: piece.y,
                left: piece.x,
                height: piece.height,
                width: piece.width,
                backgroundColor: "brown",
                border: "solid black 1px",
                zIndex: checkBorders(board, piece) ? -30 : 30
            }}
            >
            </div>
        ))}
    </div>
  )
}

export default Mario