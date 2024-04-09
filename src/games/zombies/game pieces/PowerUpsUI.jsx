import React from 'react'

const PowerUpsUI = ({currentPowerUps}) => {
  return (
    <div
    className='flex gap-4 px-4'>
        {!currentPowerUps.nuke && <div>Nuke</div>}
        {!currentPowerUps.instantKill && <div>Instant Kill</div>}
        {!currentPowerUps.doubleSpeed && <div>Double Speed</div>}
    </div>
  )
}

export default PowerUpsUI