import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data artikel, diurutkan dari yang terbaru.
 * @returns {Promise<Array|null>} Daftar artikel atau null jika ada error.
 */
export async function getArticles() {
  const { data, error } = await supabase
    .from('artikel')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching articles:', error.message);
    return null;
  }

  return data;
}

/**
 * Mengambil satu data artikel berdasarkan ID-nya.
 * @param {number} articleId - ID dari artikel yang ingin diambil.
 * @returns {Promise<Object|null>} Data artikel atau null jika ada error.
 */
export async function getArticleById(articleId) {
  const { data, error } = await supabase
    .from('artikel')
    .select('*')
    .eq('id', articleId)
    .single();

  if (error) {
    console.error(`Error fetching article with id ${articleId}:`, error.message);
    return null;
  }
  
  return data;
}