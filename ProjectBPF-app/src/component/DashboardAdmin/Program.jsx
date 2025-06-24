import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { programAPI } from "../../services/programAPI";
import PageHeader from "../../component/PageHeader";
import { useState, useEffect } from "react";
import AlertBox from "../../component/AlertBox";
import EmptyState from "../../component/EmptyState";
import LoadingSpinner from "../../component/LoadingSpinner";

export default function ProgramManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [programs, setPrograms] = useState([]);

  const [form, setForm] = useState({
    judulprogram: "",
    deskripsiprogram: "",
    gambar: "",
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
        await programAPI.updateProgram(editId, form);
        setSuccess("Program berhasil diperbarui!");
      } else {
        await programAPI.createProgram(form);
        setSuccess("Program berhasil ditambahkan!");
      }

      setForm({ judulprogram: "", deskripsiprogram: "", gambar: "" });
      setEditMode(false);
      setEditId(null);
      loadPrograms();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await programAPI.fetchProgram();
      setPrograms(data);
    } catch (err) {
      setError("Gagal memuat data program.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus program ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await programAPI.deleteProgram(id);
      loadPrograms();
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
      judulprogram: item.judulprogram,
      deskripsiprogram: item.deskripsiprogram,
      gambar: item.gambar,
    });
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  return (
    <div className="bg-[#fefaf6] min-h-screen pb-20">
      <PageHeader title="Manajemen Program" breadcrumb={["Admin", "Program"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-3xl mx-auto px-6 mt-10">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-6">Kelola Program</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        {/* Form */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            {editMode ? "Edit Program" : "Tambah Program"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="judulprogram"
              placeholder="Judul Program"
              value={form.judulprogram}
              onChange={handleChange}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              required
            />
            <textarea
              name="deskripsiprogram"
              placeholder="Deskripsi Program"
              value={form.deskripsiprogram}
              onChange={handleChange}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              rows="4"
              required
            />
            <input
              type="url"
              name="gambar"
              placeholder="URL Gambar"
              value={form.gambar}
              onChange={handleChange}
              className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
              required
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
              >
                {editMode ? "Simpan Perubahan" : "Tambah Program"}
              </button>
              {editMode && (
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setEditId(null);
                    setForm({ judulprogram: "", deskripsiprogram: "", gambar: "" });
                  }}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && programs.length === 0 && !error && (
            <EmptyState text="Belum ada program yang ditambahkan." />
          )}
          {!loading &&
            programs.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border"
              >
                <img
                  src={item.gambar}
                  alt={item.judulprogram}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-xl font-semibold text-[#6f4e37] mb-2">
                  {item.judulprogram}
                </h4>
                <p className="text-gray-700 text-sm mb-4 whitespace-pre-line">
                  {item.deskripsiprogram}
                </p>
                <div className="flex justify-end gap-3">
                  <button onClick={() => handleEdit(item)} title="Edit">
                    <AiFillEdit className="text-blue-500 text-xl hover:text-blue-700" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} title="Hapus">
                    <AiFillDelete className="text-red-500 text-xl hover:text-red-700" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
