import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { MdQuestionAnswer, MdArticle } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { FiGrid } from "react-icons/fi";
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
     ${isActive ? 'bg-[#6f4e37] text-white shadow-md' : 'text-[#d2b48c] hover:bg-[#8b5e3c] hover:text-white'}`;

  return (
    <aside className="w-64 min-h-screen bg-[#3e2723] text-white shadow-lg flex-shrink-0">
      {/* Header Branding */}
      <div className="px-6 py-5 border-b border-[#5d4037]">
        <h1 className="text-2xl font-bold text-[#d7ccc8]">FAF Grind & Learn</h1>
        <p className="text-sm text-[#a1887f] mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          <li>
            <NavLink to="/" className={linkClass}>
              <FiGrid size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/crudaboutus" className={linkClass}>
              <BsFillFileEarmarkPersonFill size={18} />
              <span>About Us</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/crudprogram" className={linkClass}>
              <RiPagesFill size={18} />
              <span>Program</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/crudartikel" className={linkClass}>
              <MdArticle size={18} />
              <span>Artikel</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/crudfaq" className={linkClass}>
              <MdQuestionAnswer size={18} />
              <span>FAQ</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
