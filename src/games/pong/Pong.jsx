import React, { useRef, useState, useEffect } from 'react'
import Render from './Render';

const Pong = () => {
    const [board, setBoard] = useState({});
    const [playerPaddle, setPlayerPaddle] = useState({});
    const [cpuPaddle, setCpuPaddle] = useState({});
    const [ball, setBall] = useState({});
    const [score, setScore] = useState({player: 0, cpu: 0});
    
    const boardRef = useRef(null);

    function resizeBoard() {
        const newBoard = boardRef.current.getBoundingClientRect()
        setBoard(newBoard);
        const paddle = {
            height: newBoard.height / 5,
            width: newBoard.width / 30,
            y: newBoard.y + newBoard.height / 2 - newBoard.height / 10,
            color: "white",
        }
        setPlayerPaddle({...paddle, x: newBoard.x + newBoard.width - paddle.width * 2});
        setCpuPaddle({...paddle, x: newBoard.x + paddle.width });
        setBall({
            height: newBoard.width / 30,
            width: newBoard.width / 30,
            y: newBoard.y + newBoard.height / 2 - newBoard.width / 60,
            x: newBoard.x + newBoard.width / 2 - newBoard.width / 60,
            ySpeed: 0,
            xSpeed: newBoard.width / 100,
            color: "white",
        })
    };

    function gameLoop() {
        setBall(b => {
            return {...b, x: b.x + b.xSpeed};
        })
    }

    function startGame() {
        resizeBoard();
        setScore({player: 0, cpu: 0});
    };

    useEffect(() => {
        startGame();
    }, []);



  return (
    <div className="h-full w-full bg-black" ref={boardRef}>
        {/* <Render obj={cpuPaddle} />
        <Render obj={playerPaddle} /> */}
        <Render obj={ball} />
    </div>
  )
}

export default Pong