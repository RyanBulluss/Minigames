import React from 'react'

const Rocket = ({ rocket }) => {
  return (
    <div className='flex flex-col justify-center items-center'
    style={{ rotate: `${rocket.angle}deg` }}
    >
      <div className='h-7 w-7 bg-black rotate-45 mb-[-13px]'></div>
      <div className='h-20 w-10 bg-black'></div>

      <div className='flex'>
      <div className='h-3 w-3 rotate-45 mt-[-5px] bg-black'></div>
      <div className='h-3 w-3 rotate-45 mt-[-5px] bg-black'></div>
      <div className='h-3 w-3 rotate-45 mt-[-5px] bg-black'></div>

         
      </div>

    </div>
  )
}

export default Rocket