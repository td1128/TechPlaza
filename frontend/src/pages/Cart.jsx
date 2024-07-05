import React, { useContext, useEffect, useState } from 'react'
import SummaryAPI from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";


const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)

    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchCartData = async () => {
        // setLoading(true)
        const dataResponse = await fetch(SummaryAPI.addToCartView.url, {
            method: SummaryAPI.addToCartView.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        })

        // setLoading(false)
        const dataApi = await dataResponse.json();
        console.log(dataApi)

        if (dataApi.success) {
            setData(dataApi.data);
        }

    }

    const handleLoading=async() => {
        setLoading(true)
        await fetchCartData()
        setLoading(false)
    }

    useEffect(() => {
        handleLoading()
    }, [])

    const incQty=async(id,qty)=>{
        const dataResponse=await fetch(SummaryAPI.updateCartProduct.url,{
            method:SummaryAPI.updateCartProduct.method,
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id : id,
                quantity : qty+1
            })
        })
        const dataApi= await dataResponse.json();

        if(dataApi.success){
            // toast.success(dataApi.message);
            fetchCartData()
        }
    }

    // console.log("cart", data)
    const decQty=async(id,qty)=>{
        if(qty >= 2){
            const dataResponse=await fetch(SummaryAPI.updateCartProduct.url,{
                method:SummaryAPI.updateCartProduct.method,
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id : id,
                    quantity : qty-1
                })
            })
            const dataApi= await dataResponse.json();
    
            if(dataApi.success){
                // toast.success(dataApi.message);
                fetchCartData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const dataResponse=await fetch(SummaryAPI.deleteCartProduct.url,{
            method:SummaryAPI.deleteCartProduct.method,
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id : id
            })
        })
        const dataApi= await dataResponse.json();

        if(dataApi.success){
            // toast.success(dataApi.message);
            fetchCartData()
            context.fetchUserAddToCart()
        }
    }

    const totalQty=data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
    const totalPrice=data.reduce((previousValue,currentValue)=>previousValue+(currentValue.quantity*currentValue?.productId?.sellingPrice),0)

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-white py-5'>No data</p>
                    )
                }
            </div>
            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                {/* view products */}
                <div className='w-full max-w-3xl  '>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (
                                    <div key={el + "AddToCartLoading"+index} className='w-full mb-4 bg-slate-200 h-32 my-1 border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                        ) : (
                            data.map((product,index) =>{
                                return(
                                    <div key={product?._id + "AddToCartLoading"} className='w-full mb-4 bg-white h-32 my-1 border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-32 h-32 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' />
                                        </div>
                                        <div className='px-4 py-2 relative'>

                                            {/* delete product*/}
                                            <div className='absolute right-0 text-red-600 cursor-pointer rounded-full p-2 hover:bg-red-600 hover:text-white hover:scale-110 transition-all' onClick={()=>deleteCartProduct(product?._id)}>
                                                <MdDelete />
                                            </div>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-gray-600'>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg '>{ displayINRCurrency(product?.productId?.sellingPrice) }</p>
                                                <p className='text-slate-600 font-medium text-lg '>{ displayINRCurrency(product?.productId?.sellingPrice * product?.quantity) }</p>
                                            </div>
                                            <div className='flex items-center gap-3 mt-2'>
                                                <button className='flex justify-center items-center bg-red-500 border text-xl text-white hover:bg-red-700 border-red-600 w-6 h-6 rounded' onClick={()=>decQty(product?._id,product?.quantity)}>-</button>
                                                <span>{product?.quantity}</span>
                                                <button className='flex justify-center items-center bg-red-500 border text-xl text-white hover:bg-red-700 border-red-600 w-6 h-6 rounded' onClick={()=>incQty(product?._id,product?.quantity)}>+</button>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-white'>
                                    <h1 className='text-white bg-red-600 px-6 py-1 text-xl'>Summary :</h1>
                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Quantity :</p>
                                        <p>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                                        <p>Total Price :</p>
                                        <p>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-blue-600 p-2 text-white w-full mt-2'>Pay Now</button>

                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
}

export default Cart
