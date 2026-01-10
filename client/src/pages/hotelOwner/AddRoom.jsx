import React, { useState, useContext } from 'react'
import { assets, facilityIcons } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AddRoom = () => {
  const { addRoom } = useContext(AppContext);
  const navigate = useNavigate();

  const [images, setImages] = useState([null, null, null, null]);
  const [data, setData] = useState({
      roomType: '',
      price: '',
      amenities: []
  });

  const handleImageChange = (index, e) => {
      const file = e.target.files[0];
      if (file) {
          const newImages = [...images];
          newImages[index] = file;
          setImages(newImages);
      }
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
      setData(prev => {
          const amenities = prev.amenities.includes(amenity)
              ? prev.amenities.filter(item => item !== amenity)
              : [...prev.amenities, amenity];
          return { ...prev, amenities };
      });
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      // In a real app, we would upload images here. For now, we use local URLs or placeholders if null
      const processedImages = images.map(img => img ? URL.createObjectURL(img) : null).filter(Boolean);
      
      const newRoom = {
          roomType: data.roomType,
          pricePerNight: Number(data.price),
          amenities: data.amenities,
          images: processedImages.length > 0 ? processedImages : [assets.roomImg1], // Fallback image
          isAvailable: true
      };

      addRoom(newRoom);
      navigate('/owner/list-room');
  };

  return (
    <div className='max-w-4xl mx-auto'>
        <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
            
            {/* Image Upload */}
            <div>
                <p className="font-medium mb-2">Upload Room Images (Max 4)</p>
                <div className="flex gap-4 flex-wrap">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(index, e)}
                            />
                            {img ? (
                                <img src={URL.createObjectURL(img)} alt={`upload-${index}`} className="w-full h-full object-cover" />
                            ) : (
                                <img src={assets.uploadArea} alt="upload" className="w-8 h-8 opacity-40" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Room Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                    <select 
                        name="roomType" 
                        value={data.roomType} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500 bg-white" 
                        required 
                    >
                        <option value="" disabled>Select Room Type</option>
                        <option value="Standard Room">Standard Room</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                        <option value="Luxury Suite">Luxury Suite</option>
                        <option value="Single Room">Single Room</option>
                        <option value="Double Room">Double Room</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Night ($)</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={data.price} 
                        onChange={handleInputChange} 
                        placeholder="e.g. 150" 
                        className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500" 
                        required 
                    />
                </div>
            </div>

            {/* Amenities */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.keys(facilityIcons).map((amenity) => (
                        <div key={amenity} 
                            onClick={() => handleAmenityChange(amenity)}
                            className={`flex items-center gap-2 p-2 px-3 border rounded cursor-pointer transition-all ${data.amenities.includes(amenity) ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                            <input 
                                type="checkbox" 
                                checked={data.amenities.includes(amenity)} 
                                readOnly 
                                className="hidden"
                            />
                             <img src={facilityIcons[amenity]} alt="" className="w-4 h-4"/>
                            <span className="text-sm">{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white rounded py-2.5 font-medium hover:bg-blue-700 transition-colors mt-2">
                ADD ROOM
            </button>

        </form>
    </div>
  )
}

export default AddRoom
