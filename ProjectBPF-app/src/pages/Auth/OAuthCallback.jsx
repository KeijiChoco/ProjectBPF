// src/pages/Auth/OAuthCallback.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../api/supabaseClient';
import { getUserProfile } from '../../api/profileAPI';

const OAuthCallback = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('OAuth callback error:', error);
          setError('Login dengan Google gagal. Silakan coba lagi.');
          setTimeout(() => navigate('/login', { replace: true }), 3000);
          return;
        }

        if (data.session && data.session.user) {
          const user = data.session.user;
          console.log('Google OAuth successful:', user);

          // Get user profile to determine role
          try {
            const profile = await getUserProfile(user.id);
            
            if (profile && profile.role === 'admin') {
              navigate('/dashboardadmin', { replace: true });
            } else {
              navigate('/guest', { replace: true });
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            // Default redirect jika tidak bisa ambil profile
            navigate('/guest', { replace: true });
          }
        } else {
          // No session found, redirect to login
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Unexpected error in OAuth callback:', error);
        setError('Terjadi kesalahan tak terduga. Mengarahkan ke halaman login...');
        setTimeout(() => navigate('/login', { replace: true }), 3000);
      } finally {
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Menyelesaikan login dengan Google...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Login Gagal</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate('/login', { replace: true })}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallback;