import React from 'react'
import Snake from '../games/snake/Snake'
import Minesweeper from '../games/minesweeper/Minesweeper'
import BrickBreaker from '../games/brick breaker/BrickBreaker'
import Wordle from '../games/wordle/Wordle'
import Sudoku from '../games/sudoku/Sudoku'

const GameArea = ( {currentGame, user, setUpdateLb} ) => {
  return (
    <div className=' h-[90vmin] w-[90vmin] p-3 bg-first'>
        {!currentGame && <div className='flex text-2xl font-semibold h-full w-full justify-center items-center'>Select a game to start playing</div>}
        {currentGame === "Snake" && <Snake currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Minesweeper" && <Minesweeper currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Brick Breaker" && <BrickBreaker currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Wordle" && <Wordle currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Sudoku" && <Sudoku currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
    </div>
  )
}

export default GameArea