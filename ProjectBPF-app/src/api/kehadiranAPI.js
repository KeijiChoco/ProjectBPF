import { supabase } from './supabaseClient.js';

/**
 * Mengambil daftar peserta dan status kehadiran untuk sesi tertentu.
 * @param {number} sessionId - ID dari sesi workshop.
 * @returns {Promise<Array|null>} Daftar kehadiran atau null jika ada error.
 */
export async function getAttendanceBySession(sessionId) {
  const { data, error } = await supabase
    .from('kehadiran')
    .select(`
      id,
      hadir,
      catatan,
      pendaftaran (
        id,
        profiles (
          id,
          full_name
        )
      )
    `)
    .filter('pendaftaran.sesi_id', 'eq', sessionId);

  if (error) {
    console.error(`Error fetching attendance for session ${sessionId}:`, error.message);
    return null;
  }
  return data;
}

/**
 * Memperbarui status kehadiran seorang peserta.
 * @param {number} attendanceId - ID dari record kehadiran.
 * @param {boolean} isPresent - Status kehadiran (true/false).
 * @param {string} [notes=''] - Catatan tambahan.
 * @returns {Promise<{data: object|null, error: object|null}>} Hasil dari operasi update.
 */
export async function markAttendance(attendanceId, isPresent, notes = '') {
  const { data, error } = await supabase
    .from('kehadiran')
    .update({ hadir: isPresent, catatan: notes })
    .eq('id', attendanceId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating attendance for id ${attendanceId}:`, error.message);
  }
  return { data, error };
}