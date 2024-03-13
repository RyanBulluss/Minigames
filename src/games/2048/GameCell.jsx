import React from 'react'

const GameCell = ({ value }) => {
  return (
    <div style={{
      border: "1px solid rgb(36, 35, 35)",
    }}>
        {value}
    </div>
  )
}

export default GameCell