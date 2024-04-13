import React from "react";

const PlayerInfoUI = ({ player, timer }) => {
  return (
    <div className="flex gap-8 p-4 text-xl">
      <h3>Kills: {player.kills}</h3>
      <h3>Timer: {timer}</h3>
    </div>
  );
};

export default PlayerInfoUI;
