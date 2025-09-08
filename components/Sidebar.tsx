import Link from "next/link";

export default function Sidebar({ role }: { role: "admin" | "user" }) {
  return (
    <aside className="w-64 h-screen bg-blue-600 text-white flex flex-col justify-between">
      {/* Header Sidebar */}
      <div>
        <div className="p-6 text-xl font-bold">Dashboard BMN</div>
        <nav className="px-4">
          <ul className="space-y-2">
            <li>
              <Link
                href={`/${role}/dashboard`}
                className="block py-2 px-3 rounded hover:bg-blue-500"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={`/${role}/bmn`}
                className="block py-2 px-3 rounded hover:bg-blue-500"
              >
                Data BMN
              </Link>
            </li>
            {role === "admin" && (
              <li>
                <Link
                  href="/admin/peminjaman"
                  className="block py-2 px-3 rounded hover:bg-blue-500"
                >
                  Data Peminjaman
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Logout (admin only) */}
      {role === "admin" && (
        <div className="p-4">
          <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded">
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}
