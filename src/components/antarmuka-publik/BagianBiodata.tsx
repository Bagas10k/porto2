"use client";

import { motion } from "framer-motion";
import {
  Download,
  Mail,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Rocket,
  CodeXml,
  Layers,
  Zap,
} from "lucide-react";
import {
  IkonGithub,
  IkonLinkedin,
  IkonTwitter,
  IkonInstagram,
} from "@/components/IkonSosial";

interface BiodataData {
  nama_lengkap: string;
  gelar_profesi: string;
  deskripsi_singkat: string;
  status_ketersediaan: string;
  url_foto_profil?: string | null;
  url_cv?: string | null;
  email_kontak: string;
  nomor_telepon?: string | null;
  lokasi?: string | null;
  tautan_github?: string | null;
  tautan_linkedin?: string | null;
  tautan_twitter?: string | null;
  tautan_instagram?: string | null;
}

export function BagianBiodata({ data }: { data: BiodataData }) {
  return (
    <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200/70 dark:border-slate-800/70 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center justify-between gap-12">
          
          {/* Konten Teks Profil */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6"
          >
            
            {/* Status Ketersediaan & Badge Interaktif */}
            <div className="flex flex-wrap items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 shadow-xs cursor-default"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{data.status_ketersediaan || "Tersedia untuk Pekerjaan / Proyek"}</span>
              </motion.div>

              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Static Micro-Deploy</span>
              </div>
            </div>

            {/* Headline Nama & Gelar Profesi */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 dark:text-white leading-[1.1]">
                Halo, saya{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {data.nama_lengkap}
                </span>
              </h1>
              <p className="text-base sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
                {data.gelar_profesi}
              </p>
            </div>

            {/* Deskripsi Singkat Berdampak */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
              {data.deskripsi_singkat}
            </p>

            {/* Lokasi */}
            {data.lokasi && (
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{data.lokasi}</span>
              </div>
            )}

            {/* Tombol Aksi Cepat & Interaktif */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                href="#bagian-proyek"
                id="tombol-lihat-karya"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-colors"
              >
                <span>Lihat Karya Web Live</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {data.url_cv && (
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  href={data.url_cv}
                  download
                  id="tombol-unduh-cv"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Unduh CV</span>
                </motion.a>
              )}

              {data.email_kontak && (
                <motion.a
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  href={`mailto:${data.email_kontak}`}
                  id="tombol-hubungi-email"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Hubungi Saya</span>
                </motion.a>
              )}
            </div>

            {/* Tautan Sosial Media */}
            <div className="flex items-center gap-2 pt-2 text-slate-500 dark:text-slate-400">
              {data.tautan_github && (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.tautan_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-2xs transition-colors"
                >
                  <IkonGithub className="w-4 h-4" />
                </motion.a>
              )}
              {data.tautan_linkedin && (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.tautan_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs transition-colors"
                >
                  <IkonLinkedin className="w-4 h-4" />
                </motion.a>
              )}
              {data.tautan_twitter && (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.tautan_twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-sky-500 shadow-2xs transition-colors"
                >
                  <IkonTwitter className="w-4 h-4" />
                </motion.a>
              )}
              {data.tautan_instagram && (
                <motion.a
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={data.tautan_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:text-pink-500 shadow-2xs transition-colors"
                >
                  <IkonInstagram className="w-4 h-4" />
                </motion.a>
              )}
            </div>

          </motion.div>

          {/* Kartu Profil Visual Interaktif & Floating Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 flex items-center justify-center"
          >
            
            {/* Foto Profil Utama */}
            <motion.div
              whileHover={{ rotate: 1, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900 group"
            >
              {data.url_foto_profil ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.url_foto_profil}
                  alt={data.nama_lengkap}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl font-black text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-500/10 to-indigo-500/20">
                  {data.nama_lengkap?.slice(0, 2).toUpperCase() || "BP"}
                </div>
              )}
            </motion.div>

            {/* Floating Chip 1: Micro-Deploy */}
            <div className="absolute -top-4 -left-6 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg animasi-melayang">
              <Rocket className="w-4 h-4 text-blue-500" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                1-Click Micro-Deploy
              </span>
            </div>

            {/* Floating Chip 2: Architecture */}
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg animasi-melayang-tunda">
              <CodeXml className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                Clean Architecture
              </span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
