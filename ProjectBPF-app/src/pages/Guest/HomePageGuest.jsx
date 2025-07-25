// File: src/pages/HomePageGuest.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';

// Anda bisa mengganti URL gambar ini dengan gambar Anda sendiri
const heroImage = "https://i.pinimg.com/736x/83/ef/1a/83ef1ae2fd24fe2133aafe623986d83e.jpg";

export default function HomePageGuest() {
  return (
    // Section utama untuk hero, kita buat tinggi minimal agar mengisi layar
    <section className="flex items-center min-h-[calc(100vh-150px)]">
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
              to="/guest/kursus"
              className="bg-primary text-white font-bold font-heading py-3 px-8 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105 active:scale-95 inline-block"
            >
              Lihat Semua Kursus
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
  );
}