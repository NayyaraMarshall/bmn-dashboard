  "use client";

  import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
  import {ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig,} from "@/components/ui/chart";
  import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LabelList,} from "recharts";
  import { ReactNode } from "react";

  import { dataBMN } from "@/data/dataBMN";
  import { dataPeminjaman } from "@/data/dataPeminjaman";

  function parseDMY(dateStr?: string | null): Date {
    if (!dateStr) return new Date(0);
    const parts = dateStr.split(/[/\-\.]/).map((p) => p.trim());
    if (parts.length < 3) return new Date(0);

    let [d, m, y] = parts;
    if (y.length === 2) y = "20" + y;
    const day = parseInt(d, 10);
    const month = parseInt(m, 10) - 1; 
    const year = parseInt(y, 10);
    if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return new Date(0);
    return new Date(year, month, day);
  }

  const kategoriData = [
    { name: "Laptop", total: 20 },
    { name: "TV", total: 10 },
    { name: "Monitor", total: 15 },
    { name: "Printer", total: 25 },
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
    Printer: [
      { name: "Baik", value: 20, fill: "var(--chart-1)" },
      { name: "Rusak", value: 5, fill: "var(--chart-2)" },
    ],
  };

  const totalBMN = kategoriData.reduce((s, it) => s + it.total, 0);

  type SmallCardProps = {
    children: ReactNode;
    className?: string;
  };

  const SmallCard = ({ children, className = "" }: SmallCardProps) => (
    <Card className={`p-1 text-xs ${className}`}>{children}</Card>
  );

  export default function Dashboard() {
    const perolehanBMN = [...dataBMN]
      .sort((a, b) => parseDMY(b.tanggalPerolehan).getTime() - parseDMY(a.tanggalPerolehan).getTime())
      .slice(0, 4);

    const peminjamanBMN = [...dataPeminjaman]
      .sort((a, b) => parseDMY(b.tanggalPinjam).getTime() - parseDMY(a.tanggalPinjam).getTime())
      .slice(0, 4);

    return (
      <div className="grid grid-cols-5 gap-2 p-0">
        {/* Total + Kategori */}
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
            <SmallCard key={i} className="col-span-1 h-[140px] flex flex-col">
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
                    <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
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
                        formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </SmallCard>
          );
        })}

        {/* Bar Chart + Table */}
        <div className="col-span-5 grid grid-cols-5 gap-2 items-start">
          <SmallCard className="col-span-2 h-full">
            <CardHeader className="p-2 pb-0">
              <CardTitle className="text-[10px]">Visualisasi Kategori Barang</CardTitle>
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
            <SmallCard>
              <CardHeader className="px-3 pt-2 pb-0">
                <CardTitle className="text-[10px]">Perolehan BMN Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pt-0 pb-2">
                <div className="max-h-32 overflow-y-auto"> {/* scrollable wrapper */}
                  <table className="w-full border border-gray-200 border-collapse text-[7px]">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                      <tr>
                        <th className="text-left py-1 px-2 border">Nama Barang</th>
                        <th className="text-left py-1 px-2 border">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {perolehanBMN.map((item) => (
                        <tr key={item.idBMN} className="hover:bg-gray-50 even:bg-gray-50/50">
                          <td className="py-1 px-2 border">{item.namaBarang}</td>
                          <td className="py-1 px-2 border">{item.tanggalPerolehan}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </SmallCard>

            <SmallCard>
              <CardHeader className="px-3 pt-2 pb-0">
                <CardTitle className="text-[10px]">Peminjaman BMN Terbaru</CardTitle>
              </CardHeader>
              <CardContent className="px-3 pt-0 pb-2">
              <div className="max-h-32 overflow-y-auto">
                <table className="w-full border-collapse text-[7px]">
                  <thead>
                    <tr className="bg-gray-100 sticky top-0 z-10">
                      <th className="text-left py-1 px-2 border">Nama Peminjam</th>
                      <th className="text-left py-1 px-2 border">Nama Barang</th>
                      <th className="text-left py-1 px-2 border">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {peminjamanBMN.map((item) => (
                      <tr key={item.idPeminjaman} className="hover:bg-gray-50">
                        <td className="py-1 px-2 border">{item.namaPeminjam}</td>
                        <td className="py-1 px-2 border">{item.namaBarang}</td>
                        <td className="py-1 px-2 border">{item.tanggalPinjam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
            </SmallCard>
          </div>
        </div>
      </div>
    );
  }
