import { useState, useEffect } from "react";
import Rocket from "./Rocket";

const Lander = ({ currentGame, user, setUpdateLb }) => {
  const [state, setState] = useState([]);

  return (
    <div className="h-full w-full flex flex-col">
        <div className="h-full flex justify-center items-center bg-gray-500">
          <Rocket />
        </div>
    </div>
  );
};

export default Lander;
