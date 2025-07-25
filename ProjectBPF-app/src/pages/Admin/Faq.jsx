import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiChevronDown, FiPlus } from 'react-icons/fi';
import { getFaqs, createFaq, updateFaq, deleteFaq } from '../../api/faqAPI';
import PageHeader from "../../components/PageHeader";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

// Komponen untuk satu item akordeon
function AccordionItem({ faq, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <h2>
        <button
          type="button"
          className="flex justify-between items-center w-full p-5 font-medium text-left text-gray-800 hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[#4e342e] font-semibold">{faq.pertanyaan}</span>
          <FiChevronDown className={`w-5 h-5 text-[#6f4e37] transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-gray-50">
          <p className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">{faq.jawaban}</p>
          <div className="flex justify-end gap-2">
            <button 
              onClick={() => onEdit(faq)} 
              className="p-2 text-[#5d4037] hover:bg-[#5d4037] hover:text-white rounded-md transition"
              title="Edit FAQ"
            >
              <AiFillEdit className="text-lg" />
            </button>
            <button 
              onClick={() => onDelete(faq.id)} 
              className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition"
              title="Hapus FAQ"
            >
              <AiFillDelete className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form, setForm] = useState({ pertanyaan: '', jawaban: '' });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getFaqs();
      if (data) setFaqs(data);
    } catch (err) {
      setError('Gagal memuat data FAQ.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      let result;
      if (editMode && selectedFaq) {
        result = await updateFaq(selectedFaq.id, form);
        setSuccess('FAQ berhasil diperbarui!');
      } else {
        result = await createFaq(form);
        setSuccess('FAQ berhasil ditambahkan!');
      }

      // Periksa jika ada error dari API
      if (result && result.error) {
        setError(`Gagal menyimpan data: ${result.error.message || 'Terjadi kesalahan'}`);
        return;
      }

      setEditMode(false);
      setSelectedFaq(null);
      setForm({ pertanyaan: '', jawaban: '' });
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (faq) => {
    setEditMode(true);
    setSelectedFaq(faq);
    setForm({
      pertanyaan: faq.pertanyaan,
      jawaban: faq.jawaban
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus FAQ ini?')) return;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      await deleteFaq(id);
      setSuccess('FAQ berhasil dihapus!');
      fetchFaqs();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Gagal menghapus FAQ.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedFaq(null);
    setForm({ pertanyaan: '', jawaban: '' });
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen FAQ" breadcrumb={["Admin", "FAQ"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-8">
          Kelola pertanyaan yang sering ditanyakan untuk membantu pengunjung website Anda.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {/* Form Input */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#6f4e37]">
              {editMode ? 'Edit FAQ' : 'Tambah FAQ Baru'}
            </h3>
            {!editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#6f4e37] text-white px-4 py-2 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2"
              >
                <FiPlus className="text-sm" />
                Tambah FAQ
              </button>
            )}
          </div>

          {editMode && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Pertanyaan</label>
                <input
                  type="text"
                  name="pertanyaan"
                  placeholder="Masukkan pertanyaan yang sering ditanyakan"
                  value={form.pertanyaan}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Jawaban</label>
                <textarea
                  name="jawaban"
                  placeholder="Tulis jawaban yang jelas dan informatif"
                  value={form.jawaban}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  rows="4"
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
                  disabled={loading}
                >
                  {selectedFaq ? 'Simpan Perubahan' : 'Tambah FAQ'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Daftar FAQ */}
        {!loading && faqs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#6f4e37]">
                Daftar FAQ ({faqs.length} pertanyaan)
              </h3>
            </div>
            
            <div className="divide-y divide-gray-200">
              {faqs.map(faq => (
                <AccordionItem 
                  key={faq.id} 
                  faq={faq} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Jika belum ada FAQ */}
        {!loading && faqs.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <p className="text-lg mb-4">
                Belum ada <strong>FAQ</strong> yang ditambahkan.
              </p>
              <p className="text-gray-500 mb-6">
                Tambahkan pertanyaan yang sering ditanyakan untuk membantu pengunjung website Anda.
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2 mx-auto"
              >
                <FiPlus />
                Tambah FAQ Pertama
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;