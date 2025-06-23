// src/pages/DashboardAdmin.jsx
import React from 'react';

function DashboardAdmin() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Selamat datang, Admin!</h1>

      {/* Ringkasan Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Pengguna Terdaftar" value="1.245" />
        <StatCard title="Pesanan Hari Ini" value="87" />
        <StatCard title="Total Transaksi" value="Rp 145.000.000" />
        <StatCard title="Laporan Masuk" value="12" />
      </div>

      {/* Grafik atau Ringkasan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Aktivitas Terbaru</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Pengguna baru: <strong>albertgans</strong></li>
            <li>📦 Pesanan #1234 diproses</li>
            <li>📧 Laporan dari pengguna <strong>bert</strong></li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Grafik (Placeholder)</h2>
          <div className="h-48 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
            Tempat untuk grafik atau chart
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen kecil untuk menampilkan statistik
function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition duration-200">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-[#6f4e37]">{value}</p>
    </div>
  );
}

export default DashboardAdmin;
