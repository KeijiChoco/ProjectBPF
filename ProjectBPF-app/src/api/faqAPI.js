// src/api/faqAPI.js

import { supabase } from './supabaseClient.js';

/**
 * Mengambil semua data FAQ.
 * @returns {Promise<Array|null>}
 */
export async function getFaqs() {
  const { data, error } = await supabase
    .from('faq')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error('Error fetching FAQs:', error.message);
    return null;
  }
  return data;
}

/**
 * Membuat FAQ baru.
 * @param {object} faqData - Objek berisi { pertanyaan, jawaban }.
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function createFaq(faqData) {
  const { data, error } = await supabase
    .from('faq')
    .insert([faqData])
    .select()
    .single();

  if (error) {
    console.error('Error creating FAQ:', error.message);
  }
  return { data, error };
}

/**
 * Memperbarui FAQ yang sudah ada.
 * @param {number} id - ID dari FAQ yang akan diupdate.
 * @param {object} updates - Objek berisi { pertanyaan, jawaban }.
 * @returns {Promise<{data: object|null, error: object|null}>}
 */
export async function updateFaq(id, updates) {
  const { data, error } = await supabase
    .from('faq')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating FAQ:', error.message);
  }
  return { data, error };
}

/**
 * Menghapus sebuah FAQ.
 * @param {number} id - ID dari FAQ yang akan dihapus.
 * @returns {Promise<{error: object|null}>}
 */
export async function deleteFaq(id) {
  const { error } = await supabase
    .from('faq')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting FAQ:', error.message);
  }
  return { error };
}
