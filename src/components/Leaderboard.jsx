import React from "react";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../utilities/leaderboards";

const Leaderboard = ({ currentGame, updateLb }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    async function getAll() {
      const newLeaderboard = await getLeaderboard(currentGame);
      
      setLeaderboard(newLeaderboard.sort((a, b) => {
        if (b.score === a.score) {
          // if same score lower time = winner
          return a.time - b.time
        } else return b.score - a.score
      }));
    }

    getAll();
  }, [currentGame, updateLb]);

  return (
    <div className="h-[90vmin] w-[45vmin] bg-first">
      <div className="flex flex-col">{
        leaderboard.map((score, idx) => (
          <div key={idx}>{score.score} {score.time}</div>
        ))
      }</div>
    </div>
  );
};

export default Leaderboard;
