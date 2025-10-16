"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dataPeminjaman, Peminjaman } from "@/data/dataPeminjaman";

export default function AddPeminjamanPage() {
  const router = useRouter();

  // state
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [statusPegawai, setStatusPegawai] =
    useState<"PPPK" | "KI" | "PNS" | "Magang">("Magang");
  const [nip, setNip] = useState("");
  const [kategori, setKategori] = useState("");
  const [ikmm, setIkmm] = useState<number | "">("");
  const [namaBarang, setNamaBarang] = useState("");
  const [jumlahPinjam, setJumlahPinjam] = useState<number | "">("");
  const [tanggalPinjam, setTanggalPinjam] = useState("");
  const [tanggalKembali, setTanggalKembali] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [keterangan, setKeterangan] = useState("");

  // mapping kategori -> ikmm
  const kategoriToIkmm: Record<string, number> = {
    Laptop: 3100106002,
    TV: 3100103002,
    Monitor: 3100106002,
    Printer: 3100104002,
  };

  // format tanggal ke dd-mm-yyyy
  const formatDate = (isoDate: string): string => {
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  // validasi submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !namaPeminjam ||
      !statusPegawai ||
      !nip ||
      !kategori ||
      !ikmm ||
      !namaBarang ||
      !jumlahPinjam ||
      !tanggalPinjam ||
      !tujuan
    ) {
      alert("Semua field wajib diisi (kecuali tanggal kembali & keterangan)");
      return;
    }

    // nomor peminjaman auto increment
    const last = dataPeminjaman[dataPeminjaman.length - 1];
    const lastNomor = last
      ? parseInt(last.nomorPeminjaman.split("/")[0])
      : 69;
    const nextNomor = lastNomor + 1;
    const nomorPeminjaman = `${nextNomor}/BDI-TB/I/2024`;

    const newPeminjaman: Peminjaman = {
      idPeminjaman: dataPeminjaman.length + 1,
      nomorPeminjaman,
      namaPeminjam,
      statusPegawai,
      nip,
      ikmm: Number(ikmm),
      namaBarang,
      kategori,
      jumlahPinjam: Number(jumlahPinjam),
      tanggalPinjam: formatDate(tanggalPinjam),
      tanggalKembali: tanggalKembali ? formatDate(tanggalKembali) : null,
      tujuan,
      keterangan: keterangan || "", 
      statusPeminjaman: "Aktif",
    };

    dataPeminjaman.push(newPeminjaman);
    router.push("/admin/peminjaman");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-h-[calc(100vh-100px)] overflow-y-auto">
      <h2 className="text-sm font-bold mb-4">Tambah Data Peminjaman</h2>
      <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Nama Peminjam */}
        <div>
          <label className="block text-xs font-medium mb-1">Nama Peminjam *</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={namaPeminjam}
            onChange={(e) => setNamaPeminjam(e.target.value)}
            required
          />
        </div>

        {/* Nama Barang */}
        <div>
          <label className="block text-xs font-medium mb-1">Nama Barang *</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
          />
        </div>

        {/* NIP */}
        <div>
          <label className="block text-xs font-medium mb-1">NIP *</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            required
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-medium mb-1">Kategori *</label>
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

        {/* Status Pegawai */}
        <div>
          <label className="block text-xs font-medium mb-1">Status Pegawai *</label>
          <select
            className="text-xs w-full border px-3 py-2 rounded"
            value={statusPegawai}
            onChange={(e) =>
              setStatusPegawai(e.target.value as "PPPK" | "KI" | "PNS" | "Magang")
            }
            required
          >
            <option value="PPPK">PPPK</option>
            <option value="KI">KI</option>
            <option value="PNS">PNS</option>
            <option value="Magang">Magang</option>
          </select>
        </div>

        {/* Kode IKMM */}
        <div>
          <label className="block text-xs font-medium mb-1">Kode IKMM</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded bg-gray-100"
            value={ikmm}
            readOnly
          />
        </div>

        {/* Tanggal Pinjam */}
        <div>
          <label className="block text-xs font-medium mb-1">Tanggal Pinjam *</label>
          <input
            type="date"
            className="text-xs w-full border px-3 py-2 rounded"
            value={tanggalPinjam}
            onChange={(e) => setTanggalPinjam(e.target.value)}
            required
          />
        </div>

        {/* Tanggal Kembali (Opsional) */}
        <div>
          <label className="block text-xs font-medium mb-1">Tanggal Kembali</label>
          <input
            type="date"
            className="text-xs w-full border px-3 py-2 rounded"
            value={tanggalKembali}
            onChange={(e) => setTanggalKembali(e.target.value)}
          />
        </div>

        {/* Jumlah Pinjam */}
        <div>
          <label className="block text-xs font-medium mb-1">Jumlah Pinjam *</label>
          <input
            type="number"
            min={1}
            className="text-xs w-full border px-3 py-2 rounded"
            value={jumlahPinjam}
            onChange={(e) =>
              setJumlahPinjam(
                e.target.value === "" ? "" : Math.max(1, Number(e.target.value))
              )
            }
            required
          />
        </div>

        {/* Tujuan */}
        <div>
          <label className="block text-xs font-medium mb-1">Tujuan *</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={tujuan}
            onChange={(e) => setTujuan(e.target.value)}
            required
          />
        </div>

        {/* Keterangan (Opsional) */}
        <div className="col-span-2">
          <label className="block text-xs font-medium mb-1">Keterangan</label>
          <input
            type="text"
            className="text-xs w-full border px-3 py-2 rounded"
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </div>

        {/* tombol */}
        <div className="col-span-2 flex gap-2 justify-end mt-4">
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