import React, { useState, useEffect } from "react";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useAppContext } from "../context/AppContext";

const RecommendedDestinations = () => {
  const { axios, searchedCities, user } = useAppContext();
  const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedRooms = async () => {
      // Only fetch if user is logged in and has searched cities
      if (!user || !searchedCities || searchedCities.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/room');
        if (response.data.success) {
          // Filter rooms from user's searched cities
          const filtered = response.data.rooms.filter(room => 
            searchedCities.some(city => 
              room.hotel?.city?.toLowerCase() === city.toLowerCase()
            )
          );
          
          // Get up to 4 rooms, prioritizing most recently searched cities
          const roomsByCity = {};
          searchedCities.forEach(city => {
            const cityRooms = filtered.filter(room => 
              room.hotel?.city?.toLowerCase() === city.toLowerCase()
            );
            if (cityRooms.length > 0) {
              roomsByCity[city] = cityRooms[0]; // Take first room from each city
            }
          });
          
          const rooms = Object.values(roomsByCity).slice(0, 4);
          setRecommendedRooms(rooms);
        }
      } catch (error) {
        console.error('Error fetching recommended rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedRooms();
  }, [user, searchedCities]);

  // Don't render if no user, no searched cities, or no recommended rooms
  if (!user || !searchedCities || searchedCities.length === 0 || recommendedRooms.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-white py-20">
        <div className="text-gray-500">Loading recommendations...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-white py-20">
      <Title 
        title='Recommended For You' 
        subTitle={`Based on your recent searches in ${searchedCities.slice(0, 3).join(', ')}`}
      />

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20">
        {recommendedRooms.map((room, index) => (
          <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedDestinations;
