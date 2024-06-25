import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { MdDriveFolderUpload } from "react-icons/md";
// import uploadImage from '../helpers/uploadImage';

const UploadProduct = ({
    onClose
}) => {
    const [productDetails, setProductDetails] =useState({
        productName:"",
        brandName:"",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: "",
    })

    const [uploadProductImageInput, setProductImageInput]=useState("")

    const handleOnChange=(e)=>{

    }

    const handleUploadImage=async(e)=>{
        const file=e.target.files[0];
        setProductImageInput(file.name)
        console.log("file",file) 
        // const uploadImageCloudary = await uploadImage(file)
        // console.log("upload Image at Cloudary",uploadImageCloudary)
    }
  return (
    <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        
        <div className='flex justify-between pb-3'>
            <h2 className='font-bold text-lg'>Upload Product</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <IoMdClose/>
            </div>
        </div>

        <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5'>
            <label htmlFor="productName">Product Name :</label>
            <input type="text" id='productName' 
            placeholder='Enter product name' 
            value={productDetails.productName}
            name='productName'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            />
            <label htmlFor="brandName">Brand Name :</label>
            <input type="text" id='brandName' 
            placeholder='Enter brand name' 
            name='brandName'
            value={productDetails.brandName}
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            />
            <label htmlFor="category">Category :</label>
            <select value={productDetails.category} className='p-2 bg-slate-100 border rounded'>
                {
                    productCategory.map((ele,index)=>{
                        return (
                            <option value={ele.value} key={ele.value+index}>{ele.label}</option>
                        )
                    })
                }
            </select>
            <label htmlFor="productImage">Product Image :</label>
            <label htmlFor="uploadImageInput">
                <div className='p-2 bg-slate-100 border rounded h-32 flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-600 flex justify-center items-center flex-col gap-1'>
                        <span className='text-4xl'><MdDriveFolderUpload /></span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadImage} />
                    </div>
                </div>
            </label>
            <div>
                <img src="" width={80} height={80} className='bg-slate-100 border' />
            </div>
        </form>

      </div>
    </div>
  )
}

export default UploadProduct
