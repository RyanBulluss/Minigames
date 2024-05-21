import React from 'react'

const Platform = ({platform, visable}) => {
  return (
    <>
    <div
    style={{
        position: "absolute",
        top: platform.y,
        left: platform.x,
        height: platform.height / 2,
        width: platform.width / 2,
        background: "linear-gradient(to bottom, #f7fc4e 10%, #e38713 10%)",
        border: "solid black 1px",
        borderRadius: "0 0 30% 30%",
        zIndex: visable ? -30 : 30
    }}
    ></div>
    <div
    style={{
        position: "absolute",
        top: platform.y,
        left: platform.x + platform.width / 2,
        height: platform.height / 2,
        width: platform.width / 2,
        background: "linear-gradient(to bottom, #f7fc4e 10%, #e38713 10%)",
        border: "solid black 1px",
        borderRadius: "0 0 30% 30%",
        zIndex: visable ? -30 : 30
    }}
    ></div>
    </>
  )
}

export default Platform