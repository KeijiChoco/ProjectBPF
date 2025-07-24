import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data instruktur.
 * @returns {Promise<Array|null>} Daftar instruktur atau null jika ada error.
 */
export async function getInstructors() {
  const { data, error } = await supabase
    .from('instructors')
    .select('*');
    
  if (error) {
    console.error('Error fetching instructors:', error.message);
    return null;
  }

  return data;
}

/**
 * Mengambil satu data instruktur berdasarkan ID-nya.
 * @param {number} instructorId - ID dari instruktur.
 * @returns {Promise<Object|null>} Data instruktur atau null jika ada error.
 */
export async function getInstructorById(instructorId) {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', instructorId)
    .single();

  if (error) {
    console.error(`Error fetching instructor with id ${instructorId}:`, error.message);
    return null;
  }
  
  return data;
}