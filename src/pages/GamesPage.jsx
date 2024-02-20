import React, { useState } from "react";
import GameArea from "../components/GameArea";
import Leaderboard from "../components/Leaderboard";
import Comments from "../components/Comments";
import Ads from "../components/Ads";
import SideBar from "../components/SideBar";

export default function GamesPage({ user, setUser }) {
  const [currentGame, setCurrentGame] = useState("");
  

  return (
    <>
      <SideBar user={user} setUser={setUser} setCurrentGame={setCurrentGame} />
      <div className="min-h-[100vh] w-full p-4">
        <div className="flex flex-wrap gap-4">
          <GameArea currentGame={currentGame} />
          <Leaderboard currentGame={currentGame} />
          <Ads />
        </div>
        <Comments currentGame={currentGame} />
      </div>
    </>
  );
}
