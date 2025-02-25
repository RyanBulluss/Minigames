import { useState, useEffect } from "react";
import Rocket from "./Rocket";

const Lander = ({ currentGame, user, setUpdateLb }) => {
  const [state, setState] = useState([]);
  const [rocket, setRocket] = useState({angle: 0})


  useEffect(() => {



    const handleKeyPress = (e) => {
      e.preventDefault();
      if (e.key === "a") {
        setRocket(r => {
          return {...r, angle: r.angle - 10}
        })
      }
      if (e.key === "d") {
        setRocket(r => {
          return {...r, angle: r.angle + 10}
        })
      }
    };



    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col">
        <div className="h-full flex justify-center items-center bg-gray-500">
          <Rocket rocket={rocket} />
          {rocket.angle}
        </div>
    </div>
  );
};

export default Lander;
