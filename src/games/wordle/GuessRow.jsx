import React from 'react'

const GuessRow = ( {guess, word, showColor} ) => {

  function findColor(i) {
    if (!word) return
    if (!showColor) return "gray"
    if (guess[i] === word[i]) return "rgb(83, 141, 78)"
    if (word.includes(guess[i])) return "rgb(181, 159, 59)"
  }

  return (
    <div className='grid gap-2 grid-cols-5 uppercase font-semibold'>
        <div className='border w-10 h-10 flex items-center justify-center' style={{background: findColor(0)}}>{guess[0]}</div>
        <div className='border w-10 h-10 flex items-center justify-center' style={{background: findColor(1)}}>{guess[1]}</div>
        <div className='border w-10 h-10 flex items-center justify-center' style={{background: findColor(2)}}>{guess[2]}</div>
        <div className='border w-10 h-10 flex items-center justify-center' style={{background: findColor(3)}}>{guess[3]}</div>
        <div className='border w-10 h-10 flex items-center justify-center' style={{background: findColor(4)}}>{guess[4]}</div>
    </div>
  )
}

export default GuessRow