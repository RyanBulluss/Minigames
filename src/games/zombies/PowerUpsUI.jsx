import React from 'react'
import "./Zombies.css"

const PowerUpsUI = ({currentPowerUps, board}) => {
  return (
    <div
    style={{position: "absolute", left: board.x, top: board.y, height: board.height / 10, width: board.width}}
    className='flex gap-4 px-4'>
        {currentPowerUps.nuke && <div>Nuke</div>}
        {currentPowerUps.instantKill && <div>Instant Kill</div>}
        {currentPowerUps.doubleSpeed && <div>Double Speed</div>}
    </div>
  )
}

export default PowerUpsUI