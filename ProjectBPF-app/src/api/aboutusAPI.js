// src/services/aboutusAPI.js
import { supabase } from './supabaseClient.js';

export const aboutusAPI = {
  // Fetch all about us data
  async fetchAboutUs() {
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching about us:', error);
        throw new Error(error.message);
      }

      return data || [];
    } catch (error) {
      console.error('API Error in fetchAboutUs:', error);
      throw error;
    }
  },

  // Create new about us entry
  async createAboutUs(aboutUsData) {
    try {
      // Validate input
      if (!aboutUsData.judul || !aboutUsData.deskripsi) {
        throw new Error('Judul dan deskripsi harus diisi.');
      }

      const { data, error } = await supabase
        .from('about_us')
        .insert([
          {
            judul: aboutUsData.judul.trim(),
            deskripsi: aboutUsData.deskripsi.trim(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Error creating about us:', error);
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('API Error in createAboutUs:', error);
      throw error;
    }
  },

  // Update about us entry
  async updateAboutUs(originalJudul, aboutUsData) {
    try {
      // Validate input
      if (!aboutUsData.judul || !aboutUsData.deskripsi) {
        throw new Error('Judul dan deskripsi harus diisi.');
      }

      const { data, error } = await supabase
        .from('about_us')
        .update({
          judul: aboutUsData.judul.trim(),
          deskripsi: aboutUsData.deskripsi.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('judul', originalJudul)
        .select();

      if (error) {
        console.error('Error updating about us:', error);
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        throw new Error('Data tidak ditemukan untuk diupdate.');
      }

      return data[0];
    } catch (error) {
      console.error('API Error in updateAboutUs:', error);
      throw error;
    }
  },

  // Delete about us entry
  async deleteAboutUs(id) {
    try {
      const { data, error } = await supabase
        .from('about_us')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error deleting about us:', error);
        throw new Error(error.message);
      }

      return data[0];
    } catch (error) {
      console.error('API Error in deleteAboutUs:', error);
      throw error;
    }
  },

  // Get single about us by ID
  async getAboutUsById(id) {
    try {
      const { data, error } = await supabase
        .from('about_us')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching about us by ID:', error);
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error('API Error in getAboutUsById:', error);
      throw error;
    }
  }
};