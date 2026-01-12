import React, { useState } from "react";
import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Hero = ({ setShowRegModal }) => {
  const navigate = useNavigate();
  const { axios, getToken, user, setSearchedCities } = useAppContext();
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save searched city to user profile if logged in
    if (user && searchData.destination) {
      try {
        const token = await getToken();
        const response = await axios.post('/api/user/store-recent-search', 
          { recentSearchedCity: searchData.destination },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        
        if (response.data.success) {
          // Update local state to immediately show in recommendations
          setSearchedCities(prev => {
            const updated = [...prev];
            if (!updated.includes(searchData.destination)) {
              if (updated.length >= 3) {
                updated.shift();
              }
              updated.push(searchData.destination);
            }
            return updated;
          });
        }
      } catch (error) {
        console.error('Error saving search:', error);
      }
    }
    
    // Create URL search params
    const params = new URLSearchParams();
    if (searchData.destination) params.append('city', searchData.destination);
    if (searchData.checkIn) params.append('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.append('checkOut', searchData.checkOut);
    if (searchData.guests) params.append('guests', searchData.guests);
    
    // Navigate to rooms page with search parameters
    navigate(`/rooms?${params.toString()}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Zoom Effect */}
        <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-in-out hover:scale-110"
            style={{ backgroundImage: `url(${heroImage})`, transformOrigin: 'center' }}
        ></div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
            
            <div className="animate-fade-in-up">
                <span className="inline-block py-1 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium tracking-wider mb-6">
                    THE ULTIMATE ESCAPE
                </span>
                
                <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 drop-shadow-lg">
                    Experience <span className="italic text-blue-400">Luxury</span> <br/> Like Never Before
                </h1>
                
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-light mb-10 leading-relaxed">
                    Discover handpicked 5-star hotels and resorts for your perfect getaway. 
                    Unmatched comfort, breathtaking views, and world-class service.
                </p>
            </div>

            {/* Glassmorphism Search Bar */}
            <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-4 animate-fade-in-up delay-100">
                
                {/* Destination */}
                <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors group">
                    <div className="flex items-center gap-3 mb-1">
                        <img src={assets.locationIcon} alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert" />
                        <label htmlFor="destinationInput" className="text-xs font-medium uppercase tracking-wider text-gray-300">Destination</label>
                    </div>
                    <input
                        list="destinations"
                        id="destinationInput"
                        type="text"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                        className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400 font-medium"
                        placeholder="Where to?"
                        required
                    />
                    <datalist id="destinations">
                        {cities.map((city, index) => (
                            <option value={city} key={index} />
                        ))}
                    </datalist>
                </div>

                {/* Check In */}
                <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors group">
                     <div className="flex items-center gap-3 mb-1">
                        <img src={assets.calenderIcon} alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert" />
                        <label htmlFor="checkIn" className="text-xs font-medium uppercase tracking-wider text-gray-300">Check In</label>
                    </div>
                    <input
                        id="checkIn"
                        type="date"
                        value={searchData.checkIn}
                        onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                        className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400 font-medium [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>

                 {/* Check Out */}
                 <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors group">
                     <div className="flex items-center gap-3 mb-1">
                        <img src={assets.calenderIcon} alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert" />
                        <label htmlFor="checkOut" className="text-xs font-medium uppercase tracking-wider text-gray-300">Check Out</label>
                    </div>
                    <input
                        id="checkOut"
                        type="date"
                        value={searchData.checkOut}
                        onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                        className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400 font-medium [&::-webkit-calendar-picker-indicator]:invert"
                    />
                </div>

                {/* Guests */}
                <div className="w-32 bg-white/10 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors group">
                     <div className="flex items-center gap-3 mb-1">
                        <img src={assets.userIcon} alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert" />
                        <label htmlFor="guests" className="text-xs font-medium uppercase tracking-wider text-gray-300">Guests</label>
                    </div>
                    <input
                        min={1}
                        max={10}
                        id="guests"
                        type="number"
                        value={searchData.guests}
                        onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                        className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400 font-medium"
                        placeholder="2"
                    />
                </div>

                {/* Search Button */}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-8 py-4 font-semibold text-lg transition-all shadow-lg hover:shadow-blue-600/50 flex items-center justify-center gap-2">
                    <img src={assets.searchIcon} alt="" className="w-5 h-5 invert" />
                    Search
                </button>
            </form>

            <button 
                onClick={() => setShowRegModal(true)}
                className="mt-12 text-sm text-gray-300 hover:text-white border-b border-transparent hover:border-white transition-all pb-1"
            >
                Are you a property owner? List your hotel
            </button>
        </div>
    </div>
  );
};
export default Hero;
