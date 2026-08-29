"use client";

import * as React from "react";
import { motion } from "framer-motion";

interface ItemBagian {
  id: string;
  nomor: string;
  label: string;
}

const DAFTAR_BAGIAN: ItemBagian[] = [
  { id: "bagian-hero", nomor: "01", label: "Beranda" },
  { id: "bagian-filosofi", nomor: "02", label: "Manfaat" },
  { id: "bagian-proyek", nomor: "03", label: "Hasil Karya" },
  { id: "bagian-pipeline", nomor: "04", label: "Peluncuran" },
  { id: "bagian-keahlian", nomor: "05", label: "Keahlian" },
  { id: "bagian-kontak", nomor: "06", label: "Hubungi" },
];

export function PelacakBagianSamping() {
  const [bagianAktif, setBagianAktif] = React.useState<string>("bagian-hero");
  const [persentaseScroll, setPersentaseScroll] = React.useState<number>(0);

  React.useEffect(() => {
    function tanganiScroll() {
      // Hitung persentase scroll keseluruhan
      const totalTinggi = document.documentElement.scrollHeight - window.innerHeight;
      if (totalTinggi > 0) {
        const persentase = Math.min(100, Math.max(0, Math.round((window.scrollY / totalTinggi) * 100)));
        setPersentaseScroll(persentase);
      }

      // Deteksi section yang sedang berada di tengah layar
      const titikTengah = window.scrollY + window.innerHeight * 0.35;
      let idDitemukan = DAFTAR_BAGIAN[0].id;

      for (const item of DAFTAR_BAGIAN) {
        const el = document.getElementById(item.id);
        if (el) {
          const posisiAtas = el.offsetTop;
          const tinggiEl = el.offsetHeight;
          if (titikTengah >= posisiAtas && titikTengah < posisiAtas + tinggiEl) {
            idDitemukan = item.id;
            break;
          } else if (titikTengah >= posisiAtas) {
            idDitemukan = item.id;
          }
        }
      }
      setBagianAktif(idDitemukan);
    }

    window.addEventListener("scroll", tanganiScroll, { passive: true });
    tanganiScroll();
    return () => window.removeEventListener("scroll", tanganiScroll);
  }, []);

  function gulirKeBagian(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <aside
      aria-label="Pelacak Bagian Halaman"
      className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 select-none pointer-events-none"
    >
      {/* Indikator Persentase Scroll Mikro */}
      <div className="pointer-events-auto px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono font-bold text-slate-400 mb-1 shadow-lg">
        <span className="text-blue-400">{persentaseScroll}</span>%
      </div>

      {/* Rel Pelacak Vertikal */}
      <div className="pointer-events-auto flex flex-col items-end gap-2.5 py-3 px-2 rounded-full bg-black/40 backdrop-blur-md border border-white/8 shadow-2xl">
        {DAFTAR_BAGIAN.map((item) => {
          const apakahAktif = bagianAktif === item.id;

          return (
            <button
              key={item.id}
              onClick={() => gulirKeBagian(item.id)}
              className="group relative flex items-center justify-end p-1 cursor-pointer focus:outline-none"
              title={`${item.nomor} - ${item.label}`}
            >
              {/* Tooltip Label yang muncul saat hover */}
              <div className="absolute right-7 px-2.5 py-1 rounded-md bg-[#090d16] border border-white/15 text-[10px] font-mono font-bold text-slate-200 whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 pointer-events-none flex items-center gap-1.5">
                <span className="text-blue-400">{item.nomor}</span>
                <span>{item.label}</span>
              </div>

              {/* Titik / Garis Indikator */}
              <div className="relative flex items-center justify-center">
                {apakahAktif && (
                  <motion.div
                    layoutId="lingkaran-pelacak-aktif"
                    className="absolute w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/50"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}

                <div
                  className={`transition-all duration-300 rounded-full ${
                    apakahAktif
                      ? "w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                      : "w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400 group-hover:scale-125"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
