import React, { useState, useEffect, useRef } from 'react';
import { assets, cities } from '../assets/assets';

const CityAutocomplete = ({ value, onChange, placeholder, className, icon }) => {
    const [filteredCities, setFilteredCities] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);

        if (inputValue.length > 0) {
            const filtered = cities.filter(city =>
                city.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setFilteredCities(filtered);
            setIsDropdownOpen(true);
        } else {
            setFilteredCities([]);
            setIsDropdownOpen(false);
        }
    };

    const handleCitySelect = (city) => {
        onChange(city);
        setIsDropdownOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
             <div className={className ? className : "flex items-center gap-2 border border-gray-300 rounded px-3 py-2"}>
                  {icon && <img src={icon} alt="" className="w-4 h-4 opacity-50" />}
                  <input
                        type="text"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-full outline-none bg-transparent"
                        onFocus={() => {
                            if (value.length > 0) {
                                setIsDropdownOpen(true);
                                const filtered = cities.filter(city =>
                                    city.toLowerCase().startsWith(value.toLowerCase())
                                );
                                setFilteredCities(filtered);
                            }
                        }}
                  />
             </div>

            {isDropdownOpen && filteredCities.length > 0 && (
                <ul className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                    {filteredCities.map((city, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                            onClick={() => handleCitySelect(city)}
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CityAutocomplete;
