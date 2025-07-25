// src/pages/AuthCallbackPage.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { getUserProfile } from '../api/profileAPI';

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Supabase client secara otomatis membaca token dari URL.
      // Kita hanya perlu menunggu dan mengambil sesi yang sudah terbentuk.
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        const userProfile = await getUserProfile(session.user.id);
        if (userProfile?.role === 'admin') {
          // Jika admin, arahkan ke dashboard admin
          navigate('/dashboardadmin', { replace: true });
        } else {
          // Jika bukan, arahkan ke halaman guest
          navigate('/guest', { replace: true });
        }
      } else {
        // Jika karena suatu alasan sesi tidak terbentuk, kembali ke login
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Menyelesaikan proses login, mohon tunggu...</p>
    </div>
  );
}

export default AuthCallbackPage;
