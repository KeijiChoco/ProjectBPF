// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBox } from 'react-icons/fi';

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition-colors duration-200 ${
      isActive ? 'bg-gray-700 text-white' : ''
    }`;

  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">FAF Grind & Learn</h1>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>
      <nav className="px-4">
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" className={linkClass}>
              <FiGrid className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={linkClass}>
              <FiBox className="mr-3" />
              Manajemen Produk
            </NavLink>
          </li>
          {/* Tambahkan link lain di sini nanti */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;