import React from 'react'

const Ui = ({ board, player }) => {
  return (
    <>
    <div
        className="text-[4vmin] z-50 font-semibold"
        style={{
          position: "absolute",
          top: board.y + board.gridHeight,
          left: board.x + board.gridWidth * 2,
          height: board.height,
          width: board.width,
        }}
      >
        <div
          className="coin"
          style={{ width: board.gridWidth * 0.9, height: board.gridHeight }}
        ></div>
        <h3 className="-mt-[1vmin]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player.score}</h3>
      </div>
    </>
  )
}

export default Ui