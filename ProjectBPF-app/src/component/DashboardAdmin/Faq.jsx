import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { faqAPI } from "../../services/faqAPI";
import PageHeader from "../PageHeader";
import { useState, useEffect } from "react";
import AlertBox from "../AlertBox";
import GenericTable from "../GenericTable";
import EmptyState from "../EmptyState";
import LoadingSpinner from "../LoadingSpinner";

export default function FAQManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [faqs, setFaqs] = useState([]);

  const [form, setForm] = useState({
    pertanyaan: "",
    jawaban: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (editMode && editId !== null) {
        await faqAPI.updateFaq(editId, form);
        setSuccess("FAQ berhasil diperbarui!");
      } else {
        await faqAPI.createFaq(form);
        setSuccess("FAQ berhasil ditambahkan!");
      }

      setForm({ pertanyaan: "", jawaban: "" });
      setEditMode(false);
      setEditId(null);
      loadFAQs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadFAQs = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await faqAPI.fetchFaq();
      setFaqs(data);
    } catch (err) {
      setError("Gagal memuat data FAQ.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus FAQ ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await faqAPI.deleteFaq(id);
      loadFAQs();
    } catch (err) {
      setError(`Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);
    setForm({
      pertanyaan: item.pertanyaan,
      jawaban: item.jawaban,
    });
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  return (
    <div>
      <PageHeader title="Manajemen FAQ" breadcrumb={["Admin", "FAQ"]}>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-l"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-6">FAQ</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editMode ? "Edit FAQ" : "Tambah FAQ"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="pertanyaan"
              placeholder="Pertanyaan"
              value={form.pertanyaan}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              required
            />
            <textarea
              name="jawaban"
              placeholder="Jawaban"
              value={form.jawaban}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              rows="4"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#6f4e37] text-white px-5 py-2 rounded hover:bg-[#5d4037]"
              >
                {editMode ? "Simpan Perubahan" : "Tambah"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditId(null);
                    setForm({ pertanyaan: "", jawaban: "" });
                  }}
                  className="bg-gray-400 px-5 py-2 text-white rounded hover:bg-gray-500"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Daftar FAQ ({faqs.length})</h3>

          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && faqs.length === 0 && !error && (
            <EmptyState text="Belum ada FAQ yang ditambahkan." />
          )}
          {!loading && faqs.length > 0 && (
            <GenericTable
              columns={["#", "Pertanyaan", "Jawaban", "Aksi"]}
              data={faqs}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-[#6f4e37]">{item.pertanyaan}</td>
                  <td className="px-6 py-4">{item.jawaban}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(item)}>
                        <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDelete(item.id)}>
                        <AiFillDelete className="text-red-500 text-2xl hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
