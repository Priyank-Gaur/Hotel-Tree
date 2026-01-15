import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import HotelCard from "../components/HotelCard";

const Hotels = () => {
  const { axios } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get("city") || "");

  
  const [priceRange, setPriceRange] = useState([0, 1000]); 
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false); 
  
  const [allAmenities, setAllAmenities] = useState([]);
  const [allRoomTypes, setAllRoomTypes] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/room');
        if (response.data.success) {
          const fetchedRooms = response.data.rooms;

          
          const uniqueAmenities = [...new Set(fetchedRooms.flatMap((room) => room.amenities || []))];
          const uniqueRoomTypes = [...new Set(fetchedRooms.map((room) => room.roomType))];
          setAllAmenities(uniqueAmenities);
          setAllRoomTypes(uniqueRoomTypes);
          
          
          const hotelsMap = {};
          fetchedRooms.forEach(room => {
            if (room.hotel && room.hotel._id) {
                if (!hotelsMap[room.hotel._id]) {
                    hotelsMap[room.hotel._id] = {
                        ...room.hotel,
                        rooms: []
                    };
                }
                hotelsMap[room.hotel._id].rooms.push(room);
            }
          });
          
          setHotels(Object.values(hotelsMap));
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
  }, [axios]);

    
    useEffect(() => {
        if (searchTerm) {
            setSearchParams({ city: searchTerm });
        } else {
            setSearchParams({});
        }
    }, [searchTerm, setSearchParams]);


  const filteredHotels = hotels.map(hotel => {
    
    const filteredRooms = hotel.rooms.filter(room => {
        
        const priceMatch = room.pricePerNight >= priceRange[0] && room.pricePerNight <= priceRange[1];
        
        
        const typeMatch = selectedRoomTypes.length === 0 || selectedRoomTypes.includes(room.roomType);

        
        const amenityMatch = selectedAmenities.length === 0 || selectedAmenities.every(a => room.amenities.includes(a));

        return priceMatch && typeMatch && amenityMatch;
    });

    return { ...hotel, rooms: filteredRooms };
  }).filter(hotel => {
    
    if (hotel.rooms.length === 0) return false;

    const cityMatch = hotel.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const nameMatch = hotel.name?.toLowerCase().includes(searchTerm.toLowerCase());

    return cityMatch || nameMatch;
  });

  const handlePriceChange = (e) => {
    setPriceRange([0, Number(e.target.value)]);
  };

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleRoomTypeChange = (type) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading hotels...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 md:px-16 lg:px-24 py-10 pt-32 min-h-screen bg-gray-50/50">
      
         {}
         <button 
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-fit mb-4"
        onClick={()=>setShowFilters(!showFilters)}
        >
            <img src={assets.menuIcon} alt="filter" className="w-5 h-5"/>
            Filters
        </button>

      {}
      <div className={`w-full md:w-1/4 min-w-[250px] bg-white p-6 rounded-lg shadow-sm h-fit ${showFilters ? 'block' : 'hidden md:block'}`}>
        <h3 className="text-lg font-semibold mb-6">Filters</h3>

        {}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Price Range</h4>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full accent-black cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>$0</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Room Type</h4>
          <div className="flex flex-col gap-2">
            {allRoomTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedRoomTypes.includes(type)}
                  onChange={() => handleRoomTypeChange(type)}
                  className="accent-black rounded"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {}
        <div>
          <h4 className="font-medium mb-3">Amenities</h4>
          <div className="flex flex-col gap-2">
            {allAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityChange(amenity)}
                  className="accent-black rounded"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        
        <button 
            onClick={()=>{setPriceRange([0,1000]); setSelectedAmenities([]); setSelectedRoomTypes([])}}
            className="mt-6 text-sm text-gray-500 hover:text-black hover:underline w-full text-left"
        >
            Reset Filters
        </button>
      </div>

      {}
      <div className="flex-1">
        {}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
            <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
                Find Your Perfect Hotel
            </h1>
            <p className="text-gray-500">Discover top-rated hotels and luxurious stays</p>
            </div>
            
            <div className="w-full md:w-80">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search city or hotel..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <img src={assets.searchIcon} alt="search" className="w-4 h-4 opacity-60" />
                    </div>
                </div>
            </div>
        </div>

        {}
        <div className="flex flex-col gap-16">
            {filteredHotels.length > 0 ? (
            filteredHotels.map(hotel => (
                <div key={hotel._id} className="animate-fadeIn">
                {}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold font-playfair text-gray-800 flex items-center gap-2">
                            {hotel.name}
                            {hotel.rooms.some(r => r.pricePerNight > 200) && (
                                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-sans font-medium">Premier</span>
                            )}
                        </h2>
                        <div className="flex items-center gap-2 text-gray-500 mt-1">
                            <img src={assets.locationIcon} className="w-4 h-4 opacity-60" alt="location"/>
                            <span>{hotel.address}, {hotel.city}</span>
                        </div>
                    </div>
                </div>
                
                {}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {hotel.rooms.map((room, idx) => (
                        <HotelCard key={room._id} room={room} index={idx} />
                    ))}
                </div>
                </div>
            ))
            ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                <img src={assets.locationIcon} className="w-16 h-16 opacity-20 mb-4" alt="No results"/>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No hotels found</h3>
                <p className="mb-6">Try adjusting your filters or search terms</p>
                <div className="flex gap-4">
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Clear Search
                    </button>
                    <button 
                        onClick={()=>{setPriceRange([0,1000]); setSelectedAmenities([]); setSelectedRoomTypes([])}}
                        className="px-6 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default Hotels;
