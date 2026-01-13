import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const HotelReg = ({ setShowRegModal, isPage = false }) => {
    const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        phone: "",
        address: "",
        city: cities && cities.length > 0 ? cities[0] : ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name; 
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        
        try {
            const token = await getToken();
            const response = await axios.post('/api/hotel/register', {
                name: data.name,
                address: data.address,
                contact: data.phone,
                city: data.city
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setIsOwner(true);
                if(!isPage) setShowHotelReg(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    if (isPage) {
        return (
            <div className='flex-1 flex items-center justify-center p-8'>
                <form onSubmit={onSubmitHandler} className='flex bg-white rounded-xl shadow-lg max-w-4xl w-full overflow-hidden border border-gray-100'>
                     <img src={assets.regImage} alt="reg-image" className='w-1/2 hidden md:block object-cover' />
                    <div className='flex flex-col items-center md:w-1/2 p-8 md:p-10 w-full'>
                        <p className='text-2xl font-semibold mb-6'>Register Your Hotel</p>
                        <div className="w-full space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                    <img src={assets.homeIcon} alt="" className="w-5 h-5 opacity-50"/>
                                    <input onChange={onChangeHandler} value={data.name} name="name" type="text" className="w-full outline-none text-sm" placeholder="Enter hotel name" required />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                    <span className="text-gray-400 font-medium text-sm">📞</span>
                                    <input onChange={onChangeHandler} value={data.phone} name="phone" type="tel" className="w-full outline-none text-sm" placeholder="Enter phone number" required />
                                </div>
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                    <img src={assets.locationIcon} alt="" className="w-5 h-5 opacity-50"/>
                                    <input onChange={onChangeHandler} value={data.address} name="address" type="text" className="w-full outline-none text-sm" placeholder="Enter address" required />
                                </div>
                            </div>
    
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                    <img src={assets.locationFilledIcon} alt="" className="w-5 h-5 opacity-50"/>
                                    <select onChange={onChangeHandler} value={data.city} name="city" className="w-full outline-none text-sm bg-transparent cursor-pointer">
                                        {cities && cities.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
    
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 transition-colors mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70'>
            <form onSubmit={onSubmitHandler} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2 w-full mx-4 overflow-hidden'>
                <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-l-xl hidden md:block object-cover' />
                <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10 w-full'>
                    <img onClick={() => setShowHotelReg(false)} src={assets.closeIcon} alt="close-icon" className='absolute top-4 right-4 h-4 w-4 cursor-pointer opacity-70 hover:opacity-100 transition-opacity' />
                    <p className='text-2xl font-semibold mb-6'>Register Your Hotel</p>

                    <div className="w-full space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name</label>
                            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                <img src={assets.homeIcon} alt="" className="w-5 h-5 opacity-50"/>
                                <input onChange={onChangeHandler} value={data.name} name="name" type="text" className="w-full outline-none text-sm" placeholder="Enter hotel name" required />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                <span className="text-gray-400 font-medium text-sm">📞</span>
                                <input onChange={onChangeHandler} value={data.phone} name="phone" type="tel" className="w-full outline-none text-sm" placeholder="Enter phone number" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                <img src={assets.locationIcon} alt="" className="w-5 h-5 opacity-50"/>
                                <input onChange={onChangeHandler} value={data.address} name="address" type="text" className="w-full outline-none text-sm" placeholder="Enter address" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                                <img src={assets.locationFilledIcon} alt="" className="w-5 h-5 opacity-50"/>
                                <select onChange={onChangeHandler} value={data.city} name="city" className="w-full outline-none text-sm bg-transparent cursor-pointer">
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-blue-600 text-white rounded py-2 font-medium hover:bg-blue-700 transition-colors mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default HotelReg
