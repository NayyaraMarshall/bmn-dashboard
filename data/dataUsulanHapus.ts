export type dataUsulanHapus = {
  idUsulan: number;
  ikmm: number;
  namaBarang: string;
  unit: number;
  kategori:
    | "Laptop"
    | "Monitor"
    | "Printer"
    | "TV"
    | "Peripheral"
    | "Internet"
    | "Lainnya";
  kondisiBarang: "Baik" | "Rusak" | "Dalam Perbaikan" | "Rusak Berat";
  tanggalUsulan: string;
  alasan: string;
  statusUsulan: "Menunggu" | "Disetujui" | "Ditolak"; 
  disetujuiOleh: string;
};

export const dataUsulanHapus: dataUsulanHapus[] = [
  {
    idUsulan: 1,
    ikmm: 3100102002,
    namaBarang: "Printer Epson L3150",
    unit: 2,
    kategori: "Printer",
    kondisiBarang: "Rusak Berat",
    tanggalUsulan: "2025-10-20",
    alasan: "Sudah tidak berfungsi dan tidak bisa diperbaiki",
    statusUsulan: "Menunggu",
    disetujuiOleh: "",
  },
  {
    idUsulan: 2,
    ikmm: 3100102003,
    namaBarang: "Monitor Dell 24 inch",
    unit: 1,
    kategori: "Monitor",
    kondisiBarang: "Baik",
    tanggalUsulan: "2025-09-30",
    alasan: "Sudah tidak digunakan",
    statusUsulan: "Disetujui",
    disetujuiOleh: "Kepala Subbag BMN",
  },
];
