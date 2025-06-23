import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { programAPI } from "../../services/programAPI";
import PageHeader from "../../component/PageHeader";
import { useState, useEffect } from "react";
import AlertBox from "../../component/AlertBox";
import GenericTable from "../../component/GenericTable";
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
    <div>
      <PageHeader title="Manajemen Program" breadcrumb={["Admin", "Program"]}>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-l"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-6">Program</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editMode ? "Edit Program" : "Tambah Program"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="judulprogram"
              placeholder="Judul Program"
              value={form.judulprogram}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              required
            />
            <textarea
              name="deskripsiprogram"
              placeholder="Deskripsi"
              value={form.deskripsiprogram}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              rows="3"
              required
            />
            <input
              type="url"
              name="gambar"
              placeholder="Link Gambar (URL)"
              value={form.gambar}
              onChange={handleChange}
              className="w-full p-3 rounded border"
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
                    setForm({ judulprogram: "", deskripsiprogram: "", gambar: "" });
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
          <h3 className="text-lg font-semibold mb-4">Daftar Program ({programs.length})</h3>

          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && programs.length === 0 && !error && (
            <EmptyState text="Belum ada program yang ditambahkan." />
          )}
          {!loading && programs.length > 0 && (
            <GenericTable
              columns={["#", "Judul", "Deskripsi", "Gambar", "Aksi"]}
              data={programs}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-[#6f4e37]">{item.judulprogram}</td>
                  <td className="px-6 py-4">{item.deskripsiprogram}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.gambar}
                      alt="gambar program"
                      className="w-20 h-12 object-cover rounded shadow"
                    />
                  </td>
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
