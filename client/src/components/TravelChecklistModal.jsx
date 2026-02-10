import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TravelChecklistModal = ({ isOpen, onClose, booking }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchChecklist = async () => {
        setLoading(true);
        try {
          console.log("Sending request to /api/ai/checklist with:", {
            destination: booking.hotel?.city,
            checkInDate: booking.checkInDate,
            hotelName: booking.hotel?.name
          });

          const response = await axios.post('/api/ai/checklist', {
            destination: booking.hotel?.city,
            checkInDate: booking.checkInDate,
            hotelName: booking.hotel?.name
          });
    
          if (response.data.success) {
            setData(response.data.data);
          } else {
            console.error("Backend returned success: false", response.data);
            toast.error(response.data.message || "Failed to generate checklist");
            onClose();
          }
        } catch (error) {
          console.error("AI Checklist Request Error:", error);
          if (error.response) {
              console.error("Error Response Data:", error.response.data);
              console.error("Error Response Status:", error.response.status);
          }
          toast.error("Something went wrong. Please check console.");
          onClose();
        } finally {
          setLoading(false);
        }
      };

    if (isOpen && booking) {
      fetchChecklist();
    } else {
        setData(null);
        setLoading(false);
    }
  }, [isOpen, booking, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative animate-fadeIn">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-playfair font-bold flex items-center gap-2">
              ✨ Travel Essentials
            </h3>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-indigo-100 mt-2 text-sm">
            Personalized for your trip to {booking.hotel?.city}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
              <p className="text-gray-500 animate-pulse">Curating your packing list...</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              
              {/* Checklist Section */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 uppercase tracking-wide text-sm">
                  <span className="text-xl">🧳</span> Packing List
                </h4>
                <ul className="space-y-2">
                  {data.checklist?.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 mt-2 group-hover:scale-125 transition-transform"></div>
                        <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-100 my-4"></div>

              {/* Hidden Gems Section */}
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-gray-800 mb-3 uppercase tracking-wide text-sm">
                  <span className="text-xl">🤫</span> Local Secrets
                </h4>
                <div className="grid gap-3">
                    {data.tips?.map((tip, index) => (
                        <div key={index} className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-indigo-900 text-sm">
                            {tip}
                        </div>
                    ))}
                </div>
              </div>

            </div>
          ) : (
             <div className="text-center py-10 text-gray-500">
                Failed to load data.
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
                onClick={onClose}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
            >
                Close
            </button>
        </div>

      </div>
    </div>
  );
};

export default TravelChecklistModal;
