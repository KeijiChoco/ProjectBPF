// src/components/DashboardAdmin/Sidebar.jsx

import React, { useState } from 'react';
import { BsFillFileEarmarkPersonFill, BsPeopleFill } from "react-icons/bs";
import { MdQuestionAnswer, MdArticle } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { FiGrid, FiLogOut, FiUsers, FiCalendar, FiUserCheck, FiClipboard } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200
     ${isActive 
       ? 'bg-[#6f4e37] text-white shadow-inner' 
       : 'text-[#d2b48c] hover:bg-[#5d4037] hover:text-white'
     }`;
  
  const menuItems = [
    { to: "/dashboardadmin", icon: <FiGrid size={20} />, label: "Dashboard" },
    { to: "/crudaboutus", icon: <BsFillFileEarmarkPersonFill size={20} />, label: "About Us" },
    { to: "/crudprogram", icon: <RiPagesFill size={20} />, label: "Program" },
    { to: "/crudartikel", icon: <MdArticle size={20} />, label: "Artikel" },
    { to: "/feedbackuser", icon: <MdArticle size={20} />, label: "Feedback" },
    { to: "/crudfaq", icon: <MdQuestionAnswer size={20} />, label: "FAQ" },
    { to: "/crudusers", icon: <BsPeopleFill size={20} />, label: "Users" },
    // Menu Manager baru
    { to: "/instructors-manager", icon: <FiUsers size={20} />, label: "Instructors Manager" },
    { to: "/sesi-manager", icon: <FiCalendar size={20} />, label: "Sesi Manager" },
    { to: "/pendaftaran-manager", icon: <FiClipboard size={20} />, label: "Pendaftaran Manager" },
    { to: "/kehadiran-manager", icon: <FiUserCheck size={20} />, label: "Kehadiran Manager" },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} min-h-screen bg-[#3e2723] text-white shadow-lg transition-all duration-300 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-[#d7ccc8]">FAF Grind</h1>
            <p className="text-xs text-[#a1887f]">Admin Panel</p>
          </div>
        )}
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-[#5d4037]">
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Wrapper untuk menu dan tombol logout */}
      <div className="flex flex-col justify-between flex-1 px-3 py-4">
        {/* Menu */}
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.to} 
                  className={linkClass}
                  data-tooltip-id={isCollapsed ? `tooltip-${index}` : undefined}
                  data-tooltip-content={isCollapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
                {isCollapsed && (
                  <Tooltip id={`tooltip-${index}`} place="right" className="z-50" />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Tombol Logout akan kita tambahkan nanti */}
        <div className="mt-auto">
            {/* Placeholder untuk tombol logout */}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;