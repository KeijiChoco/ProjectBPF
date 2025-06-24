import React, { useState } from 'react';
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";
import { MdQuestionAnswer, MdArticle } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { FiGrid } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'; // Pastikan kamu install react-tooltip jika pakai ini

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
     ${isActive ? 'bg-[#6f4e37] text-white shadow-md' : 'text-[#d2b48c] hover:bg-[#8b5e3c] hover:text-white'}`;

  const menuItems = [
    { to: "/dashboardadmin", icon: <FiGrid size={18} />, label: "Dashboard" },
    { to: "/crudaboutus", icon: <BsFillFileEarmarkPersonFill size={18} />, label: "About Us" },
    { to: "/crudprogram", icon: <RiPagesFill size={18} />, label: "Program" },
    { to: "/crudartikel", icon: <MdArticle size={18} />, label: "Artikel" },
    { to: "/crudfaq", icon: <MdQuestionAnswer size={18} />, label: "FAQ" },
    { to: "/crudusers", icon: <MdQuestionAnswer size={18} />, label: "Users" },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'} min-h-screen bg-[#3e2723] text-white shadow-lg transition-all duration-300`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#5d4037]">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-[#d7ccc8]">FAF Grind</h1>
            <p className="text-sm text-[#a1887f]">Admin Panel</p>
          </div>
        )}
        <button onClick={toggleSidebar} className="text-[#d7ccc8]">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Menu */}
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink to={item.to} className={linkClass}>
                <div data-tooltip-id={`tooltip-${index}`} data-tooltip-content={item.label}>
                  {item.icon}
                </div>
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
              {isCollapsed && (
                <Tooltip id={`tooltip-${index}`} place="right" className="z-50" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
