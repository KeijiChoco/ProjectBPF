// File: src/component/DashboardGuest/Header.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../assets/FAF Logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyles = ({ isActive }) =>
    `font-heading font-semibold text-lg hover:text-primary transform transition-all duration-300 hover:-translate-y-0.5 ${
      isActive ? "text-primary" : "text-coffee-dark"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full bg-white shadow-md flex items-center transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Kiri: Logo */}
        <NavLink to="/guest">
          <img
            src={logo}
            alt="FAF Grind & Learn Logo"
            className={`transition-all duration-300 ${scrolled ? "h-10" : "h-12"}`}
          />
        </NavLink>

        {/* Tengah: Link Navigasi Utama -- DIUBAH DI SINI */}
        <nav className="flex items-center space-x-8">
          <NavLink to="/guest/program" className={navLinkStyles}>
            Program
          </NavLink>
          <NavLink to="/guest/artikel" className={navLinkStyles}>
            Artikel
          </NavLink>
          <NavLink to="/guest/faq" className={navLinkStyles}>
            FAQ
          </NavLink>
          <NavLink to="/guest/about-us" className={navLinkStyles}>
            About Us
          </NavLink>
        </nav>

        {/* Kanan: Tombol Aksi */}
        <div>
          <NavLink
            to="/login"
            className="bg-primary text-white font-bold font-heading py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95"
          >
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
}