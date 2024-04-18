import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCrosshairs,
} from "@fortawesome/free-solid-svg-icons";

const PlayerInfoUI = ({ player, timer }) => {
  return (
    <div className="flex gap-8 p-4 text-xl">
      <h3><FontAwesomeIcon icon={faCrosshairs} /> {player.kills}</h3>
      <h3><FontAwesomeIcon icon={faClock} />  {timer}</h3>
    </div>
  );
};

export default PlayerInfoUI;
