"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimation,
  PanInfo,
} from "framer-motion";
import {
  Globe, Play, Image as ImageIcon, ExternalLink,
  Brain, Eye, Sparkles, ArrowUpRight,
  Layers, Box, Compass,
} from "lucide-react";
import { ProyekItem } from "./KartuProyek";

// ===== UTILITAS =====
function apakahAI(p: ProyekItem) {
  const t = `${p.judul} ${p.deskripsi} ${p.daftar_tag} ${p.kategori}`.toLowerCase();
  return ["ai","agent","automat","llm","gpt","bot","workflow","n8n","langchain","crewai","python","machine"].some(k => t.includes(k));
}

const WARNA: Record<string, { hex: string; label: string }> = {
  WEB_DEPLOYMENT: { hex: "#3b82f6", label: "Web" },
  VIDEO_DRIVE:    { hex: "#ec4899", label: "Video" },
  GALERI_FOTO:    { hex: "#a78bfa", label: "Foto" },
  default:        { hex: "#10b981", label: "Link" },
};

function IkonTipe({ tipe, isAI }: { tipe: string; isAI: boolean }) {
  if (isAI) return <Brain className="w-3.5 h-3.5" />;
  switch (tipe) {
    case "WEB_DEPLOYMENT": return <Globe className="w-3.5 h-3.5" />;
    case "VIDEO_DRIVE":    return <Play className="w-3.5 h-3.5" />;
    case "GALERI_FOTO":    return <ImageIcon className="w-3.5 h-3.5" />;
    default:               return <ExternalLink className="w-3.5 h-3.5" />;
  }
}

// Preset mode perspektif 3D
type ModePerspektif = "isometrik" | "teater" | "datar";

const KONFIG_PERSPEKTIF: Record<ModePerspektif, {
  label: string;
  ikon: typeof Box;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  skala: number;
  deskripsi: string;
}> = {
  isometrik: {
    label: "3D Isometric",
    ikon: Box,
    rotateX: 16,
    rotateY: -12,
    rotateZ: 2.5,
    skala: 0.95,
    deskripsi: "Perspektif sudut isometrik spasial",
  },
  teater: {
    label: "3D Cinema",
    ikon: Layers,
    rotateX: 22,
    rotateY: 0,
    rotateZ: 0,
    skala: 0.93,
    deskripsi: "Sudut teater melengkung kedalaman",
  },
  datar: {
    label: "Flat Matrix",
    ikon: Compass,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    skala: 1,
    deskripsi: "Tampilan matriks horizontal bersih",
  },
};

