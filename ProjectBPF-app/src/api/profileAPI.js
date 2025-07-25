// src/api/profileAPI.js

import { supabase } from './supabaseClient.js';

/**
 * Mengambil data profil dari tabel 'profiles' berdasarkan ID pengguna.
 * @param {string} userId - ID dari pengguna yang profilnya ingin diambil.
 * @returns {Promise<object|null>} Data profil atau null jika terjadi error.
 */
export async function getUserProfile(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('role') // Kita hanya butuh 'role' untuk pengecekan ini
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data;
}

/**
 * Mengambil semua data profil dari tabel 'profiles'.
 * @returns {Promise<Array|null>} Array data profil atau null jika terjadi error.
 */
export async function getAllProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');

  if (error) {
    console.error('Error fetching all profiles:', error.message);
    return null;
  }

  return data;
}

/**
 * Mengambil profil berdasarkan role tertentu.
 * @param {string} role - Role yang ingin difilter (misalnya: 'user', 'admin', 'instructor').
 * @returns {Promise<Array|null>} Array data profil dengan role tertentu atau null jika terjadi error.
 */
export async function getProfilesByRole(role) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', role);

  if (error) {
    console.error(`Error fetching profiles with role ${role}:`, error.message);
    return null;
  }

  return data;
}

/**
 * Update profil pengguna.
 * @param {string} userId - ID pengguna yang profilnya ingin diupdate.
 * @param {object} updates - Object berisi field yang ingin diupdate.
 * @returns {Promise<object|null>} Data profil yang sudah diupdate atau null jika terjadi error.
 */
export async function updateUserProfile(userId, updates) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user profile:', error.message);
    return null;
  }

  return data;
}

/**
 * Menghapus profil pengguna.
 * @param {string} userId - ID pengguna yang profilnya ingin dihapus.
 * @returns {Promise<boolean>} True jika berhasil, false jika terjadi error.
 */
export async function deleteUserProfile(userId) {
  if (!userId) return false;

  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user profile:', error.message);
    return false;
  }

  return true;
}