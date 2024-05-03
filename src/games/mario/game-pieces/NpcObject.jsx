import React from 'react'

const NpcObject = ({ npc }) => {
  return (
    <div 
    style={{
      position: "absolute",
      top: npc.y,
      left: npc.x,
      height: npc.height,
      width: npc.width,
      transform: npc.xSpeed < 0 ? "scaleX(-1)" : "scaleX(1)",
    }}
    className={
        npc.type === "goomba" ? "goomba" : ""
    }
  ></div>
  )
}

export default NpcObject