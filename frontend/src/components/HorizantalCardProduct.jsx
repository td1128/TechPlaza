import React, { useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function HorizantalCardProduct({ category, heading }) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll]=useState(0)

    const scrollElement =useRef()

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight=()=>{
        scrollElement.current.scrollLeft+=300
    }

    const scrollLeft=()=>{
        scrollElement.current.scrollLeft-=300
    }

    return (
        <div className='container mx-auto px-4 my-2 relative'>
            <h2 className='text-xl font-semibold p-3'>{heading}</h2>
            <div className='flex items-center gap-4 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft /></button>
                <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight /></button>
                {
                    loading ? (
                        loadingList.map((product, index) => {
                            return (
                                <div className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px] animate-pulse' >
                                    
                                    </div>
                                    <div className='p-3 grid w-full gap-2'>
                                        <h2 className='font-medium text-base md:text-medium text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1'></h2>
                                        <p className='capitalize text-slate-600 p-1 bg-slate-200 animate-pulse'></p>
                                        <div className='flex gap-3 items-center w-full'>
                                            <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse'></p>
                                            <p className='text-slate-600 line-through text-sm p-1 bg-slate-200 w-full animate-pulse'></p>
                                        </div>
                                        <button className=' text-white px-1 py-0.5 rounded-full hover:scale-105 transition-all text-sm w-full bg-slate-200 animate-pulse'></button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) => {
                            return (
                                <div className='w-full min-w-[300px] md:min-w-[340px] max-w-[300px] md:max-w-[340px] h-36 bg-white rounded-sm shadow flex'>
                                    <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]' >
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-125 transition-all mix-blend-multiply'  />
                                    </div>
                                    <div className='p-3 grid'>
                                        <h2 className='font-medium text-base md:text-medium text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-600'>{product?.category}</p>
                                        <div className='flex gap-3 items-center w-full'>
                                            <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-600 line-through text-sm'>{ displayINRCurrency(product?.price) }</p>
                                        </div>
                                        <button className='bg-red-500 hover:bg-red-700 text-white px-1 py-0.5 rounded-full hover:scale-105 transition-all text-sm'>Add to Cart</button>
                                    </div>
                                </div>
                            )
                        })
                    )
                    
                }
            </div>

        </div>
    )
}

export default HorizantalCardProduct
