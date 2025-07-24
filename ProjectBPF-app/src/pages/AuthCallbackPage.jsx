// src/pages/AuthCallbackPage.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthCallbackPage() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Jangan lakukan apa-apa jika status auth masih loading
    if (loading) {
      return;
    }

    // Jika sudah tidak loading, periksa profilnya
    if (profile?.role === 'admin') {
      navigate('/dashboardadmin', { replace: true });
    } else {
      // Alihkan pengguna non-admin ke halaman guest
      navigate('/guest', { replace: true });
    }
  }, [loading, profile, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <p className="text-lg">Menyelesaikan proses login, mohon tunggu...</p>
    </div>
  );
}

export default AuthCallbackPage;
