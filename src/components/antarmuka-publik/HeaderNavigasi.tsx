"use client";

import Link from "next/link";
import { PengalihTema } from "@/components/pengalih-tema";
import { Layers, Shield, Sparkles, Terminal } from "lucide-react";

interface HeaderNavigasiProps {
  namaLengkap: string;
  gelarProfesi: string;
}

export function HeaderNavigasi({ namaLengkap, gelarProfesi }: HeaderNavigasiProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Identitas Logo */}
        <Link
          href="/"
          id="link-beranda"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-lg bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {namaLengkap || "Personal Hub"}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5 truncate max-w-[180px] sm:max-w-none">
              {gelarProfesi || "Digital Portfolio & Deployment Engine"}
            </span>
          </div>
        </Link>

        {/* Menu Navigasi & Aksi */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600 dark:text-slate-300">
            <a
              href="#bagian-proyek"
              className="px-3 py-1.5 rounded-md hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Karya & Proyek
            </a>
            <a
              href="#bagian-keahlian"
              className="px-3 py-1.5 rounded-md hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Keahlian
            </a>
            <a
              href="#bagian-kontak"
              className="px-3 py-1.5 rounded-md hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              Kontak
            </a>
          </nav>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          {/* Pengalih Tema */}
          <PengalihTema />

          {/* Tombol Akses Admin */}
          <Link
            href="/admin"
            id="tombol-masuk-admin"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 transition-all hover:border-slate-300 dark:hover:border-slate-700"
          >
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
