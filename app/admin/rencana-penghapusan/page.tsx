"use client";

import { useState, useEffect } from "react";
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
import {
  dataUsulanHapus as initialData,
  dataUsulanHapus as DataType,
} from "@/data/dataUsulanHapus";

export default function UsulanHapusPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hapusData, setHapusData] = useState<DataType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [disetujuiOleh, setDisetujuiOleh] = useState("");

  useEffect(() => {
    setHapusData(initialData);
  }, []);

  // === Ubah status ===
  const handleStatusChange = (
    id: number,
    newStatus: "Menunggu" | "Disetujui" | "Ditolak"
  ) => {
    setHapusData((prev) =>
      prev.map((item) =>
        item.idUsulan === id
          ? {
              ...item,
              statusUsulan: newStatus,
              disetujuiOleh: newStatus === "Disetujui" ? item.disetujuiOleh : "",
            }
          : item
      )
    );
  };

  // === Buka dialog edit disetujui oleh ===
  const handleOpenDialog = (id: number, currentValue: string) => {
    setSelectedId(id);
    setDisetujuiOleh(currentValue || "");
    setOpenDialog(true);
  };

  // === Simpan hasil edit ===
  const handleSaveDisetujuiOleh = () => {
    if (selectedId !== null) {
      setHapusData((prev) =>
        prev.map((item) =>
          item.idUsulan === selectedId
            ? { ...item, disetujuiOleh: disetujuiOleh.trim() || "-" }
            : item
        )
      );
    }
    setOpenDialog(false);
    setSelectedId(null);
    setDisetujuiOleh("");
  };

  // === Filter + Search ===
  const filteredData = hapusData
    .filter((item) => {
      const matchSearch = item.namaBarang
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || item.statusUsulan === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.tanggalUsulan).getTime() -
        new Date(a.tanggalUsulan).getTime()
    );

  return (
    <div className="p-2 space-y-2">
      <h1 className="text-xs font-bold">Usulan Penghapusan BMN</h1>

      {/* Search + Filter */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1">
          <Input
            placeholder="Cari nama barang..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs placeholder:text-xs h-[24px] w-[200px] px-2 !bg-gray-50"
          />

          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="cursor-pointer text-xs !h-[24px] w-[160px] px-2 !bg-gray-50">
              <SelectValue placeholder="Status Usulan" />
            </SelectTrigger>
            <SelectContent className="text-xs">
              <SelectItem value="all" className="text-[10px]">
                Semua Status
              </SelectItem>
              <SelectItem value="Menunggu" className="text-[10px]">
                Menunggu
              </SelectItem>
              <SelectItem value="Disetujui" className="text-[10px]">
                Disetujui
              </SelectItem>
              <SelectItem value="Ditolak" className="text-[10px]">
                Ditolak
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="text-xs h-[24px] px-3 !bg-gray-50"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-x-auto">
        <div className="max-h-[400px] max-w-[1035px] overflow-y-auto">
          <table className="w-full text-xs border-collapse">
            <thead className="bg-blue-100 text-left sticky top-0 z-10">
              <tr>
                <th className="border p-2">No</th>
                <th className="border p-2">IKMM</th>
                <th className="border p-2 min-w-[150px]">Nama / Merek / Tipe</th>
                <th className="border p-2">NUP</th>
                <th className="border p-2">Kategori</th>
                <th className="border p-2 min-w-[100px]">Kondisi</th>
                <th className="border p-2 min-w-[130px]">Tanggal Usulan</th>
                <th className="border p-2 min-w-[150px]">Alasan Penghapusan</th>
                <th className="border p-2 min-w-[120px] text-center">Status Usulan</th>
                <th className="border p-2 min-w-[140px] text-center">Disetujui Oleh</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item.idUsulan} className="hover:bg-gray-50">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.ikmm}</td>
                  <td className="border p-2">{item.namaBarang}</td>
                  <td className="border p-2">{item.unit}</td>
                  <td className="border p-2">{item.kategori}</td>
                  <td className="border p-2">{item.kondisiBarang}</td>
                  <td className="border p-2">{item.tanggalUsulan}</td>
                  <td className="border p-2">{item.alasan}</td>

                  {/* Status */}
                  <td className="border p-2 text-center">
                    <Select
                      value={item.statusUsulan}
                      onValueChange={(v) =>
                        handleStatusChange(
                          item.idUsulan,
                          v as "Menunggu" | "Disetujui" | "Ditolak"
                        )
                      }
                    >
                      <SelectTrigger className="justify-center mx-auto cursor-pointer text-xs !h-[22px] w-[105px] px-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Menunggu" className="text-[10px]">
                          Menunggu
                        </SelectItem>
                        <SelectItem value="Disetujui" className="text-[10px]">
                          Disetujui
                        </SelectItem>
                        <SelectItem value="Ditolak" className="text-[10px]">
                          Ditolak
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </td>

                  <td
                    className="border p-2 text-center text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleOpenDialog(item.idUsulan, item.disetujuiOleh)}
                  >
                    {item.disetujuiOleh || <span className="text-gray-400">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog Input Nama Penyetuju */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-sm font-medium">
            Usulan hapus disetujui oleh:
            </DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Input
              placeholder="Masukkan nama penyetuju..."
              value={disetujuiOleh}
              onChange={(e) => setDisetujuiOleh(e.target.value)}
              className="text-sm"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="text-xs h-[26px]"
              onClick={() => setOpenDialog(false)}
            >
              Batal
            </Button>
            <Button className="text-xs h-[26px]" onClick={handleSaveDisetujuiOleh}>
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
