"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { dataPeminjaman, Peminjaman } from "@/data/dataPeminjaman";

export default function EditPeminjamanPage() {
  const router = useRouter();
  const { id } = useParams();
  const idPeminjaman = Number(id);

  const [peminjaman, setPeminjaman] = useState<Peminjaman | null>(null);
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Selesai">(
    "Aktif"
  );

  // format tanggal ke ISO yyyy-mm-dd (biar masuk ke input date)
  const parseDateToISO = (dateStr: string | null): string => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  // ambil data peminjaman berdasarkan ID
  useEffect(() => {
    const found = dataPeminjaman.find((item) => item.idPeminjaman === idPeminjaman);
    if (found) {
      setPeminjaman(found);
      setTanggalKembali(parseDateToISO(found.tanggalKembali));
      setKeterangan(found.keterangan || "");
      setStatus(found.statusPeminjaman);
    }
  }, [idPeminjaman]);

  // format tanggal ke dd-mm-yyyy
  const formatDate = (isoDate: string): string => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // simpan perubahan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Apakah kamu yakin ingin menyimpan perubahan ini?")) return;

    const index = dataPeminjaman.findIndex(
      (item) => item.idPeminjaman === idPeminjaman
    );
    if (index !== -1) {
      dataPeminjaman[index] = {
        ...dataPeminjaman[index],
        tanggalKembali: tanggalKembali ? formatDate(tanggalKembali) : null,
        keterangan,
        statusPeminjaman: status,
      };
    }

    alert("Perubahan berhasil disimpan!");
    router.push("/admin/peminjaman");
  };

  if (!peminjaman)
    return (
      <div className="rounded-lg bg-white p-6 shadow text-xs text-gray-600">
        Data tidak ditemukan...
      </div>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-sm font-bold mb-4">Edit Data Peminjaman</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Nama Peminjam */}
        <div>
          <label className="block text-xs font-medium mb-1">Nama Peminjam</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded bg-gray-100"
            value={peminjaman.namaPeminjam}
            readOnly
          />
        </div>

        {/* NIP */}
        <div>
          <label className="block text-xs font-medium mb-1">NIP</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded bg-gray-100"
            value={peminjaman.nip}
            readOnly
          />
        </div>

        {/* Nama Barang */}
        <div>
          <label className="block text-xs font-medium mb-1">Nama Barang</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded bg-gray-100"
            value={peminjaman.namaBarang}
            readOnly
          />
        </div>

        {/* Tanggal Kembali */}
        <div>
          <label className="block text-xs font-medium mb-1">Tanggal Kembali</label>
          <input
            type="date"
            className="text-xs w-full border px-3 py-2 rounded"
            value={tanggalKembali}
            onChange={(e) => setTanggalKembali(e.target.value)}
          />
        </div>

        {/* Keterangan */}
        <div>
          <label className="block text-xs font-medium mb-1">Keterangan</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>

        {/* Status Peminjaman */}
        <div>
          <label className="block text-xs font-medium mb-1">Status Peminjaman</label>
          <select
            className="text-xs w-full border px-3 py-2 rounded"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "Aktif" | "Selesai" )
            }
          >
            <option value="Aktif">Aktif</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="cursor-pointer text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            type="button"
            className="cursor-pointer text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => router.push("/admin/peminjaman")}
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
