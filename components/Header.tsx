"use client";

type HeaderProps = {
  title: string;
  role: "admin" | "user";
};

export default function Header({ title, role }: HeaderProps) {
  const isAdmin = role === "admin";
  const bgColor = isAdmin ? "bg-purple-500" : "bg-blue-500";

  const headerTitle = isAdmin 
    ? `Admin ${title}` 
    : title;

  const subtitle = "Pusat Data dan Teknologi Informasi";

  return (
    <header
      className={`${bgColor} shadow px-6 py-4 flex justify-between items-center text-white`}
    >
      <h1 className="text-sm font-bold">{headerTitle}</h1>
      <div className="font-poppins flex items-center gap-3">
        <img
          src="/logopu.png"
          alt="Logo Perusahaan"
          width="20"
          className="object-contain"
        />
        {/* samain ukuran & ketebalan subtitle */}
        <span className="text-xs font-bold">{subtitle}</span>
      </div>
    </header>
  );
}
