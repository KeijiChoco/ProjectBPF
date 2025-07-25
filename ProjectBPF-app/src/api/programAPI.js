// src/api/programAPI.js

import { supabase } from './supabaseClient.js';

// Fungsi untuk mengambil semua program
export const getAllPrograms = async () => {
  try {
    const { data, error } = await supabase
      .from('program')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllPrograms:', error);
    throw error;
  }
};

// Fungsi untuk mengambil program berdasarkan ID
export const getProgramById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('program')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching program by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getProgramById:', error);
    throw error;
  }
};

// Fungsi untuk membuat program baru
export const createProgram = async (programData) => {
  try {
    const { data, error } = await supabase
      .from('program')
      .insert([{
        judul_program: programData.judul_program,
        deskripsi_program: programData.deskripsi_program,
        gambar_program_url: programData.gambar_program_url,
        level: programData.level,
        harga: programData.harga
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating program:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createProgram:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate program
export const updateProgram = async (id, programData) => {
  try {
    const { data, error } = await supabase
      .from('program')
      .update({
        judul_program: programData.judul_program,
        deskripsi_program: programData.deskripsi_program,
        gambar_program_url: programData.gambar_program_url,
        level: programData.level,
        harga: programData.harga
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating program:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateProgram:', error);
    throw error;
  }
};

// Fungsi untuk menghapus program
export const deleteProgram = async (id) => {
  try {
    const { error } = await supabase
      .from('program')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting program:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteProgram:', error);
    throw error;
  }
};

// Fungsi untuk upload gambar program (jika menggunakan Supabase Storage)
export const uploadProgramImage = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `program_${Date.now()}.${fileExt}`;
    const filePath = `programs/${fileName}`;

    const { data, error } = await supabase.storage
      .from('gambarworkshop') // Menggunakan bucket 'gambarworkshop'
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Mendapatkan URL publik
    const { data: publicData } = supabase.storage
      .from('gambarworkshop')
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Error in uploadProgramImage:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan program berdasarkan level
export const getProgramsByLevel = async (level) => {
  try {
    const { data, error } = await supabase
      .from('program')
      .select('*')
      .eq('level', level)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching programs by level:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getProgramsByLevel:', error);
    throw error;
  }
};

// Fungsi untuk mencari program berdasarkan judul
export const searchPrograms = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('program')
      .select('*')
      .ilike('judul_program', `%${searchTerm}%`)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error searching programs:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in searchPrograms:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan statistik program
export const getProgramStats = async () => {
  try {
    const { data: allPrograms, error: programError } = await supabase
      .from('program')
      .select('level');

    if (programError) {
      console.error('Error fetching program stats:', programError);
      throw programError;
    }

    // Menghitung jumlah program per level
    const levelCounts = allPrograms.reduce((acc, program) => {
      acc[program.level] = (acc[program.level] || 0) + 1;
      return acc;
    }, {});

    return {
      total: allPrograms.length,
      levelCounts
    };
  } catch (error) {
    console.error('Error in getProgramStats:', error);
    throw error;
  }
};