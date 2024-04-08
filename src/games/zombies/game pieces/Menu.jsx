import React from 'react'


const Menu = ({startGame, loadouts}) => {

    const LoadoutButton = ({name}) => {
        return (
            <button 
            className='hover:bg-slate-500/50 py-2 px-4 rounded-xl'
            onClick={() => startGame(loadouts[name.toLowerCase()])}
            >{name}</button>
        )
    }

  return (
    <div className="h-full w-full flex flex-col gap-4 justify-center items-center text-2xl">
          <h2 className='font-semibold p-4'>Choose Your Loadout:</h2>
          <LoadoutButton name="Scout" />
          <LoadoutButton name="Sniper" />
          <LoadoutButton name="Tank" />
        </div>
  )
}

export default Menu