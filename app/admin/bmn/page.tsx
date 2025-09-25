"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger,SelectValue} from "@/components/ui/select";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

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
  dipinjam: number;
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
    dipinjam: 3,
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
    dipinjam: 4,
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
    dipinjam: 5,
  },
   {
    id: 4,
    kode: "3100106002",
    unit: 28,
    nama: "Dell UltraSharp 27\"",
    kategori: "Monitor",
    jumlah: 14,
    tanggal: "12/09/2024",
    kondisiBaik: 13,
    kondisiRusak: 1,
    dipinjam: 2,
  },
  {
    id: 5,
    kode: "3100102002",
    unit: 42,
    nama: "Asus Zenbook 15",
    kategori: "Laptop",
    jumlah: 18,
    tanggal: "02/09/2024",
    kondisiBaik: 18,
    kondisiRusak: 0,
    dipinjam: 6,
  },
  {
    id: 6,
    kode: "3100103002",
    unit: 21,
    nama: "Samsung Smart TV 55\"",
    kategori: "TV",
    jumlah: 10,
    tanggal: "14/07/2024",
    kondisiBaik: 9,
    kondisiRusak: 1,
    dipinjam: 3,
  },
  {
    id: 7,
    kode: "3100104002",
    unit: 18,
    nama: "Canon Pixma G2020",
    kategori: "Printer",
    jumlah: 12,
    tanggal: "20/06/2024",
    kondisiBaik: 10,
    kondisiRusak: 2,
    dipinjam: 4,
  },
  {
    id: 8,
    kode: "3100102002",
    unit: 30,
    nama: "Lenovo ThinkPad X1",
    kategori: "Laptop",
    jumlah: 20,
    tanggal: "11/08/2024",
    kondisiBaik: 17,
    kondisiRusak: 3,
    dipinjam: 5,
  },
  {
    id: 9,
    kode: "3100106002",
    unit: 22,
    nama: "LG UltraFine 24\"",
    kategori: "Monitor",
    jumlah: 9,
    tanggal: "15/08/2024",
    kondisiBaik: 8,
    kondisiRusak: 1,
    dipinjam: 2,
  },
  {
    id: 10,
    kode: "3100102002",
    unit: 27,
    nama: "MacBook Pro M2",
    kategori: "Laptop",
    jumlah: 14,
    tanggal: "28/05/2024",
    kondisiBaik: 14,
    kondisiRusak: 0,
    dipinjam: 4,
  },
  {
    id: 11,
    kode: "3100103002",
    unit: 22,
    nama: "LG OLED TV 65\"",
    kategori: "TV",
    jumlah: 8,
    tanggal: "17/04/2024",
    kondisiBaik: 7,
    kondisiRusak: 1,
    dipinjam: 3,
  },
  {
    id: 12,
    kode: "3100104002",
    unit: 25,
    nama: "HP LaserJet Pro M15",
    kategori: "Printer",
    jumlah: 9,
    tanggal: "09/03/2024",
    kondisiBaik: 8,
    kondisiRusak: 1,
    dipinjam: 2,
  },
  {
    id: 13,
    kode: "3100106002",
    unit: 28,
    nama: "Dell UltraSharp 27\"",
    kategori: "Monitor",
    jumlah: 14,
    tanggal: "12/09/2024",
    kondisiBaik: 13,
    kondisiRusak: 1,
    dipinjam: 2,
  }
];

export default function DataBMNUserPage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("all");

  const filteredData = dataBMN.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === "all" || item.kategori === kategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="p-1 space-y-2">
  {/* Header */}
  <h1 className="pt-0 pb-0 text-sm font-bold">Data BMN</h1>

  <div className="flex flex-wrap items-center gap-1">
    {/* Search */}
    <Input
      placeholder="Cari barang..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="text-xs placeholder:text-xs h-[24px] w-[200px] px-2"
    />

    {/* Filter */}
    <Select onValueChange={setKategori} defaultValue="all">
      <SelectTrigger className="text-xs !h-[24px] w-[140px] px-2">
        <SelectValue placeholder="Kategori" />
      </SelectTrigger>
      <SelectContent className="text-xs">
        <SelectItem value="all" className="text-[10px]">Semua Kategori</SelectItem>
        <SelectItem value="Laptop" className="text-[10px]">Laptop</SelectItem>
        <SelectItem value="TV" className="text-[10px]">TV</SelectItem>
        <SelectItem value="Monitor" className="text-[10px]">Monitor</SelectItem>
        <SelectItem value="Printer" className="text-[10px]">Printer</SelectItem>
      </SelectContent>
    </Select>

    {/* Reset Button */}
    <Button
      variant="outline"
      className="text-xs h-[24px] px-3"
      onClick={() => {
        setSearch("");
        setKategori("all");
      }}
    >Reset
    </Button>

  </div>
      {/* Table */}
      <div className="bg-white pb-0 rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-blue-100 text-left sticky top-0 z-10">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">IKMM/Kode BMN</th>
                <th className="border p-2">Nama</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2">Tanggal Perolehan</th>
                <th className="border p-2">Kondisi Baik</th>
                <th className="border p-2">Dalam Perbaikan</th>
                <th className="border p-2">Jumlah Tersedia</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.kode}</td>
                  <td className="border p-2">{item.nama}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2">{item.jumlah}</td>
                  <td className="border p-2">{item.tanggal}</td>
                  <td className="border p-2">{item.kondisiBaik}</td>
                  <td className="border p-2">{item.kondisiRusak}</td>
                  <td className="border p-2">{item.kondisiBaik - item.dipinjam}</td>
                  <td className="border p-2">
                     <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded underline-offset-2 hover:text-green-600"
                >
                  <FiEdit />
                </button>
                {/* Delete */}
                <button
                  onClick={() => onDelete(item)}
                  className="p-2 text-rounded hover:text-red-600"
                >
                  <MdOutlineDeleteOutline />
                </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}