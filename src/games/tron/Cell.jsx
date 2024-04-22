import React from 'react'

const Cell = ({ value }) => {
  return (
    <div 
    style={{
      background: value === 1 ? "radial-gradient(circle, #01f200, #01a200)" :
        value === 2 ? "radial-gradient(circle, #0000fd, #00009d)" :
        value === 3 ? "radial-gradient(circle, #fa0101 , #aa0101)" : 
        value === 4 ? "radial-gradient(circle, #fdfe2a, #bdbe2a)" : "black",
        border: value === 0 ? "solid #111 1px" : ""
    }}
    ></div>
  )
}
export default Cell