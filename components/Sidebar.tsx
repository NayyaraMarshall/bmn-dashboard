import Link from "next/link";

export default function Sidebar({ role }: { role: "admin" | "user" }) {
  const bgColor = role === "admin" ? "bg-red-600" : "bg-blue-600";
  const hoverColor = role === "admin" ? "hover:bg-red-500" : "hover:bg-blue-500";

  return (
    <aside className={`w-64 h-screen ${bgColor} text-white flex flex-col`}>
      <div>
        <div className="p-6 text-xl font-bold">Dashboard BMN</div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li><Link href={`/${role}/dashboard`} className={`block py-2 px-3 rounded ${hoverColor}`}>Dashboard</Link></li>
            <li><Link href={`/${role}/bmn`} className={`block py-2 px-3 rounded ${hoverColor}`}>Data BMN</Link></li>
            {role === "admin" && <li><Link href="/admin/peminjaman" className={`block py-2 px-3 rounded ${hoverColor}`}>Data Peminjaman</Link></li>}
          </ul>
        </nav>
      </div>
      {role === "admin" && <div className="p-4">
        <button className="w-full cursor-pointer font-semibold bg-blue-600 hover:bg-blue-500 py-2 rounded">Logout</button>
        </div>}
    </aside>
  );
}
