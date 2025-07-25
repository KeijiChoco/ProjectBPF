import axios from 'axios';

// ⚠️ Gunakan .env untuk menyimpan ini di production!
const BASE_URL = "https://spfuxcghnwehwzejxieg.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZnV4Y2dobndlaHd6ZWp4aWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTM4NzUsImV4cCI6MjA2NTk2OTg3NX0.E4HskffLXUw4MqhXofh5FLM3HwjNdMe4t8yeKF2FE00";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

// About Us API (existing)
export const aboutusAPI = {
  async fetchAboutUs() {
    const response = await axios.get(`${BASE_URL}/aboutus`, { headers });
    return response.data;
  },
  
  async createAboutUs(data) {
    const response = await axios.post(`${BASE_URL}/aboutus`, data, { headers });
    return response.data;
  },
  
  async deleteAboutUs(judul) {
    const encodedJudul = encodeURIComponent(judul);
    await axios.delete(`${BASE_URL}/aboutus?judul=eq.${encodedJudul}`, { headers });
  },
  
  async updateAboutUs(judul, updateAboutUs) {
    const encodedJudul = encodeURIComponent(judul);
    const response = await axios.patch(`${BASE_URL}/aboutus?judul=eq.${encodedJudul}`, updateAboutUs, { headers });
    return response.data;
  },
};

