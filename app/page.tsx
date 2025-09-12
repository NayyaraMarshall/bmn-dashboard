'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleUserClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/user/dashboard');
    }, 1500); // biar spinner keliatan sebentar
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <img
          src="/logopu.png"
          alt="Logo Perusahaan"
          width="50"
          className="mx-auto mb-4"
        />

        {/* Header  */}
        <h1 className="text-[20px] font-bold text-center mb-6 text-gray-800">
          Dashboard Monitoring <br /> Barang Milik Negara (BMN)
          <br />
          <span className="text-gray-500 text-base font-normal">
            Pusat Data dan Teknologi Informasi <br /> Kementerian Pekerjaan Umum
          </span>
        </h1>

        {/* User */}
        <button
          onClick={handleUserClick}
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg mb-4 flex justify-center items-center ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
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
            'Lanjut sebagai Pengguna'
          )}
        </button>

        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">atau</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Admin */}
        <button
          onClick={() => router.push('/admin-login')}
          className="w-full font-semibold bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 cursor-pointer mt-4"
        >
          Login sebagai Admin
        </button>
      </div>
    </div>
  );
}
