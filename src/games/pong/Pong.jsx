import React, { useRef, useState, useEffect } from 'react'
import Render from './Render';
import { checkBoundaries, checkCollision } from '../../variables/boundaries';

const Pong = () => {
    const [board, setBoard] = useState({});
    const [playerPaddle, setPlayerPaddle] = useState({});
    const [cpuPaddle, setCpuPaddle] = useState({});
    const [ball, setBall] = useState({});
    const [playing, setPlaying] = useState(false);
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
            ySpeed: newBoard.width / 1000,
            xSpeed: newBoard.width / 200,
            color: "white",
        })
    };

    function startGame() {
        resizeBoard();
        setScore({player: 0, cpu: 0});
        setPlaying(true);
    };

    function gameLoop() {
        const newBall = moveBall();
        const newCpuPaddle = moveCpuPaddle(newBall);
        setBall(newBall);
        setCpuPaddle(newCpuPaddle);
    }

    function moveCpuPaddle(newBall) {
        const newCpuPaddle = {...cpuPaddle};
        const midPaddle = newCpuPaddle.y + newCpuPaddle.height / 2;
        const midBall = newBall.y + newBall.height / 2;
        const dif = midPaddle - midBall;
        // if negative paddle needs to go down
        if (dif < board.height / 10 && dif > board.height / 10) {

        } else if (dif > 0) {
            newCpuPaddle.y -= board.height / 200;
            if (newCpuPaddle.y < board.y) newCpuPaddle.y = board.y;
        } else if (dif < 0) {
            newCpuPaddle.y += board.height / 200;
            if (newCpuPaddle.y + newCpuPaddle.height > board.y + board.height) newCpuPaddle.y = board.y + board.height - newCpuPaddle.height;
        }
        return newCpuPaddle;
    }

    function rng(n) {
        return Math.floor(Math.random() * n);
    }

    function moveBall() {
        let newBall = {...ball};
        newBall = checkBoundaries(board, newBall);
        newBall.x += newBall.xSpeed;
        newBall.y += newBall.ySpeed;
        if (checkCollision(newBall, playerPaddle)) {
            newBall.xSpeed = newBall.xSpeed > 0 ? -newBall.xSpeed : newBall.xSpeed;
            newBall.ySpeed = checkAngle(playerPaddle);
        }
        if (checkCollision(newBall, cpuPaddle)) {
            newBall.xSpeed = newBall.xSpeed < 0 ? -newBall.xSpeed : newBall.xSpeed;
            newBall.ySpeed = checkAngle(cpuPaddle);
        }
        return newBall
    }

    function checkAngle(paddle) {
        const b = ball.y + ball.height / 2;
        const p = paddle.y;
        const tenth = paddle.height / 10;
        let speed = board.height / 200;
        if (b < p + tenth * 10) speed = board.height / 200;
        if (b < p + tenth * 9) speed = board.height / 250;
        if (b < p + tenth * 8) speed = board.height / 350;
        if (b < p + tenth * 7) speed = board.height / 425;
        if (b < p + tenth * 6) speed = board.height / 500;
        if (b < p + tenth * 5) speed = -board.height / 500;
        if (b < p + tenth * 4) speed = -board.height / 425;
        if (b < p + tenth * 3) speed = -board.height / 350;
        if (b < p + tenth * 2) speed = -board.height / 250;
        if (b < p + tenth) speed = -board.height / 200;

        return speed;
    }

    useEffect(() => {
        startGame();
    }, []);

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            gameLoop();
        }, 8);

        return () => {
            clearInterval(interval);
        }
    }, [playing, ball, cpuPaddle]);


  return (
    <div className="h-full w-full bg-black" ref={boardRef}>
        <Render obj={cpuPaddle} />
        <Render obj={playerPaddle} />
        <Render obj={ball} />
    </div>
  )
}

export default Pong