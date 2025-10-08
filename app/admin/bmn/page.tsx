"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";   // 👈 import router

import { dataBMN } from "@/data/dataBMN";

export default function DataBMNAdminPage() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("all");
  const router = useRouter();   // 👈 pakai router

  // Sort
  const sortedData = [...dataBMN].sort((a, b) => {
    const [dayA, monthA, yearA] = a.tanggalPerolehan.split("/");
    const [dayB, monthB, yearB] = b.tanggalPerolehan.split("/");

    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

    return dateB.getTime() - dateA.getTime(); // terbaru di atas
  });

  // Filter
  const filteredData = sortedData.filter((item) => {
    const matchSearch = item.namaBarang.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === "all" || item.kategori === kategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <h1 className="pt-0 pb-0 text-xs font-bold">Data BMN</h1>

      {/* Search + Filter + Reset + Add */}
      <div className="flex items-center justify-between">
        {/* Search, Filter, Reset */}
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
            <SelectTrigger className="cursor-pointer text-xs !h-[24px] w-[140px] px-2">
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
            className="cursor-pointer text-xs h-[24px] px-3"
            onClick={() => {
              setSearch("");
              setKategori("all");
            }}
          >
            Reset
          </Button>
        </div>

        {/* Add Button */}
        <Button
          variant="default"
          className="cursor-pointer text-xs h-[24px] px-3"
          onClick={() => router.push("/admin/bmn/add-bmn")}   // 👈 redirect ke form
        >
          + Add
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white pb-0 rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] max-w-[1035px] overflow-y-auto">
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
                <tr key={item.idBMN} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.ikmm}</td>
                  <td className="border p-2">{item.namaBarang}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2">{item.jumlahBarang}</td>
                  <td className="border p-2">{item.tanggalPerolehan}</td>
                  <td className="border p-2">{item.kondisiBaik}</td>
                  <td className="border p-2">{item.kondisiRusak}</td>
                  <td className="border p-2">{item.kondisiBaik - item.dipinjam}</td>
                  <td className="border p-2 text-center">
                    {/* tombol edit */}
                    <button className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-blue-600">
                      <MdOutlineModeEdit className="text-lg" />
                    </button>
                    {/* tombol delete */}
                    <button className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-red-600 mx-1">
                      <MdDeleteOutline className="text-lg" />
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
