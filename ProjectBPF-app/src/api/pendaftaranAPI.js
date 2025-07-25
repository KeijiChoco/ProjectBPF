// src/api/pendaftaranAPI.js

import { supabase } from './supabaseClient.js';

// Fungsi untuk mengambil semua pendaftaran dengan relasi
export const getAllPendaftaran = async () => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          kuota,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        ),
        kehadiran (
          id,
          hadir,
          catatan
        )
      `)
      .order('tanggal_pendaftaran', { ascending: false });

    if (error) {
      console.error('Error fetching pendaftaran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllPendaftaran:', error);
    throw error;
  }
};

// Fungsi untuk mengambil pendaftaran berdasarkan ID
export const getPendaftaranById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          kuota,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        ),
        kehadiran (
          id,
          hadir,
          catatan
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching pendaftaran by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getPendaftaranById:', error);
    throw error;
  }
};

// Fungsi untuk membuat pendaftaran baru
export const createPendaftaran = async (pendaftaranData) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .insert([{
        user_id: pendaftaranData.user_id,
        sesi_id: pendaftaranData.sesi_id,
        status_pembayaran: pendaftaranData.status_pembayaran || 'pending'
      }])
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error creating pendaftaran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createPendaftaran:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate status pembayaran pendaftaran
export const updateStatusPembayaran = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .update({ status_pembayaran: status })
      .eq('id', id)
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error updating status pembayaran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateStatusPembayaran:', error);
    throw error;
  }
};

// Fungsi untuk menghapus pendaftaran
export const deletePendaftaran = async (id) => {
  try {
    const { error } = await supabase
      .from('pendaftaran')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pendaftaran:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deletePendaftaran:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pendaftaran berdasarkan user
export const getPendaftaranByUser = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        ),
        kehadiran (
          id,
          hadir,
          catatan
        )
      `)
      .eq('user_id', userId)
      .order('tanggal_pendaftaran', { ascending: false });

    if (error) {
      console.error('Error fetching pendaftaran by user:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getPendaftaranByUser:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pendaftaran berdasarkan sesi
export const getPendaftaranBySesi = async (sesiId) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        kehadiran (
          id,
          hadir,
          catatan
        )
      `)
      .eq('sesi_id', sesiId)
      .order('tanggal_pendaftaran', { ascending: true });

    if (error) {
      console.error('Error fetching pendaftaran by sesi:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getPendaftaranBySesi:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan statistik pendaftaran
export const getPendaftaranStats = async () => {
  try {
    const { data: allPendaftaran, error: pendaftaranError } = await supabase
      .from('pendaftaran')
      .select('status_pembayaran, tanggal_pendaftaran');

    if (pendaftaranError) {
      console.error('Error fetching pendaftaran stats:', pendaftaranError);
      throw pendaftaranError;
    }

    // Menghitung statistik
    const stats = {
      total: allPendaftaran.length,
      pending: allPendaftaran.filter(p => p.status_pembayaran === 'pending').length,
      paid: allPendaftaran.filter(p => p.status_pembayaran === 'paid').length,
      cancelled: allPendaftaran.filter(p => p.status_pembayaran === 'cancelled').length,
      thisMonth: allPendaftaran.filter(p => {
        const date = new Date(p.tanggal_pendaftaran);
        const now = new Date();
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).length
    };

    return stats;
  } catch (error) {
    console.error('Error in getPendaftaranStats:', error);
    throw error;
  }
};

// Fungsi untuk mencari pendaftaran
export const searchPendaftaran = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('pendaftaran')
      .select(`
        *,
        profiles:user_id (
          id,
          full_name
        ),
        sesi:sesi_id (
          id,
          tanggal,
          jam_mulai,
          jam_selesai,
          lokasi,
          program:program_id (
            id,
            judul_program,
            level,
            harga
          ),
          instructors:instructor_id (
            id,
            nama_lengkap
          )
        ),
        kehadiran (
          id,
          hadir,
          catatan
        )
      `)
      .or(`profiles.full_name.ilike.%${searchTerm}%,sesi.program.judul_program.ilike.%${searchTerm}%`)
      .order('tanggal_pendaftaran', { ascending: false });

    if (error) {
      console.error('Error searching pendaftaran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in searchPendaftaran:', error);
    throw error;
  }
};