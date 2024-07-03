import React, { useEffect, useState } from 'react'

import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";


import image1 from "../assets/banner/img1.webp"
import image2 from "../assets/banner/img2.webp"
import image3 from "../assets/banner/img3.jpg"
import image4 from "../assets/banner/img4.jpg"
import image5 from "../assets/banner/img5.webp"

import img1mobile from "../assets/banner/img1_mobile.jpg"
import img2mobile from "../assets/banner/img2_mobile.webp"
import img3mobile from "../assets/banner/img3_mobile.jpg"
import img4mobile from "../assets/banner/img4_mobile.jpg"
import img5mobile from "../assets/banner/img5_mobile.png"

const BannerProduct = () => {

    const [currentImage,setCurrentImage]=useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        img1mobile,
        img2mobile,
        img3mobile,
        img4mobile,
        img5mobile
    ]

    const nextImage = () => {
        if(desktopImages.length -1> currentImage) {
            setCurrentImage(prev=>prev+1)
        }
    }
    const prevImage = () =>{
        if(currentImage > 0) {
            setCurrentImage(prev=>prev-1)
        }
    }

    useEffect(()=>{
        const interval=setInterval(()=>{
            if(desktopImages.length -1> currentImage){
                nextImage()
            }
            else{
                setCurrentImage(0)
            }
        },5000)
        return ()=>{
            clearInterval(interval)
        }
    },[currentImage])

    return (
        <div className='container mx-auto p-2'>
            <div className='h-56 md:h-72 w-full bg-slate-200 relative'>
                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex items-center justify-between w-full text-2xl '>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={prevImage}><FaAngleDoubleLeft /></button>
                        <button className='bg-white shadow-md rounded-full p-1' onClick={nextImage}><FaAngleDoubleRight /></button>
                    </div>
                </div>

                {/* desktop and tablet versions */}

                <div className='hidden md:flex h-full w-full overflow-hidden '>
                    {
                        desktopImages.map((imgurl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imgurl} style={{transform:`translateX(-${currentImage*100}%)`}}>
                                    <img src={imgurl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/* mobile versions */}

                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imgurl, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imgurl} style={{transform:`translateX(-${currentImage*100}%)`}}>
                                    <img src={imgurl} className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default BannerProduct
