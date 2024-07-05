import React, { useContext, useState } from 'react'
import loginIcons from '../assets/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import Context from '../context/index.js';

const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:""
    })

    const navigate=useNavigate();
    const generalContext=useContext(Context)
    // console.log("generalContext",generalContext)

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
        const dataResponse=await fetch(SummaryAPI.login.url,{
            method:SummaryAPI.login.method,
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })

        const dataApi= await dataResponse.json();

        if(dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            generalContext.fetchUserDetails()
            generalContext.fetchUserAddtoCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message);
        }
    }

  return (
    <section  id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 w-full max-w-sm mx-auto rounded-md'>
                <div className='w-20 h-20 mx-auto '>
                    <img src={loginIcons} alt="Login icons" />
                </div>
                <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email :</label>
                        <div  className='bg-slate-100 p-2'>
                            <input type="email" 
                            placeholder="Enter your email" 
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}
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
                        <Link to={"/forget-password"} className="block w-fit ml-auto hover:underline hover:text-red-600 mt-1">
                            Forget Password ?
                        </Link>
                    </div>

                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110  hover:bg-red-700 transition-all mx-auto block mt-6 '>Login</button>
                </form>
                <p className='my-4'>Don't have account ? <Link to={'/sign-up'} className='hover:text-red-700 text-red-600 hover:underline'>Sign Up</Link></p>
            </div>
        </div>
    </section>
  )
}

export default Login
