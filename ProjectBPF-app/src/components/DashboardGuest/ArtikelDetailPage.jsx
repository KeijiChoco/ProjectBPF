import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { artikelAPI } from "../../services/AllServices";

export default function ArtikelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtikelDetail = async () => {
      try {
        const data = await artikelAPI.fetchArtikelById(id);
        console.log("DETAIL ARTIKEL DARI SUPABASE:", data);
        
        if (data && data.length > 0) {
          setArtikel(data[0]);
        } else {
          setError("Artikel tidak ditemukan.");
        }
      } catch (err) {
        setError(
          "Maaf, gagal memuat detail artikel. Silakan coba lagi beberapa saat lagi."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtikelDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center p-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coffee-dark mx-auto mb-4"></div>
          <p>Memuat detail artikel untuk Anda...</p>
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
            to="/guest/artikel"
            className="bg-coffee-dark text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
          >
            Kembali ke Daftar Artikel
          </NavLink>
        </div>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center p-10">
          <p className="text-gray-500 mb-4">Artikel tidak ditemukan.</p>
          <NavLink
            to="/guest/artikel"
            className="bg-coffee-dark text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
          >
            Kembali ke Daftar Artikel
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
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
            <NavLink to="/guest/artikel" className="hover:text-coffee-dark transition">
              Artikel
            </NavLink>
          </li>
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-coffee-dark font-medium">
              {artikel.judul_artikel}
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
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Kembali
        </button>
      </div>

      {/* Header Artikel */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-heading text-coffee-dark mb-4">
          {artikel.judul_artikel}
        </h1>
        
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <time dateTime={artikel.created_at}>
            Dipublikasikan pada {new Date(artikel.created_at).toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      {/* Gambar Artikel */}
      {artikel.gambar_artikel_url && (
        <div className="mb-8">
          <img
            src={artikel.gambar_artikel_url}
            alt={artikel.judul_artikel}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = "https://placehold.co/800x400/FDF6E3/432818?text=Gambar+Artikel";
            }}
          />
        </div>
      )}

      {/* Konten Artikel */}
      <article className="prose prose-lg max-w-none">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {artikel.deskripsi_artikel ? (
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {artikel.deskripsi_artikel}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Konten artikel belum tersedia.
            </p>
          )}
        </div>
      </article>

      {/* Divider */}
      <hr className="my-12 border-gray-200" />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <NavLink
          to="/guest/artikel"
          className="bg-coffee-dark text-white font-semibold py-3 px-6 rounded hover:opacity-90 transition w-full sm:w-auto text-center"
        >
          Lihat Artikel Lainnya
        </NavLink>
        
        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded hover:bg-gray-200 transition flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak
          </button>
          
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: artikel.judul_artikel,
                  text: artikel.deskripsi_artikel?.substring(0, 150) + '...',
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link artikel telah disalin ke clipboard!');
              }
            }}
            className="bg-accent text-white font-semibold py-3 px-6 rounded hover:opacity-90 transition flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Bagikan
          </button>
        </div>
      </div>
    </div>
  );
}