import React, { useRef, useState, useEffect } from 'react'
import GamePiece from './GamePiece';

const MiniGolf = () => {
  const [boundaries, setBoundaries] = useState([]);
  const [ball, setBall] = useState({});
  const [board, setBoard] = useState({});

  const boardRef = useRef();

  function resizeBoard() {
    return boardRef.current.getBoundingClientRect();
  }

  function startGame(loadout) {
    const newBoard = resizeBoard();
    setBoard(newBoard);
    setBall({
      height: newBoard.height / 20,
      width: newBoard.width / 20,
      y: newBoard.y + newBoard.height / 2,
      x: newBoard.x + newBoard.width / 2,
      ySpeed: 0,
      xSpeed: 0,
    });
  }

  useEffect(() => {
    startGame();
  }, [])
    
  return (
    <div className="h-full w-full bg-[#89a934]" ref={boardRef}>
      <GamePiece piece={ball} />
    </div>
  )
}

export default MiniGolf