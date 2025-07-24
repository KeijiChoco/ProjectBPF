import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua sesi yang tersedia untuk program tertentu.
 * @param {number} programId - ID dari program.
 * @returns {Promise<Array|null>} Daftar sesi atau null jika ada error.
 */
export async function getSessionsByProgramId(programId) {
  const { data, error } = await supabase
    .from('sesi')
    .select('*')
    .eq('program_id', programId)
    .order('tanggal', { ascending: true });

  if (error) {
    console.error(`Error fetching sessions for program ${programId}:`, error.message);
    return null;
  }
  return data;
}

/**
 * Mengambil detail satu sesi beserta nama program dan instrukturnya.
 * @param {number} sessionId - ID dari sesi.
 * @returns {Promise<Object|null>} Detail sesi atau null jika ada error.
 */
export async function getSessionDetails(sessionId) {
  const { data, error } = await supabase
    .from('sesi')
    .select(`
      *,
      program:program_id (judul_program),
      instructor:instructor_id (nama_lengkap, spesialisasi)
    `)
    .eq('id', sessionId)
    .single();

  if (error) {
    console.error(`Error fetching session details for ${sessionId}:`, error.message);
    return null;
  }
  return data;
}