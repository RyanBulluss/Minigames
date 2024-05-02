import React from 'react'

const GameObject = ({object, visable}) => {
  return (
    <div
    style={{
        position: "absolute",
        top: object.y,
        left: object.x,
        height: object.height,
        width: object.width,
        zIndex: visable ? -30 : 30
    }}
    className={
      object.type === "question" ? "question" :
      object.type === "grass" ? "grass" :
      object.type === "coin" ? "coin" : ""
    }
    ></div>
  )
}

export default GameObject