// src/pages/Auth/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmail, signInWithGoogle } from '../../api/authAPI';
import { getUserProfile } from '../../api/profileAPI';
import { supabase } from '../../api/supabaseClient';
import logo from '../../assets/FAF Logo.png';

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
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
          </div>
          <h2 className="text-2xl font-bold text-coffee-dark mb-2">Memeriksa sesi...</h2>
          <p className="text-gray-600">Tunggu sebentar ya ☕</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header dengan logo */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <img
              src={logo}
              alt="FAF Grind & Learn Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold font-heading text-coffee-dark mb-4">
            Welcome Back to FAF
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Masuk untuk melanjutkan perjalanan belajar barista kamu ☕
          </p>
        </div>

        {/* Main content with two columns */}
        <div className="flex flex-col lg:flex-row items-start gap-16 max-w-7xl mx-auto">
        
        {/* Left side - Informational content */}
        <div className="lg:w-1/2 space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-coffee-dark">Mengapa Login?</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-green-50 rounded-xl">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-gray-700">Akses ke semua materi pelatihan barista</span>
              </div>
              <div className="flex items-start p-4 bg-blue-50 rounded-xl">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-gray-700">Daftar pelatihan di café-café mitra</span>
              </div>
              <div className="flex items-start p-4 bg-purple-50 rounded-xl">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-gray-700">Tracking progress belajar kamu</span>
              </div>
              <div className="flex items-start p-4 bg-orange-50 rounded-xl">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-lg text-gray-700">Bergabung dengan komunitas barista muda</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">👨‍🎓</span>
              </div>
              <h3 className="text-2xl font-bold">Platform by Mahasiswa</h3>
            </div>
            <p className="text-lg leading-relaxed opacity-95">
              Dibuat oleh mahasiswa pencinta kopi, untuk kamu yang ingin belajar jadi barista 
              dengan cara yang santai, asik, dan nggak ribet!
            </p>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">☕</span>
              </div>
              <h2 className="text-3xl font-bold text-coffee-dark">Masuk ke Akun Kamu</h2>
            </div>
            
            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="contoh@email.com" 
                    required 
                    onChange={handleChange} 
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg transition-all duration-200 hover:border-gray-300"
                    disabled={loading || googleLoading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Masukkan password kamu" 
                    required 
                    onChange={handleChange} 
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent text-lg transition-all duration-200 hover:border-gray-300"
                    disabled={loading || googleLoading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-6 py-4 font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </div>
                ) : 'Masuk Sekarang'}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-6">
              <Link to="/forgot-password" className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                Lupa Password?
              </Link>
            </div>

            {/* Divider */}
            <div className="relative flex items-center my-8">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-6 text-gray-500 font-medium bg-white px-2">atau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              className="w-full px-6 py-4 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                  Mengarahkan ke Google...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Masuk dengan Google
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center mt-8 p-4 bg-amber-50 rounded-xl">
              <p className="text-lg">
                Belum punya akun? {' '}
                <Link to="/register" className="font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section with stats */}
      <div className="mt-20">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-coffee-dark mb-4">Bergabung dengan Komunitas FAF</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ribuan mahasiswa telah mempercayai FAF untuk memulai karir barista mereka
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-all duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">👥</span>
            </div>
            <p className="text-4xl font-bold text-coffee-dark mb-2">100+</p>
            <p className="text-lg text-gray-600 font-medium">Peserta Terlatih</p>
            <p className="text-sm text-gray-500 mt-2">Dan terus bertambah setiap hari</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-all duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🏪</span>
            </div>
            <p className="text-4xl font-bold text-coffee-dark mb-2">15+</p>
            <p className="text-lg text-gray-600 font-medium">Café Mitra</p>
            <p className="text-sm text-gray-500 mt-2">Siap menerima trainee</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center transform hover:scale-105 transition-all duration-200">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🎓</span>
            </div>
            <p className="text-4xl font-bold text-coffee-dark mb-2">100%</p>
            <p className="text-lg text-gray-600 font-medium">Mahasiswa</p>
            <p className="text-sm text-gray-500 mt-2">Di balik semua ini ☕</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;