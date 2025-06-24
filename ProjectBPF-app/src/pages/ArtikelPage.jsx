import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { artikelAPI } from "../services/artikelAPI";

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
            setError("Maaf, gagal memuat Artikel yang kami miliki. Silakan coba lagi beberapa saat lagi.");
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
    return <div className="text-center p-10 text-merah">{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold font-heading text-center mb-10 text-coffee-dark">
        Mengenal Lebih Dekat dengan Barista Kopi!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {artikels.map((artikel) => (
          <div
            key={artikel.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              src={
                artikel.gambarartikel ||
                "https://placehold.co/600x400/FDF6E3/432818?text=FAF"
              }
              alt={artikel.judulartikel} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold font-heading text-coffee-dark mb-2">
                {artikel.judulartikel}
              </h2>
              <p className="font-body text-gray-600 mb-4">
                {artikel.deskripsiartikel}
              </p>
              <NavLink
                to={`/guest/program/${artikel.id}`}
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
