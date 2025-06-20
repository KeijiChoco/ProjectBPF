// src/components/Header.jsx
import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';

function Header() {
  return (
    <header className="bg-white shadow-sm flex items-center justify-between px-6 py-4 flex-shrink-0">
      {/* Bagian Kiri: Search Bar (Contoh) */}
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Bagian Kanan: Ikon dan Profil */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <FiBell size={22} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center">
            {/* Anda bisa ganti dengan <img> jika sudah ada foto profil */}
            <span className="text-indigo-600 font-bold">A</span>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-gray-800">Admin FAF</p>
            <p className="text-gray-500">Super Admin</p>
          </div>
          <FiChevronDown className="text-gray-500 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Header;