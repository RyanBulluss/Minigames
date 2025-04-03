import { useState, useEffect, useRef } from "react";
import Rocket from "./Rocket";
import "./lander.css"
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import LandingZone from "./LandingZone";

const rocketSpeed = 5000;
const gravity = 10000;

function rng(n) {
  return Math.floor(Math.random() * n);
}

const Lander = ({ currentGame, user, setUpdateLb }) => {
  const [rocket, setRocket] = useState({});
  const [landingZone, setLandingZone] = useState({})
  const [board, setBoard] = useState({});
  const [playing, setPlaying] = useState(false);

  const boardRef = useRef(null);
  
  function startGame() {
    const newBoard = resizeGame();
    setBoard(newBoard);
    setRocket({
      angle: 0,
      spinSpeed: 0,
      width: newBoard.height / 10,
      height: newBoard.height / 10,
      x: newBoard.x + 10,
      y: newBoard.y + 10,
      xSpeed: 0,
      ySpeed: 0,
      rightKeyDown: false,
      leftKeyDown: false,
      upKeyDown: false,
    });

    setLandingZone({
      width: newBoard.width / 4,
      height: newBoard.height / 100,
      x: newBoard.x + rng(newBoard.width - (newBoard.width / 4)),
      y: newBoard.y + newBoard.height - (newBoard.height / 100),
    })

    setPlaying(true);
  }

  function checkGameOver(newRocket) {
    // checkWin()
    const left = newRocket.x;
    const right = newRocket.x + newRocket.width;
    const top = newRocket.y;
    const bottom = newRocket.y + newRocket.height;

    console.log(left, landingZone.x)

    if (left >= landingZone.x &&
      right <= landingZone.x + landingZone.width) {
        // console.log("Successful landing!")
      }

    if (
      left < board.x || 
      right > board.width + board.x ||
      top < 0 ||
      bottom > board.height + board.y
    ) {
      if (bottom > board.height &&
        left >= landingZone.x &&
        right <= landingZone.x + landingZone.width) {
          console.log("Successful landing!")
        } else if (bottom > board.height) {
          console.log("You missed the landing zone!")
      } else {
        console.log("You crashed!")
      }
      setPlaying(false);
    }
  }

  function checkLoss(newRocket) {
    
  }

  function gameLoop() {
    let newRocket = { ...rocket };
    newRocket = rotateRocket(newRocket);
    newRocket = moveRocket(newRocket);
    checkGameOver(newRocket);

    setRocket(newRocket);
  }

  function moveRocket(newRocket) {

    if (newRocket.upKeyDown) {

      const [x, y] = findAngle(newRocket);
      let speed = board.height / rocketSpeed;

      speed /= 90;
      newRocket.ySpeed += speed * y;
      newRocket.xSpeed += speed * x;
    }
     
    
    //gravity
    newRocket.ySpeed += board.height / gravity;

    newRocket.x += newRocket.xSpeed;
    newRocket.y += newRocket.ySpeed;


    return newRocket
  }

  function findAngle(newRocket) {
    const angle = newRocket.angle
    let x;
    let y;

    if (angle >= 0 && angle <= 90) {
      x = angle;
      y = 90 - angle
      return [x,-y]
    } else if (angle >= 90 && angle <= 180) {
      x = 90 - (angle - 90);
      y = angle - 90;
      return [x,y]
    } else if (angle >= 180 && angle <= 270) {
      x = angle - 180;
      y = 90 - (angle - 180);
      return [-x,y]
      
    } else if (angle >= 270 && angle <= 360) {
      x = 90 - (angle - 270);
      y = angle - 270;
      return [-x,-y]
    }


  }

  function rotateRocket(newRocket) {

    if (newRocket.leftKeyDown && newRocket.spinSpeed - 0.1 > -5) {newRocket.spinSpeed -= 0.1};
    if (newRocket.rightKeyDown && newRocket.spinSpeed + 0.1 < 5) {newRocket.spinSpeed += 0.1};

    // to allow rocket to be still
    if (newRocket.spinSpeed < 0.1 && newRocket.spinSpeed > -0.1) {
      setRocket((r) => {
        return { ...r, spinSpeed: 0 };
      });
      return newRocket;
    }

    // keep angle between 0 - 360
    if (newRocket.angle + newRocket.spinSpeed > 360) {
      const remainder = newRocket.spinSpeed - (360 - newRocket.angle)
      newRocket.angle = remainder;
    } else if (newRocket.angle + newRocket.spinSpeed < 0) {
      newRocket.angle = 360 - newRocket.angle + newRocket.spinSpeed;
    } else {
      newRocket.angle += newRocket.spinSpeed;
    }
    
    // Slow down spinning naturally
    if (newRocket.spinSpeed > 0) {
      newRocket.spinSpeed -= 0.05;
    } else if (newRocket.spinSpeed < 0) {
      newRocket.spinSpeed += 0.05;
    }

    return newRocket;
  }

  function resizeGame() {
    const newBoard = boardRef.current.getBoundingClientRect();

    return newBoard;
  }

  // Keybinds
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") {
        if (rocket.leftKeyDown) return;
        setRocket((r) => {
          return { ...r, leftKeyDown: true };
        });
      }
      if (k === "d" || k === "D" || k === "ArrowRight") {
        if (rocket.rightKeyDown) return;
        setRocket((r) => {
          return { ...r, rightKeyDown: true };
        });
      }
      if (k === "w" || k === "W" || k === "ArrowUp") {
        if (rocket.upKeyDown || !playing) return;
        setRocket((r) => {
          return { ...r, upKeyDown: true };
        });
      }
      if (k === " ") {
       startGame();
      }
      if (k === "s") {
       setRocket(r => {
        return {...r, xSpeed: 0, ySpeed: 0}
       });
      }
    };

    const handleKeyUp = (e) => {
      e.preventDefault();
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") {
        setRocket((r) => {
          return { ...r, leftKeyDown: false };
        });
      }
      if (k === "d" || k === "D" || k === "ArrowRight") {
        setRocket((r) => {
          return { ...r, rightKeyDown: false };
        });
      }
      if (k === "w" || k === "W" || k === "ArrowUp") {
        setRocket((r) => {
          return { ...r, upKeyDown: false };
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [rocket]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      gameLoop();
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [playing, rocket, board, landingZone]);

  useEffect(() => {
    setBoard(resizeGame());
    window.addEventListener("resize", startGame);

    return () => {
      window.removeEventListener("resize", startGame);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full absoloute bg-gray-500" ref={boardRef}>
        <Rocket rocket={rocket} board={board} />
        <LandingZone landingZone={landingZone} board={board} />
        {!playing && 
          <div className="h-full w-full flex justify-center items-center">Press SPACE To Start</div>
        }
      </div>
    </div>
  );
};

export default Lander;
