export default function Header({ title, role }: { title: string; role: "admin" | "user" }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">
        {role === "admin"
          ? "Admin Dashboard Monitoring Barang Milik Negara (BMN)"
          : "Dashboard Monitoring Barang Milik Negara (BMN)"}
      </h1>
      
      <div className="flex items-center space-x-3">
        <img src="/logopu.png" alt="Logo Perusahaan" width={25} className="object-contain"/>
        <h1 className="text-md font-semibold text-gray-800">Pusat Data dan Teknologi Informasi</h1>
      </div>
    </header>
  );
}
