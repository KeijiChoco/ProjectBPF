import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data FAQ dari tabel 'faq'.
 * @returns {Promise<Array|null>} Daftar pertanyaan dan jawaban atau null jika ada error.
 */
export async function getFaqs() {
  const { data, error } = await supabase
    .from('faq')
    .select('*');
    
  if (error) {
    console.error('Error fetching FAQs:', error.message);
    return null;
  }

  return data;
}