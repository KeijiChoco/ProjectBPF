import { supabase } from './supabaseClient.js';

/**
 * Mendaftarkan pengguna ke sebuah sesi workshop.
 * @param {string} userId - ID dari pengguna yang mendaftar.
 * @param {number} sessionId - ID dari sesi yang didaftarkan.
 * @returns {Promise<{data: object|null, error: object|null}>} Objek berisi data atau error.
 */
export async function registerForSession(userId, sessionId) {
  const { data, error } = await supabase
    .from('pendaftaran')
    .insert([
      { 
        user_id: userId, 
        sesi_id: sessionId, 
        status_pembayaran: 'pending' // Default status saat mendaftar
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error registering for session:', error);
  }

  return { data, error };
}

/**
 * Mengambil semua data pendaftaran milik seorang pengguna.
 * Berguna untuk halaman "dashboard" atau "workshop saya".
 * @param {string} userId - ID dari pengguna.
 * @returns {Promise<Array|null>} Daftar pendaftaran atau null jika ada error.
 */
export async function getUserRegistrations(userId) {
  const { data, error } = await supabase
    .from('pendaftaran')
    .select(`
      id,
      status_pembayaran,
      sesi (
        id,
        tanggal,
        jam_mulai,
        lokasi,
        program (
          judul_program,
          gambar_program_url
        )
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user registrations:', error.message);
    return null;
  }
  
  return data;
}