import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
  getAllArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  uploadArticleImage,
} from '../../api/artikelAPI';
import PageHeader from "../../components/PageHeader";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

const Artikel = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    judul_artikel: '',
    deskripsi_artikel: '',
    imageUrl: '',
    imageFile: null
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllArticles();
      setArticles(data);
    } catch (err) {
      setError('Gagal memuat artikel.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, imageFile: e.target.files[0] });
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

      let imageUrl = form.imageUrl;

      if (form.imageFile && form.imageFile.size > 0) {
        imageUrl = await uploadArticleImage(form.imageFile);
      }

      const dataToSend = {
        judul_artikel: form.judul_artikel,
        deskripsi_artikel: form.deskripsi_artikel,
        gambar_artikel_url: imageUrl || '',
      };

      if (editMode && selectedArticle) {
        await updateArticle(selectedArticle.id, dataToSend);
        setSuccess('Artikel berhasil diperbarui!');
      } else {
        await createArticle(dataToSend);
        setSuccess('Artikel berhasil ditambahkan!');
      }

      setEditMode(false);
      setSelectedArticle(null);
      setForm({
        judul_artikel: '',
        deskripsi_artikel: '',
        imageUrl: '',
        imageFile: null
      });
      fetchArticles();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setEditMode(true);
    setSelectedArticle(article);
    setForm({
      judul_artikel: article.judul_artikel,
      deskripsi_artikel: article.deskripsi_artikel,
      imageUrl: article.gambar_artikel_url || '',
      imageFile: null
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus artikel ini?')) return;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await deleteArticle(id);
      setSuccess('Artikel berhasil dihapus!');
      fetchArticles();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Gagal menghapus artikel.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedArticle(null);
    setForm({
      judul_artikel: '',
      deskripsi_artikel: '',
      imageUrl: '',
      imageFile: null
    });
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen Artikel" breadcrumb={["Admin", "Artikel"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-6xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Kelola Artikel</h2>
        <p className="text-gray-600 mb-8">
          Kelola artikel yang akan ditampilkan di website Anda.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {/* Form Input */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold text-[#6f4e37] mb-4">
            {editMode ? 'Edit Artikel' : 'Tambah Artikel Baru'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Judul Artikel</label>
                <input
                  type="text"
                  name="judul_artikel"
                  placeholder="Masukkan judul artikel"
                  value={form.judul_artikel}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">URL Gambar (Opsional)</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">Deskripsi Artikel</label>
              <textarea
                name="deskripsi_artikel"
                placeholder="Tulis deskripsi artikel di sini..."
                value={form.deskripsi_artikel}
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
                {editMode ? 'Simpan Perubahan' : 'Tambah Artikel'}
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

        {/* Daftar Artikel */}
        {!loading && articles.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#6f4e37]">Daftar Artikel</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Judul
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deskripsi
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
                  {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {article.judul_artikel}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {article.deskripsi_artikel}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {article.gambar_artikel_url ? (
                          <img 
                            src={article.gambar_artikel_url} 
                            alt="Gambar Artikel" 
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
                            onClick={() => handleEdit(article)}
                            className="p-2 text-[#5d4037] hover:bg-[#5d4037] hover:text-white rounded-md transition"
                            title="Edit Artikel"
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition"
                            title="Hapus Artikel"
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

        {/* Jika belum ada artikel */}
        {!loading && articles.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            Belum ada <strong>artikel</strong>. Silakan tambahkan artikel pertama Anda.
          </div>
        )}
      </div>
    </div>
  );
};

export default Artikel;