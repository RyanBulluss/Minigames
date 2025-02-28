import React from 'react'

const Car = ({ rocket, board }) => {
  return (
    <div className='flex flex-col justify-center items-center bg-blue-300'
    style={{ 
      rotate: `${rocket.angle}deg`, 
      position: 'relative', 
      width: board.width / rocket.width, 
      height: board.height / rocket.height,
      left: rocket.x,
      top: rocket.y,
    }}
    >
      <div className='h-full w-full bg-black'></div>
    </div>
  )
}

export default Car