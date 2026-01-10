import React, { useEffect, useState } from "react";
import { assets, roomsDummyData } from "../assets/assets";
import HotelCard from "../components/HotelCard";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filterRooms, setFilterRooms] = useState([]);

  // Filter States
  const [priceRange, setPriceRange] = useState([0, 1000]); // [min, max]
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // Mobile filter toggle

  // Extract unique amenities and room types
  const allAmenities = [...new Set(roomsDummyData.flatMap((room) => room.amenities))];
  const allRoomTypes = [...new Set(roomsDummyData.map((room) => room.roomType))];

  useEffect(() => {
    setRooms(roomsDummyData);
    setFilterRooms(roomsDummyData);
  }, []);

  // Apply filters
  useEffect(() => {
    let tempRooms = rooms;

    // Price Filter
    tempRooms = tempRooms.filter(
      (room) => room.pricePerNight >= priceRange[0] && room.pricePerNight <= priceRange[1]
    );

    // Room Type Filter
    if (selectedRoomTypes.length > 0) {
      tempRooms = tempRooms.filter((room) => selectedRoomTypes.includes(room.roomType));
    }

    // Amenities Filter
    if (selectedAmenities.length > 0) {
      tempRooms = tempRooms.filter((room) =>
        selectedAmenities.every((amenity) => room.amenities.includes(amenity))
      );
    }

    setFilterRooms(tempRooms);
  }, [priceRange, selectedRoomTypes, selectedAmenities, rooms]);

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

  return (
    <div className="flex flex-col md:flex-row gap-8 px-6 md:px-16 lg:px-24 py-10 pt-32 min-h-screen bg-gray-50/50">
      
        {/* Mobile Filter Toggle */}
        <button 
        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm w-fit"
        onClick={()=>setShowFilters(!showFilters)}
        >
            <img src={assets.menuIcon} alt="filter" className="w-5 h-5"/>
            Filters
        </button>


      {/* Sidebar Filters */}
      <div className={`w-full md:w-1/4 min-w-[250px] bg-white p-6 rounded-lg shadow-sm h-fit ${showFilters ? 'block' : 'hidden md:block'}`}>
        <h3 className="text-lg font-semibold mb-6">Filters</h3>

        {/* Price Range */}
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

        {/* Room Type */}
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

        {/* Amenities */}
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
      </div>

      {/* Room Grid */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-playfair">All Rooms</h2>
            <p className="text-gray-500 text-sm">Showing {filterRooms.length} results</p>
        </div>
        
        {filterRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterRooms.map((room, index) => (
              <HotelCard key={room._id} room={room} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <img src={assets.locationIcon} className="w-12 h-12 opacity-20 mb-4" alt="No results"/>
            <p>No rooms found matching your filters.</p>
            <button 
                onClick={()=>{setPriceRange([0,1000]); setSelectedAmenities([]); setSelectedRoomTypes([])}}
                className="mt-4 text-indigo-600 hover:underline"
            >
                Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRooms;
