// src/pages/Auth/RegisterPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUpWithEmail } from '../../api/authAPI';

function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await signUpWithEmail(formData.fullName, formData.email, formData.password);
    if (error) {
      setMessage(`Pendaftaran gagal: ${error.message}`);
    } else {
      setMessage('Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Daftar Akun Baru</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="fullName" placeholder="Nama Lengkap" required onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
          <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">Daftar</button>
        </form>
        {message && <p className="text-center text-sm text-green-600">{message}</p>}
        <p className="text-sm text-center">Sudah punya akun? <Link to="/login" className="font-bold text-blue-500 hover:underline">Login di sini</Link></p>
      </div>
    </div>
  );
}

export default RegisterPage;
