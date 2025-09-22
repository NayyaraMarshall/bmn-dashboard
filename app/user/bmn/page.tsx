"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BMN = {
  id: number;
  kode: string;
  unit: number;
  nama: string;
  kategori: string;
  jumlah: number;
  tanggal: string;
  kondisiBaik: number;
  kondisiRusak: number;
};

const dataBMN: BMN[] = [
  {
    id: 1,
    kode: "3100102002",
    unit: 33,
    nama: "Lenovo IdeaPad 3 14/TL6",
    kategori: "Laptop",
    jumlah: 12,
    tanggal: "26/08/2024",
    kondisiBaik: 11,
    kondisiRusak: 1,
  },
  {
    id: 2,
    kode: "3100102002",
    unit: 37,
    nama: "Lenovo Yoga Pro 9 14",
    kategori: "Laptop",
    jumlah: 10,
    tanggal: "20/08/2024",
    kondisiBaik: 7,
    kondisiRusak: 3,
  },
  {
    id: 3,
    kode: "3100102002",
    unit: 39,
    nama: "Razer 14 2023",
    kategori: "Laptop",
    jumlah: 25,
    tanggal: "26/08/2024",
    kondisiBaik: 16,
    kondisiRusak: 9,
  }
];

export default function DataBMNUserPage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("all");
  const [kondisi, setKondisi] = useState("all");

  const filteredData = dataBMN.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === "all" || item.kategori === kategori;
    const matchKondisi =
      kondisi === "all" ||
      (kondisi === "Baik" && item.kondisiBaik > 0) ||
      (kondisi === "Tidak Baik" && item.kondisiRusak > 0);
    return matchSearch && matchKategori && matchKondisi;
  });

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <h1 className="text-lg font-bold">Data BMN</h1>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Cari nama barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[250px]"
        />
        <Select onValueChange={setKategori} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="Laptop">Laptop</SelectItem>
            <SelectItem value="TV">TV</SelectItem>
            <SelectItem value="Monitor">Monitor</SelectItem>
            <SelectItem value="CPU">CPU</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setKondisi} defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Kondisi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kondisi</SelectItem>
            <SelectItem value="Baik">Baik</SelectItem>
            <SelectItem value="Tidak Baik">Tidak Baik</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setKategori("all");
            setKondisi("all");
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-gray-100 text-left sticky top-0 z-10">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">IKMM/Kode BMN</th>
                <th className="border p-2">Nomor Unit</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2">Tanggal Perolehan</th>
                <th className="border p-2">Kondisi Baik</th>
                <th className="border p-2">Kondisi Tidak Baik</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.kode}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2">{item.jumlah}</td>
                  <td className="border p-2">{item.tanggal}</td>
                  <td className="border p-2">{item.kondisiBaik}</td>
                  <td className="border p-2">{item.kondisiRusak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
