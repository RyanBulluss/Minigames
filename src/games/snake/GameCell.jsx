import React from 'react'

const GameCell = ( {content} ) => {
  return (
    <div className='border'>
        {!content.snake && !content.food && <div></div>}
    </div>
  )
}

export default GameCell