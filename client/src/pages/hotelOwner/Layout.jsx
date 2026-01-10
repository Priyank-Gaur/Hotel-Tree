import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        <div className='flex flex-1'>
            <Sidebar />
            <div className='flex-1 p-8 overflow-y-auto w-full'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default Layout
