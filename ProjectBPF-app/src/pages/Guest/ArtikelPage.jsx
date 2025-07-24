import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { artikelAPI } from "../../services/artikelAPI";

export default function ArtikelPage() {
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtikel = async () => {
      try {
        const data = await artikelAPI.fetchArtikel();
        console.log("DATA YANG DITERIMA DARI SUPABASE:", data);
        setArtikels(data);
      } catch (err) {
        setError(
          "Maaf, gagal memuat Artikel yang kami miliki. Silakan coba lagi beberapa saat lagi."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtikel();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Memuat Artikel untuk Anda...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
        Mengenal Lebih Dekat dengan Barista Kopi!
      </h1>

      <div className="space-y-8">
        {artikels.map((artikel) => (
          <div
            key={artikel.id}
            className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Gambar di kiri */}
            <img
              src={
                artikel.gambarartikel ||
                "https://placehold.co/600x400/FDF6E3/432818?text=FAF"
              }
              alt={artikel.judulartikel}
              className="w-full md:w-64 h-48 md:h-auto object-cover"
            />

            {/* Konten di kanan */}
            <div className="p-6 flex flex-col justify-between h-full w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold font-heading text-coffee-dark mb-2">
                    {artikel.judulartikel}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    {artikel.deskripsiartikel}
                  </p>
                </div>

                {/* Tombol kanan atas (optional), bisa dipindah ke bawah */}
              </div>

              {/* Tombol kanan bawah */}
              <div className="flex justify-end mt-4">
                <NavLink
                  to={`/guest/program/${artikel.id}`}
                  className="bg-accent text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition"
                >
                  Baca Selengkapnya
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
