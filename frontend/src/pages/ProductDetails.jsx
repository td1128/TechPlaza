import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SummaryAPI from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';


const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const [loading, setLoading] = useState(true)
    const productImageList = new Array(4).fill(null)

    const [activeImage, setActiveImage] = useState("")
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })
    const [zoomImage,setZoomImage]=useState(false)

    const params = useParams()
    // console.log(params.id)

    const fetchProductDetails = async () => {
        setLoading(true)
        const dataResponse = await fetch(SummaryAPI.productDetails.url, {
            method: SummaryAPI.productDetails.method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId: params?.id })
        })
        setLoading(false)
        const dataApi = await dataResponse.json();
        // console.log(dataApi.data)
        setData(dataApi?.data)
        setActiveImage(dataApi?.data?.productImage[0])
    }

    // console.log("data",data)

    useEffect(() => {
        fetchProductDetails()
    }, [])

    const handleMouseEnterproduct = (imgurl) => {
        setActiveImage(imgurl)
    }

    const handleZoomImage =useCallback((e) =>{
        setZoomImage(true)
        const { left,top,width,height } =e.target.getBoundingClientRect()
        console.log(left,top,width,height)
        const x=(e.clientX - left)/width
        const y=(e.clientY - top)/height
        setZoomImageCoordinate({ x, y })
        // setZoomImage(false)
    },[zoomImageCoordinate])

    const handleZoomOutImage =()=>{
        setZoomImage(false)
    }

    return (
        <div className='container mx-auto p-4'>

            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/* product image */}
                <div className='h-96 flex flex-col lg:flex-row gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200'>
                        <img src={activeImage} className='h-full w-full  object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleZoomOutImage}/>
                        {/**product zoom */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 right-[50px] top-20'>
                                    <div 
                                    className='w-full h-full min-h-[400px] min-w-[400px] mix-blend-multiply scale-125'
                                    style={{
                                        backgroundImage : `url(${activeImage})`,
                                        backgroundRepeat : 'no-repeat',
                                        backgroundPosition  : `${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                                    }}>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageList.map((el, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"}>

                                                </div>
                                            )
                                        })
                                    }
                                </div>

                            ) : (
                                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        data.productImage.map((imgurl, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgurl}>
                                                    <img src={imgurl} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterproduct(imgurl)} onClick={() => handleMouseEnterproduct(imgurl)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {/* product details  */}
                {
                    loading ? (
                        <div className='grid gap-2 w-full'> 
                            <p className='bg-slate-200 animate-pulse h-6 w-full rounded-full inline-block '></p> 
                            <h2 className='bg-slate-200 animate-pulse h-6 lg:text-3xl w-full font-medium'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] w-full animate-pulse h-6'></p>
                            <div className='text-red-600 flex bg-slate-200 animate-pulse h-6  w-full items-center gap-2'>
                                
                            </div>
                            <div className='flex items-center gap-3 text-2xl font-medium my-1 w-full animate-pulse h-6'>
                                <p className='text-red-600 bg-slate-200 w-full'></p>
                                <p className='text-slate-400 bg-slate-200 line-through w-full'></p>
                            </div>
                            <div className='flex items-center gap-3 my-2 w-full'>
                                <button className='bg-slate-200 h-6 rounded animate-pulse w-full'></button>
                                <button className='bg-slate-200 h-6 rounded animate-pulse w-full'></button>
                            </div>

                            <div>
                                <p className='text-slate-600 font-medium my-1 w-full bg-slate-200 h-6 rounded animate-pulse'></p>
                                <p className='bg-slate-200 h-10 rounded w-full animate-pulse'></p>
                            </div>
                        </div>
                    ) : (
                            <div className = 'flex flex-col gap-2'> 
                            <p className = 'bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit '>{data?.brandName}</p>
                            <h2 className='text-2xl lg:text-3xl font-medium'>{data?.productName}</h2>
                            <p className='capitalize text-slate-400'>{data?.category}</p>
                            <div className='text-red-600 flex  items-center gap-2'>
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalf />
                            </div>
                            <div className='flex items-center gap-3 text-2xl font-medium my-1'>
                                <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                                <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
                            </div>
                            <div className='flex items-center gap-3 my-2'>
                                <button className='border-2 border-red-600 rounded-full px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white'>Buy</button>
                                <button className='border-2 border-red-600 rounded-full px-3 py-1 min-w-[100px] text-white font-medium bg-red-600 hover:bg-white hover:text-red-600'>Add to Cart</button>
                            </div>

                            <div>
                                <p className='text-slate-600 font-medium my-1'>Description :</p>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    )
                }
      </div >
      {
        data.category && (
            <CategoryWiseProductDisplay category={data?.category} heading={`Similar in ${data?.category}`} />
        )
      }


    </div >
  )
}

export default ProductDetails
