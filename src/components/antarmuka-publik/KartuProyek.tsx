"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Globe, Play, Image as ImageIcon, ExternalLink, Eye,
  ArrowUpRight, Sparkles, Brain, Terminal, Code2,
} from "lucide-react";
import {
  LogoNextjs, LogoTypescript, LogoReact, LogoTailwind,
  LogoPrisma, LogoNginx, LogoDocker, LogoFigma,
  LogoGoogleDrive, LogoSqlite, LogoZip, LogoGit,
} from "@/components/LogoTeknologi";

export interface ProyekItem {
  id: string;
  judul: string;
  slug: string;
  deskripsi: string;
  tipe_media: string;
  kategori: string;
  gambar_sampul?: string | null;
  tautan_tujuan?: string | null;
  path_statis?: string | null;
  daftar_tag: string;
  daftar_gambar?: string | null;
  status: string;
  jumlah_dilihat: number;
  unggulan: boolean;
}

interface KartuProyekProps {
  proyek: ProyekItem;
  onBukaLivePreview: (proyek: ProyekItem) => void;
  onBukaVideo: (proyek: ProyekItem) => void;
  onBukaGaleri: (proyek: ProyekItem) => void;
  indeks?: number;
}

// ===== UTILITAS =====

function apakahProyekAI(proyek: ProyekItem): boolean {
  const teks = `${proyek.judul} ${proyek.deskripsi} ${proyek.daftar_tag} ${proyek.kategori}`.toLowerCase();
  return ["ai", "agent", "automat", "llm", "gpt", "bot", "workflow", "n8n", "langchain", "python", "machine", "crewai"].some(k => teks.includes(k));
}

const petaWarna: Record<string, { hex: string; nama: string }> = {
  WEB_DEPLOYMENT: { hex: "#3b82f6", nama: "Web" },
  VIDEO_DRIVE:    { hex: "#ec4899", nama: "Video" },
  GALERI_FOTO:    { hex: "#a78bfa", nama: "Foto" },
  default:        { hex: "#10b981", nama: "Link" },
};

function dapatkanLogoTag(tag: string) {
  const t = tag.toLowerCase();
  if (t.includes("next")) return <LogoNextjs className="w-2.5 h-2.5" />;
  if (t.includes("type")) return <LogoTypescript className="w-2.5 h-2.5" />;
  if (t.includes("react")) return <LogoReact className="w-2.5 h-2.5" />;
  if (t.includes("tail")) return <LogoTailwind className="w-2.5 h-2.5" />;
  if (t.includes("prism")) return <LogoPrisma className="w-2.5 h-2.5" />;
  if (t.includes("nginx")) return <LogoNginx className="w-2.5 h-2.5" />;
  if (t.includes("dock")) return <LogoDocker className="w-2.5 h-2.5" />;
  if (t.includes("figma")) return <LogoFigma className="w-2.5 h-2.5" />;
  if (t.includes("drive")) return <LogoGoogleDrive className="w-2.5 h-2.5" />;
  if (t.includes("sql")) return <LogoSqlite className="w-2.5 h-2.5" />;
  if (t.includes("git")) return <LogoGit className="w-2.5 h-2.5" />;
  return null;
}

function IkonTipe({ tipe, isAI }: { tipe: string; isAI: boolean }) {
  if (isAI) return <Brain className="w-3 h-3" />;
  switch (tipe) {
    case "WEB_DEPLOYMENT": return <Globe className="w-3 h-3" />;
    case "VIDEO_DRIVE":    return <Play className="w-3 h-3" />;
    case "GALERI_FOTO":    return <ImageIcon className="w-3 h-3" />;
    default:               return <ExternalLink className="w-3 h-3" />;
  }
}

