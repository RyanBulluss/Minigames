import React, { useEffect, useState } from "react";

const HealthBar = ({ user }) => {
  const [healthPercent, setHealthPercent] = useState(100);
  useEffect(() => {
    setHealthPercent((user.health / user.startingHealth) * 100)
  }, [user])

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: user.x - user.width / 4,
          top: user.y - user.height / 2,
          width: user.width * 1.5,
          height: user.height / 6,
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
            healthPercent,
          height: user.height / 6,
          backgroundColor: `rgb(${200 + healthPercent / 10 * 5} 0, 0)`,
          zIndex: 500
        }}
      ></div>
    </>
  );
};

export default HealthBar;
