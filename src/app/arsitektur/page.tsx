"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Server,
  ShieldCheck,
  Cpu,
  Boxes,
  FileCode,
  Lock,
  Layers,
  Terminal,
  Zap,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { NavbarPillMelayang } from "@/components/antarmuka-publik/NavbarPillMelayang";
import { LatarBelakangInteraktif } from "@/components/antarmuka-publik/LatarBelakangInteraktif";
import { LaboratoriumKodeGeneratif } from "@/components/antarmuka-publik/LaboratoriumKodeGeneratif";

export default function HalamanDokumentasiArsitektur() {
  const [tersalin, setTersalin] = React.useState(false);

  const konfigurasiNginxContoh = `server {
    listen 80;
    server_name portofolio.kamu.com;

    # Subpath routing untuk proyek statis hasil dekompresi ZIP
    location /projects/ {
        alias /var/www/statis/projects/;
        index index.html;
        try_files $uri $uri/ =404;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";
    }

    # Reverse proxy ke Next.js Core Engine
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`;

  function salinKonfigurasi() {
    navigator.clipboard.writeText(konfigurasiNginxContoh);
    setTersalin(true);
    setTimeout(() => setTersalin(false), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#04060b] text-slate-200">
      <LatarBelakangInteraktif />

      {/* Floating Navbar */}
      <NavbarPillMelayang
        namaLengkap="Bagas Pratama"
        gelarProfesi="Senior Fullstack Engineer & Creative Technologist"
      />

      <main className="flex-1 max-w-5xl mx-auto px-5 sm:px-8 py-28 sm:py-36 relative z-10">

        {/* Tombol Kembali */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>
        </motion.div>

        {/* Header Dokumentasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 pb-8 border-b border-white/10"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-widest mb-3">
            <Server className="w-4 h-4" />
            <span>PANDUAN SISTEM & CARA KERJA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Bagaimana Sistem Ini Bekerja.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Halaman ini menjelaskan bagaimana website dan sistem portofolio ini dapat menerima file aplikasi, memeriksa keamanannya dari virus atau bahaya, dan langsung meluncurkan website online yang siap dibuka siapa saja.
          </p>
        </motion.div>

        {/* Grid 4 Pilar Arsitektur */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          {[
            {
              ikon: ShieldCheck,
              judul: "Perlindungan Keamanan Otomatis",
              deskripsi:
                "Setiap file yang diunggah otomatis diperiksa untuk memastikan tidak ada virus, malware, atau script berbahaya yang dapat merusak server.",
              warna: "emerald",
            },
            {
              ikon: Zap,
              judul: "Pemrosesan Cepat & Ringan",
              deskripsi:
                "Sistem membaca dan mengekstrak file langsung di memori komputer sehingga proses pembuatan website berjalan dalam hitungan milidetik.",
              warna: "blue",
            },
            {
              ikon: Layers,
              judul: "Alamat Web Instan",
              deskripsi:
                "Setiap aplikasi yang diunggah langsung mendapatkan alamat link khusus (`/projects/[nama]/`) yang bisa langsung dibagikan ke klien.",
              warna: "purple",
            },
            {
              ikon: Cpu,
              judul: "Asisten AI Cerdas",
              deskripsi:
                "Kecerdasan buatan membantu membagi pekerjaan besar menjadi langkah-langkah kerja otomatis yang diselesaikan secara serentak.",
              warna: "amber",
            },
          ].map((item, i) => {
            const Ikon = item.ikon;
            return (
              <motion.div
                key={item.judul}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl kaca-gelap border border-white/8 hover:border-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-blue-400">
                  <Ikon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{item.judul}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.deskripsi}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bagian 1: Diagram Alur Pipeline Request */}
        <section className="mb-16">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2.5">
            <span className="text-blue-400 font-mono text-sm">01.</span>
            <span>Alur dari Unggah File Hingga Website Jadi</span>
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl kaca-gelap border border-white/10 font-mono text-xs text-slate-300 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/40 border border-white/5">
              <span className="text-blue-400 font-bold">[1] Kamu Mengirim File:</span>
              <span className="text-slate-300">Upload file aplikasi .zip lewat halaman admin</span>
            </div>

            <div className="flex justify-center text-slate-600 font-bold">↓ (Sistem Menerima File)</div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/40 border border-emerald-500/20">
              <span className="text-emerald-400 font-bold">[2] Pemeriksaan Keamanan:</span>
              <span className="text-slate-300">Memastikan isi file aman dan bebas dari celah berbahaya</span>
            </div>

            <div className="flex justify-center text-slate-600 font-bold">↓ (File Terbukti Aman)</div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/40 border border-purple-500/20">
              <span className="text-purple-400 font-bold">[3] Penataan di Server:</span>
              <span className="text-slate-300">Membuka dan menyusun file website di tempat penyimpanan</span>
            </div>

            <div className="flex justify-center text-slate-600 font-bold">↓ (Pendaftaran Alamat Link Selesai)</div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-black/40 border border-blue-500/20">
              <span className="text-cyan-400 font-bold">[4] Website Siap Diakses:</span>
              <span className="text-slate-200 font-bold">Link web aktif & siap dibuka: `https://domain.com/projects/[nama]/`</span>
            </div>
          </div>
        </section>

        {/* Bagian 2: Konfigurasi Nginx Production */}
        <section className="mb-16">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <span className="text-blue-400 font-mono text-sm">02.</span>
              <span>Konfigurasi Nginx Reverse Proxy & Static Alias</span>
            </h2>

            <button
              onClick={salinKonfigurasi}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{tersalin ? "Tersalin" : "Salin Kode"}</span>
            </button>
          </div>

          <div className="rounded-2xl kaca-gelap border border-white/10 overflow-hidden bg-[#07090e]">
            <div className="px-4 py-2.5 border-b border-white/8 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>/etc/nginx/sites-available/portofolio.conf</span>
              <span>NGINX DIRECTIVE</span>
            </div>
            <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
              <code>{konfigurasiNginxContoh}</code>
            </pre>
          </div>
        </section>

        {/* Bagian 3: Keamanan & Database Persistence */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2.5">
            <span className="text-blue-400 font-mono text-sm">03.</span>
            <span>Spesifikasi Database & State Persistence</span>
          </h2>

          <div className="p-6 rounded-2xl kaca-gelap border border-white/8 space-y-4 text-xs text-slate-400 leading-relaxed">
            <p>
              Sistem menggunakan <strong className="text-white">Prisma ORM</strong> dengan basis data <strong className="text-white">SQLite / PostgreSQL</strong> untuk pencatatan metadata proyek, biodata, keahlian, dan metrik interaksi (jumlah views, klik live preview, dan interaksi video).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                <p className="font-mono font-bold text-white mb-1">Tabel Proyek</p>
                <p className="text-[11px] text-slate-500">Slug, tipe media, path statis, daftar gambar, dan status aktif.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                <p className="font-mono font-bold text-white mb-1">Tabel Biodata</p>
                <p className="text-[11px] text-slate-500">Profil lengkap, status ketersediaan, kontak, dan tautan sosial.</p>
              </div>
              <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                <p className="font-mono font-bold text-white mb-1">Tabel Interaksi</p>
                <p className="text-[11px] text-slate-500">Audit trail interaksi pengunjung dan analitik engagement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bagian 4: Studio Simulasi Logika & Kompilasi Teknis */}
        <section className="mb-14">
          <h2 className="text-xl sm:text-2xl font-black text-white mb-6 flex items-center gap-2.5">
            <span className="text-blue-400 font-mono text-sm">04.</span>
            <span>Studio Simulasi Logika & Multi-Agent Engine</span>
          </h2>

          <LaboratoriumKodeGeneratif />
        </section>

        {/* Footer Dokumentasi */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-500">
            Arsitektur v3.8 · Self-Hosted & Micro-Deployment Engine
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>Kembali Jelajahi Beranda</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

      </main>
    </div>
  );
}
