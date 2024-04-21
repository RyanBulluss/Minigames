import React from 'react'

const Cell = ({ value }) => {
  return (
    <div 
    style={{
        backgroundColor: value === 1 ? "green" :
        value === 2 ? "blue" :
        value === 3 ? "red" : 
        value === 4 ? "yellow" : "gray"
    }}
    ></div>
  )
}

export default Cell