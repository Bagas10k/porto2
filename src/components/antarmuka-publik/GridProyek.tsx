"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PenyaringProyek } from "./PenyaringProyek";
import { ProyekItem } from "./KartuProyek";
import { ModalLivePreview } from "./ModalLivePreview";
import { ModalPlayerVideo } from "./ModalPlayerVideo";
import { ModalLightboxFoto } from "./ModalLightboxFoto";
import { BagianKeahlianAI } from "./BagianKeahlianAI";
import { GaleriAlirProyek } from "./GaleriAlirProyek";
import { FolderKanban } from "lucide-react";

interface GridProyekProps {
  daftarProyekAwal: ProyekItem[];
}

// Animasi counter angka
function KounterAnimasi({ nilai }: { nilai: number }) {
  const [tampil, setTampil] = React.useState(0);
  React.useEffect(() => {
    let current = 0;
    const step = Math.max(1, Math.ceil(nilai / 20));
    const timer = setInterval(() => {
      current = Math.min(current + step, nilai);
      setTampil(current);
      if (current >= nilai) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [nilai]);
  return <span>{tampil}</span>;
}

export function GridProyek({ daftarProyekAwal }: GridProyekProps) {
  const [kategoriAktif, setKategoriAktif] = React.useState("SEMUA");
  const [kataKunci, setKataKunci] = React.useState("");

  // State Modal Preview Web
  const [previewWeb, setPreviewWeb] = React.useState<{
    terbuka: boolean; judul: string; url: string; slug: string;
  }>({ terbuka: false, judul: "", url: "", slug: "" });

  // State Modal Video
  const [previewVideo, setPreviewVideo] = React.useState<{
    terbuka: boolean; judul: string; url: string;
  }>({ terbuka: false, judul: "", url: "" });

  // State Modal Galeri Foto
  const [previewGaleri, setPreviewGaleri] = React.useState<{
    terbuka: boolean; judul: string; daftarGambar: string[];
  }>({ terbuka: false, judul: "", daftarGambar: [] });

  const rekamInteraksi = (idProyek: string, jenis: string) => {
    fetch("/api/interaksi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_proyek: idProyek, jenis_interaksi: jenis }),
    }).catch(() => {});
  };

  const proyekTerfilter = React.useMemo(() => {
    return daftarProyekAwal.filter((p) => {
      if (kategoriAktif !== "SEMUA" && p.kategori !== kategoriAktif) return false;
      if (kataKunci.trim()) {
        const q = kataKunci.toLowerCase();
        return (
          p.judul.toLowerCase().includes(q) ||
          p.deskripsi.toLowerCase().includes(q) ||
          (p.daftar_tag || "").toLowerCase().includes(q) ||
          p.kategori.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [daftarProyekAwal, kategoriAktif, kataKunci]);

  const tanganiBukaLivePreview = (proyek: ProyekItem) => {
    rekamInteraksi(proyek.id, "KLIK_LIVE_DEMO");
    setPreviewWeb({
      terbuka: true,
      judul: proyek.judul,
      url: proyek.tautan_tujuan || `/projects/${proyek.slug}/`,
      slug: proyek.slug,
    });
  };

  const tanganiBukaVideo = (proyek: ProyekItem) => {
    rekamInteraksi(proyek.id, "LIHAT_VIDEO");
    setPreviewVideo({ terbuka: true, judul: proyek.judul, url: proyek.tautan_tujuan || "" });
  };

  const tanganiBukaGaleri = (proyek: ProyekItem) => {
    rekamInteraksi(proyek.id, "LIHAT_GALERI");
    let gambarList: string[] = [];
    try { gambarList = JSON.parse(proyek.daftar_gambar || "[]"); } catch { gambarList = []; }
    if (gambarList.length === 0 && proyek.gambar_sampul) gambarList = [proyek.gambar_sampul];
    setPreviewGaleri({ terbuka: true, judul: proyek.judul, daftarGambar: gambarList });
  };

  return (
    <section id="bagian-proyek" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Dekorasi latar */}
      <div className="absolute inset-0 pola-titik-mikro opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-violet-600/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-48 h-48 bg-blue-600/4 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10">

        {/* ===== HEADER — dalam container ===== */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase mb-3">
              <span>BAB 03 · BUKTI KARYA & SOLUSI NYATA</span>
            </div>
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <h2 className="teks-seksi-raksasa text-white/90">
                  Hasil Karya<br />
                  <span className="text-blue-400">
                    Pilihan.
                  </span>
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-md">
                  Daftar aplikasi web, website interaktif, dan sistem otomasi pintar yang siap kamu coba langsung di browser.
                </p>
              </div>

              {/* Counter + instruksi drag */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-black text-white leading-none">
                      <KounterAnimasi nilai={daftarProyekAwal.length} />
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono mt-0.5">total karya</p>
                  </div>
                  <div className="w-px h-10 bg-slate-800" />
                  <div className="text-center">
                    <p className="text-2xl font-black text-white leading-none">
                      <KounterAnimasi nilai={proyekTerfilter.length} />
                    </p>
                    <p className="text-[9px] text-slate-600 font-mono mt-0.5">ditampilkan</p>
                  </div>
                </div>
                {/* Hint drag */}
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-700">
                  <motion.span
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ←
                  </motion.span>
                  <span>drag untuk menjelajahi</span>
                  <motion.span
                    animate={{ x: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Expertise */}
          <BagianKeahlianAI />

          {/* Filter */}
          <PenyaringProyek
            kategoriAktif={kategoriAktif}
            onPilihKategori={setKategoriAktif}
            kataKunci={kataKunci}
            onUbahKataKunci={setKataKunci}
            totalProyek={proyekTerfilter.length}
          />
        </div>

        {/* ===== GALERI ALIR — full width tanpa padding ===== */}
        {proyekTerfilter.length > 0 ? (
          <div className="mt-2 px-0">
            <GaleriAlirProyek
              proyek={proyekTerfilter}
              onBukaLivePreview={tanganiBukaLivePreview}
              onBukaVideo={tanganiBukaVideo}
              onBukaGaleri={tanganiBukaGaleri}
            />
          </div>
        ) : (
          // Empty state
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center kaca-gelap batas-gradien rounded-2xl"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-800/80 flex items-center justify-center mb-3">
                <FolderKanban className="w-4 h-4 text-slate-600" />
              </div>
              <h3 className="text-xs font-black text-white/70 mb-1">
                Tidak ada karya yang cocok
              </h3>
              <p className="text-[10px] text-slate-600 max-w-xs mx-auto mb-4">
                Coba ubah filter atau kata kunci pencarian.
              </p>
              <button
                onClick={() => { setKategoriAktif("SEMUA"); setKataKunci(""); }}
                className="px-4 py-1.5 rounded-lg text-[10px] font-black bg-blue-600/15 border border-blue-500/25 text-blue-500 hover:bg-blue-500/25 transition-all"
              >
                Reset Filter
              </button>
            </motion.div>
          </div>
        )}

      </div>

      {/* Modal-modal */}
      <ModalLivePreview
        terbuka={previewWeb.terbuka}
        onTutup={() => setPreviewWeb(prev => ({ ...prev, terbuka: false }))}
        judulProyek={previewWeb.judul}
        urlProyek={previewWeb.url}
        slugProyek={previewWeb.slug}
      />
      <ModalPlayerVideo
        terbuka={previewVideo.terbuka}
        onTutup={() => setPreviewVideo(prev => ({ ...prev, terbuka: false }))}
        judulProyek={previewVideo.judul}
        tautanVideo={previewVideo.url}
      />
      <ModalLightboxFoto
        terbuka={previewGaleri.terbuka}
        onTutup={() => setPreviewGaleri(prev => ({ ...prev, terbuka: false }))}
        judulProyek={previewGaleri.judul}
        daftarGambar={previewGaleri.daftarGambar}
      />
    </section>
  );
}
