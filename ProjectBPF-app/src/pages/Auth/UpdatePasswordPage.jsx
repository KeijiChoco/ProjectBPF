// src/pages/Auth/UpdatePasswordPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserPassword } from '../../api/authAPI';

function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        const { error: updateError } = await updateUserPassword(password);

        if (updateError) {
            setError(`Gagal memperbarui password: ${updateError.message}`);
        } else {
            setMessage('Password berhasil diperbarui! Anda akan diarahkan ke halaman login dalam 3 detik.');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Buat Password Baru</h1>
                <p className="text-sm text-center text-gray-600">Sesi Anda telah pulih. Silakan masukkan password baru.</p>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Masukkan password baru Anda"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    <button type="submit" disabled={loading} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
                        {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
                    </button>
                </form>
                {message && <p className="text-center text-sm text-green-600">{message}</p>}
                {error && <p className="text-center text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}

export default UpdatePasswordPage;
