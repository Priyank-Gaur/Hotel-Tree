import React, { useState } from "react";
import heroImage from "../assets/heroImage.png";
import { assets, cities } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Hero = ({ setShowRegModal }) => {
  const navigate = useNavigate();
  const { axios, getToken, user, setSearchedCities } = useAppContext();
  const [destination, setDestination] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Save searched city to user profile if logged in
    if (user && destination) {
      try {
        const token = await getToken();
        // Fire and forget, don't await response to speed up navigation
        axios.post('/api/user/store-recent-search', 
          { recentSearchedCity: destination },
          { headers: { Authorization: `Bearer ${token}` }}
        );
        
        // Update local state to immediately show in recommendations
        setSearchedCities(prev => {
          const updated = [...prev];
          if (!updated.includes(destination)) {
            if (updated.length >= 3) {
              updated.shift();
            }
            updated.push(destination);
          }
          return updated;
        });
      } catch (error) {
        console.error('Error saving search:', error);
      }
    }
    
    // Create URL search params
    const params = new URLSearchParams();
    if (destination) params.append('city', destination);
    
    // Navigate to hotels page with search parameters
    navigate(`/hotels?${params.toString()}`);
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
            <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-3 md:p-4 shadow-2xl flex flex-col md:flex-row gap-3 animate-fade-in-up delay-100">
                
                {/* Destination */}
                <div className="flex-1 bg-white/10 rounded-xl px-4 py-3 border border-white/10 hover:bg-white/20 transition-colors group">
                    <div className="flex items-center gap-3 mb-1">
                        <img src={assets.locationIcon} alt="" className="w-5 h-5 opacity-80 group-hover:opacity-100 transition-opacity invert" />
                        <label htmlFor="destinationInput" className="text-xs font-medium uppercase tracking-wider text-gray-300">Destination</label>
                    </div>
                    <input
                        id="destinationInput"
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-transparent outline-none text-white text-lg placeholder-gray-400 font-medium"
                        placeholder="Where to?"
                        required
                    />
                </div>

                {/* Search Button */}
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-12 py-3 font-semibold text-lg transition-all shadow-lg hover:shadow-blue-600/50 flex items-center justify-center gap-2">
                    <img src={assets.searchIcon} alt="" className="w-5 h-5 invert" />
                    Search
                </button>
            </form>
        </div>
    </div>
  );
};
export default Hero;
