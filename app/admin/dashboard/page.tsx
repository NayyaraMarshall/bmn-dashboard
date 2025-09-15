"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const kategoriData = [
  { name: "Laptop", total: 20 },
  { name: "TV", total: 10 },
  { name: "Monitor", total: 15 },
  { name: "CPU", total: 25 },
];

const perolehanBMN = [
  { id: 1, nama: "Laptop Dell", tgl: "2025-08-01" },
  { id: 2, nama: "TV Samsung", tgl: "2025-07-25" },
  { id: 3, nama: "Monitor LG", tgl: "2025-07-20" },
  { id: 4, nama: "CPU Intel", tgl: "2025-07-18" },
  { id: 5, nama: "Laptop HP", tgl: "2025-07-15" },
];

const peminjamanBMN = [
  { id: 1, nama: "Laptop Dell", peminjam: "Andi", tgl: "2025-08-02" },
  { id: 2, nama: "Monitor LG", peminjam: "Budi", tgl: "2025-08-01" },
  { id: 3, nama: "CPU Intel", peminjam: "Citra", tgl: "2025-07-30" },
  { id: 4, nama: "Laptop HP", peminjam: "Dewi", tgl: "2025-07-29" },
  { id: 5, nama: "TV Samsung", peminjam: "Eka", tgl: "2025-07-28" },
];

// 🔑 bikin wrapper biar semua card lebih kecil serentak
const SmallCard = ({ children, className = "" }) => (
  <Card className={`p-1 text-xs ${className}`}>{children}</Card>
);

export default function DashboardPage() {
  return (
    <div className="p-1 grid grid-cols-1 lg:grid-cols-4 gap-3 text-xs">
      {/* Statistik Cards */}
      <SmallCard className="col-span-1">
        <CardHeader className="p-2">
          <CardTitle className="text-xs">Total Unit BMN</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-base font-bold">70</p>
        </CardContent>
      </SmallCard>

      <SmallCard className="col-span-1">
        <CardHeader className="p-2">
          <CardTitle className="text-xs">Laptop</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-base font-bold">20</p>
        </CardContent>
      </SmallCard>

      <SmallCard className="col-span-1">
        <CardHeader className="p-2">
          <CardTitle className="text-xs">TV</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-base font-bold">10</p>
        </CardContent>
      </SmallCard>

      <SmallCard className="col-span-1">
        <CardHeader className="p-2">
          <CardTitle className="text-xs">Monitor</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <p className="text-base font-bold">15</p>
        </CardContent>
      </SmallCard>

      {/* Chart */}
      <SmallCard className="col-span-2">
        <CardHeader className="p-2">
          <CardTitle className="text-xs">Visualisasi Kategori Barang</CardTitle>
        </CardHeader>
        <CardContent className="h-62"> {/* kecilin chart serentak */}
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={kategoriData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </SmallCard>

      {/* Perolehan + Peminjaman */}
      <div className="col-span-2 grid grid-rows-2 gap-2">
        {/* Perolehan BMN */}
        <SmallCard className="h-42 overflow-y-auto">
          <CardHeader className="pl-2 pt-2 pr-2 pb-0">
            <CardTitle className="text-xs">Perolehan BMN Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 pt-0 pr-2 pb-2">
            <table className="w-full text-[10px]">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-1">Nama Barang</th>
                  <th className="text-left py-1">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {perolehanBMN.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-1">{item.nama}</td>
                    <td className="py-1">{item.tgl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </SmallCard>

        {/* Peminjaman BMN */}
        <SmallCard className="h-42 overflow-y-auto">
          <CardHeader className="p-2">
            <CardTitle className="text-xs">Peminjaman BMN Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="pl-2 pt-0 pr-2 pb-2">
            <table className="w-full text-[9px]">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-1">Nama Barang</th>
                  <th className="text-left py-1">Peminjam</th>
                  <th className="text-left py-1">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {peminjamanBMN.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-1">{item.nama}</td>
                    <td className="py-1">{item.peminjam}</td>
                    <td className="py-1">{item.tgl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </SmallCard>
      </div>
    </div>
  );
}
