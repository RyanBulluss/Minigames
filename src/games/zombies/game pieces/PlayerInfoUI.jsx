import React from 'react'

const PlayerInfoUI = ({player, timer}) => {
  return (
    <div
    className='flex gap-4 px-4'>
        <div>Kills: {player.kills}</div>
        <div>Timer: {timer}</div>
    </div>
  )
}

export default PlayerInfoUI