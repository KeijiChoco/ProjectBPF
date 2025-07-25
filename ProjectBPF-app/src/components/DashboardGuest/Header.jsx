// File: src/component/DashboardGuest/Header.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from '../../api/supabaseClient';
import { signOut } from '../../api/authAPI';
import logo from '../../assets/FAF Logo.png';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect untuk mengecek status autentikasi
  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Function untuk handle logout
  const handleLogout = async () => {
    try {
      const { error } = await signOut();
      if (!error) {
        setUser(null);
        navigate('/guest'); // Redirect ke halaman guest setelah logout
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

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

        {/* Tengah: Link Navigasi Utama */}
        <nav className="flex items-center space-x-8">
          <NavLink to="/guest/home" className={navLinkStyles}>
            Home
          </NavLink>
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

        {/* Kanan: Tombol Aksi - Conditional berdasarkan status login */}
        <div className="flex items-center space-x-4">
          {loading ? (
            // Loading state
            <div className="bg-gray-200 animate-pulse rounded-lg py-2 px-4 h-10 w-20"></div>
          ) : user ? (
            // User sudah login - tampilkan info user dan tombol logout
            <>
              <div className="flex items-center space-x-3">
                {/* Avatar user */}
                <div className="flex items-center space-x-2">
                  {user.user_metadata?.avatar_url ? (
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full border-2 border-primary"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                      {user.user_metadata?.full_name?.charAt(0) || 
                       user.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="text-coffee-dark font-medium text-sm hidden md:block">
                    {user.user_metadata?.full_name || user.email}
                  </span>
                </div>
                
                {/* Tombol Logout */}
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold font-heading py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            // User belum login - tampilkan tombol login
            <NavLink
              to="/login"
              className="bg-primary text-white font-bold font-heading py-2 px-4 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}