import { useState, useEffect } from "react";
import Rocket from "./Rocket";

const Lander = ({ currentGame, user, setUpdateLb }) => {

  const [rocket, setRocket] = useState({angle: 0, spinSpeed: 0});
  const [playing, setPlaying] = useState(true)


  function gameLoop() {
    
    rotateRocket();



  }

  function rotateRocket() {
    if (rocket.spinSpeed < 0.1 && rocket.spinSpeed > -0.1) {
      setRocket(r => { return { ...r, spinSpeed: 0 } })
      return
    }

    const newRocket = {...rocket};
    newRocket.angle += rocket.spinSpeed;
    newRocket.spinSpeed *= 0.9;
    setRocket(newRocket);
  }





  // Keybinds
  useEffect(() => {

    const handleKeyPress = (e) => {
      e.preventDefault();
      const k = e.key;
      if (k === "a" || k === "A" || k === "ArrowLeft") {
        setRocket(r => {
          return {...r, spinSpeed: r.spinSpeed - 10}
        })
      }
      if (k === "d" || k === "D" || k === "ArrowRight") {
        setRocket(r => {
          return {...r, spinSpeed: r.spinSpeed + 10}
        })
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [rocket]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      gameLoop();
    }, 16)

    return () => {
      clearInterval(interval);
    };
  }, [playing, rocket]);

  return (
    <div className="h-full w-full flex flex-col">
        <div className="h-full flex justify-center items-center bg-gray-500">
          <Rocket rocket={rocket} />
          {/* {rocket.angle} */}
          {/* {rocket.spinSpeed} */}
        </div>
    </div>
  );
};

export default Lander;
