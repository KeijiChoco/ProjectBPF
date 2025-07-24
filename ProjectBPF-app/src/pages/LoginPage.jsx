// src/pages/LoginPage.jsx

import { signInWithGoogle } from '../api/authAPI';

function LoginPage() {
  const handleLogin = async () => {
    await signInWithGoogle();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="mb-6 text-gray-600">Silakan login untuk melanjutkan</p>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Login dengan Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
