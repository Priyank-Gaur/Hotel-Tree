import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: assets.dashboardIcon, path: '/owner' },
    { name: 'Add Room', icon: assets.addIcon, path: '/owner/add-room' },
    { name: 'List Room', icon: assets.listIcon, path: '/owner/list-room' },
  ]

  return (
    <div className='w-[18%] min-h-screen border-r border-gray-200 bg-white pt-8 hidden md:block'>
        <div className='flex flex-col gap-4 text-sm'>
            {menuItems.map((item) => (
                <NavLink 
                    key={item.name} 
                    to={item.path}
                    end={item.path === '/owner'}
                    className={({ isActive }) => `flex items-center gap-3 px-8 py-3 border-r-4 transition-all ${isActive ? 'border-primary bg-indigo-50 text-primary' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
                >
                    <img src={item.icon} alt={item.name} className='w-5 h-5'/>
                    <p className='font-medium hidden lg:block'>{item.name}</p>
                </NavLink>
            ))}
        </div>
    </div>
  )
}

export default Sidebar
