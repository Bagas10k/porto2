"use client";

import { motion } from "framer-motion";
import { Search, Globe, Play, Image as ImageIcon, LayoutGrid, X, Bot, Cpu } from "lucide-react";

interface PenyaringProyekProps {
  kategoriAktif: string;
  onPilihKategori: (kategori: string) => void;
  kataKunci: string;
  onUbahKataKunci: (kataKunci: string) => void;
  totalProyek: number;
}

const daftarKategori = [
  { id: "SEMUA", label: "All", ikon: LayoutGrid, warnaHex: "#94a3b8" },
  { id: "Web Development", label: "Web", ikon: Globe, warnaHex: "#3b82f6" },
  { id: "AI & Automation", label: "AI / Agent", ikon: Bot, warnaHex: "#10b981" },
  { id: "Video & Multimedia", label: "Video", ikon: Play, warnaHex: "#ec4899" },
  { id: "Graphic Design", label: "Design", ikon: ImageIcon, warnaHex: "#a78bfa" },
];

export function PenyaringProyek({
  kategoriAktif,
  onPilihKategori,
  kataKunci,
  onUbahKataKunci,
  totalProyek,
}: PenyaringProyekProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        
        {/* Tab Kategori — Dark terminal style */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {daftarKategori.map((kat) => {
            const Ikon = kat.ikon;
            const apakahAktif = kategoriAktif === kat.id;
            return (
              <motion.button
                key={kat.id}
                id={`filter-kategori-${kat.id.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                type="button"
                onClick={() => onPilihKategori(kat.id)}
                whileTap={{ scale: 0.96 }}
                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black transition-all"
                style={{
                  background: apakahAktif ? `${kat.warnaHex}15` : "transparent",
                  border: apakahAktif ? `1px solid ${kat.warnaHex}35` : "1px solid rgba(255,255,255,0.06)",
                  color: apakahAktif ? kat.warnaHex : "#64748b",
                }}
              >
                {apakahAktif && (
                  <motion.div
                    layoutId="indikator-filter-aktif"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: `${kat.warnaHex}08` }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <Ikon className="w-3 h-3 relative" />
                <span className="relative">{kat.label}</span>
                {apakahAktif && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="relative w-1.5 h-1.5 rounded-full"
                    style={{ background: kat.warnaHex }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Input Pencarian — terminal style */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
          <input
            id="input-cari-proyek"
            name="kata_kunci_proyek"
            type="text"
            placeholder="Cari proyek..."
            value={kataKunci}
            onChange={(e) => onUbahKataKunci(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-8 py-2 text-[11px] rounded-lg bg-white/4 border border-white/8 text-slate-300 placeholder-slate-700 focus:outline-none focus:border-blue-500/40 focus:bg-white/5 transition-all font-mono"
          />
          {kataKunci && (
            <button
              onClick={() => onUbahKataKunci("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Keterangan jumlah */}
      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-700 px-0.5">
        <Cpu className="w-3 h-3" />
        <span>
          <span className="text-slate-400 font-black">{totalProyek}</span> proyek ditemukan
        </span>
        {kataKunci && (
          <span className="text-slate-700">
            · filter: <span className="text-slate-500">&quot;{kataKunci}&quot;</span>
          </span>
        )}
      </div>
    </div>
  );
}
