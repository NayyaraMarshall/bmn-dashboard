'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="user" />
      <div className="flex-1 flex flex-col">
        <Header title="BMN Monitoring" role="user" /> 
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
