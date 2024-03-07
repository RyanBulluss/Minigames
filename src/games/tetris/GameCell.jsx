import React from 'react'

const GameCell = ({ value, y }) => {
  return (
    <div style={{
      border: "1px solid rgb(36, 35, 35)",
      borderBottom: y === 3 ? "1px solid red" : "1px solid rgba(169, 169, 169, 0.8)",
        backgroundColor: value === 1 ? "rgb(228, 156, 0)" :
        value === 2 ? "rgb(0, 122, 222)" :
        value === 3 ? "rgb(187, 0, 222)" :
        value === 4 ? "rgb(0, 181, 203)" :
        value === 5 ? "rgb(218, 200, 0)" :
        value === 6 ? "rgb(0, 222, 61)" :
        value === 7 ? "rgb(226, 0, 0)": ""
    }}></div>
  )
}

export default GameCell