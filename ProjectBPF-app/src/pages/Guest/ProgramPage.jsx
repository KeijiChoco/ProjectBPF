import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { programAPI } from "../../services/AllServices";

export default function ProgramPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const data = await programAPI.fetchProgram();
        console.log("DATA YANG DITERIMA DARI SUPABASE:", data);
        setPrograms(data);
      } catch (err) {
        setError("Gagal memuat data program. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-dark mx-auto mb-4"></div>
        <p>Memuat program untuk Anda...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
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
              src={
                program.gambar_program_url ||
                "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi"
              }
              alt={program.judul_program}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi";
              }}
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold font-heading text-coffee-dark">
                  {program.judul_program}
                </h2>
                {program.level && (
                  <span className="bg-coffee-light text-coffee-dark text-xs font-semibold px-2 py-1 rounded">
                    {program.level}
                  </span>
                )}
              </div>
              
              <p className="font-body text-gray-600 mb-4 line-clamp-3">
                {program.deskripsi_program || "Deskripsi program belum tersedia."}
              </p>
              
              {program.harga && program.harga > 0 && (
                <div className="mb-4">
                  <span className="text-lg font-bold text-accent">
                    Rp {new Intl.NumberFormat('id-ID').format(program.harga)}
                  </span>
                </div>
              )}
              
              <NavLink
                to={`/guest/program/${program.id}`}
                className="bg-accent text-white font-bold font-heading py-2 px-4 rounded-lg hover:opacity-90 transition-opacity inline-block w-full text-center"
              >
                Lihat Detail
              </NavLink>
            </div>
          </div>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Belum Ada Program Tersedia
          </h3>
          <p className="text-gray-500">
            Program pelatihan sedang dalam persiapan. Silakan kembali lagi nanti.
          </p>
        </div>
      )}
    </div>
  );
}