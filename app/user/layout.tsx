"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <Sidebar role="user" />

      {/* Konten */}
      <div className="flex-1 flex flex-col">
        <Header
          role="user"
          title="Dashboard Monitoring Barang Milik Negara (BMN)"
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
