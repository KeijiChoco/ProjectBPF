import React, { useEffect, useState } from 'react';
import { artikelAPI } from '../../services/artikelAPI';
import { faqAPI } from '../../services/faqAPI';
import { programAPI } from '../../services/programAPI';
import { getAllProfiles, getProfilesByRole } from '../../api/profileAPI';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  MdArticle, 
  MdHelpOutline, 
  MdSchool, 
  MdPeople, 
  MdSupervisorAccount,
  MdPersonAdd,
  MdAttachMoney,
  MdEventAvailable,
  MdCheckCircle,
  MdPending,
  MdCancel,
  MdTrendingUp // <- Ganti dari MdTrending ke MdTrendingUp
} from 'react-icons/md';

import { FiUsers, FiCalendar, FiUserCheck, FiClipboard } from 'react-icons/fi';

function DashboardAdmin() {
  const [dashboardData, setDashboardData] = useState({
    articles: 0,
    faqs: 0,
    programs: 0,
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    instructors: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0,
    totalSessions: 0,
    activeSessions: 0,
    totalRevenue: 0,
    monthlyRevenue: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch data dari berbagai sumber
      const [articles, faqs, programs, allProfiles] = await Promise.all([
        artikelAPI.fetchArtikel(),
        faqAPI.fetchFaq(),
        programAPI.fetchProgram(),
        getAllProfiles()
      ]);

      // Hitung statistik users berdasarkan role
      const adminUsers = allProfiles?.filter(p => p.role === 'admin') || [];
      const regularUsers = allProfiles?.filter(p => p.role === 'user') || [];
      const instructors = allProfiles?.filter(p => p.role === 'instructor') || [];

      // Simulasi data pendaftaran (dalam aplikasi nyata, ambil dari tabel registrations)
      const totalRegistrations = regularUsers.length;
      const pendingRegistrations = Math.floor(totalRegistrations * 0.3);
      const approvedRegistrations = Math.floor(totalRegistrations * 0.6);
      const rejectedRegistrations = totalRegistrations - pendingRegistrations - approvedRegistrations;

      // Simulasi data sesi dan revenue
      const totalSessions = 15;
      const activeSessions = 8;
      const totalRevenue = 450000000; // 450 juta
      const monthlyRevenue = 75000000; // 75 juta bulan ini

      setDashboardData({
        articles: articles?.length || 0,
        faqs: faqs?.length || 0,
        programs: programs?.length || 0,
        totalUsers: allProfiles?.length || 0,
        adminUsers: adminUsers.length,
        regularUsers: regularUsers.length,
        instructors: instructors.length,
        totalRegistrations,
        pendingRegistrations,
        approvedRegistrations,
        rejectedRegistrations,
        totalSessions,
        activeSessions,
        totalRevenue,
        monthlyRevenue
      });

      // Generate recent activities
      generateRecentActivities(regularUsers, articles, programs);
      
    } catch (error) {
      console.error('Gagal mengambil data dashboard:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateRecentActivities = (users, articles, programs) => {
    const activities = [
      `✅ Pengguna baru bergabung: ${users[0]?.full_name || 'User baru'}`,
      `📝 Artikel baru dipublikasi: ${articles[0]?.title || 'Artikel terbaru'}`,
      `🎓 Program baru ditambahkan: ${programs[0]?.title || 'Program terbaru'}`,
      `👥 ${users.length} pengguna terdaftar bulan ini`,
      `📊 Pendapatan bulan ini: Rp ${(dashboardData.monthlyRevenue).toLocaleString('id-ID')}`
    ];
    setRecentActivities(activities);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const statCards = [
    // User Statistics
    { 
      title: "Total Pengguna", 
      value: loading ? "..." : dashboardData.totalUsers, 
      icon: <MdPeople size={24} />,
      color: "bg-blue-500",
      trend: "+12%"
    },
    { 
      title: "Admin", 
      value: loading ? "..." : dashboardData.adminUsers, 
      icon: <MdSupervisorAccount size={24} />,
      color: "bg-purple-500",
      link: "/crudusers"
    },
    { 
      title: "Pengguna Regular", 
      value: loading ? "..." : dashboardData.regularUsers, 
      icon: <MdPersonAdd size={24} />,
      color: "bg-green-500",
      trend: "+8%"
    },
    { 
      title: "Instruktur", 
      value: loading ? "..." : dashboardData.instructors, 
      icon: <FiUsers size={24} />,
      color: "bg-indigo-500",
      link: "/instructors-manager"
    },
    
    // Content Statistics
    { 
      title: "Total Artikel", 
      value: loading ? "..." : dashboardData.articles, 
      icon: <MdArticle size={24} />,
      color: "bg-orange-500",
      link: "/crudartikel"
    },
    { 
      title: "Total FAQ", 
      value: loading ? "..." : dashboardData.faqs, 
      icon: <MdHelpOutline size={24} />,
      color: "bg-yellow-500",
      link: "/crudfaq"
    },
    { 
      title: "Total Program", 
      value: loading ? "..." : dashboardData.programs, 
      icon: <MdSchool size={24} />,
      color: "bg-red-500",
      link: "/crudprogram"
    },
    
    // Registration Statistics
    { 
      title: "Total Pendaftaran", 
      value: loading ? "..." : dashboardData.totalRegistrations, 
      icon: <FiClipboard size={24} />,
      color: "bg-teal-500",
      link: "/pendaftaran-manager"
    },
    { 
      title: "Menunggu Persetujuan", 
      value: loading ? "..." : dashboardData.pendingRegistrations, 
      icon: <MdPending size={24} />,
      color: "bg-yellow-600",
      trend: "urgent"
    },
    
    // Session Statistics
    { 
      title: "Total Sesi", 
      value: loading ? "..." : dashboardData.totalSessions, 
      icon: <FiCalendar size={24} />,
      color: "bg-cyan-500",
      link: "/sesi-manager"
    },
    { 
      title: "Sesi Aktif", 
      value: loading ? "..." : dashboardData.activeSessions, 
      icon: <MdEventAvailable size={24} />,
      color: "bg-lime-500"
    },
    
    // Revenue Statistics
    { 
      title: "Total Pendapatan", 
      value: loading ? "..." : formatCurrency(dashboardData.totalRevenue), 
      icon: <MdAttachMoney size={24} />,
      color: "bg-emerald-500",
      trend: "+15%"
    }
  ];

  // Chart data
  const userRoleData = [
    { name: 'Admin', value: dashboardData.adminUsers, color: '#8b5cf6' },
    { name: 'User', value: dashboardData.regularUsers, color: '#10b981' },
    { name: 'Instruktur', value: dashboardData.instructors, color: '#6366f1' }
  ];

  const registrationStatusData = [
    { name: 'Disetujui', value: dashboardData.approvedRegistrations, color: '#10b981' },
    { name: 'Menunggu', value: dashboardData.pendingRegistrations, color: '#f59e0b' },
    { name: 'Ditolak', value: dashboardData.rejectedRegistrations, color: '#ef4444' }
  ];

  const monthlyData = [
    { name: 'Jan', users: 45, revenue: 65000000 },
    { name: 'Feb', users: 52, revenue: 70000000 },
    { name: 'Mar', users: 48, revenue: 68000000 },
    { name: 'Apr', users: 61, revenue: 75000000 },
    { name: 'Mei', users: 55, revenue: 72000000 },
    { name: 'Jun', users: 67, revenue: 80000000 }
  ];

  const contentActivityData = [
    { name: 'Sen', Artikel: 4, FAQ: 3, Program: 2 },
    { name: 'Sel', Artikel: 2, FAQ: 6, Program: 1 },
    { name: 'Rab', Artikel: 3, FAQ: 1, Program: 3 },
    { name: 'Kam', Artikel: 5, FAQ: 2, Program: 2 },
    { name: 'Jum', Artikel: 4, FAQ: 4, Program: 1 },
    { name: 'Sab', Artikel: 6, FAQ: 3, Program: 4 },
    { name: 'Min', Artikel: 3, FAQ: 2, Program: 2 }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#4e342e]">Dashboard Admin</h1>
          <p className="text-gray-600 mt-1">Selamat datang di panel admin FAF Grind</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Terakhir diperbarui</p>
          <p className="text-sm font-medium">{new Date().toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* User Role Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Distribusi Pengguna</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {userRoleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Registration Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Status Pendaftaran</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={registrationStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {registrationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Aksi Cepat</h2>
          <div className="space-y-3">
            <Link to="/pendaftaran-manager" className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <MdPending className="text-yellow-500" size={20} />
                <div>
                  <p className="font-medium">Persetujuan Pending</p>
                  <p className="text-sm text-gray-500">{dashboardData.pendingRegistrations} menunggu</p>
                </div>
              </div>
            </Link>
            
            <Link to="/sesi-manager" className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <MdEventAvailable className="text-blue-500" size={20} />
                <div>
                  <p className="font-medium">Kelola Sesi</p>
                  <p className="text-sm text-gray-500">{dashboardData.activeSessions} sesi aktif</p>
                </div>
              </div>
            </Link>
            
            <Link to="/kehadiran-manager" className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FiUserCheck className="text-green-500" size={20} />
                <div>
                  <p className="font-medium">Cek Kehadiran</p>
                  <p className="text-sm text-gray-500">Pantau kehadiran</p>
                </div>
              </div>
            </Link>
            
            <Link to="/instructors-manager" className="block">
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FiUsers className="text-purple-500" size={20} />
                <div>
                  <p className="font-medium">Kelola Instruktur</p>
                  <p className="text-sm text-gray-500">{dashboardData.instructors} instruktur</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Growth */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Pertumbuhan Bulanan</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? formatCurrency(value) : value,
                    name === 'revenue' ? 'Pendapatan' : 'Pengguna'
                  ]}
                />
                <Line type="monotone" dataKey="users" stroke="#6f4e37" strokeWidth={3} name="users" />
                <Line type="monotone" dataKey="revenue" stroke="#a1887f" strokeWidth={3} name="revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Activity */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Aktivitas Konten Mingguan</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentActivityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Artikel" fill="#6f4e37" />
                <Bar dataKey="FAQ" fill="#a1887f" />
                <Bar dataKey="Program" fill="#d7ccc8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Aktivitas Terbaru</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{activity}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(Date.now() - Math.random() * 86400000).toLocaleString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Enhanced StatCard component
function StatCard({ title, value, icon, color = "bg-[#6f4e37]", link, trend }) {
  const content = (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#4e342e] mb-2">{value}</p>
          {trend && (
            <div className={`flex items-center text-xs ${
              trend === 'urgent' ? 'text-red-500' : 'text-green-500'
            }`}>
              <MdTrendingUp className="mr-1" size={12} />

              {trend === 'urgent' ? 'Perlu Perhatian' : trend}
            </div>
          )}
        </div>
        <div className={`${color} text-white p-3 rounded-full`}>
          {icon}
        </div>
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