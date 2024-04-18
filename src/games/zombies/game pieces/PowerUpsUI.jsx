import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faSkull,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";

const PowerUpsUI = ({currentPowerUps}) => {
  return (
    <div
    className='flex gap-8 p-4 text-3xl z-50'>
        {currentPowerUps.nuke && <FontAwesomeIcon icon={faBomb} />}
        {currentPowerUps.instantKill && <FontAwesomeIcon icon={faSkull} />}
        {currentPowerUps.doubleSpeed && <FontAwesomeIcon icon={faRunning} />}
    </div>
  )
}

export default PowerUpsUI