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
import { useRouter } from "next/navigation";

import { dataPeminjaman as initialDataPeminjaman } from "@/data/dataPeminjaman";

// Helper parse tanggal format dd-mm-yyyy
function parseDateDMY(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default function DataPeminjamanAdminPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [peminjamanData, setPeminjamanData] = useState(initialDataPeminjaman);
  const router = useRouter();

  // Filter + Sort data (pakai data dari state)
  const filteredData = peminjamanData
    .filter((item) => {
      const matchSearch = item.namaPeminjam
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus = status === "all" || item.statusPeminjaman === status;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const dateA = parseDateDMY(a.tanggalPinjam);
      const dateB = parseDateDMY(b.tanggalPinjam);
      return dateB.getTime() - dateA.getTime(); // terbaru di atas
    });

  // 🗑️ Fungsi hapus data
  const handleDelete = (id: number) => {
    const confirmDelete = confirm("Apakah kamu yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    const updatedData = peminjamanData.filter(
      (item) => item.idPeminjaman !== id
    );
    setPeminjamanData(updatedData);
    alert("Data berhasil dihapus!");
  };

  // ✏️ Fungsi edit
  const handleEdit = (id: number) => {
    router.push(`/admin/peminjaman/edit/${id}`);
  };

  return (
    <div className="p-2 space-y-2">
      {/* Header */}
      <h1 className="pt-0 pb-0 text-xs font-bold">Data Peminjaman</h1>

      {/* Search + Filter + Reset + Add */}
      <div className="flex items-center justify-between">
        {/* Search, Filter, Reset */}
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

        {/* Add Button */}
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-xs h-[24px] px-3"
          onClick={() => router.push("/admin/peminjaman/add-peminjaman")}
        >
          + Tambah
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white pb-0 rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] max-w-[1035px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-blue-100 text-left sticky top-0 z-10">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2 min-w-[135px]">Nomor Peminjaman</th>
                <th className="border p-2 min-w-[120px]">Nama Peminjam</th>
                <th className="border p-2 min-w-[110px]">Status Pegawai</th>
                <th className="border p-2 min-w-[110px]">NIP</th>
                <th className="border p-2">IKMM</th>
                <th className="border p-2 min-w-[110px]">Nama Barang</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2 min-w-[110px]">Tanggal Pinjam</th>
                <th className="border p-2 min-w-[115px]">Tanggal Kembali</th>
                <th className="border p-2 min-w-[120px]">Keterangan</th>
                <th className="border p-2">Status</th>
                <th className="border p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={item.idPeminjaman} className="hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{item.nomorPeminjaman}</td>
                    <td className="border p-2">{item.namaPeminjam}</td>
                    <td className="border p-2">{item.statusPegawai}</td>
                    <td className="border p-2">{item.nip}</td>
                    <td className="border p-2">{item.ikmm}</td>
                    <td className="border p-2">{item.namaBarang}</td>
                    <td className="border p-2">{item.kategori}</td>
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
                        <button
                          className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-blue-600"
                          onClick={() => handleEdit(item.idPeminjaman)}
                        >
                          <MdOutlineModeEdit className="text-lg" />
                        </button>
                        {/* tombol delete */}
                        <button
                          className="cursor-pointer rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-red-600"
                          onClick={() => handleDelete(item.idPeminjaman)}
                        >
                          <MdDeleteOutline className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={14}
                    className="text-center text-gray-500 text-xs p-3"
                  >
                    Tidak ada data peminjaman
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
