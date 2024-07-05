import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import addToCart from '../helpers/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context';

function CategoryWiseProductDisplay({ category, heading }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } =useContext(Context)

    const handleAddToCart =async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct.data)
    }
    useEffect(() => {
        fetchData()
    }, [])



    return (
        <div className='container mx-auto px-4 my-2 relative'>
            <h2 className='text-xl font-semibold p-3'>{heading}</h2>
            <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between overflow-x-scroll scrollbar-none transition-all'>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 p-2 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse' >
                                        
                                    </div>
                                    <div className='p-3 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-medium text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse py-2'></h2>
                                        <p className='capitalize text-slate-600 bg-slate-200 animate-pulse py-2'></p>
                                        <div className='flex gap-3 items-center w-full'>
                                            <p className='text-red-600 font-medium bg-slate-200 animate-pulse py-2 w-full'></p>
                                            <p className='text-slate-600 line-through text-sm bg-slate-200 animate-pulse py-2 w-full'></p>
                                        </div>
                                        <button className=' text-white px-3 py-2 rounded-full hover:scale-105 transition-all text-sm bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={"/product/"+product?._id} className='w-full m-3 min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '>
                                    <div className='bg-slate-200 p-2 h-48 min-w-[280px] md:min-w-[145px] flex justify-center items-center' >
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'  />
                                    </div>
                                    <div className='p-3 grid gap-3'>
                                        <h2 className='font-medium text-base md:text-medium text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-600'>{product?.category}</p>
                                        <div className='flex gap-3 items-center w-full'>
                                            <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-600 line-through text-sm'>{ displayINRCurrency(product?.price) }</p>
                                        </div>
                                        <button className='bg-red-500 hover:bg-red-700 text-white px-1 py-0.5 rounded-full hover:scale-105 transition-all text-sm' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )
                    
                }
            </div>

        </div>
    )
}

export default CategoryWiseProductDisplay

