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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import { dataPeminjaman as initialDataPeminjaman } from "@/data/dataPeminjaman";

// Format tanggal ke dd/mm/yyyy
function formatDateToDDMMYYYY(date: string): string {
  if (!date) return "";
  const [day, month, year] = date.split(/[-/]/);
  if (year && month && day && year.length === 4) return `${day}/${month}/${year}`;
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}/${d.getFullYear()}`;
}

export default function DataPeminjamanAdminPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [peminjamanData, setPeminjamanData] = useState(initialDataPeminjaman);
  const router = useRouter();

  // Modal state (only for tanggalKembali & keterangan)
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editField, setEditField] = useState<"tanggalKembali" | "keterangan" | null>(null);
  const [newTanggal, setNewTanggal] = useState("");
  const [newKeterangan, setNewKeterangan] = useState("");

  // parse tanggal dd-mm-yyyy -> Date (used for sorting)
  function parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Filter + sort
  const filteredData = peminjamanData
    .filter((item) => {
      const matchSearch = item.namaPeminjam.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || item.statusPeminjaman === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      const dateA = parseDate(a.tanggalPinjam);
      const dateB = parseDate(b.tanggalPinjam);
      return dateB.getTime() - dateA.getTime();
    });

  // Hapus
  const handleDelete = (id: number) => {
    if (!confirm("Apakah kamu yakin ingin menghapus data ini?")) return;
    setPeminjamanData(peminjamanData.filter((i) => i.idPeminjaman !== id));
    alert("Data berhasil dihapus!");
  };

  // Navigasi edit page (ke halaman edit terpisah)
  const handleEdit = (id: number) => {
    router.push(`/admin/peminjaman/edit/${id}`);
  };

  // Upload foto (sama seperti sebelumnya)
  const handleUploadFoto = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const previewUrl = URL.createObjectURL(compressed);
      setPeminjamanData(
        peminjamanData.map((p) => (p.idPeminjaman === id ? { ...p, foto: previewUrl } : p))
      );
    } catch (err) {
      console.error("Gagal kompres gambar:", err);
    }
  };

  // Buka modal edit (untuk tanggalKembali atau keterangan)
  const openEditModal = (id: number, field: "tanggalKembali" | "keterangan", currentValue: string) => {
    setSelectedId(id);
    setEditField(field);
    if (field === "tanggalKembali") setNewTanggal(currentValue || "");
    if (field === "keterangan") setNewKeterangan(currentValue || "");
  };

  // Simpan perubahan dari modal
  const handleSaveEdit = () => {
    if (!selectedId || !editField) return;
    setPeminjamanData(
      peminjamanData.map((p) =>
        p.idPeminjaman === selectedId
          ? {
              ...p,
              [editField]:
                editField === "tanggalKembali" ? formatDateToDDMMYYYY(newTanggal) : newKeterangan,
            }
          : p
      )
    );
    setEditField(null);
    setSelectedId(null);
    setNewTanggal("");
    setNewKeterangan("");
  };

  // Ubah status inline dari Select pada baris
  const handleInlineStatusChange = (id: number, value: "Aktif" | "Selesai" | "Terlambat") => {
    setPeminjamanData((prev) => prev.map((p) => (p.idPeminjaman === id ? { ...p, statusPeminjaman: value } : p)));
  };

  return (
    <div className="p-2 space-y-2">
      <h1 className="pt-0 pb-0 text-xs font-bold">Data Peminjaman</h1>

      {/* Search + Filter + Tambah */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1">
          <Input
            placeholder="Cari peminjam..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs placeholder:text-xs h-[24px] w-[200px] px-2"
          />

          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="cursor-pointer text-xs !h-[24px] w-[140px] px-2">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Selesai">Selesai</SelectItem>
              <SelectItem value="Terlambat">Terlambat</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="text-xs h-[24px] px-3"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          >
            Reset
          </Button>
        </div>

        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-xs h-[24px] px-3"
          onClick={() => router.push("/admin/peminjaman/add-peminjaman")}
        >
          + Tambah
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
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
                <th className="border p-2 min-w-[150px]">Nama / Merek / Tipe</th>
                <th className="border p-2">NUP</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Jumlah</th>
                <th className="border p-2 min-w-[110px]">Tanggal Pinjam</th>
                <th className="border p-2 min-w-[130px] text-center">Tanggal Kembali</th>
                <th className="border p-2 min-w-[120px] text-center">Keterangan</th>
                <th className="border p-2 text-center">Status</th>
                <th className="border p-2 min-w-[100px] text-center">Bukti Foto</th>
                <th className="border p-2 text-center">Hapus</th>
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
                  <td className="border p-2 text-center">{item.unit}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2 text-center">{item.jumlahPinjam}</td>
                  <td className="border p-2 text-center">{item.tanggalPinjam}</td>

                  {/* Tanggal kembali: klik untuk modal; jika kosong tampil tombol tambah */}
                  <td className="border p-2 text-center">
                    {item.tanggalKembali ? (
                      <span
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() => openEditModal(item.idPeminjaman, "tanggalKembali", item.tanggalKembali ?? "")}

                      >
                        {item.tanggalKembali}
                      </span>
                    ) : (
                      <button
                        onClick={() => openEditModal(item.idPeminjaman, "tanggalKembali", "")}
                        className="bg-green-500 text-white text-[10px] py-1 px-2 rounded hover:bg-green-600"
                      >
                        Masukkan Tanggal
                      </button>
                    )}
                  </td>

                  {/* Keterangan: klik untuk modal */}
                  <td
                    className="border p-2 cursor-pointer text-blue-600 hover:underline"
                    onClick={() => openEditModal(item.idPeminjaman, "keterangan", item.keterangan ?? "")}
                  >
                    {item.keterangan || "-"}
                  </td>

                  {/* Status */}
                  <td className="border p-2 text-center">
                    <Select
                      value={item.statusPeminjaman}
                      onValueChange={(value) =>
                        handleInlineStatusChange(
                          item.idPeminjaman,
                          value as "Aktif" | "Selesai" | "Terlambat"
                        )
                      }
                    >
                      <SelectTrigger className="justify-center mx-auto cursor-pointer text-xs !h-[22px] w-[95px] px-2">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="Aktif" className="text-[10px]">Aktif</SelectItem>
                        <SelectItem value="Selesai" className="text-[10px]">Selesai</SelectItem>
                        <SelectItem value="Terlambat" className="text-[10px]">Terlambat</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  {/* Foto */}
                  <td className="border p-2 text-center">
                    {item.foto ? (
                      <button
                        onClick={() => window.open(item.foto, "_blank")}
                        className="bg-blue-500 text-white text-[10px] py-1 px-2 rounded hover:bg-blue-600"
                      >
                        Lihat Foto
                      </button>
                    ) : (
                      <>
                        <label
                          htmlFor={`upload-${item.idPeminjaman}`}
                          className="cursor-pointer bg-green-500 text-white text-[10px] py-1 px-2 rounded hover:bg-green-600"
                        >
                          Tambah Foto
                        </label>
                        <input
                          id={`upload-${item.idPeminjaman}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadFoto(e, item.idPeminjaman)}
                          className="hidden"
                        />
                      </>
                    )}
                  </td>

                  {/* hapus */}
                  <td className="border p-2 text-center">
                      <button
                        className="rounded bg-gray-300 p-1 text-gray-500 hover:text-white hover:bg-red-600"
                        onClick={() => handleDelete(item.idPeminjaman)}
                      >
                        <MdDeleteOutline className="text-lg" />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog untuk edit tanggal n keterangan */}
      <Dialog open={!!editField} onOpenChange={() => setEditField(null)}>
        <DialogContent className="max-w-sm text-xs">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold">
              Edit {editField === "tanggalKembali" ? "Tanggal Kembali" : "Keterangan"}
            </DialogTitle>
          </DialogHeader>

          {editField === "tanggalKembali" && (
            <Input
              type="date"
              value={newTanggal}
              onChange={(e) => setNewTanggal(e.target.value)}
              className="text-xs h-[24px] px-2 placeholder:text-xs"
            />
          )}

          {editField === "keterangan" && (
            <Input
              type="text"
              value={newKeterangan}
              onChange={(e) => setNewKeterangan(e.target.value)}
              placeholder="Masukkan keterangan baru..."
              className="text-xs h-[24px] px-2 placeholder:text-xs"
            />
          )}

          <DialogFooter className="text-xs">
            <Button variant="outline" onClick={() => setEditField(null)} className="text-xs h-[24px] px-3">
              Batal
            </Button>
            <Button onClick={handleSaveEdit} className="text-xs h-[24px] px-3">
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
