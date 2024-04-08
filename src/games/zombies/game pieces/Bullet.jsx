import React from 'react'

const Bullet = ({ bullet }) => {
  return (
    <div
    style={{
      position: "absolute",
      left: bullet.x,
      top: bullet.y,
      width: bullet.width,
      height: bullet.height,
      background: "linear-gradient(to right, #111, #222)",
      borderRadius: "100%",
    }}
  ></div>
  )
}

export default Bullet