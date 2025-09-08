'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        {/* Logo */}
        <img src="/logopu.png" alt="Logo Perusahaan" width="50" className="mx-auto mb-4" />

        {/* Header  */}
        <h1 className="text-[20px] font-bold text-center mb-6 text-gray-800">Dashboard Monitoring <br /> Barang Milik Negara (BMN)<br />
        <span className="text-gray-500 text-base font-normal">Pusat Data dan Teknologi Informasi</span>
        </h1>

        {/* User */}
        <button
          onClick={() => router.push('/user/dashboard')}
          className="w-full font-semibold bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mb-4 cursor-pointer">Lanjut sebagai Pengguna
        </button>

        <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">atau</span>
        <div className="flex-grow border-t border-gray-300"></div>
        </div>
        
        {/* Admin */}
          <button
            onClick={() => router.push('/admin-login')}
            className="w-full font-semibold bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 cursor-pointer mt-4">Login sebagai Admin
          </button>
      </div>
    </div>
  );
}
