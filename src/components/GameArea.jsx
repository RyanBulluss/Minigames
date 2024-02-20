import React from 'react'
import Snake from '../games/snake/Snake'
import Minesweeper from '../games/minesweeper/Minesweeper'
import BrickBreaker from '../games/brick breaker/BrickBreaker'
import Wordle from '../games/wordle/Wordle'
import Sudoku from '../games/sudoku/Sudoku'

const GameArea = ( {currentGame} ) => {
  return (
    <div className='h-[90vmin] w-[90vmin] p-3 bg-first'>
        {currentGame === "Snake" && <Snake />}
        {currentGame === "Minesweeper" && <Minesweeper />}
        {currentGame === "Brick Breaker" && <BrickBreaker />}
        {currentGame === "Wordle" && <Wordle />}
        {currentGame === "Sudoku" && <Sudoku />}
    </div>
  )
}

export default GameArea