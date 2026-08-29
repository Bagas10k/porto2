"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Download, Sparkles, Code2, Layers, Zap, Globe, Database, Server, Bot, Cpu, Box } from "lucide-react";
import { HudStatusSistem } from "./HudStatusSistem";
import { KomponenMagnetik } from "./KomponenMagnetik";
import {
  LogoNextjs,
  LogoTypescript,
  LogoReact,
  LogoTailwind,
  LogoNodejs,
  LogoPrisma,
  LogoDocker,
  LogoFigma,
  LogoGit,
  LogoVercel,
  LogoSupabase,
  LogoLinux,
} from "@/components/LogoTeknologi";

interface BiodataData {
  nama_lengkap: string;
  gelar_profesi: string;
  deskripsi_singkat: string;
  status_ketersediaan: string;
  url_foto_profil?: string | null;
  url_cv?: string | null;
  email_kontak: string;
  lokasi?: string | null;
}

// Komponen kartu yang mengikuti gerakan mouse (3D Tilt)
function KartuTiltInteraktif({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  function tanganiGerakMouse(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nilaiX = (e.clientX - rect.left) / rect.width - 0.5;
    const nilaiY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nilaiX);
    y.set(nilaiY);
  }

  function tanganiKeluarMouse() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={tanganiGerakMouse}
      onMouseLeave={tanganiKeluarMouse}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Partikel latar belakang mengambang
function PartikelLatar() {
  const partikel = React.useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        ukuran: Math.random() * 3 + 1,
        durasi: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {partikel.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.ukuran,
            height: p.ukuran,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: p.durasi,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Kartu Tool Floating 3D
const daftarToolsHero = [
  { nama: "Next.js", Logo: LogoNextjs, warna: "#000000", delay: 0 },
  { nama: "TypeScript", Logo: LogoTypescript, warna: "#3178C6", delay: 0.08 },
  { nama: "React", Logo: LogoReact, warna: "#61DAFB", delay: 0.16 },
  { nama: "Tailwind", Logo: LogoTailwind, warna: "#06B6D4", delay: 0.24 },
  { nama: "Node.js", Logo: LogoNodejs, warna: "#339933", delay: 0.32 },
  { nama: "Prisma", Logo: LogoPrisma, warna: "#2D3748", delay: 0.4 },
  { nama: "Docker", Logo: LogoDocker, warna: "#2496ED", delay: 0.48 },
  { nama: "Figma", Logo: LogoFigma, warna: "#F24E1E", delay: 0.56 },
  { nama: "Vercel", Logo: LogoVercel, warna: "#000000", delay: 0.64 },
  { nama: "Supabase", Logo: LogoSupabase, warna: "#3ECF8E", delay: 0.72 },
  { nama: "Git", Logo: LogoGit, warna: "#F05032", delay: 0.8 },
  { nama: "Linux", Logo: LogoLinux, warna: "#FCC624", delay: 0.88 },
];



export function HeroOrbitTeknologi({ data }: { data: BiodataData }) {
  const refKontainer = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: refKontainer,
    offset: ["start start", "end start"],
  });

  const yParalaks = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const skalaBuruk = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opasitasBuruk = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="bagian-hero"
      ref={refKontainer}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-mesh-utama pola-titik-mikro"
    >
      <PartikelLatar />

      {/* Sinar gradien latar belakang besar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animasi-denyut-cahaya absolute -top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="animasi-denyut-cahaya absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/7 blur-[100px]" style={{ animationDelay: "3s" }} />
        <div className="animasi-denyut-cahaya absolute bottom-0 left-1/2 w-[500px] h-[300px] rounded-full bg-cyan-600/5 blur-[100px]" style={{ animationDelay: "6s" }} />
      </div>

      {/* Garis sinar horisontal */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animasi-garis-sinar" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent animasi-garis-sinar" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* ===== KONTEN UTAMA ===== */}
      <motion.div
        style={{ y: yParalaks, scale: skalaBuruk, opacity: opasitasBuruk }}
        className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-16"
      >
        {/* Telemetry HUD & Status Badge */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <HudStatusSistem />

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full kaca-gelap bayangan-kedalaman-1 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-400 tracking-wide">
                {data.status_ketersediaan || "Available for Contract"}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{data.lokasi || "Jakarta, Indonesia"}</span>
            </div>
          </motion.div>
        </div>

        {/* ===== HEADLINE SUPER BESAR ===== */}
        <div className="text-center mb-8 relative">
          {/* Baris 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <h1 className="teks-hero-raksasa text-white/90 tracking-tight select-none">
              Wujudkan Ide Jadi
            </h1>
          </motion.div>

          {/* Baris 2 — dengan efek 3D depth */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <h1 className="teks-hero-raksasa text-blue-400 relative inline-block select-none">
              Aplikasi Nyata
            </h1>
          </motion.div>

          {/* Baris 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <h1 className="teks-hero-raksasa text-white/70 select-none">
              — Lebih Cepat & Cerdas.
            </h1>
          </motion.div>

          {/* Garis bawah dekoratif */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 mx-auto h-px w-48 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
          />
        </div>

        {/* Sub info + tombol */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col items-center gap-6 mb-16"
        >
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl text-center leading-relaxed">
            Halo, saya <span className="font-bold text-white">{data.nama_lengkap}</span>. Saya membantu kamu membangun website modern, aplikasi bisnis, dan sistem otomasi pintar agar pekerjaanmu selesai lebih cepat dan usahamu berkembang.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <KomponenMagnetik kekuatan={0.3}>
              <a
                href="#bagian-proyek"
                id="tombol-jelajahi-karya-hero"
                data-kursor="KARYA"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <Box className="w-4 h-4" />
                <span>Lihat Hasil Karya</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </KomponenMagnetik>

            <KomponenMagnetik kekuatan={0.3}>
              <a
                href="#bagian-filosofi"
                id="tombol-filosofi-hero"
                data-kursor="MANFAAT"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl kaca-gelap border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Manfaat & Keunggulan</span>
              </a>
            </KomponenMagnetik>

            <KomponenMagnetik kekuatan={0.3}>
              <Link
                href="/arsitektur"
                id="tombol-arsitektur-hero"
                data-kursor="BACA"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl kaca-gelap border border-white/10 text-slate-400 hover:text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              >
                <Server className="w-4 h-4 text-slate-500" />
                <span>Panduan Sistem</span>
              </Link>
            </KomponenMagnetik>
          </div>
        </motion.div>

        {/* ===== GRID KARTU TOOLS 3D ===== */}
        <div className="perspektif-3d">
          <motion.div
            initial={{ opacity: 0, rotateX: 15, y: 40 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="transformasi-3d"
          >
            {/* Label grid */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-700/50" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Pilihan Teknologi & Alat</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-700/50" />
            </div>

            {/* Grid tools floating 3D */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-3">
              {daftarToolsHero.map((tool, idx) => {
                const LogoKomponen = tool.Logo;
                return (
                  <KartuTiltInteraktif
                    key={tool.nama}
                    delay={tool.delay}
                    className="col-span-1"
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0, -6, 0],
                        rotate: [0, 0.5, 0, -0.5, 0],
                      }}
                      transition={{
                        duration: 5 + tool.delay * 0.5,
                        delay: tool.delay,
                        repeat: Infinity,
                        ease: "easeInOut" as const,
                      }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 aspect-square rounded-2xl kaca-gelap batas-gradien bayangan-kedalaman-2 cursor-pointer group select-none"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <LogoKomponen className="w-full h-full" />
                      </div>
                      <span className="hidden sm:block mt-2 text-[9px] font-bold text-slate-500 group-hover:text-slate-300 transition-colors text-center leading-tight">
                        {tool.nama}
                      </span>
                    </motion.div>
                  </KartuTiltInteraktif>
                );
              })}
            </div>

            {/* Strip metrik bawah */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-6 flex items-center justify-center gap-8 sm:gap-12"
            >
              {[
                { label: "Projects", nilai: "12+", ikon: Layers },
                { label: "Tech Stack", nilai: "15+", ikon: Code2 },
                { label: "Deployments", nilai: "100%", ikon: Zap },
                { label: "Uptime", nilai: "99.9%", ikon: Globe },
              ].map((stat) => {
                const IkonKomponen = stat.ikon;
                return (
                  <div key={stat.label} className="flex flex-col items-center gap-1 group">
                    <IkonKomponen className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                    <span className="text-lg sm:text-2xl font-black text-white">{stat.nilai}</span>
                    <span className="text-[10px] text-slate-500 font-medium">{stat.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"
        />
      </motion.div>
    </section>
  );
}
