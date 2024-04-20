import React, { useRef, useState, useEffect } from 'react'
import { createState } from "./constants"

const Tron = () => {
    const [state, setState] = useState([[]]);

    function startGame() {
        setState(createState(4));
    }

    useEffect(() => {
        startGame()
    }, []);

  return (
    <div className="h-full w-full bg-sky-500 grid" style={{gridTemplateColumns: 'repeat(20, 1fr)', gridTemplateRows: 'repeat(20, 1fr)'}}>
        {state.map((arr, yIdx) => arr.map((value, xIdx) => (
            <div className='bg-red-300'>{value}</div>
        )))}
    </div>
  )
}

export default Tron