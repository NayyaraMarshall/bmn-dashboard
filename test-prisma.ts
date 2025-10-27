import prisma from "./lib/prisma";
import "dotenv/config";

async function main() {
  const data = await prisma.peminjaman.findMany();
  console.log(data);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
