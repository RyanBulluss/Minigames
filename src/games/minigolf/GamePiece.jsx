import React from 'react'

const GamePiece = ({ piece }) => {
  return (
    <div 
    style={{
        position: "absolute",
        top: piece.y,
        left: piece.x,
        height: piece.height,
        width: piece.width,
        background: piece.type === "ball" ? "#fff" : "#451c01",
        borderRadius: piece.type === "ball" ? "50%" : 0,
        zIndex: 50
    }}
    >

    </div>
  )
}

export default GamePiece