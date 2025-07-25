// src/components/AdminRoute.jsx

import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';
import { getUserProfile } from '../api/profileAPI';

function AdminRoute() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi ini akan memeriksa sesi yang ada saat ini.
    const checkCurrentSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const userProfile = await getUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error saat memeriksa sesi:", error);
        setProfile(null);
      } finally {
        // Hentikan loading setelah pengecekan awal selesai.
        setLoading(false);
      }
    };

    // Panggil pengecekan sesi saat komponen pertama kali dimuat.
    checkCurrentSession();

    // Pasang listener untuk mendeteksi perubahan di masa depan (misal: logout di tab lain).
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Jika ada perubahan, kita set profilnya lagi.
        if (session?.user) {
            getUserProfile(session.user.id).then(setProfile);
        } else {
            setProfile(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Memuat sesi...</p>
      </div>
    );
  }

  // Jika profil ada dan perannya adalah admin, izinkan akses.
  if (profile && profile.role === 'admin') {
    return <Outlet />;
  }

  // Jika profil ada tapi bukan admin, alihkan ke halaman guest.
  if (profile && profile.role !== 'admin') {
    return <Navigate to="/guest" replace />;
  }

  // Jika tidak ada profil (belum login), alihkan ke halaman login.
  return <Navigate to="/login" replace />;
}

export default AdminRoute;
