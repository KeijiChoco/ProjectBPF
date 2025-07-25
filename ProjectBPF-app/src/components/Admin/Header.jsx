// src/components/DashboardAdmin/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiSearch, FiMail, FiChevronDown, FiCalendar, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { signOut } from '../../api/authAPI';
import { supabase } from '../../api/supabaseClient';

function Header() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Function untuk mengambil data user dari Supabase - Non Aggressive
  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Cek session yang ada tanpa membuat request ke server
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // Ada session, ambil data user
          const authUser = session.user;
          
          // Try to get profile, tapi jangan error jika gagal
          let profile = null;
          try {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', authUser.id)
              .single();
            profile = profileData;
          } catch (profileError) {
            console.log('Profile not found, using auth data');
          }

          // Set user data dengan fallback
          const userData = {
            id: authUser.id,
            name: profile?.full_name || 
                  authUser.user_metadata?.full_name || 
                  authUser.email?.split('@')[0] || 
                  'User',
            email: authUser.email,
            avatar: profile?.avatar_url || 
                   authUser.user_metadata?.avatar_url || 
                   'https://randomuser.me/api/portraits/women/44.jpg',
            role: profile?.role || 'User'
          };

          setUser(userData);
        } else {
          // Tidak ada session, tapi tidak redirect agresif
          console.log('No session found');
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeUser();

    // Set tanggal saat ini
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setCurrentDate(formattedDate);

    // Listen untuk perubahan auth state - hanya untuk update UI
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          // User login, update user data
          initializeUser();
        } else if (event === 'SIGNED_OUT') {
          // User logout, clear user data
          setUser(null);
          // Jangan auto redirect dari header, biarkan page yang handle
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function untuk mendapatkan greeting berdasarkan waktu
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat Pagi';
    if (hour < 18) return 'Selamat Siang';
    return 'Selamat Malam';
  };

  // Function untuk logout menggunakan Supabase
  const handleLogout = async () => {
    try {
      // Konfirmasi sebelum logout
      const confirmed = window.confirm('Apakah Anda yakin ingin logout?');
      
      if (!confirmed) return;

      // Close dropdown
      setShowDropdown(false);
      
      // Panggil fungsi signOut dari authAPI
      await signOut();
      
      // Clear user state
      setUser(null);
      
      // Clear localStorage jika ada data tambahan
      localStorage.removeItem('userProfile');
      localStorage.removeItem('authToken');
      
      // Redirect ke halaman login
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
    }
  };

  // Function untuk profile menu
  const handleProfileClick = () => {
    console.log('Navigate to profile page');
    setShowDropdown(false);
  };

  // Function untuk settings
  const handleSettingsClick = () => {
    console.log('Navigate to settings page');
    setShowDropdown(false);
  };

  // Loading state
  if (loading) {
    return (
      <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm rounded-lg mb-1">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="animate-pulse">
            <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </header>
    );
  }

  // Jika tidak ada user, tampilkan header basic tanpa redirect paksa
  if (!user) {
    return (
      <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm rounded-lg mb-1">
        <div>
          <h2 className="text-lg text-gray-800 font-semibold">
            {getGreeting()}, Guest
          </h2>
          <p className="text-sm text-gray-500">Silakan login untuk mengakses dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm text-gray-600">
            <FiCalendar className="mr-2" />
            <span>{currentDate}</span>
          </div>
          <button 
            onClick={() => window.location.href = '/login'}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white px-6 py-4 flex items-center justify-between shadow-sm rounded-lg mb-1">
      {/* Left Side - Dynamic Greeting */}
      <div>
        <h2 className="text-lg text-gray-800 font-semibold">
          {getGreeting()}, {user.name}
        </h2>
        <p className="text-sm text-gray-500">Berikut adalah ringkasan performa minggu ini</p>
      </div>

      {/* Right Side - Controls */}
      <div className="flex items-center gap-4">
        {/* Dynamic Date */}
        <div className="flex items-center border border-gray-300 rounded-md px-3 py-1.5 bg-white text-sm text-gray-600">
          <FiCalendar className="mr-2" />
          <span>{currentDate}</span>
        </div>

        {/* Icons */}
        <button className="text-gray-600 hover:text-indigo-600 transition-colors">
          <FiSearch size={18} />
        </button>

        <button className="relative text-gray-600 hover:text-indigo-600 transition-colors">
          <FiBell size={18} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="text-gray-600 hover:text-indigo-600 transition-colors">
          <FiMail size={18} />
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
            />
            <FiChevronDown size={14} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                  {user.role}
                </span>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiUser size={16} />
                  Profile Saya
                </button>
                
                <button
                  onClick={handleSettingsClick}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <FiSettings size={16} />
                  Pengaturan
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;