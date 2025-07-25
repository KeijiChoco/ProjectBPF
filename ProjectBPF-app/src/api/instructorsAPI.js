// src/api/instructorsAPI.js

import { supabase } from './supabaseClient.js';

// Fungsi untuk mengambil semua instructor dengan relasi profile
export const getAllInstructors = async () => {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        profiles:profile_id (
          id,
          full_name,
          role
        )
      `)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching instructors:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getAllInstructors:', error);
    throw error;
  }
};

// Fungsi untuk mengambil instructor berdasarkan ID
export const getInstructorById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        profiles:profile_id (
          id,
          full_name,
          role
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching instructor by ID:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getInstructorById:', error);
    throw error;
  }
};

// Fungsi untuk membuat instructor baru
export const createInstructor = async (instructorData) => {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .insert([{
        nama_lengkap: instructorData.nama_lengkap,
        bio: instructorData.bio,
        spesialisasi: instructorData.spesialisasi,
        foto_url: instructorData.foto_url,
        profile_id: instructorData.profile_id || null
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating instructor:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createInstructor:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate instructor
export const updateInstructor = async (id, instructorData) => {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .update({
        nama_lengkap: instructorData.nama_lengkap,
        bio: instructorData.bio,
        spesialisasi: instructorData.spesialisasi,
        foto_url: instructorData.foto_url,
        profile_id: instructorData.profile_id || null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating instructor:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in updateInstructor:', error);
    throw error;
  }
};

// Fungsi untuk menghapus instructor
export const deleteInstructor = async (id) => {
  try {
    const { error } = await supabase
      .from('instructors')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting instructor:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteInstructor:', error);
    throw error;
  }
};

// Fungsi untuk upload foto instructor
export const uploadInstructorPhoto = async (file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `instructor_${Date.now()}.${fileExt}`;
    const filePath = `instructors/${fileName}`;

    const { data, error } = await supabase.storage
      .from('gambarworkshop')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }

    // Mendapatkan URL publik
    const { data: publicData } = supabase.storage
      .from('gambarworkshop')
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Error in uploadInstructorPhoto:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua profiles dengan role instructor
export const getInstructorProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, role')
      .eq('role', 'instructor');

    if (error) {
      console.error('Error fetching instructor profiles:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getInstructorProfiles:', error);
    throw error;
  }
};

// Fungsi untuk mencari instructor berdasarkan nama atau spesialisasi
export const searchInstructors = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        profiles:profile_id (
          id,
          full_name,
          role
        )
      `)
      .or(`nama_lengkap.ilike.%${searchTerm}%,spesialisasi.ilike.%${searchTerm}%`)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error searching instructors:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in searchInstructors:', error);
    throw error;
  }
};