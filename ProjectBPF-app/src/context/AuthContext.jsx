// src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../api/supabaseClient';
import { getUserProfile } from '../api/profileAPI';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listener ini akan berjalan setiap kali ada event login atau logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        try {
          console.log("Auth state changed. Session:", session); // Tambahkan log untuk debugging
          const currentUser = session?.user;
          setUser(currentUser ?? null);

          if (currentUser) {
            const userProfile = await getUserProfile(currentUser.id);
            setProfile(userProfile);
            console.log("User profile loaded:", userProfile); // Log profil
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("Error inside onAuthStateChange:", error);
        } finally {
          // Bagian ini SANGAT PENTING.
          // Ini akan selalu dijalankan, baik ada error maupun tidak.
          setLoading(false);
          console.log("Auth loading finished."); // Log bahwa loading selesai
        }
      }
    );

    // Hentikan listener saat tidak lagi dibutuhkan
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = { user, profile, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
