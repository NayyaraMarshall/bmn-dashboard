"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Pie, PieChart } from "recharts";
import { ReactNode } from "react";

const kategoriData = [
  { name: "Laptop", total: 20 },
  { name: "TV", total: 10 },
  { name: "Monitor", total: 15 },
  { name: "CPU", total: 25 },
];

const ketersediaanData = [
  { name: "Gudang", total: 30, fill: "var(--chart-1)" },
  { name: "Dipinjam", total: 40, fill: "var(--chart-2)" },
];

// Hitung total BMN dari kategoriData
const totalBMN = kategoriData.reduce((sum, item) => sum + item.total, 0);

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
      <p className="absolute bottom-2 right-2 text-3xl font-bold">
        {totalBMN}
      </p>
    </CardContent>
  </SmallCard>

  {/* Statistik Cards */}
  {kategoriData.map((stat, i) => (
    <SmallCard key={i} className="col-span-1 row-span-1">
      <CardHeader className="p-2">
        <CardTitle className="text-xs">{stat.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-2 pt-1">
        <p className="text-sm font-bold">{stat.total}</p>
      </CardContent>
    </SmallCard>
  ))}

  {/* Total BMN di Gudang */}
  <SmallCard className="col-span-1 row-span-1">
    <CardHeader className="p-2">
      <CardTitle className="text-xs">Jumlah BMN dalam Gudang</CardTitle>
    </CardHeader>
    <CardContent className="p-2 pt-1">
      <p className="text-sm font-bold">
        {ketersediaanData.find((d) => d.name === "Gudang")?.total}
      </p>
    </CardContent>
  </SmallCard>

  {/* Total BMN yang Dipinjam */}
  <SmallCard className="col-span-1 row-span-1">
    <CardHeader className="p-2">
      <CardTitle className="text-xs">Jumlah BMN Dipinjam</CardTitle>
    </CardHeader>
    <CardContent className="p-2 pt-1">
      <p className="text-sm font-bold">
        {ketersediaanData.find((d) => d.name === "Dipinjam")?.total}
      </p>
    </CardContent>
  </SmallCard>

  {/* Pie Chart */}
  <SmallCard className="col-start-2 col-span-2 row-start-2 row-span-3">
    <CardHeader className="p-2 pb-0">
      <CardTitle className="text-xs">Ketersediaan BMN</CardTitle>
    </CardHeader>
    <CardContent className="h-full pt-0">
      <ChartContainer
        config={{
          total: { label: "Total" },
          Gudang: { label: "Gudang", color: "var(--chart-1)" },
          Dipinjam: { label: "Dipinjam", color: "var(--chart-2)" },
        }}
        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="total" hideLabel />}
          />
          <Pie data={ketersediaanData} dataKey="total" nameKey="name">
            <LabelList
              dataKey="name"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value: string) =>
              value === "Gudang" ? "Tersedia" : value === "Dipinjam" ? "Tidak Tersedia" : value
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
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
