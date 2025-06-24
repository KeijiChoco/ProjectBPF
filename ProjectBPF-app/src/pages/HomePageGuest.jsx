// File: src/pages/HomePageGuest.jsx

import React from 'react';

export default function HomePageGuest() {
    return (
        // Anda bisa memberikan style pada container halaman ini jika perlu
        <div className="bg-white p-8 rounded-lg shadow-md">
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
                Selamat Datang!
            </h1>

            <p className="text-slate-600">
                Ini adalah halaman utama untuk pengunjung. Konten ini ditampilkan di dalam 
                <code className="bg-gray-200 text-sm p-1 rounded">MainLayoutGuest</code>, 
                lengkap dengan Header dan Footer yang sudah kita buat sebelumnya.
            </p>

        </div>
    );
}