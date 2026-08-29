"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { KomponenMagnetik } from "./KomponenMagnetik";

interface PropsFormulirKontakPublik {
  terbuka: boolean;
  onTutup: () => void;
  emailTujuan?: string;
}

export function FormulirKontakPublik({
  terbuka,
  onTutup,
  emailTujuan = "bagas.pratama.dev@gmail.com",
}: PropsFormulirKontakPublik) {
  const [nama, setNama] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subjek, setSubjek] = React.useState("Pembuatan Website & Aplikasi Bisnis");
  const [pesan, setPesan] = React.useState("");
  const [sedangKirim, setSedangKirim] = React.useState(false);
  const [sukses, setSukses] = React.useState(false);
  const [pesanGalat, setPesanGalat] = React.useState<string | null>(null);

  async function kirimPesan(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim() || !email.trim() || !pesan.trim()) {
      setPesanGalat("Nama, email, dan pesan wajib diisi.");
      return;
    }

    setSedangKirim(true);
    setPesanGalat(null);

    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pengirim: nama,
          email_pengirim: email,
          subjek,
          isi_pesan: pesan,
        }),
      });

      const data = await res.json();

      if (data.sukses) {
        setSukses(true);
        setTimeout(() => {
          setNama("");
          setEmail("");
          setPesan("");
          setSukses(false);
          onTutup();
        }, 2200);
      } else {
        setPesanGalat(data.pesan || "Gagal mengirim pesan.");
      }
    } catch {
      setPesanGalat("Terjadi kendala jaringan saat mengirim pesan.");
    } finally {
      setSedangKirim(false);
    }
  }

  return (
    <AnimatePresence>
      {terbuka && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onTutup}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className="relative w-full max-w-lg rounded-3xl bg-[#0d1117] border border-white/10 shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/15 blur-3xl pointer-events-none" />

            {/* Header Modal */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/8 relative">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider font-mono mb-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Kirim Pesan Langsung</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Diskusikan Kebutuhan Proyekmu
                </h3>
              </div>

              <button
                type="button"
                onClick={onTutup}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Konten Form / Sukses */}
            {sukses ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Pesan Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-300 max-w-xs leading-relaxed">
                  Terima kasih. Kami akan segera membaca dan merespon pesanmu melalui email secepatnya.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={kirimPesan} className="space-y-4 relative">
                {/* Nama Lengkap */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Nama Lengkap / Perusahaan
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Contoh: Budi Santoso"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Alamat Email Kamu
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Topik / Subjek */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Topik / Kebutuhan
                  </label>
                  <select
                    value={subjek}
                    onChange={(e) => setSubjek(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-xs bg-[#161b22] border border-white/10 text-white focus:outline-hidden focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    <option value="Pembuatan Website & Aplikasi Bisnis">Pembuatan Website & Aplikasi Bisnis</option>
                    <option value="Otomasi Sistem & Asisten AI">Otomasi Sistem & Asisten AI</option>
                    <option value="Desain Antarmuka UI/UX Modern">Desain Antarmuka UI/UX Modern</option>
                    <option value="Konsultasi Teknis & Arsitektur">Konsultasi Teknis & Arsitektur</option>
                    <option value="Penawaran Proyek / Kerjasama Lainnya">Penawaran Proyek / Kerjasama Lainnya</option>
                  </select>
                </div>

                {/* Pesan */}
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Detail Pesan / Gambaran Proyek
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                    <textarea
                      required
                      rows={4}
                      value={pesan}
                      onChange={(e) => setPesan(e.target.value)}
                      placeholder="Ceritakan gambaran singkat kebutuhan atau pertanyaan yang ingin didiskusikan..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner */}
                {pesanGalat && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{pesanGalat}</span>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Privasi terjamin</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onTutup}
                      disabled={sedangKirim}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={sedangKirim}
                      id="tombol-submit-pesan-kontak"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 cursor-pointer disabled:opacity-50"
                    >
                      {sedangKirim ? (
                        <>
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
