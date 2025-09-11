"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Konten */}
      <div className="flex-1 flex flex-col">
        <Header
          role="admin"
          title="DASHBOARD MONITORING BARANG MILIK NEGARA (BMN)"
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
