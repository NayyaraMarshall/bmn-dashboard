"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { dataBMN, BMN } from "@/data/dataBMN";

export default function EditBMNPage() {
  const router = useRouter();
  const { id } = useParams();
  const idBMN = Number(id);

  const [bmn, setBmn] = useState<BMN | null>(null);
  const [namaBarang, setNamaBarang] = useState("");
  const [ikmm, setIkmm] = useState("");
  const [kategori, setKategori] = useState("");
  const [jumlahBarang, setJumlahBarang] = useState<number | "">("");
  const [kondisiBaik, setKondisiBaik] = useState<number | "">("");
  const [dalamPerbaikan, setDalamPerbaikan] = useState<number | "">("");

  // ambil data by id
  useEffect(() => {
    const found = dataBMN.find((item) => item.idBMN === idBMN);
    if (found) {
      setBmn(found);
      setNamaBarang(found.namaBarang);
      setIkmm(found.ikmm);
      setKategori(found.kategori);
      setJumlahBarang(found.jumlahBarang);
      setKondisiBaik(found.kondisiBaik);
      setDalamPerbaikan(found.kondisiRusak);
    }
  }, [idBMN]);

  // submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm("Apakah Anda yakin ingin menyimpan perubahan ini?")) return;

    const index = dataBMN.findIndex((item) => item.idBMN === idBMN);
    if (index !== -1) {
      dataBMN[index] = {
        ...dataBMN[index],
        jumlahBarang: Number(jumlahBarang),
        kondisiBaik: Number(kondisiBaik),
        kondisiRusak: Number(dalamPerbaikan),
      };
    }
    alert("Perubahan berhasil disimpan!");
    router.push("/admin/bmn");
  };

  if (!bmn)
    return (
      <div className="rounded-lg bg-white p-6 shadow text-xs text-gray-600">
        Data tidak ditemukan...
      </div>
    );

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-sm font-bold">Edit Data BMN</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* nama barang */}
        <div>
          <label className="mb-1 block text-xs font-medium">Nama Barang</label>
          <input
            type="text"
            className="w-full text-gray-700 rounded border bg-gray-100 px-3 py-2 text-xs"
            value={namaBarang}
            readOnly
          />
        </div>

        {/* kode IKMM (kategori)*/}
        <div>
          <label className="mb-1 block text-xs font-medium">
            Kode IKMM (Kategori)
          </label>
          <input
            type="text"
            className="w-full text-gray-700 rounded border bg-gray-100 px-3 py-2 text-xs"
            value={`${ikmm} (${kategori})`}
            readOnly
          />
        </div>

        {/* jumlah */}
        <div>
          <label className="mb-1 block text-xs font-medium">Jumlah</label>
          <input
            type="number"
            min={1}
            className="w-full rounded border px-3 py-2 text-xs"
            value={jumlahBarang}
            onChange={(e) =>
              setJumlahBarang(
                e.target.value === "" ? "" : Math.max(1, Number(e.target.value))
              )
            }
            required
          />
        </div>

        {/* kondisi baik */}
        <div>
          <label className="mb-1 block text-xs font-medium">Kondisi Baik</label>
          <input
            type="number"
            min={0}
            className="w-full rounded border px-3 py-2 text-xs"
            value={kondisiBaik}
            onChange={(e) =>
              setKondisiBaik(
                e.target.value === "" ? "" : Math.max(0, Number(e.target.value))
              )
            }
            required
          />
        </div>

        {/* dalam perbaikan */}
        <div>
          <label className="mb-1 block text-xs font-medium">Dalam Perbaikan</label>
          <input
            type="number"
            min={0}
            className="w-full rounded border px-3 py-2 text-xs"
            value={dalamPerbaikan}
            onChange={(e) =>
              setDalamPerbaikan(
                e.target.value === "" ? "" : Math.max(0, Number(e.target.value))
              )
            }
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
