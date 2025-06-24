// File: src/pages/ProgramPage.jsx

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Sesuaikan path ini dengan lokasi file programAPI.js Anda
import { programAPI } from "../services/programAPI";

export default function ProgramPage() {
  // 1. Siapkan state untuk menampung data, status loading, dan error
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Gunakan useEffect untuk mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programAPI.fetchProgram();
        // --- BARIS DEBUGGING DITAMBAHKAN DI SINI ---
        console.log("DATA YANG DITERIMA DARI SUPABASE:", data);
        // -------------------------------------------
        setPrograms(data);
      } catch (err) {
        setError("Gagal memuat data program. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali

  // 3. Tampilkan pesan loading saat data sedang diambil
  if (loading) {
    return <div className="text-center p-10">Memuat program...</div>;
  }

  // 4. Tampilkan pesan error jika terjadi kesalahan
  if (error) {
    return <div className="text-center p-10 text-merah">{error}</div>;
  }

  // 5. Jika berhasil, tampilkan daftar program dalam bentuk kartu (cards)
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
        Program Pelatihan Kami
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <div
            key={program.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              // UBAH DI SINI: dari program.url_gambar menjadi program.gambar
              src={
                program.gambar ||
                "https://placehold.co/600x400/FDF6E3/432818?text=FAF"
              }
              alt={program.judulprogram} // Ganti juga alt textnya
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold font-heading text-coffee-dark mb-2">
                {/* UBAH DI SINI: dari program.nama_program menjadi program.judulprogram */}
                {program.judulprogram}
              </h2>
              <p className="font-body text-gray-600 mb-4">
                {/* UBAH DI SINI: dari program.deskripsi_singkat menjadi program.deskripsiprogram */}
                {program.deskripsiprogram}
              </p>
              <NavLink
                to={`/guest/program/${program.id}`}
                className="bg-accent text-white font-bold font-heading py-2 px-4 rounded-lg hover:opacity-90 transition-opacity inline-block"
              >
                Lihat Detail
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
