// src/pages/Admin/Users.jsx

import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { getAllUsers, updateUserByAdmin, createUserByAdmin } from '../../api/usersAPI'; // Impor createUserByAdmin

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ full_name: '', role: '' });

  // State untuk modal tambah pengguna baru
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({ email: '', password: '', full_name: '' });

  // Fungsi untuk memuat data pengguna
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const data = await getAllUsers();
    if (data) {
      setUsers(data);
    } else {
      setError('Gagal memuat data pengguna.');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Handler untuk Modal Edit ---
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({ full_name: user.full_name || '', role: user.role });
    setIsEditModalOpen(true);
  };
  const handleCloseEditModal = () => setIsEditModalOpen(false);
  const handleEditFormChange = (e) => setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    // Perbarui hanya data profil di tabel 'profiles'
    const { data } = await updateUserByAdmin(selectedUser.id, { 
        full_name: editFormData.full_name, 
        role: editFormData.role 
    });
    if (data) {
      // Perbarui state lokal dengan data yang sudah di-update
      setUsers(users.map(u => (u.id === selectedUser.id ? { ...u, full_name: data.full_name, role: data.role } : u)));
      handleCloseEditModal();
    } else {
      alert('Gagal memperbarui data.');
    }
  };

  // --- Handler untuk Modal Tambah ---
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);
  const handleAddFormChange = (e) => setNewUserFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const { email, password, full_name } = newUserFormData;
    const { error } = await createUserByAdmin(email, password, { full_name });
    if (error) {
      alert(`Gagal membuat pengguna: ${error.message}`);
    } else {
      alert('Pengguna berhasil dibuat! Email konfirmasi telah dikirim.');
      handleCloseAddModal();
      fetchUsers(); // Muat ulang data pengguna untuk menampilkan yang baru
    }
  };


  if (loading) return <div>Memuat data pengguna...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* Header Halaman */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h1>
        <button onClick={handleOpenAddModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <FiPlus />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      {/* Tabel Pengguna */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama Lengkap</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Peran (Role)</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.full_name || '-'}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <span className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                    user.role === 'admin' ? 'bg-green-200 text-green-900' : (user.role === 'instructor' ? 'bg-blue-200 text-blue-900' : 'bg-gray-200 text-gray-700')
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenEditModal(user)} className="text-blue-600 hover:text-blue-900"><FiEdit /></button>
                    <button className="text-red-600 hover:text-red-900"><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Edit Pengguna */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Pengguna</h2>
              <button onClick={handleCloseEditModal}><FiX /></button>
            </div>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-4">
                <label htmlFor="full_name_edit" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name_edit"
                  value={editFormData.full_name}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="role_edit" className="block text-sm font-medium text-gray-700">Peran (Role)</label>
                <select
                  name="role"
                  id="role_edit"
                  value={editFormData.role}
                  onChange={handleEditFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseEditModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Pengguna Baru */}
      {isAddModalOpen && (
        <div 
          className="fixed inset-0 flex justify-center items-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tambah Pengguna Baru</h2>
              <button onClick={handleCloseAddModal}><FiX /></button>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="mb-4">
                <label htmlFor="full_name_add" className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                <input type="text" name="full_name" id="full_name_add" value={newUserFormData.full_name} onChange={handleAddFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="mb-4">
                <label htmlFor="email_add" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email_add" value={newUserFormData.email} onChange={handleAddFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="mb-6">
                <label htmlFor="password_add" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" id="password_add" value={newUserFormData.password} onChange={handleAddFormChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="flex justify-end gap-4">
                <button type="button" onClick={handleCloseAddModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">Batal</button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Tambah Pengguna</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
