import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { FiPlus } from 'react-icons/fi';
import { getAllUsers, updateUserByAdmin, createUserByAdmin } from '../../api/usersAPI';
import PageHeader from "../../components/PageHeader";
import AlertBox from "../../components/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form states
  const [editForm, setEditForm] = useState({ full_name: '', role: '' });
  const [addForm, setAddForm] = useState({ email: '', password: '', full_name: '', role: 'user' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllUsers();
      if (data) {
        setUsers(data);
      } else {
        setError('Gagal memuat data pengguna.');
      }
    } catch (err) {
      setError('Gagal memuat data pengguna.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddChange = (e) => {
    setAddForm({ ...addForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const { data } = await updateUserByAdmin(selectedUser.id, {
        full_name: editForm.full_name,
        role: editForm.role
      });

      if (data) {
        setUsers(users.map(u => 
          u.id === selectedUser.id 
            ? { ...u, full_name: data.full_name, role: data.role } 
            : u
        ));
        setSuccess('Data pengguna berhasil diperbarui!');
        setEditMode(false);
        setSelectedUser(null);
        setEditForm({ full_name: '', role: '' });
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Gagal memperbarui data pengguna.');
      }
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const { email, password, full_name, role } = addForm;
      const { error: createError } = await createUserByAdmin(email, password, { full_name, role });

      if (createError) {
        setError(`Gagal membuat pengguna: ${createError.message}`);
      } else {
        setSuccess('Pengguna berhasil dibuat! Email konfirmasi telah dikirim.');
        setAddMode(false);
        setAddForm({ email: '', password: '', full_name: '', role: 'user' });
        fetchUsers();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError(`Terjadi kesalahan: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setAddMode(false);
    setSelectedUser(user);
    setEditForm({
      full_name: user.full_name || '',
      role: user.role
    });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedUser(null);
    setEditForm({ full_name: '', role: '' });
  };

  const handleCancelAdd = () => {
    setAddMode(false);
    setAddForm({ email: '', password: '', full_name: '', role: 'user' });
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-green-100 text-green-800 border-green-200',
      instructor: 'bg-blue-100 text-blue-800 border-blue-200',
      user: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[role] || styles.user}`}>
        {role}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#fefaf6] pb-20">
      <PageHeader title="Manajemen Pengguna" breadcrumb={["Admin", "Users"]}>
        <button
          onClick={() => window.location.href = "/dashboardadmin"}
          className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          Kembali
        </button>
      </PageHeader>

      <div className="max-w-6xl mx-auto mt-10 p-6">
        <h2 className="text-3xl font-bold text-[#4e342e] mb-4">Kelola Pengguna</h2>
        <p className="text-gray-600 mb-8">
          Kelola data pengguna, ubah peran, dan tambahkan pengguna baru ke sistem.
        </p>

        {error && <AlertBox type="error">{error}</AlertBox>}
        {success && <AlertBox type="success">{success}</AlertBox>}
        {loading && <LoadingSpinner text="Memuat data..." />}

        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-[#6f4e37]">
              {editMode ? 'Edit Pengguna' : addMode ? 'Tambah Pengguna Baru' : 'Aksi Pengguna'}
            </h3>
            {!editMode && !addMode && (
              <button
                onClick={() => setAddMode(true)}
                className="bg-[#6f4e37] text-white px-4 py-2 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2"
              >
                <FiPlus className="text-sm" />
                Tambah Pengguna
              </button>
            )}
          </div>

          {/* Edit Form */}
          {editMode && (
            <form onSubmit={handleEditSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Masukkan nama lengkap"
                    value={editForm.full_name}
                    onChange={handleEditChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Peran (Role)</label>
                  <select
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
                  disabled={loading}
                >
                  Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* Add Form */}
          {addMode && (
            <form onSubmit={handleAddSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Nama Lengkap</label>
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Masukkan nama lengkap"
                    value={addForm.full_name}
                    onChange={handleAddChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    value={addForm.email}
                    onChange={handleAddChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Masukkan password"
                    value={addForm.password}
                    onChange={handleAddChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Peran (Role)</label>
                  <select
                    name="role"
                    value={addForm.role}
                    onChange={handleAddChange}
                    className="w-full p-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-[#8d6e63]"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition"
                  disabled={loading}
                >
                  Tambah Pengguna
                </button>
                <button
                  type="button"
                  onClick={handleCancelAdd}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Users Table */}
        {!loading && users.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-[#6f4e37]">
                Daftar Pengguna ({users.length} pengguna)
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Lengkap
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Peran
                    </th>
                    <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {user.full_name || '-'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 text-[#5d4037] hover:bg-[#5d4037] hover:text-white rounded-md transition"
                            title="Edit Pengguna"
                          >
                            <AiFillEdit className="text-lg" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition"
                            title="Hapus Pengguna"
                          >
                            <AiFillDelete className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="text-center text-gray-600 mt-10">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <p className="text-lg mb-4">
                Belum ada <strong>pengguna</strong> yang terdaftar.
              </p>
              <p className="text-gray-500 mb-6">
                Tambahkan pengguna pertama untuk mulai mengelola sistem.
              </p>
              <button
                onClick={() => setAddMode(true)}
                className="bg-[#6f4e37] text-white px-6 py-2 rounded-md hover:bg-[#5d4037] transition flex items-center gap-2 mx-auto"
              >
                <FiPlus />
                Tambah Pengguna Pertama
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;