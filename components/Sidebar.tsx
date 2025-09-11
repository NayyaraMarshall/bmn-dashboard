"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { FaBoxOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";

export default function Sidebar({ role }: { role: "admin" | "user" }) {
  const pathname = usePathname();
  const bgColor = "bg-gray-100";
  const hoverColor = "hover:bg-gray-300";
  const activeColor = role === "admin" ? "bg-red-600 text-white" : "bg-blue-500 text-white";

  const menuItems = [
    { href: `/${role}/dashboard`, label: "Dashboard Utama", icon: <RxDashboard /> },
    { href: `/${role}/bmn`, label: "Data BMN", icon: <FaBoxOpen /> },
    ...(role === "admin"
      ? [{ href: "/admin/peminjaman", label: "Data Peminjaman", icon: <MdAssignment /> }]
      : []),
  ];

  return (
    <aside className={`w-60 h-screen ${bgColor} text-black flex flex-col`}>
      <div>
        <div className="p-6 text-l text-center font-bold">MENU DASHBOARD</div>
        <nav className="px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 block py-2 px-3 rounded transition-colors ${
                    pathname === item.href ? activeColor :  "bg-gray-200 " + hoverColor
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {role === "admin" && (
        <div className="p-4">
          <button className="w-full cursor-pointer font-semibold text-white bg-gray-500 hover:bg-red-600 py-2 rounded">
            Logout
          </button>
        </div>
      )}
    </aside>
  );
}


