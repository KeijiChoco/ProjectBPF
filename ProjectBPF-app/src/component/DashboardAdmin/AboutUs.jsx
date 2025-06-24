import { AiFillEdit } from "react-icons/ai";
import { aboutusAPI } from "../../services/aboutusAPI";
import PageHeader from "../PageHeader";
import { useState, useEffect } from "react";
import AlertBox from "../AlertBox";
import LoadingSpinner from "../LoadingSpinner";

export default function AboutUsManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [aboutUs, setAboutUs] = useState(null);

  const [form, setForm] = useState({
    judul: "",
    deskripsi: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [originalJudul, setOriginalJudul] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      loadAboutUs();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
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
      setError("Gagal memuat data About Us.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAboutUs();
  }, []);

  return (
    <div>
      <PageHeader title="Manajemen About Us" breadcrumb={["Admin", "About Us"]}>
        <button
          onClick={() => window.location.href = "/"}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-l"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-6">Tentang Kami</h2>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {!loading && !aboutUs && !editMode && (
          <div className="text-gray-700 text-lg mb-4">
            Belum ada data About Us. Silakan tambahkan.
          </div>
        )}

        {(editMode || !aboutUs) && (
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="judul"
                placeholder="Judul"
                value={form.judul}
                onChange={handleChange}
                className="w-full p-3 rounded border"
                required
              />
              <textarea
                name="deskripsi"
                placeholder="Deskripsi"
                value={form.deskripsi}
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
                      setForm({
                        judul: aboutUs?.judul || "",
                        deskripsi: aboutUs?.deskripsi || "",
                      });
                      setOriginalJudul(""); // reset judul lama
                    }}
                    className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {!loading && aboutUs && !editMode && (
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-semibold text-[#6f4e37] mb-2">
                  {aboutUs.judul}
                </h3>
                <p className="text-gray-800 whitespace-pre-line">{aboutUs.deskripsi}</p>
              </div>
              <button
                onClick={() => {
                  setEditMode(true);
                  setOriginalJudul(aboutUs.judul); // ✅ simpan judul lama
                  setForm({
                    judul: aboutUs.judul,
                    deskripsi: aboutUs.deskripsi,
                  });
                }}
              >
                <AiFillEdit className="text-blue-500 text-2xl hover:text-blue-700" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
