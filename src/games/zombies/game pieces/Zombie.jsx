import React from 'react'
import HealthBar from '../HealthBar'

const Zombie = ({zombie}) => {
  return (
    <>
    <div
      style={{
        position: "absolute",
        left: zombie.x,
        top: zombie.y,
        width: zombie.width,
        height: zombie.height,
        transform: `rotate(${zombie.angle}deg)`,
      }}
      className={
        Math.floor(zombie.distance / 5) % 17 === 0
          ? "zombie0 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 1
          ? "zombie1 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 2
          ? "zombie2 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 3
          ? "zombie3 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 4
          ? "zombie4 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 5
          ? "zombie5 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 6
          ? "zombie6 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 7
          ? "zombie7 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 8
          ? "zombie8 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 9
          ? "zombie9 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 10
          ? "zombie10 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 11
          ? "zombie11 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 12
          ? "zombie12 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 13
          ? "zombie13 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 14
          ? "zombie14 zombie"
          : Math.floor(zombie.distance / 5) % 17 === 15
          ? "zombie15 zombie"
          : "zombie16 zombie"
      }
    ></div>
    {zombie.health !== zombie.startingHealth && (
      <HealthBar user={zombie} />
    )}
  </>
  )
}

export default Zombie