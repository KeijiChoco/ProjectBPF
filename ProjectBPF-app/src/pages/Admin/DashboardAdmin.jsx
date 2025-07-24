import React, { useEffect, useState } from 'react';
import { artikelAPI } from '../../services/artikelAPI';
import { faqAPI } from '../../services/faqAPI';
import { programAPI } from '../../services/programAPI';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MdArticle, MdHelpOutline, MdSchool, MdPeople, MdShoppingCart, MdAttachMoney, MdReport } from 'react-icons/md';

function DashboardAdmin() {
  const [jumlahArtikel, setJumlahArtikel] = useState(0);
  const [jumlahFAQ, setJumlahFAQ] = useState(0);
  const [jumlahProgram, setJumlahProgram] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artikel, faq, program] = await Promise.all([
          artikelAPI.fetchArtikel(),
          faqAPI.fetchFaq(),
          programAPI.fetchProgram(),
        ]);
        setJumlahArtikel(artikel.length);
        setJumlahFAQ(faq.length);
        setJumlahProgram(program.length);
      } catch (error) {
        console.error('Gagal mengambil data untuk dashboard:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { title: "Pengguna Terdaftar", value: "1.245", icon: <MdPeople size={24} /> },
    { title: "Pesanan Hari Ini", value: "87", icon: <MdShoppingCart size={24} /> },
    { title: "Total Transaksi", value: "Rp 145.000.000", icon: <MdAttachMoney size={24} /> },
    { title: "Laporan Masuk", value: "12", icon: <MdReport size={24} /> },
    { title: "Jumlah Artikel", value: loading ? "..." : jumlahArtikel, icon: <MdArticle size={24} />, link: "/crudartikel" },
    { title: "Jumlah FAQ", value: loading ? "..." : jumlahFAQ, icon: <MdHelpOutline size={24} />, link: "/crudfaq" },
    { title: "Jumlah Program", value: loading ? "..." : jumlahProgram, icon: <MdSchool size={24} />, link: "/crudprogram" },
  ];

  const dummyChartData = [
    { name: 'Sen', Artikel: 4, FAQ: 3 },
    { name: 'Sel', Artikel: 2, FAQ: 6 },
    { name: 'Rab', Artikel: 3, FAQ: 1 },
    { name: 'Kam', Artikel: 5, FAQ: 2 },
    { name: 'Jum', Artikel: 4, FAQ: 4 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#4e342e]">Dashboard Admin</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Activity + Chart */}
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
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Statistik Konten</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Artikel" fill="#6f4e37" />
                <Bar dataKey="FAQ" fill="#a1887f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponen StatCard dengan ikon dan tombol
function StatCard({ title, value, icon, link }) {
  const content = (
    <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition duration-300 cursor-pointer flex items-center gap-4">
      <div className="text-[#6f4e37] bg-[#fceee7] p-3 rounded-full">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-[#4e342e]">{value}</p>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block">
      {content}
    </Link>
  ) : content;
}

export default DashboardAdmin;
