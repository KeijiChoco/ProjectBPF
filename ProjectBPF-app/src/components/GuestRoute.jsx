// src/components/GuestRoute.jsx

import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

const GuestRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(!!session);
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
        console.log('Auth state changed in GuestRoute:', event);
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Jika tidak authenticated, redirect ke login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika authenticated, render child routes (guest pages)
  return <Outlet />;
};

export default GuestRoute;