import React from 'react'

const Player = ({ player }) => {
  return (
    <div
          style={{
            position: "absolute",
            top: player.y,
            left: player.x,
            height: player.height,
            width: player.width,
            transform: player.xSpeed < 0 ? "scaleX(-1)" : "scaleX(1)",
          }}
          className={
            player.height === player.width ?
            player.ySpeed
              ? "small-mario-jump"
              : player.xSpeed
              ? "small-mario-run"
              : "small-mario-still"
              :
            player.ySpeed
              ? "mario-jump"
              : player.xSpeed
              ? "mario-run"
              : "mario-still"
          }
        ></div>
  )
}

export default Player