import React from 'react'
import Snake from '../games/snake/Snake'
import Minesweeper from '../games/minesweeper/Minesweeper'
import BrickBreaker from '../games/brick breaker/BrickBreaker'
import Wordle from '../games/wordle/Wordle'
import Juggler from '../games/juggler/Juggler'
import Tetris from '../games/tetris/Tetris'
import Numbers from '../games/2048/Numbers'
import FlappyBird from '../games/flappy bird/FlappyBird'
import DoodleJump from '../games/doodle jump/DoodleJump'
import Zombies from '../games/zombies/Zombies'
import Pong from '../games/pong/Pong'
import Tron from '../games/tron/Tron'
import Mario from '../games/mario/Mario'
import gamesList from '../variables/games-list'
import MiniGolf from '../games/minigolf/MiniGolf'
import Lander from '../games/Lander/Lander'
import DriftKing from '../games/drift king/DriftKing'

const GameArea = ( {currentGame, setCurrentGame, user, setUpdateLb} ) => {
  return (
    <div className=' h-[90vmin] w-[90vmin] p-3 bg-first no-select'>
        {!currentGame && 
        <div className='flex text-xl font-semibold h-full w-full justify-center items-center flex-col gap-8'>
          Select a game to start playing
          <div className='grid grid-cols-4 gap-2 text-sm md:text-xl font-medium'>
          {gamesList.map((game, idx) => (
            <div key={idx} className="hover:bg-second p-2 hover:cursor-pointer bg-second hover:bg-second/50 rounded-xl h-20 flex justify-center items-center text-center" onClick={() => setCurrentGame(game.name)}>{game.name}</div>
          ))}
          </div>
        </div>
        }

        {currentGame === "Snake" && <Snake currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Minesweeper" && <Minesweeper currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Tetris" && <Tetris currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Brick Breaker" && <BrickBreaker currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Juggler" && <Juggler currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Wordle" && <Wordle currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "2048" && <Numbers currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Flappy Bird" && <FlappyBird currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Doodle Jump" && <DoodleJump currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Zombies" && <Zombies currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Pong" && <Pong currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Tron" && <Tron currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Mario" && <Mario currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Mini Golf" && <MiniGolf currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Lander" && <Lander currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
        {currentGame === "Drift King" && <DriftKing currentGame={currentGame} user={user} setUpdateLb={setUpdateLb} />}
    </div>
  )
}

export default GameArea