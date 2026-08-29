"use client";

import { PengalihTema } from "@/components/pengalih-tema";
import { User, ShieldCheck } from "lucide-react";

interface HeaderAdminProps {
  judulHalaman: string;
  namaAdmin?: string;
}

export function HeaderAdmin({ judulHalaman, namaAdmin = "Administrator" }: HeaderAdminProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
          {judulHalaman}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <PengalihTema />

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">{namaAdmin}</span>
        </div>
      </div>
    </header>
  );
}
