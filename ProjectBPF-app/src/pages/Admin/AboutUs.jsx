// src/pages/Admin/AboutUsManager.jsx

import React, { useState, useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { aboutusAPI } from '../../api/aboutusAPI';
import PageHeader from "../../components/PageHeader";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AboutUs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [aboutUs, setAboutUs] = useState(null);
  const [form, setForm] = useState({ judul: "", deskripsi: "" });
  const [editMode, setEditMode] = useState(false);
  const [originalJudul, setOriginalJudul] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.judul.trim() || !form.deskripsi.trim()) {
      setError("Judul dan deskripsi harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editMode && aboutUs) {
        await aboutusAPI.updateAboutUs(originalJudul, form);
        setSuccess("Data About Us berhasil diperbarui!");
      } else {
        await aboutusAPI.createAboutUs(form);
        setSuccess("Data About Us berhasil ditambahkan!");
      }

      setEditMode(false);
      setOriginalJudul("");
      setForm({ judul: "", deskripsi: "" });
      await loadAboutUs();
      
      // Auto clear success message
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAboutUs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await aboutusAPI.fetchAboutUs();
      setAboutUs(data.length > 0 ? data[0] : null);
    } catch (err) {
      console.error("Error loading about us:", err);
      setError("Gagal memuat data About Us.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (!aboutUs) return;
    
    setEditMode(true);
    setOriginalJudul(aboutUs.judul);
    setForm({
      judul: aboutUs.judul,
      deskripsi: aboutUs.deskripsi,
    });
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({ judul: "", deskripsi: "" });
    setOriginalJudul("");
    setError("");
  };

  const handleBack = () => {
    navigate("/dashboardadmin");
  };

  useEffect(() => {
    loadAboutUs();
  }, []);

  // Auto clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen About Us" breadcrumb={["Admin", "About Us"]}>
        <button
          onClick={handleBack}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Tentang Kami</h2>
          <p className="text-gray-600">
            Kelola informasi tentang perusahaan Anda yang ditampilkan kepada publik.
          </p>
        </div>

        {/* Alert Messages */}
        {error && (
          <AlertBox type="error" dismissible onClose={() => setError("")}>
            {error}
          </AlertBox>
        )}
        
        {success && (
          <AlertBox type="success" dismissible onClose={() => setSuccess("")}>
            {success}
          </AlertBox>
        )}

        {/* Loading Spinner */}
        {loading && (
          <LoadingSpinner 
            text="Memuat data..." 
            color="indigo"
            className="my-8"
          />
        )}

        {/* Form Input - Show when editing or no data exists */}
        {(editMode || (!aboutUs && !loading)) && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
            <h3 className="text-xl font-semibold text-[#4e342e] mb-4">
              {editMode ? "Edit About Us" : "Tambah About Us"}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Judul <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="judul"
                  placeholder="Masukkan judul tentang perusahaan"
                  value={form.judul}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  placeholder="Masukkan deskripsi lengkap tentang perusahaan"
                  value={form.deskripsi}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8d6e63] focus:border-transparent transition-all duration-200 resize-vertical"
                  rows="6"
                  required
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Deskripsi akan ditampilkan dengan format yang sama seperti yang Anda ketik.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                  {editMode ? "Simpan Perubahan" : "Tambah Data"}
                </button>
                
                {editMode && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={loading}
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Display existing data */}
        {!loading && aboutUs && !editMode && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-[#4e342e]">
                Data About Us Saat Ini
              </h3>
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 text-[#5d4037] hover:text-[#3e2723] transition-colors duration-200 p-2 rounded-md hover:bg-gray-100"
                title="Edit data"
              >
                <AiFillEdit className="text-xl" />
                <span className="text-sm font-medium">Edit</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-2xl font-semibold text-[#6f4e37] mb-3">
                  {aboutUs.judul}
                </h4>
              </div>
              
              <div>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {aboutUs.deskripsi}
                </p>
              </div>
              
              {aboutUs.updated_at && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Terakhir diperbarui: {new Date(aboutUs.updated_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && !aboutUs && !editMode && (
          <div className="text-center py-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Belum Ada Data About Us
              </h3>
              <p className="text-gray-600 mb-6">
                Silakan tambahkan informasi tentang perusahaan Anda terlebih dahulu.
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition-colors duration-200"
              >
                Tambah Data Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}