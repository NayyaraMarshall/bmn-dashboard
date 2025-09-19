"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";

import { ReactNode } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


// ----- Data Dummy -----
const kategoriData = [
  { name: "Laptop", total: 20 },
  { name: "TV", total: 10 },
  { name: "Monitor", total: 15 },
  { name: "CPU", total: 25 },
];

const kondisiData: Record<
  string,
  { name: string; value: number; fill: string }[]
> = {
  Laptop: [
    { name: "Baik", value: 15, fill: "var(--chart-1)" },
    { name: "Rusak", value: 5, fill: "var(--chart-2)" },
  ],
  TV: [
    { name: "Baik", value: 7, fill: "var(--chart-1)" },
    { name: "Rusak", value: 3, fill: "var(--chart-2)" },
  ],
  Monitor: [
    { name: "Baik", value: 12, fill: "var(--chart-1)" },
    { name: "Rusak", value: 3, fill: "var(--chart-2)" },
  ],
  CPU: [
    { name: "Baik", value: 20, fill: "var(--chart-1)" },
    { name: "Rusak", value: 5, fill: "var(--chart-2)" },
  ],
};

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

// ----- SmallCard -----
type SmallCardProps = {
  children: ReactNode;
  className?: string;
};

const SmallCard = ({ children, className = "" }: SmallCardProps) => (
  <Card className={`p-1 text-xs ${className}`}>{children}</Card>
);

export default function Dashboard() {
  return (
    <div className="grid grid-cols-5 gap-2 p-0">
      {/* Card Total BMN */}
      <SmallCard className="col-span-1 flex flex-col items-start justify-start">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-xs whitespace-nowrap">Total Unit BMN</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <span className="text-lg font-bold">70</span>
        </CardContent>
      </SmallCard>
      
      {/* Card per kategori + pie chart kondisi */}
      {kategoriData.map((stat, i) => (
  <SmallCard key={i} className="col-span-1">
    <CardHeader className="flex justify-between items-center p-2 pb-0">
      <CardTitle className="text-[10px]">{stat.name}</CardTitle>
      <span className="text-xs font-bold">{stat.total}</span>
    </CardHeader>
    <CardContent className="p-2 pt-1 h-[80px]">
      <ChartContainer
        config={{
          Baik: { label: "Baik", color: "var(--chart-1)" },
          Rusak: { label: "Rusak", color: "var(--chart-2)" },
        }}
        className="[&_.recharts-text]:fill-background mx-auto aspect-square"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="name" hideLabel />}
          />
          <Pie
            data={kondisiData[stat.name]}
            dataKey="value"
            nameKey="name"
            outerRadius={30}
            stroke="none"
          >
            <LabelList
              dataKey="name"
              className="fill-background"
              stroke="none"
              fontSize={8}
              formatter={(value: string) =>
                value === "Baik"
                  ? "👍 Baik"
                  : value === "Rusak"
                  ? "⚠️ Rusak"
                  : value
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardContent>
  </SmallCard>
))}

      {/* Chart Bar */}
      <SmallCard className="col-start-1 col-span-3">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-[10px]">
            Visualisasi Kategori Barang
          </CardTitle>
        </CardHeader>
        <CardContent className="h-62 pb-0 text-[9px]">
          <ResponsiveContainer width="90%" height="90%">
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
      <div className="col-start-4 col-span-2 grid grid-rows-1 gap-3 w-full">
        {/* Perolehan BMN */}
        <SmallCard>
          <CardHeader className="px-3 pt-2 pb-0">
            <CardTitle className="text-[10px]">Perolehan BMN Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="px-3 pt-1 pb-3">
            <table className="w-full border border-gray-200 border-collapse text-[7px]">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-1 px-2 border">Nama Barang</th>
                  <th className="text-left py-1 px-2 border">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {perolehanBMN.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 even:bg-gray-50/50"
                  >
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
            <table className="w-full border-collapse text-[7px]">
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
