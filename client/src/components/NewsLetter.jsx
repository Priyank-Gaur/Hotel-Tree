import React from "react";
import { assets } from "../assets/assets";

const Newsletter = () => {
  return (
    <div className="mx-6 md:mx-16 lg:mx-24 my-24">
      <div className="bg-black text-white rounded-2xl flex flex-col md:flex-row items-center p-8 md:p-16 gap-8 relative overflow-hidden">
        
        {}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-700 rounded-full blur-2xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="flex-1 z-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto md:mx-0">
            Be the first to know about exclusive offers, new destinations, and travel tips. Join our community of luxury travelers today.
          </p>
        </div>

        <div className="flex-1 w-full max-w-md z-10">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-gray-600 text-white placeholder-gray-400 outline-none focus:border-white transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
           <p className="text-gray-500 text-xs mt-3 text-center md:text-left">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
