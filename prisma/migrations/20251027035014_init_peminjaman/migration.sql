-- CreateEnum
CREATE TYPE "StatusPegawai" AS ENUM ('PPPK', 'KI', 'PNS', 'Magang');

-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('Laptop', 'Monitor', 'Printer', 'TV', 'Peripheral', 'Internet', 'Lainnya');

-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('Aktif', 'Selesai', 'Terlambat');

-- CreateTable
CREATE TABLE "Peminjaman" (
    "idPeminjaman" SERIAL NOT NULL,
    "nomorPeminjaman" TEXT NOT NULL,
    "namaPeminjam" TEXT NOT NULL,
    "statusPegawai" "StatusPegawai" NOT NULL,
    "nip" TEXT NOT NULL,
    "ikmm" INTEGER NOT NULL,
    "namaBarang" TEXT NOT NULL,
    "unit" INTEGER NOT NULL,
    "kategori" "Kategori" NOT NULL,
    "jumlahPinjam" INTEGER NOT NULL,
    "tanggalPinjam" TIMESTAMP(3) NOT NULL,
    "tanggalKembali" TIMESTAMP(3),
    "tujuan" TEXT NOT NULL,
    "keterangan" TEXT,
    "statusPeminjaman" "StatusPeminjaman" NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("idPeminjaman")
);
