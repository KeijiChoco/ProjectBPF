// File: src/component/DashboardGuest/Header.jsx

import React from 'react';

export default function Header() {
    return (
        // Latar header kita biarkan putih bersih untuk kontras
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                
                {/* Judul Situs: Menggunakan font dan warna tema */}
                <h1 className="text-2xl font-bold text-coffee-dark font-poppins">
                    FAF Grind & Learn
                </h1>

                {/* Tombol Login: Menggunakan warna primer tema */}
                <nav>
                    <a 
                        href="/login" 
                        className="bg-primary hover:opacity-90 transition-opacity text-white font-bold font-poppins py-2 px-4 rounded-lg"
                    >
                        Login
                    </a>
                </nav>

            </div>
        </header>
    );
}