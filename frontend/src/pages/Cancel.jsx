import React from 'react'
import cancelImage from '../assets/failed-failure.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2'>
      <img 
      src={cancelImage}
      width={180}
      height={180}
      className='mix-blend-multiply'
      />
      <p className='text-red-600 font-bold text-xl p-2'>Payment Failed</p>
      <Link to={"/cart"} className='p-2 mt-5 px-3 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white border-2 border-red-600'>Go To Cart</Link>
    </div>
  )
}

export default Cancel
