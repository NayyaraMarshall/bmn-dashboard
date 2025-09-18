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
  <div className="grid grid-cols-5 grid-rows-3 gap-3 p-3">
  {/* Total BMN */}
    <SmallCard className="col-span-1 row-span-2">
      <CardHeader className="p-2 pb-0">
        <CardTitle className="text-sm">Total Unit BMN</CardTitle>
      </CardHeader>
      <CardContent className="relative p-2 h-full">
        <p className="absolute bottom-2 right-2 text-3xl font-bold">70</p>
      </CardContent>
    </SmallCard>

  {/* Statistik Cards */}
  {[
    { title: "Laptop", value: "20" },
    { title: "TV", value: "10" },
    { title: "Monitor", value: "15" },
    { title: "CPU", value: "25" },
  ].map((stat, i) => (
    <SmallCard key={i} className="col-span-1 row-span-1">
      <CardHeader className="p-2">
        <CardTitle className="text-xs">{stat.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-1">
        <p className="text-sm font-bold">{stat.value}</p>
      </CardContent>
    </SmallCard>
  ))}

  {/* Total BMN di Gudang */}
  <SmallCard className="col-span-1 row-span-1">
    <CardHeader className="p-2">
      <CardTitle className="text-xs">Jumlah Unit BMN di Gudang</CardTitle>
    </CardHeader>
    <CardContent className="p-2 pt-1">
      <p className="text-sm font-bold">30</p>
    </CardContent>
  </SmallCard>

  {/* Total BMN yang Dipinjam */}
  <SmallCard className="col-span-1 row-span-1">
    <CardHeader className="p-2">
      <CardTitle className="text-xs">Jumlah Unit BMN Dipinjam</CardTitle>
    </CardHeader>
    <CardContent className="p-2 pt-1">
      <p className="text-sm font-bold">40</p>
    </CardContent>
  </SmallCard>

  {/* Pie Chart */}
  <SmallCard className="col-start-2 col-span-2 row-start-2 row-span-3">
    <CardHeader className="p-2 pb-0">
      <CardTitle className="text-xs">Ketersediaan BMN</CardTitle>
    </CardHeader>
    <CardContent className="h-full">
      <ResponsiveContainer width="100%" height="100%">
      </ResponsiveContainer>
    </CardContent>
  </SmallCard>

  {/* Bar Chart */}
  <SmallCard className="col-start-4 col-span-2 row-start-2 row-span-3">
    <CardHeader className="p-2 pb-0">
      <CardTitle className="text-xs">Kategori BMN</CardTitle>
    </CardHeader>
    <CardContent className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={kategoriData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </SmallCard>
</div>
  );
}
