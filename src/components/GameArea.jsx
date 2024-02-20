import React from 'react'

const GameArea = ( {currentGame} ) => {
  return (
    <div className='h-[90vmin] w-[90vmin] bg-first'>GameArea <br /> {currentGame}</div>
  )
}

export default GameArea