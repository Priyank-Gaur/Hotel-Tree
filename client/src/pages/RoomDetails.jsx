import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { facilityIcons, assets, roomCommonData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Booking details state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get('/api/room');
        if (response.data.success) {
          const foundRoom = response.data.rooms.find((r) => r._id === id);
          if (foundRoom) {
            setRoom(foundRoom);
            setSelectedImage(foundRoom.images[0]);
            setTotalPrice(foundRoom.pricePerNight);
          } else {
            toast.error('Room not found');
            navigate('/rooms');
          }
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        toast.error('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, navigate]);

  useEffect(() => {
    if (room && checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays > 0) {
            setTotalPrice(diffDays * room.pricePerNight);
        } else {
             setTotalPrice(room.pricePerNight);
        }
    }
  }, [checkIn, checkOut, room]);


  if (loading || !room) {
    return <div className="h-screen flex items-center justify-center">Loading room details...</div>;
  }

  return (
    <div className="px-6 md:px-16 lg:px-24 py-10 pt-32 min-h-screen bg-white">
      {/* Breadcrumb / Back */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 transition-colors"
      >
        <img src={assets.arrowIcon} className="w-4 h-4 rotate-180" alt="back" />
        Back to Rooms
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Images & Details */}
        <div className="lg:w-2/3">
          {/* Main Image */}
          <div className="rounded-xl overflow-hidden shadow-md mb-4 h-[400px] md:h-[500px]">
            <img src={selectedImage} alt={room.hotel.name} className="w-full h-full object-cover" />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {room.images.map((img, index) => (
              <div 
                key={index} 
                className={`rounded-lg overflow-hidden cursor-pointer border-2 ${selectedImage === img ? 'border-indigo-500' : 'border-transparent'} h-24`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img} alt={`Thumbnail ${index}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
              </div>
            ))}
          </div>

          {/* Hotel Info */}
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">
            {room.hotel.name}
          </h1>
          <div className="flex items-center gap-2 mb-4 text-gray-600">
             <img src={assets.starIconFilled} className="w-5 h-5" alt="rating" />
             <span className="font-medium text-black">4.8</span>
             <span>({room.hotel.address})</span>
          </div>

          <div className="border-t border-b border-gray-200 py-6 my-6">
             <h3 className="text-xl font-semibold mb-4">About this place</h3>
             <p className="text-gray-600 leading-relaxed mb-6">
                Experience luxury at its finest at {room.hotel.name}. Nestled in the heart of {room.hotel.city}, 
                this property offers breathtaking views, world-class amenities, and unparalleled service. 
                Whether you are here for business or leisure, our dedicated staff ensures a memorable stay.
                Enjoy our state-of-the-art facilities including a spa, fitness center, and gourmet restaurants.
             </p>
             
             {/* Highlights from roomCommonData */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {roomCommonData.map((item, index) => (
                 <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                   <img src={item.icon} alt={item.title} className="w-6 h-6 mt-1 opacity-70" />
                   <div>
                     <p className="font-semibold text-gray-800">{item.title}</p>
                     <p className="text-sm text-gray-500">{item.description}</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-700">
                        <img 
                            src={facilityIcons[amenity] || assets.badgeIcon} 
                            alt={amenity} 
                            className="w-6 h-6 opacity-70"
                        />
                        <span>{amenity}</span>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:w-1/3">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 sticky top-32">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <span className="text-2xl font-bold">${room.pricePerNight}</span>
                        <span className="text-gray-500"> / night</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="border border-gray-300 rounded-lg p-3">
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check-In</label>
                        <input 
                            type="date" 
                            className="w-full text-sm outline-none text-gray-600"
                            onChange={(e) => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3">
                         <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check-Out</label>
                        <input 
                            type="date" 
                            className="w-full text-sm outline-none text-gray-600"
                            onChange={(e) => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>

                <div className="border border-gray-300 rounded-lg p-3 mb-6">
                     <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Guests</label>
                    <input 
                        type="number" 
                        min="1" 
                        max="10"
                        value={guests}
                        onChange={(e)=>setGuests(e.target.value)}
                        className="w-full text-sm outline-none text-gray-600"
                    />
                </div>
                
                <button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02] cursor-pointer">
                    Check Availability
                </button>

                 <div className="mt-4 flex justify-between text-gray-600 font-medium">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
