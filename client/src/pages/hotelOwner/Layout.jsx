import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import {useAppContext} from '../../context/AppContext'
import HotelReg from '../../components/HotelReg'

const Layout = () => {
    const {isOwner, navigate, userDataLoaded} = useAppContext();
    
    // logic to prevent redirect is handled by removing the useEffect that did it
    
  if (!userDataLoaded) {
      return (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="text-gray-500">Loading dashboard...</div>
          </div>
      )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
        <Navbar />
        { !isOwner ? (
             <HotelReg isPage={true} />
        ) : (
            <div className='flex flex-1'>
                <Sidebar />
                <div className='flex-1 p-8 overflow-y-auto w-full'>
                    <Outlet />
                </div>
            </div>
        )}
    </div>
  )
}

export default Layout
