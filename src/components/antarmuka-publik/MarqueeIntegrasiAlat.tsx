"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  LogoBrave, LogoFigma, LogoGatsby, LogoAstro, LogoNotion,
  LogoSpotify, LogoGoogle, LogoSketch, LogoProductHunt,
  LogoSlack, LogoXTwitter, LogoNextjs, LogoTailwind, LogoVercel,
  LogoSupabase, LogoDocker, LogoReact, LogoTypescript,
} from "@/components/LogoTeknologi";
import { IkonLinkedin } from "@/components/IkonSosial";

const barisSatu = [
  { nama: "Brave", Logo: LogoBrave },
  { nama: "Figma", Logo: LogoFigma },
  { nama: "Gatsby", Logo: LogoGatsby },
  { nama: "Astro", Logo: LogoAstro },
  { nama: "LinkedIn", Logo: () => <IkonLinkedin className="w-4 h-4 text-[#0A66C2]" /> },
  { nama: "Notion", Logo: LogoNotion },
  { nama: "Next.js", Logo: LogoNextjs },
  { nama: "Vercel", Logo: LogoVercel },
  { nama: "TypeScript", Logo: LogoTypescript },
  { nama: "Brave", Logo: LogoBrave },
  { nama: "Figma", Logo: LogoFigma },
  { nama: "Gatsby", Logo: LogoGatsby },
  { nama: "Astro", Logo: LogoAstro },
  { nama: "LinkedIn", Logo: () => <IkonLinkedin className="w-4 h-4 text-[#0A66C2]" /> },
  { nama: "Notion", Logo: LogoNotion },
  { nama: "Next.js", Logo: LogoNextjs },
  { nama: "Vercel", Logo: LogoVercel },
  { nama: "TypeScript", Logo: LogoTypescript },
];

const barisDua = [
  { nama: "Spotify", Logo: LogoSpotify },
  { nama: "Google", Logo: LogoGoogle },
  { nama: "Sketch", Logo: LogoSketch },
  { nama: "Product Hunt", Logo: LogoProductHunt },
  { nama: "Slack", Logo: LogoSlack },
  { nama: "X / Twitter", Logo: LogoXTwitter },
  { nama: "Supabase", Logo: LogoSupabase },
  { nama: "Tailwind", Logo: LogoTailwind },
  { nama: "Docker", Logo: LogoDocker },
  { nama: "React", Logo: LogoReact },
  { nama: "Spotify", Logo: LogoSpotify },
  { nama: "Google", Logo: LogoGoogle },
  { nama: "Sketch", Logo: LogoSketch },
  { nama: "Product Hunt", Logo: LogoProductHunt },
  { nama: "Slack", Logo: LogoSlack },
  { nama: "X / Twitter", Logo: LogoXTwitter },
  { nama: "Supabase", Logo: LogoSupabase },
  { nama: "Tailwind", Logo: LogoTailwind },
];

export function MarqueeIntegrasiAlat() {
  const refSeksi = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: refSeksi, offset: ["start end", "end start"] });
  const yTranslate = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={refSeksi}
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--latar-belakang) 0%, rgba(6,10,22,1) 50%, var(--latar-belakang) 100%)" }}
    >
      {/* Efek cahaya samping */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[var(--latar-belakang)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[var(--latar-belakang)] to-transparent z-10 pointer-events-none" />

      <motion.div style={{ y: yTranslate }} className="relative z-0">
        {/* Label Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600 mb-3">Ekosistem Terintegrasi</p>
          <h2 className="teks-seksi-raksasa text-white/85 leading-tight">
            Terhubung Dengan
            <br />
            <span className="text-blue-400">
              Ekosistem Modern.
            </span>
          </h2>
        </motion.div>

        {/* ===== Marquee Baris 1 — Bergerak Kiri ===== */}
        <div className="relative overflow-hidden mb-4 py-2">
          <div className="flex gap-3 w-max marquee-kiri">
            {barisSatu.map((item, idx) => {
              const LogoKomponen = item.Logo;
              return (
                <motion.div
                  key={`${item.nama}-${idx}`}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full kaca-gelap batas-gradien bayangan-kedalaman-1 shrink-0 cursor-pointer select-none group"
                >
                  <LogoKomponen className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.nama}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===== Marquee Baris 2 — Bergerak Kanan ===== */}
        <div className="relative overflow-hidden py-2">
          <div className="flex gap-3 w-max marquee-kanan">
            {barisDua.map((item, idx) => {
              const LogoKomponen = item.Logo;
              return (
                <motion.div
                  key={`${item.nama}-${idx}`}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full kaca-gelap batas-gradien bayangan-kedalaman-1 shrink-0 cursor-pointer select-none group"
                >
                  <LogoKomponen className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.nama}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
