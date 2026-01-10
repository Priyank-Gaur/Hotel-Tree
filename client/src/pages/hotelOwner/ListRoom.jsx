import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const ListRoom = () => {
  const { rooms } = useContext(AppContext);

  return (
    <div>
        <h2 className="text-2xl font-bold mb-6">All Rooms List</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
             <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs uppercase font-medium text-gray-700">
                <p>Image</p>
                <p>Room Type</p>
                <p>Price</p>
                <p>Status</p>
                <p>Action</p>
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
                         <div>
                            <button className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
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
