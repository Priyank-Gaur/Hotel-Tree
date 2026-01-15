import React, { useState } from 'react'
import { assets, facilityIcons } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddRoom = () => {
  const { axios, getToken } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      
      const validImages = images.filter(img => img !== null);
      if (validImages.length === 0) {
          toast.error('Please upload at least one room image');
          return;
      }

      setLoading(true);
      
      try {
          const formData = new FormData();
          
          
          validImages.forEach(image => {
              formData.append('images', image);
          });
          
          
          formData.append('roomType', data.roomType);
          formData.append('pricePerNight', data.price);
          formData.append('amenities', JSON.stringify(data.amenities));

          const token = await getToken();
          const response = await axios.post('/api/room', formData, {
              headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
              }
          });

          if (response.data.success) {
              toast.success(response.data.message);
              navigate('/owner/list-room');
          } else {
              toast.error(response.data.message);
          }
      } catch (error) {
          toast.error(error.response?.data?.message || error.message);
      } finally {
          setLoading(false);
      }
  };

  return (
    <div className='max-w-4xl mx-auto'>
        <h2 className="text-2xl font-bold mb-6">Add New Room</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-6">
            
            {}
            <div>
                <p className="font-medium mb-2">Upload Room Images (Max 4)</p>
                <div className="flex gap-4 flex-wrap">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
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
                {}
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

                {}
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

            {}
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

            <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 text-white rounded py-2.5 font-medium hover:bg-blue-700 transition-colors mt-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Adding Room...' : 'ADD ROOM'}
            </button>

        </form>
    </div>
  )
}

export default AddRoom
