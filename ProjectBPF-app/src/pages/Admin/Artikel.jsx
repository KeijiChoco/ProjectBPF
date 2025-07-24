import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { artikelAPI } from "../../services/artikelAPI";
import PageHeader from "../../components/PageHeader";
import { useState, useEffect } from "react";
import AlertBox from "../../components/AlertBox";
import GenericTable from "../../components/GenericTable";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ArtikelManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [artikels, setArtikels] = useState([]);

  const [form, setForm] = useState({
    judulartikel: "",
    deskripsiartikel: "",
    gambarartikel: "",
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
        await artikelAPI.updateArtikel(editId, form);
        setSuccess("Artikel berhasil diperbarui!");
      } else {
        await artikelAPI.createArtikel(form);
        setSuccess("Artikel berhasil ditambahkan!");
      }

      setForm({ judulartikel: "", deskripsiartikel: "", gambarartikel: "" });
      setEditMode(false);
      setEditId(null);
      loadArtikels();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadArtikels = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await artikelAPI.fetchArtikel();
      setArtikels(data);
    } catch (err) {
      setError("Gagal memuat data artikel.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const konfirmasi = confirm("Yakin ingin menghapus artikel ini?");
    if (!konfirmasi) return;

    try {
      setLoading(true);
      await artikelAPI.deleteArtikel(id);
      loadArtikels();
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
      judulartikel: item.judulartikel,
      deskripsiartikel: item.deskripsiartikel,
      gambarartikel: item.gambarartikel,
    });
  };

  useEffect(() => {
    loadArtikels();
  }, []);

  return (
    <div>
      <PageHeader title="Manajemen Artikel" breadcrumb={["Admin", "Artikel"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-l"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-6">Artikel</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            {editMode ? "Edit Artikel" : "Tambah Artikel"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="judulartikel"
              placeholder="Judul Artikel"
              value={form.judulartikel}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              required
            />
            <textarea
              name="deskripsiartikel"
              placeholder="Deskripsi Artikel"
              value={form.deskripsiartikel}
              onChange={handleChange}
              className="w-full p-3 rounded border"
              rows="3"
              required
            />
            <input
              type="url"
              name="gambarartikel"
              placeholder="Link Gambar (URL)"
              value={form.gambarartikel}
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
                    setForm({ judulartikel: "", deskripsiartikel: "", gambarartikel: "" });
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
          <h3 className="text-lg font-semibold mb-4">Daftar Artikel ({artikels.length})</h3>

          {loading && <LoadingSpinner text="Memuat data..." />}
          {!loading && artikels.length === 0 && !error && (
            <EmptyState text="Belum ada artikel yang ditambahkan." />
          )}
          {!loading && artikels.length > 0 && (
            <GenericTable
              columns={["#", "Judul", "Deskripsi", "Gambar", "Aksi"]}
              data={artikels}
              renderRow={(item, index) => (
                <>
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-[#6f4e37]">{item.judulartikel}</td>
                  <td className="px-6 py-4">{item.deskripsiartikel}</td>
                  <td className="px-6 py-4">
                    <img
                      src={item.gambarartikel}
                      alt="gambar artikel"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/100x60?text=No+Image";
                      }}
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
