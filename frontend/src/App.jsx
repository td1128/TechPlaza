import { useEffect, useState } from 'react'

import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryAPI from './common/index.js'
import Context from './context/index.js'
import { useDispatch } from 'react-redux'
import { setUserDetails } from './features/userSlice.js'

function App() {
  const dispatch=useDispatch();
  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(SummaryAPI.userDetails.url,{
      method:SummaryAPI.userDetails.method,
      credentials:"include",
    })
    const dataApi= await dataResponse.json();
    // console.log("data :",dataApi);
    if(dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }
  useEffect(()=>{
    // user details
    fetchUserDetails()
  },[])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails // fetch user details for view details in every page
      }} >
        <ToastContainer position="top-right" autoClose={5000} />
        <Header/>
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  )
}

export default App
