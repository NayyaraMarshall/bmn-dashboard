'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      router.push('/admin/dashboard');
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <img src="/logopu.png" alt="Logo Perusahaan" width="50" className="mx-auto mb-4" />

        {/* Header */}
         <h1 className="text-[20px] font-bold text-center mb-6 text-gray-800">Login Admin<br />
        <span className="text-gray-500 text-base font-normal">Dashboard Monitoring Barang Milik Negara (BMN)</span>
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
            className="w-full font-semibold bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer">Login
          </button>
        </form>
      </div>
    </div>
  );
}
