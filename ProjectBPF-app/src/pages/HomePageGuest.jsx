// File: src/pages/HomePageGuest.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// Anda bisa mengganti URL gambar ini dengan gambar Anda sendiri
const heroImage = "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function HomePageGuest() {
  return (
    // Section utama untuk hero, kita buat tinggi minimal agar mengisi layar
    <section className="flex items-center min-h-[calc(100vh-150px)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">

        {/* Kolom Teks (Kiri) */}
        <div className="md:w-1/2 text-center md:text-left">
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
              to="/guest/kursus"
              className="bg-primary text-white font-bold font-heading py-3 px-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 inline-block"
            >
              Lihat Semua Kursus
            </NavLink>
          </div>
        </div>

        {/* Kolom Gambar (Kanan) */}
        <div className="md:w-1/2">
          <img 
            src={heroImage} 
            alt="Secangkir Kopi Latte Art" 
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </div>

      </div>
    </section>
  );
}