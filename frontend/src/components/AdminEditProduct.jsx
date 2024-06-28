import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import productCategory from '../helpers/productCategory';
import { MdDriveFolderUpload } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryAPI from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    data,
    fetchProduct
}) => {
    const [productDetails, setProductDetails] = useState({
        ...data,
        productName: data?.productName,
        brandName: data?.brandName,
        category: data?.category,
        productImage: data?.productImage || [],
        description: data?.description,
        price: data?.price,
        sellingPrice: data?.sellingPrice,
    })

    const [fullScreenImage, setFullScreenImage] = useState("")
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)

    const [uploadProductImageInput, setUploadProductImageInput] = useState("")

    const handleOnChange = (e) => {
        const {name,value}=e.target
        setProductDetails((prev) => ({
           ...prev,
            [name]: value
        }))
    }

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        // setUploadProductImageInput(file.name)
        // console.log("file",file) 
        const uploadImageCloudary = await uploadImage(file)
        setProductDetails((prev) => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudary.url]
        }))

        // console.log("upload Image at Cloudary", uploadImageCloudary.url)
    }

    const handleDeleteProductImage =async(index)=>{
        // console.log("image index", index)
        const newProductImage = [...productDetails.productImage]
        newProductImage.splice(index, 1)

        setProductDetails((prev) => ({
            ...prev,
            productImage: [...newProductImage]
        }))

    }

    // upload product 
    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log("productDetails", productDetails)
        // add product to database
        const dataResponse = await fetch(SummaryAPI.updateProduct.url, {
            method: SummaryAPI.updateProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productDetails)
        })
        const dataApi = await dataResponse.json();
        // console.log(dataApi)
        if(dataApi.success){
            toast.success(dataApi.message);
            onClose()
            fetchProduct()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }

  return (
      <div className='fixed bg-slate-200 bg-opacity-50 w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <IoMdClose />
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
                        required
                    />
                    <label htmlFor="brandName">Brand Name :</label>
                    <input type="text" id='brandName'
                        placeholder='Enter brand name'
                        name='brandName'
                        value={productDetails.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />
                    <label htmlFor="category">Category :</label>
                    <select value={productDetails.category} 
                    name='category'
                    className='p-2 bg-slate-100 border rounded'
                    onChange={handleOnChange}
                    required>
                        <option value={""} >Select category</option>
                        {
                            productCategory.map((ele, index) => {
                                return (
                                    <option value={ele.value} key={ele.value + index}>{ele.label}</option>
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
                        {
                            productDetails?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        productDetails.productImage.map((el,index) => {
                                            return (
                                                <div className='relative group'>

                                                    <img src={el}
                                                        alt='el' 
                                                        width={100} 
                                                        height={100} 
                                                        className='bg-slate-100 border ml-2 cursor-pointer' 
                                                        onClick={()=>{
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(el)
                                                    }}/>
                                                    <div className='absolute bottom-0 right-0 bg-red-600 rounded-full text-white hidden group-hover:block cursor-pointer' 
                                                    onClick={()=>handleDeleteProductImage(index)}>
                                                        <MdDelete/>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 test-xs '>*Please upload product image</p>
                            )
                        }
                    </div>
                    
                    <label htmlFor="price">Price :</label>
                    <input type="number" id='price'
                        placeholder='Enter price of the product'
                        name='price'
                        value={productDetails.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="sellingPrice">Selling Price :</label>
                    <input type="number" id='sellingPrice'
                        placeholder='Enter selling price of the product'
                        name='sellingPrice'
                        value={productDetails.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="description">Description :</label>
                    <textarea 
                    name='description'
                    value={productDetails.description}
                    onChange={handleOnChange}
                    className=' h-28 bg-slate-100 border resize-none p-2 rounded' placeholder='Enter product description' rows={3}></textarea>

                    <button 
                    onClick={handleSubmit}
                    className='px-3 py-1 bg-red-600 text-white mb-10 hover:bg-red-700 rounded-full'>Update Product</button>

                </form>

            </div>


            {/* Display imagde component */}
            {
                openFullScreenImage && (
                    <DisplayImage imgurl={fullScreenImage} onClose={()=>setOpenFullScreenImage(false)} />
                )
            }
            

        </div>
  )
}

export default AdminEditProduct
