// src/components/GuestRoute.jsx

import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

const GuestRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!session);
          
          // Debug log
          console.log('GuestRoute - Session status:', !!session);
          if (session) {
            console.log('User ID:', session.user.id);
          }
        }
      } catch (error) {
        console.error('Error in checkAuth:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen untuk perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed in GuestRoute:', event, !!session);
        setIsAuthenticated(!!session);
        setLoading(false); // Pastikan loading state di-update
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Loading state dengan spinner yang lebih menarik
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-indigo-400 animate-pulse mx-auto"></div>
          </div>
          <p className="mt-6 text-gray-700 font-medium">Memeriksa autentikasi...</p>
          <p className="mt-2 text-sm text-gray-500">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // Jika tidak authenticated, redirect ke login dengan state untuk redirect back
  if (!isAuthenticated) {
    console.log('GuestRoute - Redirecting to login. Current path:', location.pathname);
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // Jika authenticated, render child routes (guest pages)
  console.log('GuestRoute - User authenticated, rendering protected content');
  return <Outlet />;
};

export default GuestRoute;