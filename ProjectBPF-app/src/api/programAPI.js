import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data program dari tabel 'program'.
 * @returns {Promise<Array|null>} Daftar program atau null jika ada error.
 */
export async function getPrograms() {
  const { data, error } = await supabase
    .from('program')
    .select('*');
    
  if (error) {
    console.error('Error fetching programs:', error.message);
    return null;
  }

  return data;
}

/**
 * Mengambil satu data program berdasarkan ID-nya.
 * @param {number} programId - ID dari program yang ingin diambil.
 * @returns {Promise<Object|null>} Data program atau null jika ada error.
 */
export async function getProgramById(programId) {
  const { data, error } = await supabase
    .from('program')
    .select('*')
    .eq('id', programId)
    .single(); // .single() untuk mengambil satu objek, bukan array

  if (error) {
    console.error(`Error fetching program with id ${programId}:`, error.message);
    return null;
  }
  
  return data;
}