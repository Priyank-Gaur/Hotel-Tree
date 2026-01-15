import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { axios, getToken } = useAppContext();
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalRooms: 0,
    bookings: []
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      
      
      const bookingsResponse = await axios.get('/api/booking/hotel', {
        headers: { Authorization: `Bearer ${token}` }
      });

      
      const roomsResponse = await axios.get('/api/room/owner', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (bookingsResponse.data.success && roomsResponse.data.success) {
        const { bookings = [], totalRevenue = 0, totalBookings = 0 } = bookingsResponse.data.dashboardData || {};
        const rooms = roomsResponse.data.rooms || [];
        
        setDashboardData({
          totalBookings,
          totalRevenue,
          totalRooms: rooms.length,
          bookings: bookings.slice(0, 5) 
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

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
                   <h3 className="text-2xl font-bold">{dashboardData.totalBookings}</h3>
                </div>
            </div>
            


             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-full">
                   <img src={assets.homeIcon} alt="" className="w-6 h-6 opacity-60"/>
                </div>
                <div>
                   <p className="text-gray-500 text-sm">Total Rooms</p>
                   <h3 className="text-2xl font-bold">{dashboardData.totalRooms}</h3>
                </div>
            </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
             <h3 className="font-bold text-lg mb-4">Recent Bookings</h3>
             {dashboardData.bookings.length === 0 ? (
               <div className="text-center py-8 text-gray-500">
                 No bookings yet
               </div>
             ) : (
              <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                          <tr>
                              <th className="px-6 py-3">Guest</th>
                              <th className="px-6 py-3">Room</th>
                              <th className="px-6 py-3">Check-in Date</th>
                              <th className="px-6 py-3">Total Price</th>
                              <th className="px-6 py-3">Status</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {dashboardData.bookings.map((booking) => (
                             <tr key={booking._id} className="hover:bg-gray-50">
                                 <td className="px-6 py-4 font-medium text-gray-900">{booking.user?.name || 'N/A'}</td>
                                 <td className="px-6 py-4">{booking.room?.roomType || 'N/A'}</td>
                                 <td className="px-6 py-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                 <td className="px-6 py-4">${booking.totalPrice}</td>
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
             )}
        </div>
    </div>
  )
}

export default Dashboard
