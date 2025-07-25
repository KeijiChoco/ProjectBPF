// src/pages/Auth/RegisterPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpWithEmail } from '../../api/authAPI';
import logo from '../../assets/FAF Logo.png';

function RegisterPage() {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '' 
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear message when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await signUpWithEmail(
        formData.fullName, 
        formData.email, 
        formData.password
      );
      
      if (error) {
        setMessage(`Pendaftaran gagal: ${error.message}`);
        setMessageType('error');
      } else {
        setMessage('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
        setMessageType('success');
        // Reset form on success
        setFormData({ fullName: '', email: '', password: '' });
      }
    } catch (err) {
      setMessage('Terjadi kesalahan. Silakan coba lagi.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

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
            Bergabung dengan FAF
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Mulai perjalanan belajar barista kamu bersama kami ☕
          </p>
        </div>

        {/* Main content with two columns */}
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto">
        
          {/* Left side - Compact informational content */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🚀</span>
                </div>
                <h2 className="text-2xl font-bold text-coffee-dark">Mengapa Bergabung?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Pelatihan gratis</span>
                </div>
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Sertifikat resmi</span>
                </div>
                <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                  <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Mentor berpengalaman</span>
                </div>
                <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm text-gray-700">Job placement</span>
                </div>
              </div>
            </div>

            {/* Stats section - compact */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold text-coffee-dark">100+</p>
                <p className="text-xs text-gray-600">Alumni</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold text-coffee-dark">15+</p>
                <p className="text-xs text-gray-600">Café Mitra</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-lg text-center">
                <p className="text-2xl font-bold text-coffee-dark">95%</p>
                <p className="text-xs text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>

          {/* Right side - Register form */}
          <div className="lg:w-1/2 w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg">📝</span>
                </div>
                <h2 className="text-2xl font-bold text-coffee-dark">Buat Akun Baru</h2>
              </div>
              
              {/* Register Form */}
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Nama Lengkap</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="fullName" 
                      value={formData.fullName}
                      placeholder="Masukkan nama lengkap" 
                      required 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      placeholder="contoh@email.com" 
                      required 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      disabled={loading}
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
                      value={formData.password}
                      placeholder="Minimal 6 karakter" 
                      required 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 hover:border-gray-300"
                      disabled={loading}
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
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mendaftar...
                    </div>
                  ) : 'Daftar Sekarang'}
                </button>
              </form>

              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-3 rounded-xl text-sm ${
                  messageType === 'success'
                    ? 'bg-green-50 text-green-700 border-2 border-green-200'
                    : 'bg-red-50 text-red-700 border-2 border-red-200'
                }`}>
                  <div className="flex items-center justify-center">
                    {messageType === 'success' ? (
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="text-center">{message}</span>
                  </div>
                </div>
              )}

              {/* Login Link */}
              <div className="text-center mt-6 p-3 bg-amber-50 rounded-xl">
                <p className="text-sm">
                  Sudah punya akun? {' '}
                  <Link to="/login" className="font-bold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                    Login di sini
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

export default RegisterPage;