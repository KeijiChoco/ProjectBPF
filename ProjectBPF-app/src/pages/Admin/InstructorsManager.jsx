// src/pages/Admin/InstructorsManager.jsx

import React, { useState, useEffect } from 'react';
import { getProfilesByRole, updateUserProfile, deleteUserProfile } from '../../api/profileAPI';
import { FiEdit, FiTrash2, FiUserPlus, FiSearch } from 'react-icons/fi';

function InstructorsManager() {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const data = await getProfilesByRole('instructor');
      if (data) {
        setInstructors(data);
      } else {
        setError('Gagal mengambil data instruktur');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (instructorId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus instruktur ini?')) {
      try {
        const success = await deleteUserProfile(instructorId);
        if (success) {
          setInstructors(instructors.filter(instructor => instructor.id !== instructorId));
          alert('Instruktur berhasil dihapus');
        } else {
          alert('Gagal menghapus instruktur');
        }
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat menghapus instruktur');
      }
    }
  };

  const filteredInstructors = instructors.filter(instructor => 
    instructor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-800">Instructors Manager</h1>
          <p className="text-gray-600 mt-1">Kelola data instruktur sistem</p>
        </div>
        <button className="bg-[#6f4e37] text-white px-4 py-2 rounded-lg hover:bg-[#5d4037] flex items-center gap-2">
          <FiUserPlus size={18} />
          Tambah Instruktur
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari instruktur berdasarkan nama atau email..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f4e37] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Instructors Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instruktur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bergabung
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInstructors.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  {searchTerm ? 'Tidak ada instruktur yang sesuai dengan pencarian' : 'Belum ada data instruktur'}
                </td>
              </tr>
            ) : (
              filteredInstructors.map((instructor) => (
                <tr key={instructor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#6f4e37] flex items-center justify-center text-white font-medium">
                        {instructor.full_name?.charAt(0) || 'U'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {instructor.full_name || 'Nama tidak tersedia'}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {instructor.id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {instructor.email || 'Email tidak tersedia'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {instructor.created_at ? new Date(instructor.created_at).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-[#6f4e37] hover:text-[#5d4037] mr-3"
                      onClick={() => console.log('Edit instructor:', instructor.id)}
                    >
                      <FiEdit size={16} />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(instructor.id)}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Statistics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-[#6f4e37]">{instructors.length}</div>
          <div className="text-sm text-gray-600">Total Instruktur</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{instructors.length}</div>
          <div className="text-sm text-gray-600">Instruktur Aktif</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600">Instruktur Baru Bulan Ini</div>
        </div>
      </div>
    </div>
  );
}

export default InstructorsManager;