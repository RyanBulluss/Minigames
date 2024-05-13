import React from 'react'

const NpcObject = ({ npc, visable }) => {
  return (
    <div 
    style={{
      position: "absolute",
      top: npc.y,
      left: npc.x,
      height: npc.height,
      width: npc.width,
      transform: npc.xSpeed < 0 ? "scaleX(1)" : "scaleX(-1)",
      zIndex: visable ? -30 : 20
    }}
    className={
        npc.type === "goomba" ? "goomba" :
        npc.type === "piranha" ? "piranha" :
        npc.type === "thwomp" ? "thwomp" : ""
    }
  ></div>
  )
}

export default NpcObject