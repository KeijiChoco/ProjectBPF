import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { programAPI, sesiAPI, instructorsAPI } from "../../services/AllServices";

export default function ProgramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [sesiList, setSesiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramDetail = async () => {
      try {
        // Fetch program detail
        const programData = await programAPI.fetchProgramById(id);
        console.log("DETAIL PROGRAM DARI SUPABASE:", programData);
        
        if (programData && programData.length > 0) {
          setProgram(programData[0]);
          
          // Fetch sesi untuk program ini
          const sesiData = await sesiAPI.fetchSesiByProgramId(id);
          console.log("SESI PROGRAM:", sesiData);
          
          // Fetch instructor details untuk setiap sesi
          const sesiWithInstructors = await Promise.all(
            sesiData.map(async (sesi) => {
              if (sesi.instructor_id) {
                const instructorData = await instructorsAPI.fetchInstructorById(sesi.instructor_id);
                return {
                  ...sesi,
                  instructor: instructorData[0] || null
                };
              }
              return { ...sesi, instructor: null };
            })
          );
          
          setSesiList(sesiWithInstructors);
        } else {
          setError("Program tidak ditemukan.");
        }
      } catch (err) {
        setError("Maaf, gagal memuat detail program. Silakan coba lagi beberapa saat lagi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProgramDetail();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString.substring(0, 5); // Format HH:MM
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-dark mx-auto mb-4"></div>
          <p>Memuat detail program untuk Anda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center p-10">
          <div className="text-red-500 mb-4">{error}</div>
          <NavLink
            to="/guest/program"
            className="bg-coffee-dark text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
          >
            Kembali ke Daftar Program
          </NavLink>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center p-10">
          <p className="text-gray-500 mb-4">Program tidak ditemukan.</p>
          <NavLink
            to="/guest/program"
            className="bg-coffee-dark text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
          >
            Kembali ke Daftar Program
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <NavLink to="/" className="hover:text-coffee-dark transition">
              Beranda
            </NavLink>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <NavLink to="/guest/program" className="hover:text-coffee-dark transition">
              Program
            </NavLink>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-coffee-dark font-medium">
              {program.judul_program}
            </span>
          </li>
        </ol>
      </nav>

      {/* Tombol Kembali */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-coffee-dark hover:opacity-80 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Gambar Program */}
        <div>
          <img
            src={program.gambar_program_url || "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi"}
            alt={program.judul_program}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi";
            }}
          />
        </div>

        {/* Info Program */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-coffee-dark">
              {program.judul_program}
            </h1>
            {program.level && (
              <span className="bg-coffee-light text-coffee-dark text-sm font-semibold px-3 py-1 rounded-full">
                {program.level}
              </span>
            )}
          </div>

          {program.harga && program.harga > 0 && (
            <div className="mb-6">
              <span className="text-3xl font-bold text-accent">
                Rp {new Intl.NumberFormat('id-ID').format(program.harga)}
              </span>
              <span className="text-gray-500 ml-2">per program</span>
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-8">
            <h3 className="text-xl font-semibold text-coffee-dark mb-3">Deskripsi Program</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {program.deskripsi_program || "Deskripsi program belum tersedia."}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-coffee-light/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-coffee-dark">{sesiList.length}</div>
              <div className="text-sm text-gray-600">Sesi Tersedia</div>
            </div>
            <div className="bg-coffee-light/20 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-coffee-dark">{program.level || "Semua Level"}</div>
              <div className="text-sm text-gray-600">Level Pelatihan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sesi yang Tersedia */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold font-heading text-coffee-dark mb-6">
          Sesi yang Tersedia
        </h2>

        {sesiList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sesiList.map((sesi) => (
              <div key={sesi.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-coffee-dark">
                    {formatDate(sesi.tanggal)}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {sesi.kuota > 0 ? `${sesi.kuota} kursi` : 'Penuh'}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime(sesi.jam_mulai)} - {formatTime(sesi.jam_selesai)}
                  </div>
                  
                  {sesi.lokasi && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {sesi.lokasi}
                    </div>
                  )}

                  {sesi.instructor && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {sesi.instructor.nama_lengkap}
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded font-semibold transition ${
                    sesi.kuota > 0 
                      ? 'bg-accent text-white hover:opacity-90' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={sesi.kuota <= 0}
                >
                  {sesi.kuota > 0 ? 'Daftar Sekarang' : 'Sesi Penuh'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Sesi Tersedia</h3>
            <p className="text-gray-500">Sesi untuk program ini sedang dalam persiapan.</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="text-center">
        <NavLink
          to="/guest/program"
          className="bg-coffee-dark text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition mr-4"
        >
          Lihat Program Lainnya
        </NavLink>
        <NavLink
          to="/contact"
          className="bg-accent text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition"
        >
          Hubungi Kami
        </NavLink>
      </div>
    </div>
  );
}