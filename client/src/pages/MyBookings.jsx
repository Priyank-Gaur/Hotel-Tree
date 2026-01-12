import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
    const navigate = useNavigate();
    const { axios, getToken, user } = useAppContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
        try {
            const token = await getToken();
            const response = await axios.get('/api/booking/user',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if(response.data.success){
                setBookings(response.data.bookings);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    }
    if(user){
        fetchBookings();
    }
  }, [user]);

  if(loading){
      return <div className="h-screen flex items-center justify-center">Loading bookings...</div>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 pt-32 min-h-screen bg-gray-50/50">
      <h2 className="text-2xl font-bold font-playfair mb-8">My Bookings</h2>

      <div className="flex flex-col gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/rooms/${booking.room._id}`)}>
              <img
                src={booking.room.images[0]}
                alt={booking.hotel.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 cursor-pointer hover:underline" onClick={() => navigate(`/rooms/${booking.room._id}`)}>
                    {booking.hotel.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                    {booking.hotel.city}
                    </p>
                  </div>
                 <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                       'bg-red-100 text-red-700'
                  }`}>
                      {booking.status}
                  </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-gray-700 mt-2">
                  <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Check In</span>
                      <span>{new Date(booking.checkInDate).toLocaleDateString()}</span>
                  </div>
                   <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Check Out</span>
                      <span>{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                  </div>
                   <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Room Type</span>
                       <span>{booking.room?.roomType || 'Standard Room'}</span>
                  </div>
                   <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Guests</span>
                      <span>{booking.guests} Adults</span>
                  </div>
                   <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Total Price</span>
                      <span className="font-semibold">${booking.totalPrice}</span>
                  </div>
                   <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold">Payment</span>
                      <span className="flex items-center gap-2">
                          {booking.isPaid ? 'Paid' : 'Pay at Hotel'}
                          {booking.isPaid && <img src={assets.badgeIcon} className="w-4 h-4" alt="verified"/>}
                      </span>
                  </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-row md:flex-col gap-3 justify-center md:border-l md:border-gray-200 md:pl-6">
                 <button 
                  onClick={() => navigate(`/rooms/${booking.room._id}`)}
                 className="flex-1 px-4 py-2 border border-indigo-500 text-indigo-600 rounded text-sm hover:bg-indigo-50 transition-colors whitespace-nowrap">
                     View Details
                 </button>
                 {booking.status === 'pending' && 
                    <button className="flex-1 px-4 py-2 border border-red-500 text-red-600 rounded text-sm hover:bg-red-50 transition-colors whitespace-nowrap">
                        Cancel
                    </button>
                 }
                 {!booking.isPaid && 
                    <button className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-600 transition-colors whitespace-nowrap">
                        Pay Now
                    </button>
                 }
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
            <div className="text-center py-20">
                <p className="text-gray-500">No bookings found.</p>
                <button onClick={() => navigate('/rooms')} className="mt-4 text-indigo-600 font-medium hover:underline">Browse Hotels</button>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
