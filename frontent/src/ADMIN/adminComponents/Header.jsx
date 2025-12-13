// src/components/Header.js (அல்லது உங்கள் பாதைக்கு ஏற்ப)

import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    // Tailwind CSS-ல் 'fixed' பயன்படுத்தி மேலே நிலையாக வைக்கப்பட்டுள்ளது
    // Sidebar-ன் அகலம் 64px, அதனால் இடது தள்ளுவதற்காக 'left-64' பயன்படுத்தப்பட்டுள்ளது
    <header className="fixed top-0 left-64 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-10">
      {/* Search or Title */}
      <h1 className="text-xl font-semibold text-gray-800">
        Welcome to Dashboard
      </h1>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="text-gray-500 hover:text-red-500 transition duration-200">
          <FaBell className="w-6 h-6" />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle className="w-8 h-8 text-blue-500" />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
