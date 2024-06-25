import React, { useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import imageToBase64 from '../helpers/imageToBase64.js';
import SummaryAPI from '../common/index.js';
import { toast } from 'react-toastify';

const Signup = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        profilePic:""
    })

    const navigate=useNavigate();

    const handleOnChange=(e)=>{
        const {name,value}=e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    console.log("data login",data)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        // console.log("data login",data)
        if(data.password===data.confirmPassword){
            const dataResponse=await fetch(SummaryAPI.signUp.url,{
                method:SummaryAPI.signUp.method,
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            const dataApi= await dataResponse.json();
            // console.log("data :",dataApi);
            if(dataApi.success){
                toast.success(dataApi.message);
                navigate('/login')
            }
            if(dataApi.error){
                toast.error(dataApi.message);
            }
            // toast(dataApi.message)
        }
        else{
            toast.error("Password and confirm password does not match");
            // alert("Password and confirm password does not match")
        }
        
    }

    const handleUploadPic=async (e)=>{
        const file=e.target.files[0]
        const imagePic=await imageToBase64(file)
        // console.log("imagepic",imagePic)
        setData((prev)=>{
            return{
               ...prev,
                profilePic:imagePic
            }
        })
    }

  return (
    <section  id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>

                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div>
                        <img src={data.profilePic || loginIcons} alt="Login icons" />
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center  absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic}/>
                        </label>
                    </form>
                    
                </div>

                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

                    <div className='grid'>
                        <label>Name :</label>
                        <div  className='bg-slate-100 p-2'>
                            <input type="Name" 
                            placeholder="Enter your name" 
                            name='name'
                            value={data.name}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div className='grid'>
                        <label>Email :</label>
                        <div  className='bg-slate-100 p-2'>
                            <input type="email" 
                            placeholder="Enter your email" 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>

                    <div>
                        <label>Password :</label>
                        <div className='bg-slate-100 p-2 flex cursor-pointer'>
                            <input type={showPassword ? "text" : "password" }
                            placeholder="Enter your password" 
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className=' cursor-pointer text-xl ' onClick={()=>{
                                setShowPassword((prev)=>!prev)
                            }}>
                                <span>
                                    {
                                        showPassword ? (
                                            <FaEyeSlash />
                                        )
                                        :
                                        (
                                            <FaEye />
                                        )
                                    }
                                </span>
                            </div>
                        </div>

                    </div>

                    <div>
                        <label>Confirm Password :</label>
                        <div className='bg-slate-100 p-2 flex cursor-pointer'>
                            <input type={showConfirmPassword ? "text" : "password" }
                            placeholder="Enter confirm password" 
                            name='confirmPassword'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                            required
                            className='w-full h-full outline-none bg-transparent'/>
                            <div className=' cursor-pointer text-xl ' onClick={()=>{
                                setShowConfirmPassword((prev)=>!prev)
                            }}>
                                <span>
                                    {
                                        showConfirmPassword ? (
                                            <FaEyeSlash />
                                        )
                                        :
                                        (
                                            <FaEye />
                                        )
                                    }
                                </span>
                            </div>
                        </div>

                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110  hover:bg-red-700 transition-all mx-auto block mt-6 '>Sign Up</button>
                </form>
                <p className='my-4'>Already have an account ? <Link to={'/login'} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Signup
