// src/api/artikelAPI.js
import { supabase } from './supabaseClient.js';

const TABLE_NAME = 'artikel';
const BUCKET_NAME = 'gambarworkshop';

// Ambil semua artikel
export const getAllArticles = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Upload gambar ke bucket 'gambarworkshop'
export const uploadArticleImage = async (file) => {
  const safeName = file.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9.\-_]/g, '_');

  const fileName = `${Date.now()}_${safeName}`;

  const { error: uploadError } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(fileName, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  const { data: publicURLData } = supabase
    .storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return publicURLData.publicUrl;
};

// Tambah artikel baru
export const createArticle = async ({ judul_artikel, deskripsi_artikel, gambar_artikel_url }) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{
      judul_artikel,
      deskripsi_artikel,
      gambar_artikel_url
    }]);

  if (error) throw error;
  return data;
};

// Update artikel berdasarkan ID
export const updateArticle = async (id, { judul_artikel, deskripsi_artikel, gambar_artikel_url }) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({
      judul_artikel,
      deskripsi_artikel,
      gambar_artikel_url
    })
    .eq('id', id);

  if (error) throw error;
  return data;
};

// Hapus artikel berdasarkan ID
export const deleteArticle = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
