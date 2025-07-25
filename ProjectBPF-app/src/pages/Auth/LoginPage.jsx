// src/pages/Auth/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../../api/authAPI';
import { getUserProfile } from '../../api/profileAPI';
import { supabase } from '../../api/supabaseClient';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const navigate = useNavigate();

  // useEffect untuk memeriksa sesi saat komponen pertama kali dimuat
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          setIsCheckingSession(false);
          return;
        }
        
        if (session && session.user) {
          // Jika ada sesi, berarti pengguna sudah login.
          // Langsung arahkan ke halaman yang sesuai.
          try {
            const profile = await getUserProfile(session.user.id);
            if (profile && profile.role === 'admin') {
              navigate('/dashboardadmin', { replace: true });
            } else {
              navigate('/guest', { replace: true });
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            // Default ke guest jika error fetching profile
            navigate('/guest', { replace: true });
          }
        } else {
          // Jika tidak ada sesi, izinkan halaman login untuk ditampilkan
          setIsCheckingSession(false);
        }
      } catch (error) {
        console.error('Unexpected error checking session:', error);
        setIsCheckingSession(false);
      }
    };

    checkUserSession();
  }, [navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: loginData, error: loginError } = await signInWithEmail(formData.email, formData.password);

      if (loginError) {
        alert(`Login gagal: ${loginError.message}`);
        setLoading(false);
        return;
      }

      if (loginData.user) {
        const profile = await getUserProfile(loginData.user.id);

        if (profile && profile.role === 'admin') {
          navigate('/dashboardadmin', { replace: true });
        } else {
          navigate('/guest', { replace: true });
        }
      } else {
        alert('Login gagal, silakan coba lagi.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Terjadi kesalahan saat login. Silakan coba lagi.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google login error:', error);
        alert(`Login dengan Google gagal: ${error.message}`);
        setGoogleLoading(false);
      }
      // Jika berhasil, user akan di-redirect ke OAuth callback
      // Loading state akan tetap aktif sampai redirect selesai
    } catch (error) {
      console.error('Unexpected Google login error:', error);
      alert('Terjadi kesalahan saat login dengan Google. Silakan coba lagi.');
      setGoogleLoading(false);
    }
  };

  // Tampilkan pesan loading jika sedang memeriksa sesi
  if (isCheckingSession) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa sesi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        
        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading || googleLoading}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            onChange={handleChange} 
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading || googleLoading}
          />
          <button 
            type="submit" 
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading || googleLoading}
          >
            {loading ? 'Memproses...' : 'Login'}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center">
          <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Lupa Password?
          </Link>
        </div>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button 
          onClick={handleGoogleLogin}
          className="w-full px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading || googleLoading}
        >
          {googleLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              Mengarahkan ke Google...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login dengan Google
            </>
          )}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center">
          Belum punya akun? {' '}
          <Link to="/register" className="font-bold text-blue-500 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;