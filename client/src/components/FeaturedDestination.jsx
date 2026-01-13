import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const FeaturedDestination = () => {
  const navigate = useNavigate();
  const { axios } = useAppContext();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedRooms = async () => {
    try {
      const response = await axios.get('/api/room');
      if (response.data.success) {
        // Get the latest 4 rooms sorted by creation date
        const latestRooms = response.data.rooms
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);
        setRooms(latestRooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <div className="text-gray-500">Loading featured destinations...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
        <Title title='Featured Destination' subTitle='Discover our handpicked selection 
        of exceptional properties around the world, offering unparalleled luxury 
        and unforgettable experiences.'/>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {rooms.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No rooms available yet
        </div>
      )}

      {rooms.length > 0 && (
        <button onClick={()=>{navigate('/hotels'); scrollTo(0,0)}}
          className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
          View All Destinations
        </button>
      )}
    </div>
  );
};

export default FeaturedDestination;
