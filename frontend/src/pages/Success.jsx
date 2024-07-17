import React from 'react'
import successImage from '../assets/success.gif'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col mix-blend-multiply p-4 m-2'>
      <img 
      src={successImage}
      width={180}
      height={180}
      className='mix-blend-multiply'
      />
      <p className='text-green-600 font-bold text-xl p-2'>Payment successfully done</p>
      <Link to={"/order"} className='p-2 mt-5 px-3 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white border-2 border-green-600'>See Order</Link>
    </div>
  )
}

export default Success
