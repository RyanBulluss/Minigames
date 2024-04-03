import React from "react";

const HealthBar = ({ user }) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: user.x - user.width / 4,
          top: user.y - user.height / 2,
          width: user.width * 1.5,
          height: user.height / 4,
          border: "solid black 1px",
          zIndex: 500
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          left: user.x - user.width / 4,
          top: user.y - user.height / 2,
          width:
            ((user.width * 1.5) / 100) *
            ((user.health / user.startingHealth) * 100),
          height: user.height / 4,
          backgroundColor: "pink",
          zIndex: 500
        }}
      ></div>
    </>
  );
};

export default HealthBar;
