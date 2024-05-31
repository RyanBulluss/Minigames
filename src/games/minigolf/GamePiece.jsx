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
        background: "white",
    }}
    >

    </div>
  )
}

export default GamePiece