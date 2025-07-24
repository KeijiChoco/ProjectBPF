// src/api/usersAPI.js

import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data pengguna beserta profilnya dengan memanggil fungsi di Supabase.
 * @returns {Promise<Array|null>} Daftar pengguna atau null jika ada error.
 */
export async function getAllUsers() {
  const { data, error } = await supabase.rpc('get_all_users');

  if (error) {
    console.error('Error fetching all users:', error.message);
    return null;
  }
  return data;
}

/**
 * Memperbarui data pengguna oleh Admin.
 * @param {string} userId - ID pengguna yang akan diupdate.
 * @param {object} updates - Objek berisi data yang akan diupdate, misal { role: 'admin', full_name: 'Nama Baru' }.
 * @returns {Promise<{data: object|null, error: object|null}>} Hasil dari operasi update.
 */
export async function updateUserByAdmin(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating user ${userId}:`, error.message);
  }

  return { data, error };
}

/**
 * Membuat pengguna baru oleh Admin.
 * Fungsi ini akan mendaftarkan pengguna baru dan Supabase akan mengirim email konfirmasi.
 * @param {string} email - Email pengguna baru.
 * @param {string} password - Password sementara untuk pengguna baru.
 * @param {object} metadata - Data tambahan seperti nama lengkap, misal { full_name: 'Nama Pengguna' }.
 * @returns {Promise<{data: object|null, error: object|null}>} Hasil dari operasi pendaftaran.
 */
export async function createUserByAdmin(email, password, metadata) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: metadata // Data ini akan ditangkap oleh trigger untuk membuat profil
    }
  });

  if (error) {
    console.error('Error creating user:', error.message);
  }

  return { data, error };
}
