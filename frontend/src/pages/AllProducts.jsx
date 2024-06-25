import React, { useState } from 'react'
import UploadProduct from '../components/UploadProduct.jsx'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false);
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>All Products</h2>
        <button 
        onClick={()=>setOpenUploadProduct(true)}
        className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-3 rounded-full'>Upload Product</button>
      </div>
      {/* upload products */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }
    </div>
  )
}

export default AllProducts
