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
          try {
            const profile = await getUserProfile(session.user.id);
            if (profile && profile.role === 'admin') {
              navigate('/dashboardadmin', { replace: true });
            } else {
              navigate('/guest', { replace: true });
            }
          } catch (profileError) {
            console.error('Error fetching profile:', profileError);
            navigate('/guest', { replace: true });
          }
        } else {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center">
      <div className="container mx-auto px-4 py-6">
        {/* Header dengan logo - compact version */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-white rounded-full shadow-lg mb-4">
            <img
              src={logo}
              alt="FAF Grind & Learn Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-coffee-dark mb-2">
            Welcome Back to FAF
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Masuk untuk melanjutkan perjalanan belajar barista kamu ☕
          </p>
        </div>

        {/* Main content with two columns */}
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
        
        {/* Left side - Compact informational content */}
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-coffee-dark">Mengapa Login?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Akses materi pelatihan</span>
              </div>
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Daftar pelatihan café</span>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Tracking progress</span>
              </div>
              <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm text-gray-700">Komunitas barista</span>
              </div>
            </div>
          </div>

          {/* Stats section - compact */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl font-bold text-coffee-dark">100+</p>
              <p className="text-xs text-gray-600">Peserta</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl font-bold text-coffee-dark">15+</p>
              <p className="text-xs text-gray-600">Café Mitra</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-2xl font-bold text-coffee-dark">100%</p>
              <p className="text-xs text-gray-600">Mahasiswa</p>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="lg:w-1/2 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">☕</span>
              </div>
              <h2 className="text-2xl font-bold text-coffee-dark">Masuk ke Akun Kamu</h2>
            </div>
            
            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="contoh@email.com" 
                    required 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    disabled={loading || googleLoading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="Masukkan password kamu" 
                    required 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                    disabled={loading || googleLoading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full px-6 py-3 font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                disabled={loading || googleLoading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Memproses...
                  </div>
                ) : 'Masuk Sekarang'}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                Lupa Password?
              </Link>
            </div>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-500 font-medium bg-white px-2 text-sm">atau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Google Login Button */}
            <button 
              onClick={handleGoogleLogin}
              className="w-full px-6 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              disabled={loading || googleLoading}
            >
              {googleLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                  <span className="text-sm">Mengarahkan ke Google...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Masuk dengan Google</span>
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="text-center mt-6 p-3 bg-amber-50 rounded-xl">
              <p className="text-sm">
                Belum punya akun? {' '}
                <Link to="/register" className="font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;