"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  Boxes,
  Zap,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { KomponenMagnetik } from "./KomponenMagnetik";

interface SkenarioGeneratif {
  id: string;
  judul: string;
  lencana: string;
  warnaHex: string;
  deskripsi: string;
  tahapan: { nama: string; detail: string }[];
  kodeOutput: string[];
  komponenDemo: "grafik-interaktif" | "agent-flow" | "bundle-inspector";
  metrik: { token: number; durasiMs: number; bahasa: string };
}

const DAFTAR_SKENARIO: SkenarioGeneratif[] = [
  {
    id: "ai-agent-synthesis",
    judul: "Asisten AI Otomatis (Multi-Agent)",
    lencana: "Sistem Otomasi Pintar",
    warnaHex: "#3b82f6",
    deskripsi: "Sistem AI yang otomatis memecah instruksi rumit menjadi langkah kerja mandiri tanpa perlu diawasi manual.",
    tahapan: [
      { nama: "1. Analisis Kebutuhan", detail: "Membaca dan memahami instruksi yang kamu berikan" },
      { nama: "2. Perancangan Logika", detail: "Menyusun struktur alur kerja yang paling efisien" },
      { nama: "3. Eksekusi Serentak", detail: "Menjalankan 4 asisten AI bersamaan untuk bekerja" },
      { nama: "4. Pemeriksaan Kualitas", detail: "Memastikan hasil kerja akurat dan bebas kesalahan" },
    ],
    kodeOutput: [
      "// [Sistem Otomasi AI] - Selesai dalam 128 milidetik",
      "export async function jalankanOtomasiTugas(instruksi: KebutuhanProyek) {",
      "  const asistenUtama = new AsistenPintar({ model: 'gemini-pro' });",
      "  const daftarTugas = await asistenUtama.bagiTugasOtomatis(instruksi);",
      "",
      "  // 4 AI Worker bekerja bersamaan secara instan",
      "  const hasilPekerjaan = await Promise.allSettled(",
      "    daftarTugas.map(tugas => kerjakanOtomatis(tugas.id, tugas.data))",
      "  );",
      "",
      "  return gabungkanDanPeriksaHasil(hasilPekerjaan);",
      "}",
    ],
    komponenDemo: "agent-flow",
    metrik: { token: 1420, durasiMs: 128, bahasa: "TypeScript" },
  },
  {
    id: "micro-deployment-engine",
    judul: "Peluncur Website Otomatis",
    lencana: "Deploy Instan 1-Klik",
    warnaHex: "#10b981",
    deskripsi: "Mengubah paket file aplikasi menjadi website online yang langsung aktif di internet dalam hitungan detik.",
    tahapan: [
      { nama: "1. Pembacaan File", detail: "Membuka paket file website yang kamu kirimkan" },
      { nama: "2. Perlindungan Keamanan", detail: "Memastikan file aman dari celah bahaya dan virus" },
      { nama: "3. Pembuatan Alamat Web", detail: "Menyiapkan link khusus yang siap diakses publik" },
      { nama: "4. Website Online", detail: "Website langsung aktif dan siap dibuka di browser" },
    ],
    kodeOutput: [
      "// [Engine Peluncur Website] - Terverifikasi Aman",
      "export async function luncurkanWebsiteOtomatis(berkasZip: Buffer, namaProyek: string) {",
      "  const paket = new PembukaPaket(berkasZip);",
      "  const daftarBerkas = paket.bacaSemuaBerkas();",
      "",
      "  // Periksa apakah berkas aman",
      "  for (const berkas of daftarBerkas) {",
      "    if (berkas.nama.includes('..') || berkas.nama.startsWith('/')) {",
      "      throw new Error('Peringatan: Berkas mencurigakan terdeteksi');",
      "    }",
      "  }",
      "",
      "  await paket.ekstrakKeServer(`/var/www/statis/${namaProyek}`);",
      "  return { status: 'ONLINE', alamatWeb: `/projects/${namaProyek}/` };",
      "}",
    ],
    komponenDemo: "bundle-inspector",
    metrik: { token: 960, durasiMs: 42, bahasa: "Node.js / Nginx" },
  },
  {
    id: "neural-code-visualizer",
    judul: "Efek Visual Interaktif Kursor",
    lencana: "Animasi Modern 60 FPS",
    warnaHex: "#a855f7",
    deskripsi: "Efek visual dan partikel dinamis yang merespons gerakan mouse secara instan untuk mempercantik website.",
    tahapan: [
      { nama: "1. Deteksi Posisi Mouse", detail: "Membaca arah dan kecepatan gerak kursor pengunjung" },
      { nama: "2. Perhitungan Fisika", detail: "Menghitung gaya gravitasi partikel yang halus" },
      { nama: "3. Efek Cahaya & Warna", detail: "Menghasilkan gradasi warna modern yang memikat" },
      { nama: "4. Tampilan Halus 60 FPS", detail: "Menjaga animasi tetap ringan di HP maupun laptop" },
    ],
    kodeOutput: [
      "// [Efek Partikel Interaktif] - 60 FPS Ringan",
      "uniform vec2 posisi_layar;",
      "uniform vec2 posisi_kursor;",
      "uniform float detik_berjalan;",
      "",
      "void main() {",
      "  vec2 titik = gl_FragCoord.xy / posisi_layar.xy;",
      "  float jarak = distance(titik, posisi_kursor / posisi_layar.xy);",
      "  vec3 warna = vec3(0.04, 0.06, 0.12);",
      "  warna += vec3(0.2, 0.4, 1.0) * smoothstep(0.4, 0.0, jarak);",
      "  gl_FragColor = vec4(warna, 1.0);",
      "}",
    ],
    komponenDemo: "grafik-interaktif",
    metrik: { token: 1180, durasiMs: 84, bahasa: "GLSL / Canvas" },
  },
];

