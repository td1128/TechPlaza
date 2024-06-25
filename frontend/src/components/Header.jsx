import React, { useState } from 'react'
import LogoIcon from './LogoIcon'
// import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryAPI from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../features/userSlice.js';
import ROLE from '../common/role.js';

const Header = () => {
  const user=useSelector(state=>state?.user?.user)
  // console.log('user details redux', user)

  const [menuDisplay,setMenuDisplay] = useState(false)

  const dispatch=useDispatch();

  const handleLogout=async()=>{
    const dataResponse = await fetch(SummaryAPI.logout.url,{
      method:SummaryAPI.logout.method,
      credentials:"include",
    })
    const dataApi= await dataResponse.json();
    if(dataApi.success){
      toast.success(dataApi.message)
      // after logout clearing the redux store
      dispatch(setUserDetails(null));
    }
    if(dataApi.error){
      toast.error(dataApi.message);
    }
  }

  return (
    <header className='h-16 shadow-md bg-white '>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=' '>
          <Link to={"/"}>
            <LogoIcon w={90} h={50} />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-center max-w-sm border rounded-full focus-within:shadow-md pl-2'>
          <input
          className='w-full outline-none'
          type="text" placeholder='search products here....' />
          <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
          </div>
        </div>
        <div className='flex items-center gap-7'> 
          <div className='relative  flex justify-center'>
            {
              user?._id && (
                <div onClick={()=>setMenuDisplay((prev)=>!prev)} className='text-3xl cursor-pointer relative flex justify-center'>
                  {
                    user?.profilePic ? (
                      <img src={user.profilePic}  className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegUserCircle />
                    )
                  }
                </div>
              )
            }
            {
              menuDisplay && (
                <div className='absolute bg-white bottom top-11 h-fit p-2 shadow-lg rounded '>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link  to={"/admin-panel/all-products"} onClick={()=>setMenuDisplay((prev)=>!prev)} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'>Admin Panel</Link>
                      )
                     }
                  </nav>
                </div>
              )
            }
          </div>
          <div className='text-2xl cursor-pointer relative'>
            <span><FaShoppingCart /></span>
            <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 '>
              <p className='text-xs'>0</p>
            </div>
          </div>
          <div>
            {
              user ? (
                <button onClick={handleLogout} className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700'>
                  Logout
                </button>
              ) : (
                <Link to={"/login"} className='bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700'>
                  Login
                </Link>
              )
            }
            
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
