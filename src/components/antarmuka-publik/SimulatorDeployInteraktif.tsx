"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileArchive,
  CheckCircle,
  ShieldCheck,
  Globe,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowRight,
  Terminal,
  Zap,
} from "lucide-react";

interface PaketSimulasi {
  id: string;
  namaFile: string;
  ukuran: string;
  tipe: string;
  deskripsi: string;
  berkasDiEkstrak: { path: string; ukuran: string; status: string }[];
  previewUrl: string;
  warnaAksen: string;
}

const DAFTAR_PAKET_SIMULASI: PaketSimulasi[] = [
  {
    id: "paket-kalkulator",
    namaFile: "kalkulator-interaktif-v2.zip",
    ukuran: "2.4 MB",
    tipe: "React 19 / TypeScript",
    deskripsi: "Aplikasi kalkulator interaktif modern dengan tema dark glassmorphism.",
    berkasDiEkstrak: [
      { path: "index.html", ukuran: "4.8 KB", status: "Sanitized" },
      { path: "styles.css", ukuran: "12.1 KB", status: "Validated" },
      { path: "app.js", ukuran: "86.4 KB", status: "Secure Scope" },
      { path: "assets/icon.svg", ukuran: "2.1 KB", status: "Asset Mapped" },
    ],
    previewUrl: "/projects/kalkulator-interaktif/",
    warnaAksen: "#3b82f6",
  },
  {
    id: "paket-analytics",
    namaFile: "dashboard-analytics-pro.zip",
    ukuran: "4.8 MB",
    tipe: "Next.js Static Export",
    deskripsi: "Portal analitik web real-time dengan grafik SVG responsif dan dark mode.",
    berkasDiEkstrak: [
      { path: "index.html", ukuran: "6.2 KB", status: "Sanitized" },
      { path: "_next/static/css/main.css", ukuran: "28.4 KB", status: "Validated" },
      { path: "_next/static/chunks/main.js", ukuran: "142.0 KB", status: "Secure Scope" },
      { path: "favicon.ico", ukuran: "1.4 KB", status: "Asset Mapped" },
    ],
    previewUrl: "/projects/kalkulator-interaktif/",
    warnaAksen: "#10b981",
  },
];

export function SimulatorDeployInteraktif() {
  const [paketDipilih, setPaketDipilih] = React.useState<PaketSimulasi>(DAFTAR_PAKET_SIMULASI[0]);
  const [statusDeploy, setStatusDeploy] = React.useState<"idle" | "scanning" | "extracting" | "ready">("idle");
  const [progres, setProgres] = React.useState(0);
  const [logDeploy, setLogDeploy] = React.useState<string[]>([]);

  function mulaiSimulasiDeploy(paket: PaketSimulasi) {
    setPaketDipilih(paket);
    setStatusDeploy("scanning");
    setProgres(10);
    setLogDeploy([
      `[BACA_BERKAS] Membaca isi file ${paket.namaFile} (${paket.ukuran})...`,
      `[KEAMANAN] Memeriksa apakah file aman dan bebas virus... Lolos.`,
    ]);

    setTimeout(() => {
      setStatusDeploy("extracting");
      setProgres(65);
      setLogDeploy((prev) => [
        ...prev,
        `[SIAPKAN_WEB] Menyiapkan ${paket.berkasDiEkstrak.length} file website ke server...`,
        `[BUAT_LINK] Membuat alamat link website: /projects/${paket.id}/`,
      ]);
    }, 800);

    setTimeout(() => {
      setStatusDeploy("ready");
      setProgres(100);
      setLogDeploy((prev) => [
        ...prev,
        `[SUKSES] Website berhasil aktif dalam 48 milidetik! Siap dibuka.`,
      ]);
    }, 1600);
  }

  return (
    <div className="relative rounded-3xl kaca-gelap border border-white/10 p-6 sm:p-8 overflow-hidden">
      {/* Laser Scan Line saat proses deploy */}
      {statusDeploy === "scanning" && (
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent pointer-events-none z-30 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Header Simulator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>SIMULATOR PELUNCURAN WEBSITE</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Uji Coba Upload File & Langsung Jadi Website Online
          </h3>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
          <span
            className={`w-2 h-2 rounded-full ${
              statusDeploy === "ready"
                ? "bg-emerald-400 animate-pulse"
                : statusDeploy === "scanning" || statusDeploy === "extracting"
                ? "bg-amber-400 animate-spin"
                : "bg-blue-400"
            }`}
          />
          <span className="text-slate-300 font-bold">
            {statusDeploy === "idle" && "SIAP UJI COBA"}
            {statusDeploy === "scanning" && "MEMERIKSA KEAMANAN"}
            {statusDeploy === "extracting" && "MENYIAPKAN WEBSITE"}
            {statusDeploy === "ready" && "WEBSITE ONLINE"}
          </span>
        </div>
      </div>

      {/* Grid Interaktif: Dropzone & Pilih Sampel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Dropzone & Selector Paket (6 Kolom) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <p className="text-xs font-mono text-slate-400">Pilih bundle simulasi di bawah ini untuk memulai:</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DAFTAR_PAKET_SIMULASI.map((paket) => {
              const terpilih = paketDipilih.id === paket.id;
              return (
                <button
                  key={paket.id}
                  type="button"
                  onClick={() => mulaiSimulasiDeploy(paket)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    terpilih
                      ? "bg-blue-600/15 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                      : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <FileArchive className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold text-white truncate">{paket.namaFile}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{paket.tipe}</span>
                    <span className="text-slate-400 font-bold">{paket.ukuran}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Area Drag / Trigger Box */}
          <div
            onClick={() => mulaiSimulasiDeploy(paketDipilih)}
            className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-blue-500/60 bg-black/30 flex flex-col items-center justify-center text-center cursor-pointer transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-xs font-bold text-white mb-1">
              Klik untuk Mencoba Peluncuran <span className="text-blue-400">&ldquo;{paketDipilih.namaFile}&rdquo;</span>
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              Buka otomatis, pemeriksaan keamanan, dan pembuatan link web instan
            </p>
          </div>
        </div>

        {/* Status Live Extraction & Output (6 Kolom) */}
        <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-[#080b11] border border-white/8 p-4 font-mono text-xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/8 text-slate-400 text-[11px] mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                <span className="font-bold text-white">CATATAN PROSES SISTEM</span>
              </div>
              <span className="text-[10px] text-slate-400">{progres}% SELESAI</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                style={{ width: `${progres}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Log Teks */}
            <div className="space-y-1.5 text-[10px] max-h-36 overflow-y-auto pr-1">
              {logDeploy.length === 0 ? (
                <div className="text-slate-500 italic py-4 text-center">
                  Belum ada proses. Klik salah satu contoh file di samping untuk mencoba.
                </div>
              ) : (
                logDeploy.map((log, idx) => (
                  <div key={idx} className="leading-tight">
                    <span className="text-slate-600">&gt; </span>
                    <span
                      className={
                        log.includes("SUKSES") || log.includes("ONLINE")
                          ? "text-emerald-400 font-bold"
                          : log.includes("SIAPKAN") || log.includes("BUAT_LINK")
                          ? "text-blue-400"
                          : "text-slate-300"
                      }
                    >
                      {log}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Tombol Akses URL jika sudah selesai */}
          {statusDeploy === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 pt-3 border-t border-white/8 flex items-center justify-between"
            >
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>Website Siap Dibuka</span>
              </div>

              <a
                href={paketDipilih.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-all shadow-lg cursor-pointer"
              >
                <span>Buka Demo Langsung</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
