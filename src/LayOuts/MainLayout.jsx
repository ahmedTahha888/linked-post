import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavbar from '../Components/MainNavbar/MainNavbar'

const MainLayout = () => {
  
  return (
    <>
    <MainNavbar/>
    
      <Outlet/>
    </>
  )
}

export default MainLayout
