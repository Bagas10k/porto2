"use client";

import Link from "next/link";
import { Terminal, Shield, Command, Server } from "lucide-react";
import { motion } from "framer-motion";
import * as React from "react";
import { PaletPerintahSistem } from "./PaletPerintahSistem";

interface NavbarPillMelayangProps {
  namaLengkap: string;
  gelarProfesi: string;
}

export function NavbarPillMelayang({ namaLengkap }: NavbarPillMelayangProps) {
  const [gulirMelewati, setGulirMelewati] = React.useState(false);
  const [paletTerbuka, setPaletTerbuka] = React.useState(false);

  React.useEffect(() => {
    function tanganiGulir() {
      setGulirMelewati(window.scrollY > 40);
    }
    window.addEventListener("scroll", tanganiGulir, { passive: true });
    return () => window.removeEventListener("scroll", tanganiGulir);
  }, []);

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
        <motion.header
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 px-3.5 py-1.5 rounded-full w-full max-w-xl transition-all duration-300 ${
            gulirMelewati
              ? "kaca-gelap bayangan-kedalaman-2 border border-white/15 shadow-2xl backdrop-blur-xl"
              : "bg-black/40 backdrop-blur-md border border-white/10"
          }`}
        >
          {/* Logo & Nama Ringkas */}
          <Link
            href="/"
            id="link-beranda-navbar"
            className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white group-hover:text-blue-400 tracking-tight transition-colors">
              {namaLengkap || "Bagas Pratama"}
            </span>
          </Link>

          {/* Sisi Kanan: Link Arsitektur + CMD+K Trigger + Admin */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Link Halaman Terpisah: Arsitektur */}
            <Link
              href="/arsitektur"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white rounded-full hover:bg-white/8 transition-all"
            >
              <Server className="w-3 h-3 text-cyan-400" />
              <span className="hidden sm:inline">Arsitektur</span>
            </Link>

            {/* Tombol Command Palette */}
            <button
              type="button"
              onClick={() => setPaletTerbuka(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
              title="Buka Command Palette (Ctrl+K)"
            >
              <Command className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-slate-400 px-1 py-0.2 rounded bg-white/10">
                ⌘K
              </span>
            </button>

            {/* Admin Link */}
            <Link
              href="/admin"
              id="tombol-masuk-admin-navbar"
              className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-white/8 hover:bg-blue-600 text-slate-300 hover:text-white border border-white/10 hover:border-blue-500 transition-all duration-200"
              title="Dashboard Admin"
            >
              <Shield className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </motion.header>
      </div>

      {/* Modal Command Palette */}
      <PaletPerintahSistem
        terbuka={paletTerbuka}
        onTutup={() => setPaletTerbuka(false)}
      />
    </>
  );
}
