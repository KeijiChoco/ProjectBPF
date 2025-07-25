// src/api/kehadiranAPI.js

import { supabase } from './supabaseClient.js';

// Fungsi untuk mengambil semua kehadiran dengan relasi
export const getAllKehadiran = async () => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          tanggal_pendaftaran,
          status_pembayaran,
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
              level
            ),
            instructors:instructor_id (
              id,
              nama_lengkap
            )
          )
        )
      `)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching kehadiran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllKehadiran:', error);
    throw error;
  }
};

// Fungsi untuk mengambil kehadiran berdasarkan ID
export const getKehadiranById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          tanggal_pendaftaran,
          status_pembayaran,
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
              level
            ),
            instructors:instructor_id (
              id,
              nama_lengkap
            )
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching kehadiran by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getKehadiranById:', error);
    throw error;
  }
};

// Fungsi untuk membuat atau mengupdate kehadiran
export const upsertKehadiran = async (kehadiranData) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .upsert({
        pendaftaran_id: kehadiranData.pendaftaran_id,
        hadir: kehadiranData.hadir,
        catatan: kehadiranData.catatan || null
      }, {
        onConflict: 'pendaftaran_id'
      })
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          profiles:user_id (
            id,
            full_name
          ),
          sesi:sesi_id (
            id,
            tanggal,
            jam_mulai,
            jam_selesai,
            program:program_id (
              id,
              judul_program
            ),
            instructors:instructor_id (
              id,
              nama_lengkap
            )
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error upserting kehadiran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in upsertKehadiran:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate kehadiran
export const updateKehadiran = async (id, kehadiranData) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .update({
        hadir: kehadiranData.hadir,
        catatan: kehadiranData.catatan || null
      })
      .eq('id', id)
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          profiles:user_id (
            id,
            full_name
          ),
          sesi:sesi_id (
            id,
            tanggal,
            jam_mulai,
            jam_selesai,
            program:program_id (
              id,
              judul_program
            ),
            instructors:instructor_id (
              id,
              nama_lengkap
            )
          )
        )
      `)
      .single();

    if (error) {
      console.error('Error updating kehadiran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateKehadiran:', error);
    throw error;
  }
};

// Fungsi untuk menghapus kehadiran
export const deleteKehadiran = async (id) => {
  try {
    const { error } = await supabase
      .from('kehadiran')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting kehadiran:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteKehadiran:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan kehadiran berdasarkan sesi
export const getKehadiranBySesi = async (sesiId) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          profiles:user_id (
            id,
            full_name
          )
        )
      `)
      .eq('pendaftaran.sesi_id', sesiId)
      .order('pendaftaran.profiles.full_name', { ascending: true });

    if (error) {
      console.error('Error fetching kehadiran by sesi:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getKehadiranBySesi:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan kehadiran berdasarkan pendaftaran
export const getKehadiranByPendaftaran = async (pendaftaranId) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          profiles:user_id (
            id,
            full_name
          ),
          sesi:sesi_id (
            id,
            tanggal,
            jam_mulai,
            jam_selesai,
            program:program_id (
              id,
              judul_program
            )
          )
        )
      `)
      .eq('pendaftaran_id', pendaftaranId)
      .single();

    if (error) {
      console.error('Error fetching kehadiran by pendaftaran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getKehadiranByPendaftaran:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan statistik kehadiran
export const getKehadiranStats = async () => {
  try {
    const { data: allKehadiran, error: kehadiranError } = await supabase
      .from('kehadiran')
      .select('hadir');

    if (kehadiranError) {
      console.error('Error fetching kehadiran stats:', kehadiranError);
      throw kehadiranError;
    }

    const stats = {
      total: allKehadiran.length,
      hadir: allKehadiran.filter(k => k.hadir === true).length,
      tidakHadir: allKehadiran.filter(k => k.hadir === false).length,
      persentaseKehadiran: allKehadiran.length > 0 
        ? Math.round((allKehadiran.filter(k => k.hadir === true).length / allKehadiran.length) * 100)
        : 0
    };

    return stats;
  } catch (error) {
    console.error('Error in getKehadiranStats:', error);
    throw error;
  }
};

// Fungsi untuk bulk update kehadiran (untuk absen massal)
export const bulkUpdateKehadiran = async (kehadiranList) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .upsert(kehadiranList, {
        onConflict: 'pendaftaran_id'
      })
      .select();

    if (error) {
      console.error('Error bulk updating kehadiran:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in bulkUpdateKehadiran:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan laporan kehadiran berdasarkan tanggal
export const getKehadiranReport = async (startDate, endDate) => {
  try {
    const { data, error } = await supabase
      .from('kehadiran')
      .select(`
        *,
        pendaftaran:pendaftaran_id (
          id,
          profiles:user_id (
            id,
            full_name
          ),
          sesi:sesi_id (
            id,
            tanggal,
            jam_mulai,
            jam_selesai,
            program:program_id (
              id,
              judul_program,
              level
            ),
            instructors:instructor_id (
              id,
              nama_lengkap
            )
          )
        )
      `)
      .gte('pendaftaran.sesi.tanggal', startDate)
      .lte('pendaftaran.sesi.tanggal', endDate)
      .order('pendaftaran.sesi.tanggal', { ascending: false });

    if (error) {
      console.error('Error fetching kehadiran report:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getKehadiranReport:', error);
    throw error;
  }
};