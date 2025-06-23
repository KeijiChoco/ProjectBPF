import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';

function Header() {
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-6 py-3">
      {/* Search Bar */}
      <div className="relative w-72">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>

      {/* Notification & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative text-gray-500 hover:text-indigo-600 transition duration-150">
          <FiBell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 rounded-full px-3 py-1 transition duration-150">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            A
          </div>
          <div className="text-sm leading-tight">
            <p className="font-semibold text-gray-800">Admin FAF</p>
            <p className="text-gray-500 text-xs">Super Admin</p>
          </div>
          <FiChevronDown className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}

export default Header;
