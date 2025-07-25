// src/pages/Admin/PendaftaranManager.jsx

import React, { useState, useEffect } from 'react';
import { getProfilesByRole } from '../../api/profileAPI';
import { FiSearch, FiFilter, FiCheck, FiX, FiEye, FiDownload } from 'react-icons/fi';

function PendaftaranManager() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      // Ambil hanya profiles dengan role 'user' (pendaftar)
      const userProfiles = await getProfilesByRole('user');
      if (userProfiles) {
        // Transform user profiles data to registration format
        const registrationData = userProfiles.map(profile => ({
          id: profile.id,
          name: profile.full_name || 'Nama tidak tersedia',
          email: profile.email || 'Email tidak tersedia',
          phone: profile.phone || '-',
          program: 'General Program', // Default or fetch from another table
          status: 'pending', // Default status untuk user yang baru mendaftar
          registeredAt: profile.created_at,
          role: profile.role
        }));
        setRegistrations(registrationData);
      } else {
        setError('Gagal mengambil data pendaftaran');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (registrationId, newStatus) => {
    setRegistrations(prev =>
      prev.map(reg =>
        reg.id === registrationId ? { ...reg, status: newStatus } : reg
      )
    );
    
    // Here you would typically make an API call to update the status
    console.log(`Status changed for ${registrationId}: ${newStatus}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Menunggu' },
      approved: { color: 'bg-green-100 text-green-800', text: 'Disetujui' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Ditolak' },
      waitlist: { color: 'bg-blue-100 text-blue-800', text: 'Daftar Tunggu' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus;
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
          <h1 className="text-3xl font-bold text-gray-800">Pendaftaran Manager</h1>
          <p className="text-gray-600 mt-1">Kelola pendaftaran peserta program</p>
        </div>
        <button className="bg-[#6f4e37] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] flex items-center gap-2">
          <FiDownload size={18} />
          Export Data
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, email, atau program..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
            <option value="waitlist">Daftar Tunggu</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Registrations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Peserta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kontak
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal Daftar
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Tidak ada pendaftaran yang sesuai dengan filter' 
                    : 'Belum ada data pendaftaran'
                  }
                </td>
              </tr>
            ) : (
              filteredRegistrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#6f4e37] flex items-center justify-center text-white font-medium">
                        {registration.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {registration.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {registration.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {registration.program}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{registration.email}</div>
                    <div className="text-sm text-gray-500">{registration.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(registration.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {registration.registeredAt ? new Date(registration.registeredAt).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => console.log('View details:', registration.id)}
                        title="Lihat Detail"
                      >
                        <FiEye size={16} />
                      </button>
                      {registration.status === 'pending' && (
                        <>
                          <button 
                            className="text-green-600 hover:text-green-900"
                            onClick={() => handleStatusChange(registration.id, 'approved')}
                            title="Setujui"
                          >
                            <FiCheck size={16} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleStatusChange(registration.id, 'rejected')}
                            title="Tolak"
                          >
                            <FiX size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-[#6f4e37]">{registrations.length}</div>
          <div className="text-sm text-gray-600">Total Pendaftaran</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {registrations.filter(r => r.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Menunggu Persetujuan</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {registrations.filter(r => r.status === 'approved').length}
          </div>
          <div className="text-sm text-gray-600">Disetujui</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">
            {registrations.filter(r => r.status === 'rejected').length}
          </div>
          <div className="text-sm text-gray-600">Ditolak</div>
        </div>
      </div>
    </div>
  );
}

export default PendaftaranManager;
                