import React from 'react'
import { useState } from 'react';
import SnakeControls from './SnakeControls'
import { boardSize, createState } from './constants'
import GameCell from './GameCell';

const Snake = () => {
  const [state, setState] = useState(createState());

  return (
    <div className='h-full w-full bg-gray-500 flex flex-col'>
      <SnakeControls />
      <div style={{gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`}} className='border h-full grid' >
        {state.map((arr, yIdx) => arr.map((obj, xIdx) => (
          <GameCell content={obj} />
        )))}
      </div>
    </div>
  )
}

export default Snake