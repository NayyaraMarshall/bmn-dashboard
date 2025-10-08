"use client";

export default function AddBMNPage() {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Tambah Data BMN</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Barang</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Masukkan nama barang"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Kategori</label>
          <select className="w-full border px-3 py-2 rounded">
            <option>Laptop</option>
            <option>TV</option>
            <option>Monitor</option>
            <option>Printer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jumlah</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            placeholder="Masukkan jumlah"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tanggal Perolehan</label>
          <input type="date" className="w-full border px-3 py-2 rounded" /> 
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
