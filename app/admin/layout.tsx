import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        
        <Header title="BMN Monitoring" role="admin" />

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 p-6">{children}</main>
      </div>
    </div>
  );
}
