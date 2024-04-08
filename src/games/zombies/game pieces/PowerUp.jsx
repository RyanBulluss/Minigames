import React from "react";

const PowerUp = ({ powerUp }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: powerUp.x,
        top: powerUp.y,
        width: powerUp.width,
        height: powerUp.height,
      }}
      className={
        powerUp.type === "nuke"
          ? "nuke"
          : powerUp.type === "instant kill"
          ? "instant-kill"
          : powerUp.type === "double speed"
          ? "double-speed"
          : ""
      }
    ></div>
  );
};

export default PowerUp;
