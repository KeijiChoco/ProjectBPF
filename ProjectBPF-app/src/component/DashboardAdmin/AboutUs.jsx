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
  const [form, setForm] = useState({ judul: "", deskripsi: "" });
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
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen About Us" breadcrumb={["Admin", "About Us"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Tentang Kami</h2>
        <p className="text-gray-600 mb-8">
          Kelola informasi tentang perusahaan Anda yang ditampilkan kepada publik.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {/* Form Input */}
        {(editMode || !aboutUs) && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-1 text-gray-700 font-medium">Judul</label>
                <input
                  type="text"
                  name="judul"
                  placeholder="Judul"
                  value={form.judul}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-medium">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  placeholder="Deskripsi"
                  value={form.deskripsi}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  rows="5"
                  required
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
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
                      setOriginalJudul("");
                    }}
                    className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tampilkan data jika ada */}
        {!loading && aboutUs && !editMode && (
          <div className="bg-white p-6 rounded-xl shadow-lg border mt-6 border-gray-200">
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
                  setOriginalJudul(aboutUs.judul);
                  setForm({
                    judul: aboutUs.judul,
                    deskripsi: aboutUs.deskripsi,
                  });
                }}
                className="ml-4"
              >
                <AiFillEdit className="text-[#5d4037] text-2xl hover:text-[#3e2723]" />
              </button>
            </div>
          </div>
        )}

        {/* Jika belum ada data */}
        {!loading && !aboutUs && !editMode && (
          <div className="text-center text-gray-600 mt-10">
            Belum ada data <strong>About Us</strong>. Silakan tambahkan terlebih dahulu.
          </div>
        )}
      </div>
    </div>
  );
}
