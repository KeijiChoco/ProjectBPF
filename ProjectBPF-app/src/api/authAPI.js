// src/api/authAPI.js (Perbarui fungsi signInWithGoogle)

import { supabase } from './supabaseClient.js';

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // Arahkan Google untuk kembali ke halaman tunggu kita setelah login berhasil
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error logging in with Google:', error.message);
  }
}