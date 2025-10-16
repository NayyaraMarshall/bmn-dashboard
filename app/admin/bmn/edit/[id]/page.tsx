"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { dataBMN } from "@/data/dataBMN";

export default function EditBMNPage() {
  const { id } = useParams();
  const router = useRouter();

  // ambil data berdasarkan id
  const item = dataBMN.find((bmn) => bmn.idBMN.toString() === id);

  // state untuk form
  const [jumlah, setJumlah] = useState(item?.jumlahBarang || 0);
  const [kondisiBaik, setKondisiBaik] = useState(item?.kondisiBaik || 0);
  const [dalamPerbaikan, setDalamPerbaikan] = useState(item?.kondisiRusak || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm("Yakin ingin menyimpan perubahan?");
    if (!confirmed) return;

    console.log("Data baru:", {
      idBMN: item?.idBMN,
      jumlah,
      kondisiBaik,
      dalamPerbaikan,
    });

    // nanti di sini bisa diintegrasikan ke backend
    alert("Perubahan disimpan!");
    router.push("/admin/bmn");
  };

  if (!item) {
    return <div className="p-4 text-sm text-red-500">Data BMN tidak ditemukan.</div>;
  }

  return (
    <div className="rounded-lg bg-white p-6 space-y-3 shadow">
      <h1 className="text-sm font-bold">Edit Data BMN</h1>

      {/* Info barang */}
      <div className="text-sm">
        <p>{item.namaBarang}</p>
        <p>{item.ikmm} / {item.kategori}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border rounded-lg p-4">
        {/* Data lama */}
        <div>
          <h2 className="text-xs font-semibold mb-2">Data Sebelumnya:</h2>
          <div className="text-xs space-y-1">
            <p>Jumlah: {item.jumlahBarang}</p>
            <p>Kondisi Baik: {item.kondisiBaik}</p>
            <p>Dalam Perbaikan: {item.kondisiRusak}</p>
          </div>
        </div>

        <hr />

        {/* Data baru */}
        <div>
          <h2 className="text-xs font-semibold mb-2">Perubahan Data:</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block mb-1">Jumlah</label>
              <Input
                type="number"
                value={jumlah}
                onChange={(e) => setJumlah(Number(e.target.value))}
                className="text-xs"
              />
            </div>
            <div>
              <label className="block mb-1">Kondisi Baik</label>
              <Input
                type="number"
                value={kondisiBaik}
                onChange={(e) => setKondisiBaik(Number(e.target.value))}
                className="text-xs"
              />
            </div>
            <div>
              <label className="block mb-1">Dalam Perbaikan</label>
              <Input
                type="number"
                value={dalamPerbaikan}
                onChange={(e) => setDalamPerbaikan(Number(e.target.value))}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        {/* Tombol aksi */}
        <div className="flex justify-end gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            className="text-xs"
            onClick={() => router.back()}
          >
            Batal
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-xs">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  );
}
