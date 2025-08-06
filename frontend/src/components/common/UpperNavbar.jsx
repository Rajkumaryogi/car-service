// src/components/UpperNavbar.jsx

import React from "react";
import { FaPhone, FaEnvelope, FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function UpperNavbar() {
  return (
    <div className="bg-red-600 text-white py-2 px-4 sm:px-6 lg:px-8">
      {/* Changed to flex-col on mobile and flex-row on medium screens */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm space-y-2 md:space-y-0">
        
        {/* Contact Info container */}
        {/* Changed to flex-col on mobile and flex-row on medium screens */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <a href="tel:+919314201111" className="flex items-center hover:text-black transition-colors">
            <FaPhone className="mr-2" />
            <span>+91 93142 01111</span>
          </a>
          <a href="mailto:bajdoliyaworkshop2018@gmail.com" className="flex items-center hover:text-black transition-colors">
            <FaEnvelope className="mr-2" />
            <span>bajdoliyaworkshop2018@gmail.com</span>
          </a>
        </div>

        {/* Social Media Icons container */}
        <div className="flex items-center space-x-4">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            <FaFacebook className="text-lg" />
          </a>
          <a href="https://wa.me/919314201111" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            <FaWhatsapp className="text-lg" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
            <FaInstagram className="text-lg" />
          </a>
        </div>
      </div>
    </div>
  );
}