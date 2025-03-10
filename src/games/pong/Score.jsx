import React from 'react'

const Score = ({score, board}) => {
  return (
    <div 
    style={{
        height: board.height,
        width: board.width,
    }}
    className='flex justify-center gap-4 sm:gap-16 text-2xl sm:text-6xl font-bold'>
        <div className='pt-8 w-8'>{score.cpu}</div>
        <div className='h-full border-dashed border-2 sm:border-8 border-white'></div>
        <div className='pt-8 w-8'>{score.player}</div>
    </div>
  )
}

export default Score