import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx-6 md:mx-16 lg:mx-24 mt-20 mb-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Brand Section */}
        <div className="max-w-sm">
          <img src={assets.logo} alt="Logo" className="h-8 mb-6 invert opacity-80" />
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Experience the epitome of luxury and comfort. Our handpicked destinations offer unforgettable memories and world-class hospitality.
          </p>
          <div className="flex gap-4">
            <img src={assets.facebookIcon} alt="Facebook" className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.twitterIcon} alt="Twitter" className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.instagramIcon} alt="Instagram" className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform" />
            <img src={assets.linkendinIcon} alt="LinkedIn" className="w-10 h-10 cursor-pointer hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg mb-2">Company</h3>
          <ul className="text-gray-500 text-sm flex flex-col gap-2">
            <li className="hover:text-black cursor-pointer transition-colors">About Us</li>
            <li className="hover:text-black cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-black cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-black cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

         {/* Support Links */}
         <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg mb-2">Support</h3>
          <ul className="text-gray-500 text-sm flex flex-col gap-2">
            <li className="hover:text-black cursor-pointer transition-colors">Help Center</li>
            <li className="hover:text-black cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-black cursor-pointer transition-colors">Legal</li>
            <li className="hover:text-black cursor-pointer transition-colors">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter Teaser (Optional, since we have a section) */}
        <div className="max-w-xs">
           <h3 className="font-bold text-lg mb-4">Contact</h3>
           <p className="text-gray-500 text-sm mb-2">123 Luxury Lane, Paradise City, PC 56789</p>
           <p className="text-gray-500 text-sm mb-2">contact@luxuryhotels.com</p>
           <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-16 pt-8 text-center text-gray-400 text-sm">
        <p>© 2025 Priyank Gaur. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
