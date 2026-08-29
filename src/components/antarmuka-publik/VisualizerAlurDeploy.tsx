"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Globe, Zap, CheckCircle2 } from "lucide-react";
import { LogoZip, LogoNginx } from "@/components/LogoTeknologi";
import { SimulatorDeployInteraktif } from "./SimulatorDeployInteraktif";
import * as React from "react";

const langkahAlur = [
  {
    nomor: "01",
    judul: "Kirim File",
    label: "Paket Website (.ZIP)",
    Ikon: LogoZip,
    warnaHex: "#f59e0b",
    warnaTailwind: "amber",
  },
  {
    nomor: "02",
    judul: "Cek Keamanan",
    label: "Bebas Virus & Celah Bahaya",
    Ikon: () => <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    warnaHex: "#10b981",
    warnaTailwind: "emerald",
  },
  {
    nomor: "03",
    judul: "Buat Link Web",
    label: "Alamat Web Siap Diakses",
    Ikon: LogoNginx,
    warnaHex: "#3b82f6",
    warnaTailwind: "blue",
  },
  {
    nomor: "04",
    judul: "Website Online",
    label: "Bisa Dibuka Siapa Saja",
    Ikon: () => <Globe className="w-6 h-6 text-sky-400" />,
    warnaHex: "#0ea5e9",
    warnaTailwind: "sky",
  },
];

// Animasi garis penghubung sinar
function GarisPenghubung({ delay }: { delay: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 relative overflow-hidden">
      <div className="w-full h-px bg-slate-800" />
      <motion.div
        className="absolute h-full w-8 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
        animate={{ x: ["-200%", "400%"] }}
        transition={{ duration: 2, delay, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
      />
    </div>
  );
}

export function VisualizerAlurDeploy() {
  const refSeksi = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: refSeksi, offset: ["start end", "end start"] });
  const yParalaks = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="bagian-pipeline"
      ref={refSeksi}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Latar seksi */}
      <div className="absolute inset-0 pola-titik-mikro" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(5,8,16,0.8)] to-transparent" />

      {/* Cahaya sisi */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/60 to-transparent" />

      {/* Cahaya memudar besar di tengah */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-600/4 blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y: yParalaks }} className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">BAB 04 · KEMUDAHAN PELUNCURAN</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs font-bold text-blue-400">Siap Pakai Tanpa Ribet</span>
              </div>
            </div>

            <a
              href="/arsitektur"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              <span>Pelajari Detail Teknis Sistem</span>
              <span className="text-blue-400">→</span>
            </a>
          </div>

          <h2 className="teks-seksi-raksasa text-white/90 mb-3">
            Kirim File Jadi Web —<br />
            <span className="text-blue-400">
              Dalam 1 Klik Saja.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
            Kamu tidak perlu pusing memikirkan sewa server atau konfigurasi yang membingungkan. Cukup masukkan file aplikasi, dan sistem otomatis menyiapkannya agar langsung bisa dibuka oleh siapa pun di internet.
          </p>
        </motion.div>

        {/* Pipeline visual */}
        <div className="perspektif-3d">
          <motion.div
            initial={{ opacity: 0, rotateX: 8 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="transformasi-3d"
          >
            {/* Desktop: Pipeline horizontal dengan connector */}
            <div className="hidden lg:flex items-center gap-0">
              {langkahAlur.map((langkah, idx) => {
                const IkonKomponen = langkah.Ikon;
                return (
                  <React.Fragment key={langkah.nomor}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="relative flex-1 kaca-gelap batas-gradien bayangan-kedalaman-2 rounded-2xl p-6 group cursor-default"
                      style={{
                        boxShadow: `0 0 0 0 ${langkah.warnaHex}00`,
                      }}
                    >
                      {/* Glow saat hover */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at 50% 50%, ${langkah.warnaHex}08, transparent 70%)` }}
                      />

                      {/* Nomor langkah */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-[10px] font-mono font-black uppercase tracking-[0.2em]"
                          style={{ color: `${langkah.warnaHex}99` }}
                        >
                          STEP {langkah.nomor}
                        </span>
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: `${langkah.warnaHex}12`, border: `1px solid ${langkah.warnaHex}25` }}
                        >
                          <IkonKomponen />
                        </div>
                      </div>

                      <h3 className="text-sm font-black text-white mb-1 group-hover:text-white/90">{langkah.judul}</h3>
                      <span className="text-[10px] font-mono text-slate-500">{langkah.label}</span>

                      {/* Garis sisi bawah berwarna */}
                      <div
                        className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: `linear-gradient(90deg, transparent, ${langkah.warnaHex}60, transparent)` }}
                      />
                    </motion.div>

                    {/* Konektor sinar antar langkah */}
                    {idx < langkahAlur.length - 1 && (
                      <GarisPenghubung delay={idx * 0.5} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Mobile: Pipeline vertikal */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
              {langkahAlur.map((langkah, idx) => {
                const IkonKomponen = langkah.Ikon;
                return (
                  <motion.div
                    key={langkah.nomor}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="kaca-gelap batas-gradien rounded-2xl p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-mono font-black text-slate-600">STEP {langkah.nomor}</span>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${langkah.warnaHex}12` }}
                      >
                        <IkonKomponen />
                      </div>
                    </div>
                    <h3 className="text-xs font-black text-white mb-0.5">{langkah.judul}</h3>
                    <span className="text-[9px] font-mono text-slate-500">{langkah.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Sandbox Simulator Interaktif Live */}
        <div className="mt-12">
          <SimulatorDeployInteraktif />
        </div>
      </motion.div>
    </section>
  );
}
