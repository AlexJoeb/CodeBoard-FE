import React, { ReactElement } from 'react'

export default function Stats(): ReactElement {
  return (
    <div className='w-full max-w-2xl h-24 rounded bg-white shadow-lg grid grid-cols-3 grid-rows-1'>
      <div className='flex justify-center items-center flex-col '>
        <p className='text-center font-bold text-blue-navy'>
          0
          <br />
          <span>POSTS</span>
        </p>
      </div>
      <div className='flex justify-center items-center flex-col border-l-2 border-r-2 border-black border-opacity-5'>
        <p className='text-center font-bold text-blue-navy'>
          0
          <br />
          <span>COMMENTS</span>
        </p>
      </div>
      <div className='flex justify-center items-center flex-col '>
        <p className='text-center font-bold text-blue-navy'>
          0
          <br />
          <span>USERS</span>
        </p>
      </div>
    </div>
  )
}
