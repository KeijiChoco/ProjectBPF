// src/api/authAPI.js

import { supabase } from './supabaseClient.js';

/**
 * Mendaftarkan pengguna baru dengan email dan password.
 */
export async function signUpWithEmail(fullName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        full_name: fullName, // Data ini akan ditangkap trigger untuk membuat profil
      }
    }
  });
  if (error) console.error('Error signing up:', error.message);
  return { data, error };
}

/**
 * Login pengguna dengan email dan password.
 */
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) console.error('Error signing in:', error.message);
  return { data, error };
}

/**
 * Memulai proses login dengan Google OAuth.
 * Fixed version dengan proper redirect handling
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Redirect ke callback page
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });
    
    if (error) {
      console.error('Error logging in with Google:', error.message);
      throw error;
    }
    
    return { data, error };
  } catch (error) {
    console.error('Google OAuth error:', error);
    return { data: null, error };
  }
}

/**
 * Alternative Google login dengan popup (jika redirect bermasalah)
 */
export async function signInWithGooglePopup() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        skipBrowserRedirect: true, // Menggunakan popup instead of redirect
      }
    });
    
    if (error) {
      console.error('Error with Google popup login:', error.message);
      throw error;
    }
    
    return { data, error };
  } catch (error) {
    console.error('Google popup OAuth error:', error);
    return { data: null, error };
  }
}

/**
 * Mengirim email untuk reset password.
 */
export async function sendPasswordResetEmail(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`, // Halaman untuk memasukkan password baru
    });
    if (error) console.error('Error sending password reset email:', error.message);
    return { data, error };
}

/**
 * Memperbarui password pengguna yang sedang dalam proses recovery.
 */
export async function updateUserPassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });
    if (error) console.error('Error updating password:', error.message);
    return { data, error };
}

/**
 * Logout pengguna yang sedang aktif.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
  return { error };
}