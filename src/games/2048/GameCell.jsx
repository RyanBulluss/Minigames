import React from 'react'

const GameCell = ({ value }) => {
  return (
    <div style={{
      border: "1px solid rgb(36, 35, 35)",
      background: 
      value === 2 ? "brown" : 
      value === 4 ? "orange" : 
      value === 8 ? "red" : 
      value === 16 ? "blue" : ""
    }}
    className='flex justify-center items-center text-white font-bold text-2xl'
    >
      {!!value && value }
    </div>
  )
}

export default GameCell