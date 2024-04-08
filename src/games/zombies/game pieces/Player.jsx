import React from "react";
import HealthBar from "../HealthBar";

const Player = ({player}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: player.x,
          top: player.y,
          width: player.width,
          height: player.height,
          transform: `rotate(${player.angle}deg)`,
          zIndex: "20",
        }}
        className="zPlayer player0"
      ></div>
      {player.health !== player.startingHealth && <HealthBar user={player} />}
    </>
  );
};

export default Player;
