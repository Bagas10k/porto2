"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import {
  LogoNextjs,
  LogoTypescript,
  LogoReact,
  LogoTailwind,
  LogoNodejs,
  LogoPrisma,
  LogoNginx,
  LogoDocker,
  LogoFigma,
  LogoLinux,
  LogoSqlite,
  LogoGit,
} from "@/components/LogoTeknologi";
import * as React from "react";

interface ItemKeahlian {
  id: string;
  nama_keahlian: string;
  kategori: string;
  urutan: number;
}

const daftarToolVisual = [
  { nama: "Next.js 15", peran: "Pembuat Web Modern", Logo: LogoNextjs, warna: "#ffffff", level: 95 },
  { nama: "TypeScript", peran: "Koding Aman & Akurat", Logo: LogoTypescript, warna: "#3178C6", level: 90 },
  { nama: "React 19", peran: "Tampilan Interaktif", Logo: LogoReact, warna: "#61DAFB", level: 92 },
  { nama: "Tailwind CSS", peran: "Desain & Tata Letak", Logo: LogoTailwind, warna: "#06B6D4", level: 95 },
  { nama: "Node.js", peran: "Sistem & Logika Data", Logo: LogoNodejs, warna: "#339933", level: 88 },
  { nama: "Prisma ORM", peran: "Pengelola Database", Logo: LogoPrisma, warna: "#5A67D8", level: 85 },
  { nama: "SQLite", peran: "Penyimpanan Data", Logo: LogoSqlite, warna: "#003B57", level: 80 },
  { nama: "Nginx", peran: "Server Web Cepat", Logo: LogoNginx, warna: "#009900", level: 82 },
  { nama: "Docker", peran: "Paket Aplikasi Mandiri", Logo: LogoDocker, warna: "#2496ED", level: 85 },
  { nama: "Linux", peran: "Sistem Server Andal", Logo: LogoLinux, warna: "#FCC624", level: 88 },
  { nama: "Figma", peran: "Desain Prototipe UI/UX", Logo: LogoFigma, warna: "#F24E1E", level: 78 },
  { nama: "Git", peran: "Pencatat Versi Kode", Logo: LogoGit, warna: "#F05032", level: 93 },
];

function KartuKeahlian3D({ tool, idx }: { tool: typeof daftarToolVisual[0], idx: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 400, damping: 25 });
  const glossX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glossY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const LogoKomponen = tool.Logo;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-1000 group cursor-default"
    >
      {/* Kartu utama */}
      <div className="relative rounded-2xl kaca-gelap batas-gradien bayangan-kedalaman-2 p-4 sm:p-5 overflow-hidden transition-all duration-300 group-hover:bayangan-kedalaman-3">
        {/* Efek glossy saat hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glossX.get()} ${glossY.get()}, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Logo + level bar */}
        <div className="flex items-start justify-between mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${tool.warna}15`, boxShadow: `0 0 20px ${tool.warna}20` }}
          >
            <LogoKomponen className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-800/60 px-2 py-1 rounded-full">
            {tool.level}%
          </span>
        </div>

        <h3 className="text-xs sm:text-sm font-black text-white mb-0.5">{tool.nama}</h3>
        <p className="text-[10px] sm:text-xs text-slate-400 mb-3">{tool.peran}</p>

        {/* Level bar */}
        <div className="h-0.5 w-full rounded-full bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${tool.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: idx * 0.08 + 0.3, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${tool.warna}90, ${tool.warna})` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function BagianKeahlian({ daftarKeahlian }: { daftarKeahlian: ItemKeahlian[] }) {
  return (
    <section
      id="bagian-keahlian"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Latar gradien seksi */}
      <div className="absolute inset-0 bg-mesh-utama pola-titik-mikro opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      {/* Cahaya aksen */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/4 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header seksi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-400 mb-3">KEAHLIAN & TEKNOLOGI</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h2 className="teks-seksi-raksasa text-white/90">
                Alat & Teknologi<br />
                <span className="text-blue-400">
                  Pilihan.
                </span>
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-md">
                Teknologi teruji yang saya pilih untuk memastikan website dan aplikasimu cepat dibuka, aman, dan mudah dikembangkan.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full kaca-gelap batas-gradien">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-xs font-bold text-slate-300">
                {daftarToolVisual.length} <span className="text-slate-500">alat utama</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* Grid 3D Kartu Keahlian */}
        <div className="perspektif-3d">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {daftarToolVisual.map((tool, idx) => (
              <KartuKeahlian3D key={tool.nama} tool={tool} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
