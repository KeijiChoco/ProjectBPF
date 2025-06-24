import axios from 'axios';

// Gunakan .env untuk menyimpan ini di production!
const API_URL = "https://spfuxcghnwehwzejxieg.supabase.co/rest/v1/aboutus";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwZnV4Y2dobndlaHd6ZWp4aWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTM4NzUsImV4cCI6MjA2NTk2OTg3NX0.E4HskffLXUw4MqhXofh5FLM3HwjNdMe4t8yeKF2FE00"; // ⚠️ Jangan taruh ini di frontend saat production

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const aboutusAPI = {
  async fetchAboutUs() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
  },

  async createAboutUs(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data;
  },

  async deleteAboutUs(judul) {
    const encodedJudul = encodeURIComponent(judul);
    await axios.delete(`${API_URL}?judul=eq.${encodedJudul}`, { headers });
  },

  async updateAboutUs(judul, updateAboutUs) {
    const encodedJudul = encodeURIComponent(judul);
    const response = await axios.patch(`${API_URL}?judul=eq.${encodedJudul}`, updateAboutUs, { headers });
    return response.data;
  },
};
