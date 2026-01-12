import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const ListRoom = () => {
  const { axios, getToken } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const token = await getToken();
      const response = await axios.get('/api/room/owner', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setRooms(response.data.rooms);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (roomId) => {
    try {
      const token = await getToken();
      const response = await axios.post('/api/room/toggle-availability', 
        { roomId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setRooms(rooms.map(room => 
          room._id === roomId 
            ? { ...room, isAvailable: !room.isAvailable }
            : room
        ));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (!confirm('Are you sure you want to delete this room?')) {
      return;
    }

    try {
      const token = await getToken();
      const response = await axios.delete(`/api/room/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setRooms(rooms.filter(room => room._id !== roomId));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div>
        <h2 className="text-2xl font-bold mb-6">All Rooms List</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs uppercase font-medium text-gray-700">
                <p>Image</p>
                <p>Room Type</p>
                <p>Price</p>
                <p>Status</p>
                <p>Actions</p>
             </div>

             <div className="flex flex-col">
                {rooms.map((room) => (
                     <div key={room._id} className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-4 px-6 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-12 md:w-24 md:h-16 rounded overflow-hidden bg-gray-200">
                            {room.images && room.images[0] && <img src={room.images[0]} alt="" className="w-full h-full object-cover"/>}
                        </div>
                        <div>
                            <p className="font-semibold text-gray-900">{room.roomType}</p>
                            <div className="flex gap-2 mt-1 flex-wrap">
                                {room.amenities && room.amenities.slice(0,3).map((am, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{am}</span>
                                ))}
                                {room.amenities && room.amenities.length > 3 && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">+{room.amenities.length - 3}</span>}
                            </div>
                        </div>
                        <p className="font-medium text-gray-700">${room.pricePerNight} <span className="text-xs font-normal text-gray-400">/ night</span></p>
                        <div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {room.isAvailable ? 'Available' : 'Booked'}
                            </span>
                        </div>
                         <div className="flex gap-2">
                            <button 
                                onClick={() => handleToggleAvailability(room._id)}
                                className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 transition-colors"
                            >
                                Availability
                            </button>
                            <button 
                                onClick={() => handleDeleteRoom(room._id)}
                                className="px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                     </div>
                ))}
                {rooms.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No rooms added yet.
                    </div>
                )}
             </div>
        </div>
    </div>
  )
}

export default ListRoom
