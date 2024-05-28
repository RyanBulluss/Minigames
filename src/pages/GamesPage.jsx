import React, { useState } from "react";
import GameArea from "../components/GameArea";
import Leaderboard from "../components/Leaderboard";
import Comments from "../components/Comments";
import Ads from "../components/Ads";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import BrickBreaker from "../games/brick breaker/BrickBreaker";

export default function GamesPage({ user, setUser }) {
  const [currentGame, setCurrentGame] = useState("");
  const [updateLb, setUpdateLb] = useState(false);

  return (
    <div className="flex flex-col">
      <TopBar user={user} setUser={setUser} setCurrentGame={setCurrentGame} />
      <div className="min-h-[100vh] flex bg-second">
        <div className="hidden xl:flex">
          <SideBar
            user={user}
            setUser={setUser}
            setCurrentGame={setCurrentGame}
          />
        </div>
        <div className="min-h-[100vh] w-full p-4 mx-auto xl:mx-0">
          <div className="flex flex-wrap gap-4">
            <GameArea user={user} currentGame={currentGame} setUpdateLb={setUpdateLb} setCurrentGame={setCurrentGame} />
            <Leaderboard user={user} currentGame={currentGame} updateLb={updateLb} />
            {/* <Ads /> */}
          </div>
          <Comments user={user} currentGame={currentGame} />
        </div>
      </div>
    </div>
  );
}
