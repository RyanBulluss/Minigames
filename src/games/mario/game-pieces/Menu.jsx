import React from 'react'

const Menu = ({ board, player, firstGame, startGame }) => {
  return (
    <>
    <div
          style={{
            position: "absolute",
            top: board.y,
            left: board.x,
            height: board.height,
            width: board.width,
            backgroundColor: "",
            zIndex: 60,
          }}
          className="flex justify-center items-center text-2xl font-semibold bg-sky-400"
        >
        {!firstGame ? 
        <div className="flex flex-col gap-8 items-center">
          <h4>Game Over</h4>
          <h4>Score: {player.score}</h4>
          <button className="hover:text-gray-400" onClick={startGame}>Play Again</button>
        </div>
        :
        <button className="hover:text-gray-400" onClick={startGame}>Start Game</button>
        }
        </div>
    </>
  )
}

export default Menu