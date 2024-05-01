import React from 'react'

const Pipe = ({brick, visable, isTop}) => {
  return (
    <>
    <div
    style={{
        position: "absolute",
        top: brick.y,
        left: brick.x,
        height: brick.height,
        width: brick.width,
        background: "linear-gradient(to right, #2c761f, #4cb033)",
        border: "solid black 1px",
        zIndex: visable ? -30 : 30
    }}
    ></div>
    <div
    style={{
        position: "absolute",
        top: isTop ? brick.y + brick.height - brick.height / 10 : brick.y,
        left: brick.x - brick.width / 20,
        height: brick.height / 10,
        width: brick.width + brick.width / 10,
        background: "linear-gradient(to right, #2c761f, #4cb033)",
        border: "solid black 1px",
        zIndex: visable ? -30 : 30
    }}
    ></div>
    </>
  )
}

export default Pipe