"use client";

type HeaderProps = {
  title: string;
  role: "admin" | "user";
};

export default function Header({ title, role }: HeaderProps) {
  const isAdmin = role === "admin";
  const bgColor = isAdmin ? "bg-red-600" : "bg-blue-600";
  const headerTitle = title;
  const subtitle = "Pusat Data dan Teknologi Informasi";

  return (
    <header
      className={`${bgColor} shadow px-6 py-4 flex justify-between items-center text-white`}
    >
      <h1 className="text-lg font-bold">{headerTitle}</h1>
      <div className="flex items-center gap-3">
        <img
          src="/logopu.png"
          alt="Logo Perusahaan"
          width="28"
          className="object-contain"
        />
        <span className="text-m font-semibold">{subtitle}</span>
      </div>
    </header>
  );
}
