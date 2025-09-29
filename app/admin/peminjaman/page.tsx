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
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

import { dataPeminjaman } from "@/data/dataPeminjaman";

export default function DataPeminjamanAdminPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // filter data
  const filteredData = dataPeminjaman.filter((item) => {
    const matchSearch = item.namaPeminjam
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = status === "all" || item.statusPeminjaman === status;
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-1 space-y-2">
      {/* Header */}
      <h1 className="pt-0 pb-0 text-sm font-bold">Data Peminjaman</h1>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-1">
        {/* Search */}
        <Input
          placeholder="Cari peminjam..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs placeholder:text-xs h-[24px] w-[200px] px-2"
        />

        {/* Filter status */}
        <Select onValueChange={setStatus} defaultValue="all">
          <SelectTrigger className="cursor-pointer text-xs !h-[24px] w-[140px] px-2">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="text-xs">
            <SelectItem value="all" className="text-[10px]">
              Semua Status
            </SelectItem>
            <SelectItem value="Aktif" className="text-[10px]">
              Aktif
            </SelectItem>
            <SelectItem value="Selesai" className="text-[10px]">
              Selesai
            </SelectItem>
            <SelectItem value="Terlambat" className="text-[10px]">
              Terlambat
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="cursor-pointer text-xs h-[24px] px-3"
          onClick={() => {
            setSearch("");
            setStatus("all");
          }}
        >
          Reset
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white pb-0 rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-blue-100 text-left sticky top-0 z-10">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">Nomor Peminjaman</th>
                <th className="border p-2">Nama Peminjam</th>
                <th className="border p-2">Status Pegawai</th>
                <th className="border p-2">NIP</th>
                <th className="border p-2">IKMM</th>
                <th className="border p-2">Nama Barang</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2">Tanggal Pinjam</th>
                <th className="border p-2">Tanggal Kembali</th>
                <th className="border p-2">Keterangan</th>
                <th className="border p-2">Status</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.idPeminjaman} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.nomorPeminjaman}</td>
                  <td className="border p-2">{item.namaPeminjam}</td>
                  <td className="border p-2">{item.statusPegawai}</td>
                  <td className="border p-2">{item.nip}</td>
                  <td className="border p-2">{item.ikmm}</td>
                  <td className="border p-2">{item.namaBarang}</td>
                  <td className="border p-2">{item.jumlahPinjam}</td>
                  <td className="border p-2">{item.tanggalPinjam}</td>
                  <td className="border p-2">
                    {item.tanggalKembali || "-"}
                  </td>
                  <td className="border p-2">{item.keterangan}</td>
                  <td className="border p-2">{item.statusPeminjaman}</td>
                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-1">
                      {/* tombol edit */}
                      <button className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-blue-600">
                        <MdOutlineModeEdit className="text-lg" />
                      </button>
                      {/* tombol delete */}
                      <button className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-red-600">
                        <MdDeleteOutline className="text-lg" />
                      </button>
                    </div>
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
