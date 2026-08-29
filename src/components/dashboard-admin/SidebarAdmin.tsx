"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  UserCheck,
  Globe,
  LogOut,
  Terminal,
  Server,
  Sparkles,
  Mail,
} from "lucide-react";

export function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      label: "Ringkasan & Metrik",
      href: "/admin",
      ikon: LayoutDashboard,
    },
    {
      label: "Manajer File & Proyek",
      href: "/admin/proyek",
      ikon: FolderGit2,
    },
    {
      label: "Inbox & Pesan Masuk",
      href: "/admin/pesan",
      ikon: Mail,
    },
    {
      label: "Biodata & Profil",
      href: "/admin/pengaturan",
      ikon: UserCheck,
    },
    {
      label: "Panduan Server & Hosting",
      href: "/admin/panduan-server",
      ikon: Server,
    },
  ];

  const tanganiKeluar = async () => {
    try {
      await fetch("/api/auth/keluar", { method: "POST" });
      router.push("/masuk-admin");
      router.refresh();
    } catch (galat) {
      console.error("Gagal keluar:", galat);
    }
  };

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 flex flex-col justify-between shrink-0 h-screen sticky top-0 transition-colors">
      
      {/* Header Sidebar */}
      <div>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-xs font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Admin Dashboard
            </h1>
            <p className="text-[10px] text-slate-500 font-mono">Micro-Deploy Engine</p>
          </div>
        </div>

        {/* Menu Navigasi */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const Ikon = item.ikon;
            const apakahAktif =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                id={`menu-admin-${item.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  apakahAktif
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <Ikon className={`w-4 h-4 ${apakahAktif ? "text-white" : "text-slate-500"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Sidebar */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
        >
          <Globe className="w-4 h-4 text-blue-500" />
          <span>Lihat Situs Publik</span>
        </Link>

        <button
          type="button"
          onClick={tanganiKeluar}
          id="tombol-keluar-admin"
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar Sesi</span>
        </button>
      </div>

    </aside>
  );
}
