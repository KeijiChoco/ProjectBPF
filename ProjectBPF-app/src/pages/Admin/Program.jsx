import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiPlus, FiSearch } from 'react-icons/fi';
import {
  getAllPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
  uploadProgramImage,
  searchPrograms
} from '../../api/programAPI';
import PageHeader from "../../components/PageHeader";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

const Program = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [form, setForm] = useState({
    judul_program: '',
    deskripsi_program: '',
    gambar_program_url: '',
    level: 'beginner',
    harga: 0,
    imageFile: null
  });

  // Level options
  const levelOptions = [
    { value: 'beginner', label: 'Pemula (Beginner)' },
    { value: 'intermediate', label: 'Menengah (Intermediate)' },
    { value: 'advanced', label: 'Lanjutan (Advanced)' },
    { value: 'expert', label: 'Ahli (Expert)' }
  ];

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllPrograms();
      setPrograms(data);
    } catch (err) {
      setError('Gagal memuat data program.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchPrograms();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const data = await searchPrograms(searchTerm);
      setPrograms(data);
    } catch (err) {
      setError('Gagal mencari program.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, imageFile: e.target.files[0] });
    } else if (e.target.name === 'harga') {
      setForm({ ...form, [e.target.name]: parseFloat(e.target.value) || 0 });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      let imageUrl = form.gambar_program_url;

      // Upload gambar jika ada file yang dipilih
      if (form.imageFile && form.imageFile.size > 0) {
        imageUrl = await uploadProgramImage(form.imageFile);
      }

      const dataToSend = {
        judul_program: form.judul_program,
        deskripsi_program: form.deskripsi_program,
        gambar_program_url: imageUrl || '',
        level: form.level,
        harga: form.harga
      };

      if (editMode && selectedProgram) {
        await updateProgram(selectedProgram.id, dataToSend);
        setSuccess('Program berhasil diperbarui!');
      } else {
        await createProgram(dataToSend);
        setSuccess('Program berhasil ditambahkan!');
      }

      setEditMode(false);
      setSelectedProgram(null);
      setForm({
        judul_program: '',
        deskripsi_program: '',
        gambar_program_url: '',
        level: 'beginner',
        harga: 0,
        imageFile: null
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (program) => {
    setEditMode(true);
    setSelectedProgram(program);
    setForm({
      judul_program: program.judul_program,
      deskripsi_program: program.deskripsi_program,
      gambar_program_url: program.gambar_program_url || '',
      level: program.level,
      harga: program.harga || 0,
      imageFile: null
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus program ini?')) return;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await deleteProgram(id);
      setSuccess('Program berhasil dihapus!');
      fetchPrograms();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Gagal menghapus program.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedProgram(null);
    setForm({
      judul_program: '',
      deskripsi_program: '',
      gambar_program_url: '',
      level: 'beginner',
      harga: 0,
      imageFile: null
    });
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const getLevelBadge = (level) => {
    const styles = {
      beginner: 'bg-green-100 text-green-800 border-green-200',
      intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
      advanced: 'bg-orange-100 text-orange-800 border-orange-200',
      expert: 'bg-red-100 text-red-800 border-red-200'
    };
    
    const labels = {
      beginner: 'Pemula',
      intermediate: 'Menengah',
      advanced: 'Lanjutan',
      expert: 'Ahli'
    };
    
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[level] || styles.beginner}`}>
        {labels[level] || level}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen Program" breadcrumb={["Admin", "Program"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-6xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Kelola Program Pelatihan</h2>
        <p className="text-gray-600 mb-8">
          Kelola program pelatihan yang tersedia di website Anda.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari program berdasarkan judul..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#6f4e37] text-white px-6 py-3 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2"
            >
              <FiSearch />
              Cari
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  fetchPrograms();
                }}
                className="bg-gray-300 text-gray-800 px-4 py-3 rounded-md hover:bg-gray-400 transition"
              >
                Reset
              </button>
            )}
          </form>
        </div>

        {/* Form Input */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">
            {editMode ? 'Edit Program' : 'Tambah Program Baru'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Judul Program</label>
                <input
                  type="text"
                  name="judul_program"
                  placeholder="Masukkan judul program"
                  value={form.judul_program}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Level</label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                >
                  {levelOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Harga (IDR)</label>
                <input
                  type="number"
                  name="harga"
                  placeholder="0"
                  value={form.harga}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">URL Gambar (Opsional)</label>
                <input
                  type="url"
                  name="gambar_program_url"
                  placeholder="https://example.com/image.jpg"
                  value={form.gambar_program_url}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Deskripsi Program</label>
              <textarea
                name="deskripsi_program"
                placeholder="Tulis deskripsi program di sini..."
                value={form.deskripsi_program}
                onChange={handleChange}
                className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Upload Gambar</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              />
              <p className="text-sm text-gray-500 mt-1">
                Pilih file gambar jika ingin mengganti gambar dari URL
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
                disabled={loading}
              >
                {editMode ? 'Simpan Perubahan' : 'Tambah Program'}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Daftar Program */}
        {!loading && programs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#6f4e37]">
                Daftar Program ({programs.length} program)
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Program
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Harga
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gambar
                    </th>
                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {programs.map((program) => (
                    <tr key={program.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {program.judul_program}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {program.deskripsi_program}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getLevelBadge(program.level)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(program.harga)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {program.gambar_program_url ? (
                          <img 
                            src={program.gambar_program_url} 
                            alt="Gambar Program" 
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No Image</span>
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(program)}
                            className="p-2 text-[#5d4037] hover:bg-[#5d4037] hover:text-white rounded-md transition"
                            title="Edit Program"
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(program.id)}
                            className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition"
                            title="Hapus Program"
                          >
                            <AiFillDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && programs.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <p className="text-lg mb-4">
                {searchTerm ? 'Tidak ada program yang ditemukan.' : 'Belum ada program yang ditambahkan.'}
              </p>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? 'Coba ubah kata kunci pencarian Anda.' 
                  : 'Tambahkan program pelatihan pertama Anda.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2 mx-auto"
                >
                  <FiPlus />
                  Tambah Program Pertama
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Program;