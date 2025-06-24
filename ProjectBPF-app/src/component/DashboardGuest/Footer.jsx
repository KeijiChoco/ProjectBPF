// File: src/component/DashboardGuest/Footer.jsx

import React from 'react';

export default function Footer() {
    return (
        // Menggunakan warna gelap untuk kontras
        // 'p-4' untuk padding dan 'text-center' untuk menengahkan teks
        <footer className="bg-slate-800 text-white p-4 text-center">
            
            {/* &copy; akan menampilkan simbol copyright (©) */}
            <p className="text-sm text-gray-300">
                &copy; {new Date().getFullYear()} Project BPF. All Rights Reserved.
            </p>

        </footer>
    );
}