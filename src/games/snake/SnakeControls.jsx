import React from 'react'

const SnakeControls = () => {
  return (
    <div className='border w-full h-[10vmin] flex justify-around items-center'>
        <button>Play</button>
        <button>Info</button>
        <div>Score</div>
        <div>Timer</div>
    </div>
  )
}

export default SnakeControls