// File: src/pages/HomePageGuest.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { programAPI } from '../../services/AllServices';
import FeedbackSection from '../../components/DashboardGuest/Feedback';
import FeedbackArea from './FeedbackArea';


// Anda bisa mengganti URL gambar ini dengan gambar Anda sendiri
const heroImage = "https://i.pinimg.com/736x/83/ef/1a/83ef1ae2fd24fe2133aafe623986d83e.jpg";

export default function HomePageGuest() {
  const [popularPrograms, setPopularPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPrograms = async () => {
      try {
        const programs = await programAPI.fetchProgram();
        // Ambil 3 program pertama sebagai program populer
        setPopularPrograms(programs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching programs:', error);
        // Jika error, gunakan data dummy
        setPopularPrograms([
          {
            id: 1,
            judul_program: "Basic Barista Skills",
            gambar_program_url: "https://i.pinimg.com/736x/c5/4a/7e/c54a7e8c4a9b0e3f1d2b5c8a9e6f3d2c.jpg",
            harga: 750000,
            deskripsi_program: "Pelajari dasar-dasar menjadi barista profesional dari nol"
          },
          {
            id: 2,
            judul_program: "Latte Art Mastery",
            gambar_program_url: "https://i.pinimg.com/736x/d4/6b/8c/d46b8c7e5a1f2b3c4d5e6f7a8b9c0d1e.jpg",
            harga: 950000,
            deskripsi_program: "Kuasai seni membuat latte art yang menawan dan Instagram-able"
          },
          {
            id: 3,
            judul_program: "Coffee Business",
            gambar_program_url: "https://i.pinimg.com/736x/a8/9b/4c/a89b4c5d6e7f8a9b0c1d2e3f4a5b6c7d.jpg",
            harga: 1200000,
            deskripsi_program: "Pelajari cara memulai dan mengelola bisnis kopi yang sukses"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularPrograms();
  }, []);
  return (
    <div>
      {/* Hero Section */}
      <section className="flex items-center min-h-[calc(100vh-150px)] relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">

          {/* Kolom Teks (Kiri) */}
          <div className="text-center container mx-80 flex flex-col items-center px-6">
            <h1 
              className="text-4xl md:text-5xl font-bold font-heading text-coffee-dark leading-tight"
            >
              Tingkatkan Keahlian Barista Anda, Mulai Hari Ini.
            </h1>

            <p 
              className="mt-4 text-lg font-body" 
              style={{ color: 'var(--color-teks-samping)'}}
            >
              FAF Grind & Learn menyediakan pelatihan barista terstruktur, dari teori dasar hingga praktik, untuk membantu Anda menjadi profesional di industri kopi.
            </p>

            <div className="mt-8">
              <NavLink
                to="/guest/program"
                className="bg-primary text-white font-bold font-heading py-3 px-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 inline-block"
              >
                Lihat Semua Program
              </NavLink>
            </div>
          </div>

          <div className="absolute left-5 top-1/2 -translate-y-1/2 space-y-5 hidden lg:block px-20">
            <img
              src="https://i.pinimg.com/736x/b0/16/30/b01630aaed17b8bb5402bd22bc2eabbc.jpg"
              alt="left1"
              className="rounded-full w-40 h-40 object-cover shadow-lg"
            />
            <img
              src="https://i.pinimg.com/736x/6a/eb/08/6aeb088b1c5b5973181f3a656d9513f9.jpg"
              alt="left2"
              className="rounded-full w-60 h-60 object-cover shadow-lg"
            />
            <img
              src="https://i.pinimg.com/736x/6a/d5/92/6ad592ec9f62fba917691281e679ac80.jpg"
              alt="left3"
              className="rounded-full w-50 h-50 object-cover shadow-lg"
            />
          </div>

          <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-5 hidden lg:block">
            <img
              src="https://i.pinimg.com/736x/dd/a5/1b/dda51b00a87b2f6519b21553390fe5e8.jpg"
              alt="right1"
              className="rounded-full w-50 h-50 object-cover shadow-lg"
            />
            <img
              src="https://i.pinimg.com/736x/5b/9a/1a/5b9a1a5ae6e8e9673f12642c336655d6.jpg"
              alt="right2"
              className="rounded-full w-60 h-60 object-cover shadow-lg"
            />
            <img
              src="https://i.pinimg.com/736x/ea/82/df/ea82df375393b9980685116e440c1dc5.jpg"
              alt="right3"
              className="rounded-full w-40 h-40 object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-coffee-dark mb-4">
              Kenapa Memilih FAF Grind & Learn?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kami memberikan pengalaman belajar terbaik dengan metode yang telah terbukti efektif
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">☕</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Instruktur Berpengalaman</h3>
              <p className="text-gray-600">Belajar dari barista profesional dengan pengalaman lebih dari 10 tahun di industri kopi</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Sertifikasi Resmi</h3>
              <p className="text-gray-600">Dapatkan sertifikat yang diakui industri untuk meningkatkan karir Anda</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Kelas Kecil</h3>
              <p className="text-gray-600">Maksimal 8 peserta per kelas untuk pembelajaran yang lebih personal dan efektif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-coffee-dark text-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-sm uppercase tracking-wide">Alumni Tersertifikasi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-sm uppercase tracking-wide">Program Pelatihan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm uppercase tracking-wide">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-sm uppercase tracking-wide">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-coffee-dark mb-4">
              Program Populer
            </h2>
            <p className="text-lg text-gray-600">
              Program pelatihan yang paling diminati oleh peserta kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="w-full h-48 bg-gray-300 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-8 bg-gray-300 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              popularPrograms.map((program) => (
                <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={program.gambar_program_url || "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi"} 
                    alt={program.judul_program}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/600x400/FDF6E3/432818?text=Program+Kopi";
                    }}
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold font-heading text-coffee-dark">{program.judul_program}</h3>
                      {program.level && (
                        <span className="bg-coffee-light text-coffee-dark text-xs font-semibold px-2 py-1 rounded">
                          {program.level}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {program.deskripsi_program || "Program pelatihan barista profesional"}
                    </p>
                    <div className="flex justify-between items-center">
                      {program.harga && program.harga > 0 ? (
                        <span className="text-lg font-bold text-accent">
                          Rp {new Intl.NumberFormat("id-ID").format(program.harga)}
                        </span>
                      ) : (
                        <span className="text-lg font-bold text-accent">Hubungi Kami</span>
                      )}
                      <NavLink 
                        to={`/guest/program/${program.id}`}
                        className="bg-accent text-white font-bold py-2 px-4 rounded hover:opacity-90 transition-opacity text-sm"
                      >
                        Lihat Detail
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <NavLink
              to="/guest/program"
              className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Lihat Semua Program
            </NavLink>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
          <FeedbackArea />

          {/* Komponen Feedback Section */}
          <FeedbackSection />
    </div>
  );
}