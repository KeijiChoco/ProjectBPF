import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { aboutusAPI } from "../../services/aboutusAPI";
import logo from "../../assets/FAF Logo.png";

export default function AboutUsPage() {
  const [aboutuss, setAboutUs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const data = await aboutusAPI.fetchAboutUs();
        console.log("DATA YANG DITERIMA DARI SUPABASE:", data);
        setAboutUs(data);
      } catch (err) {
        setError(
          "Maaf, gagal memuat informasi tentang FAF Grind & Learn. Silahkan dicoba beberapa saat lagi. "
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUs();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
        It's About FAF Grind & Learn
      </h1>

      {/* SECTION: Deskripsi Utama */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2">
          <img
            src={logo}
            alt="Tentang FAF"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 text-lg leading-relaxed">
          <p className="mb-4">
            <strong>FAF Grind & Learn</strong> adalah platform pelatihan barista
            yang dikembangkan oleh mahasiswa pecinta kopi. Berawal dari
            ketertarikan kami terhadap dunia kopi dan budaya café, kami ingin
            menghadirkan ruang belajar yang santai, interaktif, dan bermanfaat
            bagi siapa saja yang ingin memperdalam keterampilan sebagai barista.
          </p>
          <p>
            Kami percaya bahwa belajar jadi barista itu nggak harus mahal atau
            rumit. Makanya, lewat platform ini, kami menggabungkan materi teori,
            video praktik, hingga sesi pelatihan offline bersama mitra café —
            semua dirancang oleh mahasiswa, untuk kamu yang punya semangat
            belajar.
          </p>
        </div>
      </div>

      {/* SECTION: Visi */}
      <div className="bg-white rounded-lg shadow p-6 md:p-10 mb-12">
        <h2 className="text-2xl font-bold mb-4">🎯 Visi</h2>
        <p className="text-lg">
          Menjadi platform belajar barista yang ramah, fleksibel, dan bisa
          diakses siapa saja — mulai dari anak kos pencinta kopi sampai calon
          profesional.
        </p>
      </div>

      {/* SECTION: Misi */}
      <div className="bg-white rounded-lg shadow p-6 md:p-10 mb-12">
        <h2 className="text-2xl font-bold mb-4">✅ Misi</h2>
        <ul className="list-disc pl-5 space-y-2 text-lg">
          <li>
            Menyediakan konten pelatihan barista yang mudah dipahami dan
            relevan.
          </li>
          <li>
            Menghubungkan peserta dengan pelatihan langsung di café-café mitra.
          </li>
          <li>
            Membuat proses belajar jadi asik, nggak kaku, dan tetap berkualitas.
          </li>
          <li>
            Mendorong komunitas anak muda yang ingin belajar kopi dari dasar
            tanpa tekanan.
          </li>
        </ul>
      </div>

      {/* SECTION: Statistik atau Nilai Tambah */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Kenapa Pilih FAF?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">100+</p>
            <p className="text-lg">Peserta Terlatih</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">15+</p>
            <p className="text-lg">Café Mitra</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-3xl font-bold">Mahasiswa</p>
            <p className="text-lg">di balik semua ini ☕</p>
          </div>
        </div>
      </div>
    </div>
  );
}
