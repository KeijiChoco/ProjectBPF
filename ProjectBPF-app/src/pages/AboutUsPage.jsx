import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { aboutusAPI } from "../services/aboutusAPI";

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
      <div className="gap-8">
        {aboutuss.map((aboutus) => (
          <div
            key={aboutus.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold font-heading text-coffee-dark mb-2">
                {aboutus.judul}
              </h2>
              <p className="font-body text-gray-600 mb-4">
                {aboutus.deskripsi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
