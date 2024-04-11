import React from 'react'

const Render = ({obj}) => {
  return (
    <div
    style={{
        position: "absolute",
        top: obj.y,
        left: obj.x,
        width: obj.width,
        height: obj.height,
        backgroundColor: obj.color,
    }}>
    </div>
  )
}

export default Render