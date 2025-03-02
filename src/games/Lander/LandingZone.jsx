import React from "react";

const LandingZone = ({ landingZone, board }) => {
  return (
    <div
      className="flex flex-col justify-center items-center bg-black"
      style={{
        position: "absolute",
        width: landingZone.width,
        height: landingZone.height,
        left: landingZone.x,
        top: landingZone.y,
      }}
    >
      <div className="flex flex-col items-center h-full w-full"></div>
      
     
    </div>
  );
};

export default LandingZone;