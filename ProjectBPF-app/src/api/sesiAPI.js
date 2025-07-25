// src/api/sesiAPI.js

import { supabase } from './supabaseClient.js';

// Fungsi untuk mengambil semua sesi dengan relasi program dan instructor
export const getAllSesi = async () => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .order('tanggal', { ascending: true });

    if (error) {
      console.error('Error fetching sesi:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllSesi:', error);
    throw error;
  }
};

// Fungsi untuk mengambil sesi berdasarkan ID
export const getSesiById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching sesi by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSesiById:', error);
    throw error;
  }
};

// Fungsi untuk membuat sesi baru
export const createSesi = async (sesiData) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .insert([{
        program_id: sesiData.program_id,
        instructor_id: sesiData.instructor_id,
        tanggal: sesiData.tanggal,
        jam_mulai: sesiData.jam_mulai,
        jam_selesai: sesiData.jam_selesai,
        lokasi: sesiData.lokasi,
        kuota: sesiData.kuota
      }])
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .single();

    if (error) {
      console.error('Error creating sesi:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createSesi:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate sesi
export const updateSesi = async (id, sesiData) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .update({
        program_id: sesiData.program_id,
        instructor_id: sesiData.instructor_id,
        tanggal: sesiData.tanggal,
        jam_mulai: sesiData.jam_mulai,
        jam_selesai: sesiData.jam_selesai,
        lokasi: sesiData.lokasi,
        kuota: sesiData.kuota
      })
      .eq('id', id)
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .single();

    if (error) {
      console.error('Error updating sesi:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateSesi:', error);
    throw error;
  }
};

// Fungsi untuk menghapus sesi
export const deleteSesi = async (id) => {
  try {
    const { error } = await supabase
      .from('sesi')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting sesi:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteSesi:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan sesi berdasarkan program
export const getSesiByProgram = async (programId) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .eq('program_id', programId)
      .order('tanggal', { ascending: true });

    if (error) {
      console.error('Error fetching sesi by program:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSesiByProgram:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan sesi berdasarkan instructor
export const getSesiByInstructor = async (instructorId) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .eq('instructor_id', instructorId)
      .order('tanggal', { ascending: true });

    if (error) {
      console.error('Error fetching sesi by instructor:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSesiByInstructor:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan sesi berdasarkan tanggal
export const getSesiByDate = async (date) => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level,
          harga
        ),
        instructors:instructor_id (
          id,
          nama_lengkap,
          spesialisasi
        )
      `)
      .eq('tanggal', date)
      .order('jam_mulai', { ascending: true });

    if (error) {
      console.error('Error fetching sesi by date:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSesiByDate:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan statistik kehadiran per sesi
export const getSesiWithAttendanceStats = async () => {
  try {
    const { data, error } = await supabase
      .from('sesi')
      .select(`
        *,
        program:program_id (
          id,
          judul_program,
          level
        ),
        instructors:instructor_id (
          id,
          nama_lengkap
        ),
        pendaftaran (
          id,
          status_pembayaran,
          kehadiran (
            id,
            hadir
          )
        )
      `)
      .order('tanggal', { ascending: false });

    if (error) {
      console.error('Error fetching sesi with stats:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getSesiWithAttendanceStats:', error);
    throw error;
  }
};