export function LaboratoriumKodeGeneratif() {
  const [skenarioAktifId, setSkenarioAktifId] = React.useState("ai-agent-synthesis");
  const [sedangKompilasi, setSedangKompilasi] = React.useState(false);
  const [tahapKompilasi, setTahapKompilasi] = React.useState(-1);
  const [barisKodeTerlihat, setBarisKodeTerlihat] = React.useState(DAFTAR_SKENARIO[0].kodeOutput.length);
  const [logTerminal, setLogTerminal] = React.useState<string[]>([
    "[SISTEM] Studio simulasi siap menerima perintah.",
    "[STATUS] 4 Asisten AI siap bekerja.",
  ]);

  const skenario = DAFTAR_SKENARIO.find((s) => s.id === skenarioAktifId) || DAFTAR_SKENARIO[0];

  function gantiSkenario(id: string) {
    setSkenarioAktifId(id);
    const sk = DAFTAR_SKENARIO.find((s) => s.id === id) || DAFTAR_SKENARIO[0];
    setTahapKompilasi(-1);
    setBarisKodeTerlihat(sk.kodeOutput.length);
    setLogTerminal([
      `[PILIH_CONTOH] Skenario dialihkan ke: ${sk.judul}`,
      `[SIAP] Konfigurasi ${sk.lencana} siap diuji coba.`,
    ]);
  }

  function jalankanKompilasiGeneratif() {
    if (sedangKompilasi) return;
    setSedangKompilasi(true);
    setTahapKompilasi(0);
    setBarisKodeTerlihat(0);
    setLogTerminal((prev) => [
      ...prev,
      `[MULAI] Menjalankan simulasi untuk '${skenario.judul}'...`,
    ]);

    // Jalankan tahapan bertahap
    const timer1 = setTimeout(() => {
      setTahapKompilasi(1);
      setBarisKodeTerlihat(3);
      setLogTerminal((prev) => [
        ...prev,
        `[TAHAP_1] ${skenario.tahapan[0].nama}: Berhasil diselesaikan.`,
      ]);
    }, 400);

    const timer2 = setTimeout(() => {
      setTahapKompilasi(2);
      setBarisKodeTerlihat(7);
      setLogTerminal((prev) => [
        ...prev,
        `[TAHAP_2] ${skenario.tahapan[1].nama}: Logika program berhasil disusun.`,
      ]);
    }, 900);

    const timer3 = setTimeout(() => {
      setTahapKompilasi(3);
      setBarisKodeTerlihat(skenario.kodeOutput.length);
      setLogTerminal((prev) => [
        ...prev,
        `[TAHAP_3] Pengujian kualitas lolos 100%. Sistem aman & bebas error.`,
      ]);
    }, 1400);

    const timerSelesai = setTimeout(() => {
      setTahapKompilasi(4);
      setSedangKompilasi(false);
      setLogTerminal((prev) => [
        ...prev,
        `[SELESAI] Simulasi selesai dalam ${skenario.metrik.durasiMs} milidetik. Hasil live tampil di sebelah kanan!`,
      ]);
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerSelesai);
    };
  }

  return (
    <section id="bagian-lab-generatif" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dekorasi Latar & Sinar Laser */}
      <div className="absolute inset-0 pola-titik-mikro opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: skenario.warnaHex }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== HEADER SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>BAB 02 · CARA SAYA BEKERJA & DEMO INTERAKTIF</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white/95 leading-tight">
                Melihat Cara AI Membantu<br />
                <span className="text-blue-400">
                  Membuat Aplikasi Cepat.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl leading-relaxed">
                Saya menggabungkan keahlian koding dan kecerdasan AI agar pekerjaan selesai 5x lebih cepat. Pilih salah satu contoh di bawah, lalu tekan tombol untuk melihat bagaimana prosesnya bekerja:
              </p>
            </div>

            {/* Tombol Eksekusi Utama */}
            <KomponenMagnetik kekuatan={0.35}>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={jalankanKompilasiGeneratif}
                disabled={sedangKompilasi}
                data-kursor="MULAI"
                className="relative group overflow-hidden flex items-center gap-3 px-7 py-3.5 rounded-2xl font-black text-sm text-white transition-all duration-300 shadow-2xl shrink-0 cursor-pointer disabled:opacity-60"
                style={{
                  background: `linear-gradient(135deg, ${skenario.warnaHex}, #2563eb)`,
                  boxShadow: `0 10px 30px ${skenario.warnaHex}40`,
                }}
              >
                {/* Sinar Kilau */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {sedangKompilasi ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <Play className="w-4 h-4 fill-current" />
                )}
                <span>{sedangKompilasi ? "Sedang Memproses..." : "Coba Simulasi Pembuatan"}</span>
              </motion.button>
            </KomponenMagnetik>
          </div>
        </motion.div>

        {/* ===== SELECTOR SKENARIO ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8">
          {DAFTAR_SKENARIO.map((item) => {
            const aktif = item.id === skenarioAktifId;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => gantiSkenario(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                data-kursor="PILIH"
                className="relative text-left p-4 rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer"
                style={{
                  background: aktif ? "rgba(13, 17, 23, 0.95)" : "rgba(13, 17, 23, 0.4)",
                  borderColor: aktif ? item.warnaHex : "rgba(255,255,255,0.06)",
                  boxShadow: aktif ? `0 10px 30px ${item.warnaHex}15` : "none",
                }}
              >
                {aktif && (
                  <motion.div
                    layoutId="border-skenario-aktif"
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: item.warnaHex }}
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{
                      background: `${item.warnaHex}18`,
                      color: item.warnaHex,
                      border: `1px solid ${item.warnaHex}30`,
                    }}
                  >
                    {item.lencana}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{item.metrik.durasiMs}ms</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 leading-snug">{item.judul}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.deskripsi}</p>
              </motion.button>
            );
          })}
        </div>

        {/* ===== MAIN WORKBENCH (PIPELINE + CODE + LIVE OUTPUT) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* SISI KIRI: Pipeline Node & Editor Kode (7 Kolom) */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Pipeline Step Trace Bar */}
            <div className="p-4 rounded-2xl kaca-gelap border border-white/8 overflow-hidden">
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Rantai Eksekusi Pipeline</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {skenario.tahapan.map((tahap, idx) => {
                  const sudahLewat = tahapKompilasi >= idx;
                  const sedangJalan = tahapKompilasi === idx && sedangKompilasi;
                  return (
                    <div
                      key={tahap.nama}
                      className="p-2.5 rounded-xl border transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: sudahLewat ? `${skenario.warnaHex}12` : "rgba(255,255,255,0.02)",
                        borderColor: sudahLewat ? `${skenario.warnaHex}40` : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {sedangJalan && (
                        <div
                          className="absolute inset-0 opacity-30 animate-pulse pointer-events-none"
                          style={{ background: skenario.warnaHex }}
                        />
                      )}
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black"
                          style={{
                            background: sudahLewat ? skenario.warnaHex : "rgba(255,255,255,0.1)",
                            color: sudahLewat ? "#ffffff" : "#94a3b8",
                          }}
                        >
                          {sudahLewat ? "✓" : idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-white truncate">{tahap.nama}</span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-2 leading-tight">{tahap.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Code Synthesizer Window */}
            <div className="flex-1 rounded-2xl kaca-gelap border border-white/8 overflow-hidden flex flex-col">
              {/* Header Editor Bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0b0e14]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    engine_{skenario.id.replace(/-/g, "_")}.ts
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                  <span>{skenario.metrik.bahasa}</span>
                  <span className="text-slate-700">|</span>
                  <span className="text-emerald-400 font-bold">{skenario.metrik.token} TOKENS</span>
                </div>
              </div>

              {/* Code Stream Container */}
              <div className="p-4 font-mono text-xs overflow-x-auto bg-[#07090e] flex-1 min-h-[220px]">
                {skenario.kodeOutput.slice(0, barisKodeTerlihat).map((baris, idx) => (
                  <div key={idx} className="flex gap-3 leading-relaxed">
                    <span className="text-slate-700 select-none w-6 text-right text-[11px]">{idx + 1}</span>
                    <span
                      className={`${
                        baris.startsWith("//")
                          ? "text-slate-500 italic"
                          : baris.includes("export") || baris.includes("function") || baris.includes("async")
                          ? "text-purple-400 font-semibold"
                          : baris.includes("const") || baris.includes("let")
                          ? "text-blue-400"
                          : baris.includes("return") || baris.includes("throw")
                          ? "text-amber-400 font-semibold"
                          : baris.includes("'") || baris.includes('"')
                          ? "text-emerald-300"
                          : "text-slate-200"
                      }`}
                    >
                      {baris}
                    </span>
                  </div>
                ))}

                {sedangKompilasi && (
                  <motion.div
                    className="inline-block w-2 h-4 bg-blue-400 ml-9 mt-1"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  />
                )}
              </div>
            </div>

          </div>

          {/* SISI KANAN: Live Synthesized Sandbox Output & Terminal (5 Kolom) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Live Visual Widget Output */}
            <div className="rounded-2xl kaca-gelap border border-white/8 p-5 flex flex-col justify-between min-h-[240px] relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-bold text-white">LIVE SANDBOX OUTPUT</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">ISOLATED VM</span>
              </div>

              {/* Demo Berdasarkan Skenario */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col items-center justify-center text-center my-auto">
                {skenario.komponenDemo === "agent-flow" && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                      <span>Thread Planner: #01</span>
                      <span className="text-emerald-400 font-bold">READY (4/4)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {["AST Deconstructor", "State Synthesizer", "Type Validator", "Micro Bundler"].map((sub, i) => (
                        <motion.div
                          key={sub}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-left"
                        >
                          <div className="flex items-center gap-1 text-[10px] text-blue-400 font-bold mb-0.5">
                            <Brain className="w-3 h-3" />
                            <span>Worker {i + 1}</span>
                          </div>
                          <p className="text-[10px] font-mono text-slate-300">{sub}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {skenario.komponenDemo === "bundle-inspector" && (
                  <div className="w-full text-left space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Bundle: site_v1.zip</span>
                      <span className="text-emerald-400 font-bold">PASS SHA-256</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 font-mono text-[10px] space-y-1">
                      <div className="text-emerald-300">✓ index.html (4.2 KB) — Sanitized</div>
                      <div className="text-emerald-300">✓ styles.css (8.1 KB) — Validated</div>
                      <div className="text-emerald-300">✓ app.js (12.4 KB) — Safe V8 Scope</div>
                    </div>
                  </div>
                )}

                {skenario.komponenDemo === "grafik-interaktif" && (
                  <div className="w-full text-left space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                      <span>Shader Pass: GL_COLOR_BUFFER</span>
                      <span className="text-purple-400 font-bold">60.2 FPS</span>
                    </div>
                    <div className="h-16 rounded-lg bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-emerald-600/30 border border-purple-500/30 flex items-center justify-center font-mono text-[10px] text-purple-200">
                      [GLSL Dynamic Mesh Shader Active]
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-mono text-slate-500">
                <span>Latency: {skenario.metrik.durasiMs}ms</span>
                <span className="text-slate-400">Memory: ~3.8 MB V8 Heap</span>
              </div>
            </div>

            {/* Live Terminal Log */}
            <div className="rounded-2xl kaca-gelap border border-white/8 p-4 font-mono text-[10px] flex flex-col justify-between min-h-[140px] bg-[#07090e]">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5 text-slate-500 mb-2">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-300 font-bold">TELEMETRY CONSOLE</span>
              </div>

              <div className="space-y-1 overflow-y-auto max-h-24 text-slate-400 pr-1">
                {logTerminal.slice(-4).map((log, i) => (
                  <div key={i} className="leading-tight">
                    <span className="text-slate-600">&gt; </span>
                    <span
                      className={
                        log.includes("COMPLETE") || log.includes("READY") || log.includes("berhasil")
                          ? "text-emerald-400"
                          : log.includes("START") || log.includes("SYNTHESIZER")
                          ? "text-blue-400"
                          : "text-slate-400"
                      }
                    >
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
