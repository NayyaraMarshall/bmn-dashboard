  "use client";

  import Link from "next/link";
  import { usePathname } from "next/navigation";
  import { RxDashboard } from "react-icons/rx";
  import { FaBoxOpen } from "react-icons/fa";
  import { MdAssignment } from "react-icons/md";
  import { MdDashboard } from "react-icons/md";
  import { MdHistory } from "react-icons/md";
  import { MdOutlineDeleteSweep } from "react-icons/md";


  export default function Sidebar({ role }: { role: "admin" | "user" }) {
    const pathname = usePathname();
    const bgColor = "bg-white";
    const hoverColor = "hover:bg-gray-300";
    const activeColor =
      role === "admin" ? "bg-purple-500 text-white" : "bg-blue-500 text-white";

    const menuItems = [
      { href: `/${role}/dashboard`, label: "Dashboard Utama", icon: <RxDashboard className="text-base" /> },
      { href: `/${role}/bmn`, label: "Data BMN", icon: <FaBoxOpen className="text-base"/> },
      ...(role === "admin"
        ? [
          { href: "/admin/peminjaman", label: "Data Peminjaman", icon: <MdAssignment className="text-base" /> },
          { href: "/admin/log-peminjaman", label: "Log Peminjaman", icon: <MdHistory className="text-base"/> },
          { href: "/admin/rencana-penghapusan", label: "Usulan Hapus", icon: <MdOutlineDeleteSweep className="text-base"/> },
        ]
        : []),
    ];

    return (
      <aside className={`w-44 h-screen ${bgColor} text-black flex flex-col`}>
        <div>
          <div className="flex mb-2 items-center gap-2 px-4 py-6">
            <MdDashboard className="text-xl text-blue-950" />
            <span className="text-sm font-bold">E-BMN</span>
          </div>
          <nav className="px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname.startsWith(item.href); 
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`text-[10px] font-semibold mb-3 flex items-center gap-2 block py-2 px-3 rounded-md transition-colors ${
                        isActive ? activeColor : "bg-gray-200 " + hoverColor
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {role === "admin" && (
          <div className="p-4 ">
            <button className="w-full cursor-pointer font-semibold text-white text-[10px] bg-gray-500 hover:bg-purple-500 py-2 rounded-[1vw]">
              Logout
            </button>
          </div>
        )}
      </aside>
    );
  }
