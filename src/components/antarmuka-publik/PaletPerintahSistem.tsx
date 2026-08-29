"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Command,
  Sparkles,
  Zap,
  Box,
  Terminal,
  FolderGit2,
  Cpu,
  Mail,
  Shield,
  Server,
  X,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PaletPerintahSistemProps {
  terbuka: boolean;
  onTutup: () => void;
}

interface ItemAksi {
  id: string;
  judul: string;
  kategori: string;
  ikon: typeof Search;
  shortcut?: string;
  aksi: () => void;
}

export function PaletPerintahSistem({ terbuka, onTutup }: PaletPerintahSistemProps) {
  const [kataKunci, setKataKunci] = React.useState("");
  const router = useRouter();

  // Keyboard shortcut listener Ctrl+K / Cmd+K
  React.useEffect(() => {
    function tanganiKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (terbuka) onTutup();
      }
      if (e.key === "Escape" && terbuka) {
        onTutup();
      }
    }
    window.addEventListener("keydown", tanganiKeyDown);
    return () => window.removeEventListener("keydown", tanganiKeyDown);
  }, [terbuka, onTutup]);

  function arahkanKe(idElemen: string) {
    onTutup();
    const el = document.getElementById(idElemen);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  const DAFTAR_AKSI: ItemAksi[] = [
    {
      id: "filosofi-manfaat",
      judul: "Manfaat Layanan & Keuntungan Bekerja Sama",
      kategori: "Manfaat",
      ikon: Sparkles,
      shortcut: "M",
      aksi: () => arahkanKe("bagian-filosofi"),
    },
    {
      id: "galeri-proyek",
      judul: "Lihat Daftar Hasil Karya & Portofolio",
      kategori: "Hasil Karya",
      ikon: Box,
      shortcut: "P",
      aksi: () => arahkanKe("bagian-proyek"),
    },
    {
      id: "arsitektur-sistem",
      judul: "Panduan Teknis & Cara Kerja Sistem",
      kategori: "Panduan",
      ikon: Server,
      shortcut: "A",
      aksi: () => {
        onTutup();
        router.push("/arsitektur");
      },
    },
    {
      id: "pipeline-deploy",
      judul: "Coba Simulasi Peluncuran Website Instan",
      kategori: "Simulasi Web",
      ikon: Zap,
      shortcut: "D",
      aksi: () => arahkanKe("bagian-pipeline"),
    },
    {
      id: "tech-stack",
      judul: "Daftar Alat & Teknologi yang Dikuasai",
      kategori: "Keahlian",
      ikon: Cpu,
      shortcut: "S",
      aksi: () => arahkanKe("bagian-keahlian"),
    },
    {
      id: "kontak",
      judul: "Kirim Pesan Langsung ke Bagas Pratama",
      kategori: "Hubungi",
      ikon: Mail,
      shortcut: "C",
      aksi: () => arahkanKe("bagian-kontak"),
    },
  ];

  const aksiTerfilter = DAFTAR_AKSI.filter((item) =>
    item.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
    item.kategori.toLowerCase().includes(kataKunci.toLowerCase())
  );

  return (
    <AnimatePresence>
      {terbuka && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onTutup}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Dialog Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-xl rounded-3xl kaca-gelap border border-white/15 shadow-2xl overflow-hidden z-10"
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-[#0b0e14]">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                autoFocus
                id="input-palet-perintah"
                name="kata_kunci_perintah"
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Ketik perintah atau navigasi (misal: lab, galeri, deploy)..."
                className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
              />
              <button
                onClick={onTutup}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Aksi */}
            <div className="p-3 max-h-80 overflow-y-auto space-y-1 bg-[#07090e]">
              {aksiTerfilter.length > 0 ? (
                aksiTerfilter.map((item) => {
                  const IkonItem = item.ikon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.aksi}
                      className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-blue-600/15 hover:border-blue-500/30 border border-transparent transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                          <IkonItem className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {item.judul}
                          </p>
                          <p className="text-[10px] text-slate-500 font-mono">{item.kategori}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.shortcut && (
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[9px] font-mono text-slate-500">
                            {item.shortcut}
                          </span>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs font-mono text-slate-600">
                  Tidak ada perintah yang sesuai dengan &ldquo;{kataKunci}&rdquo;
                </div>
              )}
            </div>

            {/* Footer Bar */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-[#05070a] border-t border-white/5 text-[10px] font-mono text-slate-500">
              <div className="flex items-center gap-3">
                <span>[ESC] Tutup</span>
                <span>[↑↓] Navigasi</span>
                <span>[↵] Pilih</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 font-bold">
                <Command className="w-3 h-3 text-blue-400" />
                <span>RAYCAST PALETTE READY</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
