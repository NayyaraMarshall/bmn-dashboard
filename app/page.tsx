// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // nanti tambahkan API auth admin
    if (username === 'admin' && password === '1234') {
      router.push('/admin/dashboard');
    } else {
      alert('Username atau password salah!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">BMN Monitoring Dashboard</h1>

        {/* Pilihan User */}
        <button
          onClick={() => router.push('/user/dashboard')}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4">Continue as User
        </button>

        <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">or login as Admin</span>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Form Admin */}
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
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}
