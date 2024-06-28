import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct.jsx'
import SummaryAPI from '../common/index.js';
import AdminProductCard from '../components/AdminProductCard.jsx';

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct]=useState(false);

  const [allProduct,setAllProduct] =useState([])

  const fetchAllProduct=async()=>{
    const dataResponse = await fetch(SummaryAPI.allProduct.url,{
      method:SummaryAPI.allProduct.method,
      credentials:"include",
    })
    const dataApi= await dataResponse.json();
    if(dataApi.success){
      setAllProduct(dataApi.data)
    }else{
      console.log(dataApi.message)
    }
    console.log(dataApi.data)
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>All Products</h2>
        <button 
        onClick={()=>setOpenUploadProduct(true)}
        className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-3 rounded-full'>Upload Product</button>
      </div>

      <div className='flex items-center gap-5 py-4'>
        {
          allProduct.map((product,index)=>{
            return (
              <AdminProductCard data={product} key={index+"allProduct"} fetchProduct={fetchAllProduct} />
            )
          })
        }
      </div>


      {/* upload products  component*/}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)}/>
        )
      }

    </div>
  )
}

export default AllProducts
