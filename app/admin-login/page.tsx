'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ⬅️ state loading
  const router = useRouter();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === '1234') {
        router.push('/admin/dashboard');
      } else {
        alert('Username atau password salah!');
        setLoading(false);
      }
    }, 1200); // delay biar kelihatan spinnernya
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <img src="/logopu.png" alt="Logo Perusahaan" width="50" className="mx-auto mb-4" />

        {/* Header */}
        <h1 className="text-[20px] font-bold text-center mb-6 text-gray-800">
          Login Admin<br />
          <span className="text-gray-500 text-base font-normal">
            Dashboard Monitoring Barang Milik Negara (BMN)
          </span>
        </h1>

        {/* Form */}
        <form onSubmit={handleAdminLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center font-semibold bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-white">Loading</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
