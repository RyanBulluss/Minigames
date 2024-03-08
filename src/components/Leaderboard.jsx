import React from "react";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../utilities/leaderboards";

const Leaderboard = ({ currentGame, updateLb }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [colors, setColors] = useState(["#222", "#333"]);

  useEffect(() => {
    // async function getAll() {
    //   const newLeaderboard = await getLeaderboard(currentGame);

    //   setLeaderboard(
    //     newLeaderboard.sort((a, b) => {
    //       if (b.score === a.score) {
    //         // if same score lower time = winner
    //         return a.time - b.time;
    //       } else if (currentGame === "Wordle") {
    //         return a.score - b.score;
    //       } else return b.score - a.score;
    //     })
    //   );
    // }

    // function handleColors() {
    //   if (currentGame === "Snake") return setColors(["snake-background", "snake-controls"])
    //   setColors(["bg-[#222]", "bg-[#333]"])
    // }

    // handleColors()
    // getAll();
  }, [currentGame, updateLb]);

  return (
    <div className="h-[90vmin] w-[45vmin] bg-first p-4 text-left">
      <table className="w-full">
        <thead className={colors[1] + " border-b pb-2"}>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>{currentGame === "Wordle" ? "Attempts" : "Score"}</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((score, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? colors[0] : colors[1]}>
              <td>{idx + 1 + " )"}</td>
              <td>{score.user.name}</td>
              <td>{score.score}</td>
              <td>{score.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
