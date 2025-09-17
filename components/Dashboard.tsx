"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ReactNode } from "react";

// Data dummy
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
];

const peminjamanBMN = [
  { id: 1, nama: "Laptop Dell", peminjam: "Andi", tgl: "2025-08-02" },
  { id: 2, nama: "Monitor LG", peminjam: "Budi", tgl: "2025-08-01" },
  { id: 3, nama: "CPU Intel", peminjam: "Citra", tgl: "2025-07-30" },
  { id: 4, nama: "Laptop HP", peminjam: "Dewi", tgl: "2025-07-29" },
];

type SmallCardProps = {
  children: ReactNode;
  className?: string;
};

const SmallCard = ({ children, className = "" }: SmallCardProps) => (
  <Card className={`p-1 text-xs ${className}`}>{children}</Card>
);

export default function Dashboard() {
  return (
    <div className="p-1 grid grid-cols-1 lg:grid-cols-4 gap-3 text-xs">
      {/* Statistik Cards */}
      {[
        { title: "Total Unit BMN", value: "70" },
        { title: "Laptop", value: "20" },
        { title: "TV", value: "10" },
        { title: "Monitor", value: "15" },
      ].map((stat, i) => (
        <SmallCard key={i} className="col-span-1">
          <CardHeader className="p-2 pb-0">
            <CardTitle className="text-[10px]">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-2 pt-1">
            <p className="text-sm font-bold">{stat.value}</p>
          </CardContent>
        </SmallCard>
      ))}

      {/* Chart */}
      <SmallCard className="col-span-2">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-[10px]">Visualisasi Kategori Barang</CardTitle>
        </CardHeader>
        <CardContent className="h-62 pb-0 text-[9px]">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={kategoriData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </SmallCard>

      {/* Perolehan + Peminjaman */}
      <div className="col-span-2 grid grid-rows-2 gap-2">
        {/* Perolehan BMN */}
        <SmallCard>
          <CardHeader className="px-3 pt-2 pb-0">
            <CardTitle className="text-[10px]">Perolehan BMN Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pt-1 pb-3">
            <table className="w-full border border-gray-200 border-collapse text-[9px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-1 px-2 border">Nama Barang</th>
                  <th className="text-left py-1 px-2 border">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {perolehanBMN.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 even:bg-gray-50/50">
                    <td className="py-1 px-2 border">{item.nama}</td>
                    <td className="py-1 px-2 border">{item.tgl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </SmallCard>

        {/* Peminjaman BMN */}
        <SmallCard>
          <CardHeader className="px-3 pt-2 pb-0">
            <CardTitle className="text-[10px]">Peminjaman BMN Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pt-1 pb-3">
            <table className="w-full border-collapse text-[9px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left py-1 px-2 border">Nama Barang</th>
                  <th className="text-left py-1 px-2 border">Peminjam</th>
                  <th className="text-left py-1 px-2 border">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {peminjamanBMN.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-1 px-2 border">{item.nama}</td>
                    <td className="py-1 px-2 border">{item.peminjam}</td>
                    <td className="py-1 px-2 border">{item.tgl}</td>
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