// ===== KARTU KECIL COMPACT =====
export function KartuProyek({
  proyek,
  onBukaLivePreview,
  onBukaVideo,
  onBukaGaleri,
  indeks = 0,
}: KartuProyekProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [sedangHover, setSedangHover] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 25 });

  function tanganiGerak(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  }

  let daftarTag: string[] = [];
  try {
    daftarTag = JSON.parse(proyek.daftar_tag || "[]");
  } catch {
    daftarTag = (proyek.daftar_tag || "").split(",").map(t => t.trim()).filter(Boolean);
  }

  const warna = petaWarna[proyek.tipe_media] || petaWarna.default;
  const isAI = apakahProyekAI(proyek);

  function aksiUtama() {
    switch (proyek.tipe_media) {
      case "WEB_DEPLOYMENT": onBukaLivePreview(proyek); break;
      case "VIDEO_DRIVE":    onBukaVideo(proyek); break;
      case "GALERI_FOTO":    onBukaGaleri(proyek); break;
      default:
        if (proyek.tautan_tujuan) window.open(proyek.tautan_tujuan, "_blank", "noopener");
    }
  }

  // Delay stagger berdasarkan indeks (modulo 4 agar tidak terlalu lama di kolom besar)
  const delayStagger = (indeks % 8) * 0.06;

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, y: -10 }}
      transition={{
        duration: 0.4,
        delay: delayStagger,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={tanganiGerak}
      onMouseLeave={() => { x.set(0); y.set(0); setSedangHover(false); }}
      onMouseEnter={() => setSedangHover(true)}
      onClick={aksiUtama}
      id={`kartu-proyek-${proyek.slug}`}
      data-kursor="BUKA"
      className="group relative overflow-hidden rounded-xl cursor-pointer select-none"
    >
      {/* Border gradien dinamis */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: sedangHover
            ? `linear-gradient(135deg, ${warna.hex}50, rgba(255,255,255,0.08), ${warna.hex}25)`
            : `linear-gradient(135deg, ${warna.hex}20, rgba(255,255,255,0.04), ${warna.hex}10)`,
          padding: "1px",
        }}
      >
        <div className="w-full h-full rounded-[calc(0.75rem-1px)] bg-[#0d1117]" />
      </div>

      {/* Konten utama */}
      <div className="relative z-10">
        {/* Thumbnail area — rasio 16:9 */}
        <div className="relative aspect-video overflow-hidden rounded-t-[calc(0.75rem-1px)]">
          {proyek.gambar_sampul ? (
            <img
              src={proyek.gambar_sampul}
              alt={proyek.judul}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            // Placeholder unik per tipe
            <div
              className="w-full h-full flex items-center justify-center relative"
              style={{
                background: `radial-gradient(circle at 50% 40%, ${warna.hex}12, #0a0d14 75%)`,
              }}
            >
              {/* Animasi lingkaran orbit saat hover */}
              <div className="relative flex items-center justify-center">
                {isAI ? (
                  <>
                    <motion.div
                      className="absolute rounded-full border"
                      style={{ borderColor: `${warna.hex}20`, width: 52, height: 52 }}
                      animate={sedangHover ? { scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <Brain className="w-6 h-6" style={{ color: `${warna.hex}60` }} />
                  </>
                ) : (
                  <>
                    <motion.div
                      className="absolute rounded-full border"
                      style={{ borderColor: `${warna.hex}15`, width: 40, height: 40 }}
                      animate={sedangHover ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <IkonTipe tipe={proyek.tipe_media} isAI={false} />
                  </>
                )}
              </div>

              {/* Pola titik di placeholder */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${warna.hex}30 1px, transparent 1px)`,
                  backgroundSize: "16px 16px",
                }}
              />
            </div>
          )}

          {/* Overlay gelap bawah untuk readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-80" />

          {/* Badge kiri atas */}
          <div
            className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[9px] font-black"
            style={{
              background: `${warna.hex}18`,
              border: `1px solid ${warna.hex}30`,
              color: warna.hex,
            }}
          >
            <IkonTipe tipe={proyek.tipe_media} isAI={isAI} />
            <span>{isAI ? "AI" : warna.nama}</span>
          </div>

          {/* Badge unggulan kanan atas */}
          {proyek.unggulan && (
            <div className="absolute top-2 right-2 p-1 rounded-md bg-amber-500/15 border border-amber-500/25">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            </div>
          )}

          {/* Tombol aksi hover overlay */}
          <AnimatePresence>
            {sedangHover && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: `${warna.hex}10`, backdropFilter: "blur(2px)" }}
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black text-white"
                  style={{
                    background: `${warna.hex}25`,
                    border: `1px solid ${warna.hex}50`,
                    boxShadow: `0 0 20px ${warna.hex}20`,
                  }}
                >
                  <IkonTipe tipe={proyek.tipe_media} isAI={isAI} />
                  <span>
                    {proyek.tipe_media === "WEB_DEPLOYMENT" ? "Live Preview"
                      : proyek.tipe_media === "VIDEO_DRIVE" ? "Tonton"
                      : proyek.tipe_media === "GALERI_FOTO" ? "Galeri"
                      : "Buka"}
                  </span>
                  <ArrowUpRight className="w-3 h-3" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info bawah */}
        <div className="px-2.5 py-2">
          {/* Judul */}
          <h3
            className="text-[11px] font-black leading-tight line-clamp-2 mb-1 transition-colors duration-200"
            style={{ color: sedangHover ? "white" : "rgba(255,255,255,0.75)" }}
          >
            {proyek.judul}
          </h3>

          {/* Tag pills kecil */}
          {daftarTag.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1.5">
              {daftarTag.slice(0, 2).map((tag, i) => {
                const logoTag = dapatkanLogoTag(tag);
                return (
                  <span
                    key={i}
                    className="inline-flex items-center gap-0.5 text-[8px] font-bold px-1.5 py-0.5 rounded bg-white/4 border border-white/6 text-slate-600"
                  >
                    {logoTag}
                    <span>{tag}</span>
                  </span>
                );
              })}
            </div>
          )}

          {/* Footer: views + tipe */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-slate-700">
              {proyek.kategori.slice(0, 12)}
            </span>
            <div className="flex items-center gap-0.5 text-[9px] font-mono text-slate-700">
              <Eye className="w-2.5 h-2.5" />
              <span>{proyek.jumlah_dilihat}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glow saat hover */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={sedangHover
          ? { boxShadow: `0 0 30px ${warna.hex}18, 0 0 0 1px ${warna.hex}20` }
          : { boxShadow: "0 0 0px transparent" }
        }
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
