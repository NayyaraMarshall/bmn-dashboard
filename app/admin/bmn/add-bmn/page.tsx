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
  const [ikmm, setIkmm] = useState(""); // otomatis terisi

  // mapping kategori -> ikmm
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

    if (!namaBarang || !kategori || !jumlahBarang || !tanggalPerolehan) {
      alert("Semua field wajib diisi");
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-sm font-bold mb-4">Tambah Data BMN</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-medium mb-1">Nama Barang</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            placeholder="Masukkan nama barang"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
          />
        </div>

        {/* kategori */}
        <div>
          <label className="block text-xs font-medium mb-1">Kategori</label>
          <select
            className="text-xs w-full border px-3 py-2 rounded"
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

        {/* ikmm otomatis */}
        <div>
          <label className="block text-xs font-medium mb-1">Kode IKMM</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded bg-gray-100"
            value={ikmm}
            readOnly
          />
        </div>

        {/* jumlah */}
        <div>
          <label className="block text-xs font-medium mb-1">Jumlah</label>
          <input
            type="number"
            min={1}
            className="text-xs w-full border px-3 py-2 rounded"
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

        {/* tanggal */}
        <div>
          <label className="block text-xs font-medium mb-1">Tanggal Perolehan</label>
          <input
            type="date"
            className="text-xs w-full border px-3 py-2 rounded"
            value={tanggalPerolehan}
            onChange={(e) => setTanggalPerolehan(e.target.value)}
            required
          />
        </div>

        {/* tombol */}
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="cursor-pointer text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Simpan
          </button>
          <button
            type="button"
            className="cursor-pointer text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            onClick={() => router.push("/admin/bmn")}
          >
            Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