// ===== KARTU STREAM DENGAN TRUE 3D DEPTH (Z-SPACE) =====
function KartuStream({
  proyek,
  onKlik,
}: {
  proyek: ProyekItem;
  onKlik: (p: ProyekItem) => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  const [gambarGagal, setGambarGagal] = React.useState(false);
  const w = WARNA[proyek.tipe_media] ?? WARNA.default;
  const isAI = apakahAI(proyek);

  // 3D Tilt per-kartu mengikuti kursor lokal
  const cardRef = React.useRef<HTMLDivElement>(null);
  const mouseLocalX = useMotionValue(0.5);
  const mouseLocalY = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(mouseLocalY, [0, 1], [10, -10]), { stiffness: 400, damping: 30 });
  const tiltY = useSpring(useTransform(mouseLocalX, [0, 1], [-10, 10]), { stiffness: 400, damping: 30 });

  function tanganiMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseLocalX.set((e.clientX - rect.left) / rect.width);
    mouseLocalY.set((e.clientY - rect.top) / rect.height);
  }

  function tanganiMouseLeave() {
    setHovered(false);
    mouseLocalX.set(0.5);
    mouseLocalY.set(0.5);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={tanganiMouseMove}
      onMouseLeave={tanganiMouseLeave}
      onClick={() => onKlik(proyek)}
      whileHover={{ scale: 1.06, z: 60 }}
      whileTap={{ scale: 0.96 }}
      style={{
        rotateX: hovered ? tiltX : 0,
        rotateY: hovered ? tiltY : 0,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className="relative flex-shrink-0 w-64 overflow-visible rounded-2xl cursor-pointer select-none py-2"
    >
      {/* 3D Drop Shadow di bawah kartu */}
      <motion.div
        className="absolute inset-x-3 bottom-0 h-6 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: hovered ? `${w.hex}40` : "rgba(0,0,0,0.6)",
          transform: "translateZ(-30px) translateY(12px)",
          opacity: hovered ? 0.9 : 0.4,
        }}
      />

      {/* Kartu Utama Berbasis Preserve-3D */}
      <div
        className="relative bg-[#090c12] rounded-2xl overflow-hidden border transition-colors duration-300"
        style={{
          borderColor: hovered ? `${w.hex}60` : "rgba(255,255,255,0.08)",
          boxShadow: hovered
            ? `0 0 35px ${w.hex}25, inset 0 0 15px ${w.hex}15`
            : "0 10px 30px rgba(0,0,0,0.5)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Kilau Holografik 3D Mengikuti Kursor */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 opacity-70"
            style={{
              background: `radial-gradient(circle at ${mouseLocalX.get() * 100}% ${mouseLocalY.get() * 100}%, ${w.hex}30, transparent 60%)`,
              transform: "translateZ(30px)",
            }}
          />
        )}

        {/* Lapisan Z-1: Thumbnail Area */}
        <div
          className="relative h-36 overflow-hidden bg-[#06080d]"
          style={{ transform: hovered ? "translateZ(18px)" : "translateZ(0)", transition: "transform 0.3s ease" }}
        >
          {proyek.gambar_sampul && !gambarGagal ? (
            <motion.img
              src={proyek.gambar_sampul}
              alt=""
              onError={() => setGambarGagal(true)}
              className="w-full h-full object-cover"
              animate={hovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center relative overflow-hidden"
              style={{ background: `radial-gradient(circle at 50% 40%, ${w.hex}25, #06080d 75%)` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(${w.hex}20 1px, transparent 1px), linear-gradient(90deg, ${w.hex}20 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative flex items-center justify-center">
                {[1.4, 2.2, 3].map((scale, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                      borderColor: `${w.hex}25`,
                      width: 28 * scale,
                      height: 28 * scale,
                    }}
                    animate={hovered ? {
                      scale: [1, 1.25, 1],
                      opacity: [0.5, 0.1, 0.5],
                    } : {
                      scale: 1,
                      opacity: 0.25,
                    }}
                    transition={{ duration: 2.2, delay: i * 0.35, repeat: hovered ? Infinity : 0 }}
                  />
                ))}
                <div style={{ color: `${w.hex}` }}>
                  <IkonTipe tipe={proyek.tipe_media} isAI={isAI} />
                </div>
              </div>
            </div>
          )}

          {/* Gradien Bayangan Bawah Thumbnail */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090c12] via-[#090c12]/20 to-transparent" />

          {/* Lapisan Z-3: Badge Tipe Proyek Pop-Out */}
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black backdrop-blur-md transition-transform duration-300"
            style={{
              background: `${w.hex}25`,
              border: `1px solid ${w.hex}50`,
              color: w.hex,
              transform: hovered ? "translateZ(40px)" : "translateZ(5px)",
              boxShadow: hovered ? `0 4px 12px ${w.hex}30` : "none",
            }}
          >
            <IkonTipe tipe={proyek.tipe_media} isAI={isAI} />
            <span>{isAI ? "AI Agent" : w.label}</span>
          </div>

          {/* Badge Unggulan */}
          {proyek.unggulan && (
            <div
              className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-amber-500/20 border border-amber-500/40 transition-transform duration-300"
              style={{ transform: hovered ? "translateZ(40px)" : "translateZ(5px)" }}
            >
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </div>
          )}

          {/* Lapisan Z-4: Tombol Melayang Aksi 3D */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{ transform: "translateZ(60px)" }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${w.hex}dd, ${w.hex}99)`,
                border: "1px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 12px 30px ${w.hex}60`,
              }}
            >
              <IkonTipe tipe={proyek.tipe_media} isAI={isAI} />
              <span>
                {proyek.tipe_media === "WEB_DEPLOYMENT" ? "Live Preview" :
                 proyek.tipe_media === "VIDEO_DRIVE" ? "Tonton Video" :
                 proyek.tipe_media === "GALERI_FOTO" ? "Buka Galeri" : "Kunjungi"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </div>

        {/* Lapisan Z-2: Info Proyek Text */}
        <div
          className="p-3.5"
          style={{ transform: hovered ? "translateZ(25px)" : "translateZ(0)", transition: "transform 0.3s ease" }}
        >
          <h3
            className="text-xs font-black leading-snug line-clamp-1 mb-1.5 transition-colors"
            style={{ color: hovered ? "white" : "rgba(255,255,255,0.9)" }}
          >
            {proyek.judul}
          </h3>
          <div className="flex items-center justify-between">
            <span
              className="text-[9px] font-bold uppercase tracking-wider"
              style={{ color: `${w.hex}90` }}
            >
              {proyek.kategori}
            </span>
            <div className="flex items-center gap-1 text-[9px] font-mono text-slate-500">
              <Eye className="w-3 h-3" />
              <span>{proyek.jumlah_dilihat}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ===== BARIS MENGALIR HORIZONTAL =====
interface BarisMengalirProps {
  proyek: ProyekItem[];
  arah: "kiri" | "kanan";
  kecepatan: number;
  onKlikKartu: (p: ProyekItem) => void;
}

function BarisMengalir({ proyek, arah, kecepatan, onKlikKartu }: BarisMengalirProps) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const sedangDragRef = React.useRef(false);
  const posisiAwalRef = React.useRef(0);

  const daftarDuplikasi = [...proyek, ...proyek, ...proyek, ...proyek];
  const LEBAR_KARTU = 256 + 16;
  const lebarSatu = proyek.length * LEBAR_KARTU;

  const mulaiAnimasi = React.useCallback((dariPosisi: number) => {
    if (sedangDragRef.current) return;
    const targetX = arah === "kiri"
      ? dariPosisi - lebarSatu
      : dariPosisi + lebarSatu;

    controls.start({
      x: targetX,
      transition: {
        duration: kecepatan,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [arah, kecepatan, lebarSatu, controls]);

  React.useEffect(() => {
    const start = arah === "kiri" ? 0 : -lebarSatu;
    posisiAwalRef.current = start;
    x.set(start);
    mulaiAnimasi(start);
  }, [arah, lebarSatu, mulaiAnimasi, x]);

  function tanganiDragMulai() {
    sedangDragRef.current = true;
    controls.stop();
  }

  function tanganiDragSelesai(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    sedangDragRef.current = false;
    const currentX = x.get();

    let normalized = currentX;
    if (normalized < -lebarSatu * 2) normalized = normalized + lebarSatu;
    if (normalized > 0) normalized = normalized - lebarSatu;
    x.set(normalized);

    const momentumX = currentX + info.velocity.x * 0.3;
    mulaiAnimasi(momentumX);
  }

  return (
    <div
      className="overflow-visible relative py-1"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        ref={trackRef}
        drag="x"
        dragMomentum={false}
        animate={controls}
        style={{ x, cursor: "grab", transformStyle: "preserve-3d" }}
        onDragStart={tanganiDragMulai}
        onDragEnd={tanganiDragSelesai}
        whileDrag={{ cursor: "grabbing" }}
        className="flex gap-4 will-change-transform"
      >
        {daftarDuplikasi.map((p, idx) => (
          <KartuStream
            key={`${p.id}-${idx}`}
            proyek={p}
            onKlik={onKlikKartu}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ===== GALERI ALIR PERSPEKTIF 3D UTAMA =====
interface GaleriAlirProyekProps {
  proyek: ProyekItem[];
  onBukaLivePreview: (p: ProyekItem) => void;
  onBukaVideo: (p: ProyekItem) => void;
  onBukaGaleri: (p: ProyekItem) => void;
}

export function GaleriAlirProyek({
  proyek,
  onBukaLivePreview,
  onBukaVideo,
  onBukaGaleri,
}: GaleriAlirProyekProps) {
  const [mode, setMode] = React.useState<ModePerspektif>("isometrik");

  // Mouse Spasial Parallax untuk seluruh kanvas 3D
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasMouseX = useMotionValue(0);
  const canvasMouseY = useMotionValue(0);

  const canvasTiltX = useSpring(useTransform(canvasMouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 120,
    damping: 20,
  });
  const canvasTiltY = useSpring(useTransform(canvasMouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  function tanganiCanvasMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    canvasMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    canvasMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function tanganiCanvasMouseLeave() {
    canvasMouseX.set(0);
    canvasMouseY.set(0);
  }

  // Bagi proyek ke 3 baris
  const baris1 = proyek.filter((_, i) => i % 3 === 0);
  const baris2 = proyek.filter((_, i) => i % 3 === 1);
  const baris3 = proyek.filter((_, i) => i % 3 === 2);

  function pastikanCukup(list: ProyekItem[], min = 4) {
    if (list.length === 0) return proyek.slice(0, min);
    while (list.length < min) list = [...list, ...list];
    return list;
  }

  const barisList = [
    { data: pastikanCukup(baris1), arah: "kiri" as const, kecepatan: 55 },
    { data: pastikanCukup(baris2), arah: "kanan" as const, kecepatan: 68 },
    { data: pastikanCukup(baris3), arah: "kiri" as const, kecepatan: 48 },
  ];

  function tanganiKlikKartu(p: ProyekItem) {
    switch (p.tipe_media) {
      case "WEB_DEPLOYMENT": onBukaLivePreview(p); break;
      case "VIDEO_DRIVE":    onBukaVideo(p); break;
      case "GALERI_FOTO":    onBukaGaleri(p); break;
      default:
        if (p.tautan_tujuan) window.open(p.tautan_tujuan, "_blank", "noopener");
    }
  }

  const konfig = KONFIG_PERSPEKTIF[mode];

  return (
    <div
      ref={containerRef}
      onMouseMove={tanganiCanvasMouseMove}
      onMouseLeave={tanganiCanvasMouseLeave}
      className="relative w-full overflow-hidden py-4"
    >
      {/* Pengalih Sudut Perspektif 3D Interaktif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>3D SPATIAL ENGINE ACTIVE</span>
          <span className="text-slate-700">·</span>
          <span className="text-slate-400">{konfig.deskripsi}</span>
        </div>

        {/* Selector Mode 3D */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
          {(Object.keys(KONFIG_PERSPEKTIF) as ModePerspektif[]).map((key) => {
            const item = KONFIG_PERSPEKTIF[key];
            const Ikon = item.ikon;
            const aktif = mode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  aktif
                    ? "text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {aktif && (
                  <motion.div
                    layoutId="pill-mode-perspektif"
                    className="absolute inset-0 bg-blue-600 rounded-lg -z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  />
                )}
                <Ikon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lantai Grid Perspektif 3D di Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-30"
      >
        <div className="absolute inset-0 lantai-perspektif-3d opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Kanvas 3D dengan Perspektif Spasial Dinamis */}
      <div
        className="relative w-full perspektif-3d overflow-visible"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          animate={{
            rotateX: konfig.rotateX,
            rotateY: konfig.rotateY,
            rotateZ: konfig.rotateZ,
            scale: konfig.skala,
          }}
          style={{
            rotateX: canvasTiltX,
            rotateY: canvasTiltY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="flex flex-col gap-4 py-4"
        >
          {barisList.map((baris, idx) => (
            <BarisMengalir
              key={idx}
              proyek={baris.data}
              arah={baris.arah}
              kecepatan={baris.kecepatan}
              onKlikKartu={tanganiKlikKartu}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
