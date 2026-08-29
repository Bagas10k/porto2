"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Compass, ArrowRight, Code2 } from "lucide-react";

export function BagianFilosofiKarya() {
  const pilarStory = [
    {
      nomor: "01",
      judul: "Dari Ide Langsung Jadi Aplikasi",
      subjudul: "Cepat & Tanpa Ribet",
      deskripsi:
        "Kamu cukup ceritakan apa yang ingin dibuat. Saya akan langsung mewujudkannya menjadi aplikasi atau website fungsional yang siap kamu gunakan dan bagikan.",
      warnaHex: "#3b82f6",
    },
    {
      nomor: "02",
      judul: "Otomasi Pekerjaan Rutin",
      subjudul: "Hemat Waktu & Tenaga",
      deskripsi:
        "Biar sistem cerdas yang mengerjakan tugas-tugas berulang (seperti merapikan data, membalas pesan, atau membuat laporan), sehingga kamu bisa fokus ke hal besar.",
      warnaHex: "#10b981",
    },
    {
      nomor: "03",
      judul: "Tampilan Menarik & Mudah Dipakai",
      subjudul: "Nyaman di HP & Laptop",
      deskripsi:
        "Desain yang modern, rapi, dan cepat dibuka. Setiap tombol dan halaman dibuat agar siapapun yang menggunakannya merasa nyaman dan terkesan.",
      warnaHex: "#a855f7",
    },
  ];

  return (
    <section id="bagian-filosofi" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background radial soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Narrative Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400 mb-4">
            <Compass className="w-3.5 h-3.5 text-blue-400" />
            <span>PRINSIP & CARA SAYA MEMBANTU KAMU</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Teknologi terbaik adalah yang<br />
            <span className="text-blue-400">
              membuat hidup & bisnismu lebih mudah.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Saya percaya membuat software tidak boleh berbelit-belit. Tiga hal utama yang selalu saya utamakan di setiap proyek adalah kecepatan pengerjaan, kemudahan penggunaan, dan hasil nyata yang langsung terasa manfaatnya.
          </p>
        </motion.div>

        {/* 3 Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {pilarStory.map((item, idx) => (
            <motion.div
              key={item.nomor}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6 }}
              className="p-6 sm:p-7 rounded-3xl kaca-gelap border border-white/8 hover:border-white/15 transition-all relative overflow-hidden group cursor-default"
            >
              {/* Glow sudut atas */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: item.warnaHex }}
              />

              <div className="flex items-center justify-between mb-6">
                <span
                  className="text-xs font-mono font-black"
                  style={{ color: item.warnaHex }}
                >
                  {item.nomor}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {item.subjudul}
                </span>
              </div>

              <h3 className="text-lg font-black text-white mb-2 group-hover:text-white/95 transition-colors">
                {item.judul}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.deskripsi}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
