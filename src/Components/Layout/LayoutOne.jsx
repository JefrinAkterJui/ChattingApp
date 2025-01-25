import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Home from '../Pages/Home'
import { useSelector } from 'react-redux'

const LayoutOne = () => {
  const currentUser=useSelector((state)=>state.currentUser.value)
  const navigate =useNavigate()

  useEffect(()=>{
    if(currentUser==null){
        navigate('/Login')
    }
  } ,[])

  return (
   <>
   
   <Navbar/>
   <Outlet/>
   
   </>
  )
}

export default LayoutOne