import React, { useEffect, useState } from 'react';
import { feedbackAPI } from '../../api/feedbackAPI';
import PageHeader from '../../components/PageHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertBox from '../../components/AlertBox';
import { AiFillDelete } from 'react-icons/ai';

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackAPI.fetchFeedback();
      setFeedbacks(data);
    } catch (err) {
      setError('Gagal memuat data feedback.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus feedback ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await feedbackAPI.deleteFeedback(id);
      setSuccess("Feedback berhasil dihapus.");
      fetchFeedbacks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError("Gagal menghapus feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Feedback Pengguna" breadcrumb={["Admin", "Feedback"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Feedback dari Pengunjung</h2>
        <p className="text-gray-600 mb-6">
          Lihat masukan dan kesan yang diberikan oleh pengguna terhadap website Anda.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data feedback..." />}

        {!loading && feedbacks.length === 0 && (
          <div className="text-center text-gray-500 mt-10 bg-white p-8 rounded-xl shadow border border-gray-200">
            <p className="text-lg mb-2">Belum ada feedback yang masuk.</p>
            <p className="text-sm text-gray-400">Feedback akan ditampilkan di sini setelah dikirim oleh pengguna.</p>
          </div>
        )}

        {!loading && feedbacks.length > 0 && (
          <div className="space-y-6">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="bg-white rounded-xl shadow border border-gray-200 p-6 relative"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{fb.emoji}</span>
                  <h3 className="text-lg font-semibold text-[#4e342e]">{fb.name}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{fb.feedback}</p>
                <button
                  onClick={() => handleDelete(fb.id)}
                  className="absolute top-4 right-4 text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition"
                  title="Hapus Feedback"
                >
                  <AiFillDelete className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
