import React from 'react'
import { dashboardDummyData } from '../../assets/assets'
import { assets } from '../../assets/assets'

const Dashboard = () => {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-full">
                    <img src={assets.totalBookingIcon} alt="" className="w-6 h-6"/>
                </div>
                <div>
                   <p className="text-gray-500 text-sm">Total Bookings</p>
                   <h3 className="text-2xl font-bold">{dashboardDummyData.totalBookings}</h3>
                </div>
            </div>
            
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-full">
                    <img src={assets.totalRevenueIcon} alt="" className="w-6 h-6"/>
                </div>
                <div>
                   <p className="text-gray-500 text-sm">Total Revenue</p>
                   <h3 className="text-2xl font-bold">${dashboardDummyData.totalRevenue}</h3>
                </div>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                   <img src={assets.homeIcon} alt="" className="w-6 h-6 opacity-60"/>
                </div>
                <div>
                   <p className="text-gray-500 text-sm">Total Rooms</p>
                   <h3 className="text-2xl font-bold">4</h3>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
             {/* Creating a simple table */}
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm text-gray-500">
                     <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                         <tr>
                             <th className="px-6 py-3">Guest</th>
                             <th className="px-6 py-3">Room</th>
                             <th className="px-6 py-3">Date</th>
                             <th className="px-6 py-3">Status</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {dashboardDummyData.bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{booking.user.username}</td>
                                <td className="px-6 py-4">{booking.room.roomType}</td>
                                <td className="px-6 py-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                     </tbody>
                 </table>
             </div>
        </div>
    </div>
  )
}

export default Dashboard
