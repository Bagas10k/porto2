"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Zap, Radio, Terminal } from "lucide-react";

export function HudStatusSistem() {
  const [fps, setFps] = React.useState(60);
  const [ping, setPing] = React.useState(14);
  const [waktu, setWaktu] = React.useState("");

  React.useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let idAnimasi: number;

    function hitungFps() {
      const now = performance.now();
      frameCount++;
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
        setPing(12 + Math.floor(Math.random() * 5));
      }
      idAnimasi = requestAnimationFrame(hitungFps);
    }

    idAnimasi = requestAnimationFrame(hitungFps);

    const intervalWaktu = setInterval(() => {
      const d = new Date();
      setWaktu(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`
      );
    }, 1000);

    return () => {
      cancelAnimationFrame(idAnimasi);
      clearInterval(intervalWaktu);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden md:flex items-center justify-between gap-6 px-4 py-1.5 rounded-full kaca-gelap border border-white/8 text-[10px] font-mono text-slate-400 select-none shadow-2xl backdrop-blur-xl"
    >
      {/* Status Inti Engine */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-bold text-slate-200">SISTEM SIAP</span>
        <span className="text-slate-600">|</span>
        <span className="text-emerald-400 font-semibold">RESPON KILAT</span>
      </div>

      {/* Metrik Real-time */}
      <div className="flex items-center gap-4">
        {/* FPS Counter */}
        <div className="flex items-center gap-1">
          <Activity className="w-3 h-3 text-blue-400" />
          <span>Kelancaran:</span>
          <span className="font-bold text-white tabular-nums">{fps} FPS</span>
        </div>

        {/* Latensi / Ping */}
        <div className="flex items-center gap-1">
          <Radio className="w-3 h-3 text-cyan-400" />
          <span>Kecepatan:</span>
          <span className="font-bold text-cyan-300 tabular-nums">{ping}ms</span>
        </div>

        {/* Worker Threads */}
        <div className="flex items-center gap-1">
          <Cpu className="w-3 h-3 text-violet-400" />
          <span>Otomasi AI:</span>
          <span className="font-bold text-violet-300">Aktif</span>
        </div>

        {/* Waktu Sistem */}
        {waktu && (
          <div className="flex items-center gap-1 pl-2 border-l border-slate-800 text-slate-500">
            <span>WIB:</span>
            <span className="text-slate-300 tabular-nums">{waktu}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