// Artikel API
export const artikelAPI = {
  async fetchArtikel() {
    const response = await axios.get(`${BASE_URL}/artikel`, { headers });
    return response.data;
  },
  
  async fetchArtikelById(id) {
    const response = await axios.get(`${BASE_URL}/artikel?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async createArtikel(data) {
    const response = await axios.post(`${BASE_URL}/artikel`, data, { headers });
    return response.data;
  },
  
  async updateArtikel(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/artikel?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteArtikel(id) {
    await axios.delete(`${BASE_URL}/artikel?id=eq.${id}`, { headers });
  },
};

// FAQ API
export const faqAPI = {
  async fetchFAQ() {
    const response = await axios.get(`${BASE_URL}/faq`, { headers });
    return response.data;
  },
  
  async fetchFAQById(id) {
    const response = await axios.get(`${BASE_URL}/faq?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async createFAQ(data) {
    const response = await axios.post(`${BASE_URL}/faq`, data, { headers });
    return response.data;
  },
  
  async updateFAQ(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/faq?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteFAQ(id) {
    await axios.delete(`${BASE_URL}/faq?id=eq.${id}`, { headers });
  },
};

// Instructors API
export const instructorsAPI = {
  async fetchInstructors() {
    const response = await axios.get(`${BASE_URL}/instructors`, { headers });
    return response.data;
  },
  
  async fetchInstructorById(id) {
    const response = await axios.get(`${BASE_URL}/instructors?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchInstructorByProfileId(profileId) {
    const response = await axios.get(`${BASE_URL}/instructors?profile_id=eq.${profileId}`, { headers });
    return response.data;
  },
  
  async createInstructor(data) {
    const response = await axios.post(`${BASE_URL}/instructors`, data, { headers });
    return response.data;
  },
  
  async updateInstructor(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/instructors?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteInstructor(id) {
    await axios.delete(`${BASE_URL}/instructors?id=eq.${id}`, { headers });
  },
};

// Kehadiran API
export const kehadiranAPI = {
  async fetchKehadiran() {
    const response = await axios.get(`${BASE_URL}/kehadiran`, { headers });
    return response.data;
  },
  
  async fetchKehadiranById(id) {
    const response = await axios.get(`${BASE_URL}/kehadiran?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchKehadiranByPendaftaranId(pendaftaranId) {
    const response = await axios.get(`${BASE_URL}/kehadiran?pendaftaran_id=eq.${pendaftaranId}`, { headers });
    return response.data;
  },
  
  async createKehadiran(data) {
    const response = await axios.post(`${BASE_URL}/kehadiran`, data, { headers });
    return response.data;
  },
  
  async updateKehadiran(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/kehadiran?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteKehadiran(id) {
    await axios.delete(`${BASE_URL}/kehadiran?id=eq.${id}`, { headers });
  },
  
  async markKehadiran(pendaftaranId, hadir, catatan = null) {
    const updateData = { hadir, catatan };
    const response = await axios.patch(`${BASE_URL}/kehadiran?pendaftaran_id=eq.${pendaftaranId}`, updateData, { headers });
    return response.data;
  },
};

// Pendaftaran API
export const pendaftaranAPI = {
  async fetchPendaftaran() {
    const response = await axios.get(`${BASE_URL}/pendaftaran`, { headers });
    return response.data;
  },
  
  async fetchPendaftaranById(id) {
    const response = await axios.get(`${BASE_URL}/pendaftaran?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchPendaftaranByUserId(userId) {
    const response = await axios.get(`${BASE_URL}/pendaftaran?user_id=eq.${userId}`, { headers });
    return response.data;
  },
  
  async fetchPendaftaranBySesiId(sesiId) {
    const response = await axios.get(`${BASE_URL}/pendaftaran?sesi_id=eq.${sesiId}`, { headers });
    return response.data;
  },
  
  async fetchPendaftaranByStatus(status) {
    const response = await axios.get(`${BASE_URL}/pendaftaran?status_pembayaran=eq.${status}`, { headers });
    return response.data;
  },
  
  async createPendaftaran(data) {
    const response = await axios.post(`${BASE_URL}/pendaftaran`, data, { headers });
    return response.data;
  },
  
  async updatePendaftaran(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/pendaftaran?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async updateStatusPembayaran(id, status) {
    const updateData = { status_pembayaran: status };
    const response = await axios.patch(`${BASE_URL}/pendaftaran?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deletePendaftaran(id) {
    await axios.delete(`${BASE_URL}/pendaftaran?id=eq.${id}`, { headers });
  },
};

// Profiles API
export const profilesAPI = {
  async fetchProfiles() {
    const response = await axios.get(`${BASE_URL}/profiles`, { headers });
    return response.data;
  },
  
  async fetchProfileById(id) {
    const response = await axios.get(`${BASE_URL}/profiles?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchProfilesByRole(role) {
    const response = await axios.get(`${BASE_URL}/profiles?role=eq.${role}`, { headers });
    return response.data;
  },
  
  async createProfile(data) {
    const response = await axios.post(`${BASE_URL}/profiles`, data, { headers });
    return response.data;
  },
  
  async updateProfile(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/profiles?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteProfile(id) {
    await axios.delete(`${BASE_URL}/profiles?id=eq.${id}`, { headers });
  },
};

// Program API
export const programAPI = {
  async fetchProgram() {
    const response = await axios.get(`${BASE_URL}/program`, { headers });
    return response.data;
  },
  
  async fetchProgramById(id) {
    const response = await axios.get(`${BASE_URL}/program?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchProgramByLevel(level) {
    const response = await axios.get(`${BASE_URL}/program?level=eq.${encodeURIComponent(level)}`, { headers });
    return response.data;
  },
  
  async createProgram(data) {
    const response = await axios.post(`${BASE_URL}/program`, data, { headers });
    return response.data;
  },
  
  async updateProgram(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/program?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteProgram(id) {
    await axios.delete(`${BASE_URL}/program?id=eq.${id}`, { headers });
  },
};

// Sesi API
export const sesiAPI = {
  async fetchSesi() {
    const response = await axios.get(`${BASE_URL}/sesi`, { headers });
    return response.data;
  },
  
  async fetchSesiById(id) {
    const response = await axios.get(`${BASE_URL}/sesi?id=eq.${id}`, { headers });
    return response.data;
  },
  
  async fetchSesiByProgramId(programId) {
    const response = await axios.get(`${BASE_URL}/sesi?program_id=eq.${programId}`, { headers });
    return response.data;
  },
  
  async fetchSesiByInstructorId(instructorId) {
    const response = await axios.get(`${BASE_URL}/sesi?instructor_id=eq.${instructorId}`, { headers });
    return response.data;
  },
  
  async fetchSesiByTanggal(tanggal) {
    const response = await axios.get(`${BASE_URL}/sesi?tanggal=eq.${tanggal}`, { headers });
    return response.data;
  },
  
  async fetchSesiWithDetails() {
    // Menggunakan select untuk join dengan tabel lain
    const response = await axios.get(`${BASE_URL}/sesi?select=*,program(*),instructors(*)`, { headers });
    return response.data;
  },
  
  async createSesi(data) {
    const response = await axios.post(`${BASE_URL}/sesi`, data, { headers });
    return response.data;
  },
  
  async updateSesi(id, updateData) {
    const response = await axios.patch(`${BASE_URL}/sesi?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
  
  async deleteSesi(id) {
    await axios.delete(`${BASE_URL}/sesi?id=eq.${id}`, { headers });
  },
  
  async updateKuota(id, kuota) {
    const updateData = { kuota };
    const response = await axios.patch(`${BASE_URL}/sesi?id=eq.${id}`, updateData, { headers });
    return response.data;
  },
};

// Utility functions untuk operasi yang lebih kompleks
export const utilityAPI = {
  // Get sesi dengan jumlah pendaftar
  async getSesiWithPendaftarCount() {
    const sesi = await sesiAPI.fetchSesi();
    const sesiWithCount = await Promise.all(sesi.map(async (s) => {
      const pendaftaran = await pendaftaranAPI.fetchPendaftaranBySesiId(s.id);
      return {
        ...s,
        jumlah_pendaftar: pendaftaran.length,
        sisa_kuota: s.kuota - pendaftaran.length
      };
    }));
    return sesiWithCount;
  },
  
  // Get pendaftaran dengan detail lengkap
  async getPendaftaranWithDetails(userId = null) {
    let pendaftaran;
    if (userId) {
      pendaftaran = await pendaftaranAPI.fetchPendaftaranByUserId(userId);
    } else {
      pendaftaran = await pendaftaranAPI.fetchPendaftaran();
    }
    
    const pendaftaranWithDetails = await Promise.all(pendaftaran.map(async (p) => {
      const [sesi, profile] = await Promise.all([
        sesiAPI.fetchSesiById(p.sesi_id),
        profilesAPI.fetchProfileById(p.user_id)
      ]);
      
      let program = null;
      let instructor = null;
      
      if (sesi.length > 0) {
        if (sesi[0].program_id) {
          const programData = await programAPI.fetchProgramById(sesi[0].program_id);
          program = programData[0] || null;
        }
        if (sesi[0].instructor_id) {
          const instructorData = await instructorsAPI.fetchInstructorById(sesi[0].instructor_id);
          instructor = instructorData[0] || null;
        }
      }
      
      return {
        ...p,
        sesi: sesi[0] || null,
        program,
        instructor,
        profile: profile[0] || null
      };
    }));
    
    return pendaftaranWithDetails;
  }
};