import React, { useRef, useState, useEffect } from 'react'
import { GamePiece } from './constants';

const Mario = () => {
    const [staticPieces, setStaticPieces] = useState([]);
    const [board, setBoard] = useState({});

    const boardRef = useRef(null);

    function resizeGame() {
        return boardRef.current.getBoundingClientRect();
    }

    function startGame() {
        setBoard(resizeGame());
    }

    function createBrick() {
        const newPiece = new GamePiece("brick", board.y, board.x, board.height / 10, board.width / 10)
        setStaticPieces(s => {
            return [...s, newPiece]
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
        <button onClick={() => createBrick()}>Create Brick</button>
        {staticPieces.map((SP, idx) => (
            <div key={idx}>
                {SP.height}
            </div>
        ))}
    </div>
  )
}

export default Mario