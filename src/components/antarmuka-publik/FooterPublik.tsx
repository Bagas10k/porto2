"use client";

import * as React from "react";
import { Terminal, Shield, Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { KomponenMagnetik } from "./KomponenMagnetik";
import { FormulirKontakPublik } from "./FormulirKontakPublik";

interface FooterPublikProps {
  namaLengkap: string;
  emailKontak: string;
}

export function FooterPublik({ namaLengkap, emailKontak }: FooterPublikProps) {
  const tahunSekarang = new Date().getFullYear();

  const [modalKontakTerbuka, setModalKontakTerbuka] = React.useState(false);

  return (
    <>
      <footer id="bagian-kontak" className="relative overflow-hidden">
        {/* Gradien transisi ke footer */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020408]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />

        {/* Cahaya latar footer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">

          {/* CTA besar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-400 mb-3">
              BAB 06 · LANGKAH BERIKUTNYA
            </p>
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-white/90 tracking-tight leading-tight mb-4"
            >
              Mari Wujudkan<br />
              <span className="text-blue-400">
                Idemu Bersama.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
              Punya ide website, butuh aplikasi bisnis otomatis, atau ingin berdiskusi santai? Pintu komunikasi selalu terbuka.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <KomponenMagnetik kekuatan={0.35}>
                <button
                  type="button"
                  onClick={() => setModalKontakTerbuka(true)}
                  id="tombol-buka-form-kontak-footer"
                  data-kursor="PESAN"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(59,130,246,0.35)] hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-white" />
                  <span>Kirim Pesan Langsung</span>
                  <ArrowUpRight className="w-4 h-4 text-blue-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </button>
              </KomponenMagnetik>

              <KomponenMagnetik kekuatan={0.3}>
                <a
                  href={`mailto:${emailKontak}`}
                  id="tombol-kirim-email-langsung"
                  data-kursor="EMAIL"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl kaca-gelap border border-white/10 text-slate-300 hover:text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
                >
                  <span>{emailKontak}</span>
                </a>
              </KomponenMagnetik>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-10" />

          {/* Bar bawah */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">{namaLengkap}</p>
                <p className="text-[10px] text-slate-500 font-mono">Creative Technologist & Engineer</p>
              </div>
            </div>

            <nav className="flex items-center gap-5 text-xs text-slate-500">
              <a href="#bagian-filosofi" className="hover:text-slate-300 transition-colors">Manfaat</a>
              <a href="#bagian-proyek" className="hover:text-slate-300 transition-colors">Karya</a>
              <Link href="/arsitektur" className="hover:text-blue-400 transition-colors">Arsitektur</Link>
              <Link
                href="/admin"
                className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </Link>
            </nav>
          </div>

          <p className="text-center mt-8 text-[10px] text-slate-700">
            © {tahunSekarang} {namaLengkap}. Hak cipta dilindungi undang-undang.
          </p>
        </div>
      </footer>

      {/* Modal Formulir Kontak Interaktif */}
      <FormulirKontakPublik
        terbuka={modalKontakTerbuka}
        onTutup={() => setModalKontakTerbuka(false)}
        emailTujuan={emailKontak}
      />
    </>
  );
}
