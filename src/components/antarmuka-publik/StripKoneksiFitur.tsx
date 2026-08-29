"use client";

import { LogoZip, LogoNginx, LogoGoogleDrive, LogoSqlite } from "@/components/LogoTeknologi";
import { motion } from "framer-motion";

export function StripKoneksiFitur() {
  const daftarFitur = [
    {
      judul: "Drag & Drop",
      label: ".ZIP Archive",
      Logo: LogoZip,
    },
    {
      judul: "Subpath Serving",
      label: "/projects/[slug]/",
      Logo: LogoNginx,
    },
    {
      judul: "Google Drive",
      label: "Video Embed",
      Logo: LogoGoogleDrive,
    },
    {
      judul: "SQLite Storage",
      label: "Self-Hosted",
      Logo: LogoSqlite,
    },
  ];

  return (
    <div className="border-b border-slate-200/70 dark:border-slate-800/70 bg-white/40 dark:bg-slate-950/40 backdrop-blur-xs py-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {daftarFitur.map((item, idx) => {
            const LogoKomponen = item.Logo;
            return (
              <motion.div
                key={item.judul}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/60 shadow-2xs hover:shadow-xs transition-all cursor-default"
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
                  <LogoKomponen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate leading-tight">
                    {item.judul}
                  </h3>
                  <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 truncate block mt-0.5">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
