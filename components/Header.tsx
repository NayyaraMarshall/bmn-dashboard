export default function Header({ title, role }: { title: string; role: "admin" | "user" }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">Dasboard Monitoring Barang Milik Negara (BMN)</h1>
    </header>
  );
}
