import { createClient } from '@supabase/supabase-js';

// Ambil URL dan Kunci dari environment variables yang sudah kita buat
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Buat satu instance client Supabase.
 * Kita ekspor ini agar bisa digunakan oleh file-file lain (authAPI.js, programAPI.js, dll.)
 * tanpa perlu membuat koneksi baru setiap saat.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);