// src/components/DashboardAdmin/Header.jsx

import React from 'react';
import { FiBell, FiSearch, FiMail, FiChevronDown, FiCalendar } from 'react-icons/fi';

function Header() {
  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm rounded-lg mb-6">
      {/* Left Side - Greeting */}
      <div>
        <h2 className="text-lg text-gray-800 font-semibold">
          Selamat Pagi, Bert
        </h2>
        <p className="text-sm text-gray-500">Berikut adalah ringkasan performa minggu ini</p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-4">
        {/* Date Picker */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm text-gray-600">
          <FiCalendar className="mr-2" />
          <span>24 Juli 2025</span>
        </div>

        {/* Icons */}
        <button className="text-gray-600 hover:text-indigo-600">
          <FiSearch size={18} />
        </button>

        <button className="relative text-gray-600 hover:text-indigo-600">
          <FiBell size={18} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="text-gray-600 hover:text-indigo-600">
          <FiMail size={18} />
        </button>

        {/* Profile Image */}
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
        />
      </div>
    </header>
  );
}

export default Header;
