"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dataBMN, BMN } from "@/data/dataBMN";

export default function AddBMNPage() {
  const router = useRouter();

  // state
  const [namaBarang, setNamaBarang] = useState("");
  const [kategori, setKategori] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState<number | "">("");
  const [tanggalPerolehan, setTanggalPerolehan] = useState("");
  const [ikmm, setIkmm] = useState(""); 

  // mapping kategori - IKMM
  const kategoriToIkmm: Record<string, string> = {
    Laptop: "3100106002",
    TV: "3100103002",
    Monitor: "3100106002",
    Printer: "3100104002",
  };

  // format tanggal
  const formatDate = (isoDate: string): string => {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !namaBarang || 
      !kategori || 
      !jumlahBarang || 
      !tanggalPerolehan
    ) {
      alert("Semua field wajib diisi!");
      return;
    }

    const newBMN: BMN = {
      idBMN: dataBMN.length + 1,
      ikmm,
      unit: 1,
      namaBarang,
      kategori,
      jumlahBarang: Number(jumlahBarang),
      tanggalPerolehan: formatDate(tanggalPerolehan),
      kondisiBaik: Number(jumlahBarang),
      kondisiRusak: 0,
      dipinjam: 0,
    };

    dataBMN.push(newBMN);
    router.push("/admin/bmn");
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-sm font-bold">Tambah Data BMN</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* nama barang */}
        <div>
          <label className="mb-1 block text-xs font-medium">Nama Barang *</label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2 text-xs"
            placeholder="Masukkan nama barang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
          />
        </div>

        {/* kategori */}
        <div>
          <label className="mb-1 block text-xs font-medium">Kategori *</label>
          <select
            className="w-full rounded border px-3 py-2 text-xs"
            value={kategori}
            onChange={(e) => {
              const val = e.target.value;
              setKategori(val);
              setIkmm(kategoriToIkmm[val] || "");
            }}
            required
          >
            <option value="">Pilih kategori</option>
            <option value="Laptop">Laptop</option>
            <option value="TV">TV</option>
            <option value="Monitor">Monitor</option>
            <option value="Printer">Printer</option>
          </select>
        </div>

        {/* IKMM */}
        <div>
          <label className="mb-1 block text-xs font-medium">Kode IKMM</label>
          <input
            type="text"
            className="w-full text-gray-700 rounded border bg-gray-100 px-3 py-2 text-xs"
            value={ikmm}
            readOnly
          />
        </div>

        {/* jumlah */}
        <div>
          <label className="mb-1 block text-xs font-medium">Jumlah *</label>
          <input
            type="number"
            min={1}
            className="w-full rounded border px-3 py-2 text-xs"
            placeholder="Masukkan jumlah"
            value={jumlahBarang}
            onChange={(e) =>
              setJumlahBarang(
                e.target.value === "" ? "" : Math.max(1, Number(e.target.value))
              )
            }
            required
          />
        </div>

        {/* tanggal perolehan */}
        <div>
          <label className="mb-1 block text-xs font-medium">Tanggal Perolehan *</label>
          <input
            type="date"
            className="w-full rounded border px-3 py-2 text-xs"
            value={tanggalPerolehan}
            onChange={(e) => setTanggalPerolehan(e.target.value)}
            required
          />
        </div>

        {/* button */}
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="cursor-pointer rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            type="button"
            className="cursor-pointer rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
            onClick={() => router.push("/admin/bmn")}
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
