"use client";

type HeaderProps = {
  title: string;
  role: "admin" | "user";
};

export default function Header({ title, role }: HeaderProps) {
  const isAdmin = role === "admin";
  const bgColor = isAdmin ? "bg-purple-600" : "bg-blue-600";

  // Tambahin prefix ADMIN kalau role admin
  const headerTitle = isAdmin 
    ? `ADMIN ${title}` 
    : title;

  const subtitle = "Pusat Data dan Teknologi Informasi";

  return (
    <header
      className={`${bgColor} shadow px-6 py-4 flex justify-between items-center text-white`}
    >
      <h1 className="text-l font-bold">{headerTitle}</h1>
      <div className="font-poppins flex items-center gap-3">
        <img
          src="/logopu.png"
          alt="Logo Perusahaan"
          width="28"
          className="object-contain"
        />
        {/* samain ukuran & ketebalan subtitle */}
        <span className="text-sm font-bold">{subtitle}</span>
      </div>
    </header>
  );
}
