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
    .select('full_name, role')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data;
}

/**
 * Memperbarui data profil pengguna.
 * @param {string} userId - ID pengguna yang akan diupdate.
 * @param {object} updates - Objek berisi data yang akan diupdate, misal { full_name: 'Nama Baru' }.
 * @returns {Promise<{data: object|null, error: object|null}>} Hasil dari operasi update.
 */
export async function updateUserProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error.message);
  }

  return { data, error };
}