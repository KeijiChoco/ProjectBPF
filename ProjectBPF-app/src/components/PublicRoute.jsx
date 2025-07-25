// src/components/PublicRoute.jsx

import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { getUserProfile } from '../api/profileAPI';

const PublicRoute = ({ redirectIfAuthenticated = true }) => {
  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState({ isAuthenticated: false, userRole: null });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setAuthData({ isAuthenticated: false, userRole: null });
          setLoading(false);
          return;
        }

        if (!session) {
          setAuthData({ isAuthenticated: false, userRole: null });
          setLoading(false);
          return;
        }

        // User authenticated, check role
        try {
          const profile = await getUserProfile(session.user.id);
          setAuthData({ 
            isAuthenticated: true, 
            userRole: profile?.role || 'user' 
          });
        } catch (profileError) {
          console.error('Error fetching profile:', profileError);
          setAuthData({ isAuthenticated: true, userRole: 'user' });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error in checkAuth:', error);
        setAuthData({ isAuthenticated: false, userRole: null });
        setLoading(false);
      }
    };

    checkAuth();

    // Listen untuk perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setAuthData({ isAuthenticated: false, userRole: null });
        } else if (event === 'SIGNED_IN' && session) {
          checkAuth();
        }
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
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Jika user sudah login dan kita perlu redirect
  if (authData.isAuthenticated && redirectIfAuthenticated) {
    // Redirect berdasarkan role
    if (authData.userRole === 'admin') {
      return <Navigate to="/dashboardadmin" replace />;
    } else {
      return <Navigate to="/guest" replace />;
    }
  }

  // Render child routes
  return <Outlet />;
};

export default PublicRoute;