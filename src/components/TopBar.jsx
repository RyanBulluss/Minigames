import React from "react";
import gamesList from "../variables/games-list";
import { useState } from "react";

const TopBar = ({ user, setUser, setCurrentGame }) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="flex justify-between xl:hidden bg-second no-select">
      <h1 className="cursor-pointer hover:bg-first/50 p-2">Minigames</h1>
      <div onClick={() => setShowNav(true)} className="cursor-pointer hover:bg-first/50 p-2">Open top</div>
      {showNav && (
        <div onClick={() => setShowNav(false)}  className="fixed h-[100%] w-full bg-black/80 z-50 flex flex-col gap-2 justify-center items-center">
          <div className="absolute p-2 cursor-pointer rounded-xl hover:bg-black/30 m-4 right-0 top-0">X</div>
          {gamesList.map((game, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentGame(game.name)}
              className="p-2 cursor-pointer rounded-xl hover:bg-black/30"
            >
              {game.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopBar;
