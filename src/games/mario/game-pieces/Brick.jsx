import React from 'react'

const Brick = ({brick, visable}) => {
  return (
    <div
    style={{
        position: "absolute",
        top: brick.y,
        left: brick.x,
        height: brick.height,
        width: brick.width,
        background: "radial-gradient(circle, #aa583b, #aa381b)",
        border: "solid black 1px",
        zIndex: visable ? -30 : 30
    }}
    ></div>
  )
}

export default Brick