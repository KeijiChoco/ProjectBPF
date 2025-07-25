// src/pages/Admin/SesiManager.jsx

import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiUsers, FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

function SesiManager() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSessions([
        {
          id: 1,
          title: 'Fundamental Programming',
          instructor: 'John Doe',
          date: '2024-02-15',
          time: '09:00 - 11:00',
          participants: 25,
          maxParticipants: 30,
          status: 'scheduled'
        },
        {
          id: 2,
          title: 'Web Development Basics',
          instructor: 'Jane Smith',
          date: '2024-02-16',
          time: '13:00 - 15:00',
          participants: 20,
          maxParticipants: 25,
          status: 'ongoing'
        },
        {
          id: 3,
          title: 'Database Design',
          instructor: 'Mike Johnson',
          date: '2024-02-14',
          time: '10:00 - 12:00',
          participants: 18,
          maxParticipants: 20,
          status: 'completed'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (sessionId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus sesi ini?')) {
      setSessions(sessions.filter(session => session.id !== sessionId));
      alert('Sesi berhasil dihapus');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      scheduled: { color: 'bg-blue-100 text-blue-800', text: 'Terjadwal' },
      ongoing: { color: 'bg-green-100 text-green-800', text: 'Berlangsung' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Selesai' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Dibatalkan' }
    };
    const config = statusConfig[status] || statusConfig.scheduled;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#6f4e37]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sesi Manager</h1>
          <p className="text-gray-600 mt-1">Kelola jadwal dan sesi pembelajaran</p>
        </div>
        <button className="bg-[#6f4e37] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] flex items-center gap-2">
          <FiPlus size={18} />
          Buat Sesi Baru
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari sesi berdasarkan judul atau instruktur..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="scheduled">Terjadwal</option>
            <option value="ongoing">Berlangsung</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{session.title}</h3>
              {getStatusBadge(session.status)}
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FiUsers size={16} />
                <span>Instruktur: {session.instructor}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiCalendar size={16} />
                <span>{new Date(session.date).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiClock size={16} />
                <span>{session.time}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <FiUsers size={16} />
                <span>Peserta: {session.participants}/{session.maxParticipants}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Kapasitas</span>
                <span>{Math.round((session.participants / session.maxParticipants) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-[#6f4e37] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-4">
              <button 
                className="text-[#6f4e37] hover:text-[#5d4037] p-2"
                onClick={() => console.log('Edit session:', session.id)}
              >
                <FiEdit size={16} />
              </button>
              <button 
                className="text-red-600 hover:text-red-900 p-2"
                onClick={() => handleDelete(session.id)}
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <FiCalendar size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada sesi ditemukan</h3>
          <p className="text-gray-600">
            {searchTerm || filterStatus !== 'all' 
              ? 'Coba ubah filter atau kata kunci pencarian'
              : 'Mulai dengan membuat sesi pembelajaran pertama Anda'
            }
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-[#6f4e37]">{sessions.length}</div>
          <div className="text-sm text-gray-600">Total Sesi</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {sessions.filter(s => s.status === 'scheduled').length}
          </div>
          <div className="text-sm text-gray-600">Sesi Terjadwal</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {sessions.filter(s => s.status === 'ongoing').length}
          </div>
          <div className="text-sm text-gray-600">Sesi Berlangsung</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-gray-600">
            {sessions.filter(s => s.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Sesi Selesai</div>
        </div>
      </div>
    </div>
  );
}

export default SesiManager;