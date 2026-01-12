import React from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet } from 'react-router-dom'
import {useAppContext} from '../../context/AppContext'
import {useEffect} from 'react'

const Layout = () => {
    const {isOwner,navigate} = useAppContext();
    useEffect(() => {
      if(!isOwner){
        navigate('/')
      }
    }, [isOwner])
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
