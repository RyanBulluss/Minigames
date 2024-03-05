import React from 'react'

const GameCell = ({ value }) => {
  return (
    <div style={{
      border: "1px solid rgba(169, 169, 169, 0.8)",
        backgroundColor: value === 1 ? "orange" :
        value === 2 ? "blue" :
        value === 3 ? "purple" :
        value === 4 ? "lightblue" :
        value === 5 ? "yellow" :
        value === 6 ? "green" :
        value === 7 ? "red" : ""
    }}></div>
  )
}

export default GameCell