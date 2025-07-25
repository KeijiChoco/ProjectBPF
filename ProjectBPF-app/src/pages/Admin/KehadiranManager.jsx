// src/pages/Admin/KehadiranManager.jsx

import React, { useState, useEffect } from 'react';
import { getAllProfiles } from '../../api/profileAPI';
import { FiSearch, FiCalendar, FiUsers, FiCheck, FiX, FiDownload, FiFilter } from 'react-icons/fi';

function KehadiranManager() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles
      const profiles = await getAllProfiles();
      
      // Sample sessions data - replace with actual API call
      const sessionsData = [
        { id: 1, title: 'Fundamental Programming', date: '2024-02-15' },
        { id: 2, title: 'Web Development Basics', date: '2024-02-16' },
        { id: 3, title: 'Database Design', date: '2024-02-14' }
      ];
      
      setSessions(sessionsData);
      
      if (profiles) {
        // Generate sample attendance records
        const attendanceData = profiles.slice(0, 15).map((profile, index) => ({
          id: `att_${profile.id}_${index}`,
          userId: profile.id,
          userName: profile.full_name || 'Nama tidak tersedia',
          userEmail: profile.email || 'Email tidak tersedia',
          sessionId: ((index % 3) + 1),
          sessionTitle: sessionsData[index % 3].title,
          sessionDate: sessionsData[index % 3].date,
          status: ['present', 'absent', 'late'][index % 3],
          checkInTime: index % 3 === 0 ? '09:05' : index % 3 === 1 ? null : '09:15',
          notes: index % 3 === 1 ? 'Tidak hadir tanpa keterangan' : index % 3 === 2 ? 'Terlambat 15 menit' : ''
        }));
        
        setAttendanceRecords(attendanceData);
      } else {
        setError('Gagal mengambil data kehadiran');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (recordId, newStatus) => {
    setAttendanceRecords(prev =>
      prev.map(record =>
        record.id === recordId 
          ? { 
              ...record, 
              status: newStatus,
              checkInTime: newStatus === 'present' ? '09:00' : newStatus === 'late' ? '09:15' : null
            } 
          : record
      )
    );
    
    console.log(`Attendance status changed for ${recordId}: ${newStatus}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      present: { color: 'bg-green-100 text-green-800', text: 'Hadir', icon: <FiCheck size={12} /> },
      absent: { color: 'bg-red-100 text-red-800', text: 'Tidak Hadir', icon: <FiX size={12} /> },
      late: { color: 'bg-yellow-100 text-yellow-800', text: 'Terlambat', icon: <FiCalendar size={12} /> }
    };
    const config = statusConfig[status] || statusConfig.absent;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  const filteredAttendance = attendanceRecords.filter(record => {
    const matchesSearch = record.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSession = selectedSession === 'all' || record.sessionId.toString() === selectedSession;
    const matchesDate = !selectedDate || record.sessionDate === selectedDate;
    return matchesSearch && matchesSession && matchesDate;
  });

  const getAttendanceStats = () => {
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(r => r.status === 'present').length;
    const absent = filteredAttendance.filter(r => r.status === 'absent').length;
    const late = filteredAttendance.filter(r => r.status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();

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
          <h1 className="text-3xl font-bold text-gray-800">Kehadiran Manager</h1>
          <p className="text-gray-600 mt-1">Kelola dan pantau kehadiran peserta</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
            <FiCheck size={18} />
            Absen Massal
          </button>
          <button className="bg-[#6f4e37] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] flex items-center gap-2">
            <FiDownload size={18} />
            Export Laporan
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari peserta atau sesi..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
          value={selectedSession}
          onChange={(e) => setSelectedSession(e.target.value)}
        >
          <option value="all">Semua Sesi</option>
          {sessions.map(session => (
            <option key={session.id} value={session.id.toString()}>
              {session.title}
            </option>
          ))}
        </select>
        
        <input
          type="date"
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        
        <button 
          className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
          onClick={() => {
            setSearchTerm('');
            setSelectedSession('all');
            setSelectedDate('');
          }}
        >
          <FiFilter size={18} />
          Reset Filter
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[#6f4e37]">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Record</div>
            </div>
            <FiUsers className="text-[#6f4e37]" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-600">Hadir</div>
            </div>
            <FiCheck className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
              <div className="text-sm text-gray-600">Terlambat</div>
            </div>
            <FiCalendar className="text-yellow-600" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-600">Tidak Hadir</div>
            </div>
            <FiX className="text-red-600" size={24} />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peserta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sesi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Waktu Check-in
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catatan
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm || selectedSession !== 'all' || selectedDate
                    ? 'Tidak ada data kehadiran yang sesuai dengan filter' 
                    : 'Belum ada data kehadiran'
                  }
                </td>
              </tr>
            ) : (
              filteredAttendance.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#6f4e37] flex items-center justify-center text-white font-medium">
                        {record.userName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.userEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.sessionTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.sessionDate).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(record.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkInTime || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.notes || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-1">
                      <button 
                        className={`p-1 rounded ${record.status === 'present' ? 'bg-green-100 text-green-600' : 'text-gray-400 hover:text-green-600'}`}
                        onClick={() => handleStatusChange(record.id, 'present')}
                        title="Tandai Hadir"
                      >
                        <FiCheck size={14} />
                      </button>
                      <button 
                        className={`p-1 rounded ${record.status === 'late' ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-yellow-600'}`}
                        onClick={() => handleStatusChange(record.id, 'late')}
                        title="Tandai Terlambat"
                      >
                        <FiCalendar size={14} />
                      </button>
                      <button 
                        className={`p-1 rounded ${record.status === 'absent' ? 'bg-red-100 text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                        onClick={() => handleStatusChange(record.id, 'absent')}
                        title="Tandai Tidak Hadir"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default KehadiranManager;