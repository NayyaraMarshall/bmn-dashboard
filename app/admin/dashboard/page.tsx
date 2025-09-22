"use client";

import {Card, CardHeader,CardTitle,CardContent,} from "@/components/ui/card";
import {ChartContainer,ChartTooltip,ChartTooltipContent,ChartConfig,} from "@/components/ui/chart";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,PieChart,Pie,LabelList,} from "recharts";
import { ReactNode } from "react";

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

const totalBMN = kategoriData.reduce((sum, item) => sum + item.total, 0);

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
    <div className="grid grid-cols-5 gap-2 p-0">
      {/* ====== Bagian Atas: Total + Kategori ====== */}
      <SmallCard className="col-span-1 h-[140px] flex flex-col">
        <CardHeader className="p-2 pb-0">
          <CardTitle className="text-[10px]">Total Unit BMN</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-end justify-end p-2">
          <span className="text-xl font-bold">{totalBMN}</span>
        </CardContent>
      </SmallCard>

      {kategoriData.map((stat, i) => {
  const chartConfig = {
    Baik: { label: "Baik", color: "var(--chart-1)" },
    Rusak: { label: "Rusak", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <SmallCard
      key={i}
      className="col-span-1 h-[140px] flex flex-col"
    >
      <CardHeader className="flex justify-between items-center p-2 pb-0">
        <CardTitle className="text-[10px]">{stat.name}</CardTitle>
        <span className="text-xs font-bold">{stat.total}</span>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background aspect-square w-[80px] h-[80px]"
        >
          <PieChart width={90} height={90}>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="value" hideLabel />}
            />
            <Pie
              data={kondisiData[stat.name]}
              dataKey="value"
              nameKey="name"
              outerRadius={28}
              stroke="none"
            >
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={7}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </SmallCard>
  );
})}

      {/* ====== Bagian Tengah: Bar Chart + Table ====== */}
      <div className="col-span-5 grid grid-cols-5 gap-2 items-start">
        <SmallCard className="col-span-2 h-full">
          <CardHeader className="p-2 pb-0">
            <CardTitle className="text-[10px]">
              Visualisasi Kategori Barang
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[250px] p-2 pb-0 text-[9px]">
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

        <div className="col-span-3 flex flex-col gap-2">
          {/* Perolehan BMN */}
          <SmallCard>
            <CardHeader className="px-3 pt-2 pb-0">
              <CardTitle className="text-[10px]">
                Perolehan BMN Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pt-0 pb-2">
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
              <CardTitle className="text-[10px]">
                Peminjaman BMN Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pt-0 pb-2">
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
    </div>
  );
}
