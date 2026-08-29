import { koneksiBasisData } from "@/lib/basis-data";
import { inisialisasiDataAwal } from "@/lib/data-awal";
import { NavbarPillMelayang } from "@/components/antarmuka-publik/NavbarPillMelayang";
import { PelacakBagianSamping } from "@/components/antarmuka-publik/PelacakBagianSamping";
import { HeroOrbitTeknologi } from "@/components/antarmuka-publik/HeroOrbitTeknologi";
import { MarqueeIntegrasiAlat } from "@/components/antarmuka-publik/MarqueeIntegrasiAlat";
import { BagianFilosofiKarya } from "@/components/antarmuka-publik/BagianFilosofiKarya";
import { GridProyek } from "@/components/antarmuka-publik/GridProyek";
import { VisualizerAlurDeploy } from "@/components/antarmuka-publik/VisualizerAlurDeploy";
import { BagianKeahlian } from "@/components/antarmuka-publik/BagianKeahlian";
import { FooterPublik } from "@/components/antarmuka-publik/FooterPublik";
import { LatarBelakangInteraktif } from "@/components/antarmuka-publik/LatarBelakangInteraktif";
import { KursorMagnetikInteraktif } from "@/components/antarmuka-publik/KursorMagnetikInteraktif";

export const dynamic = "force-dynamic";

export default async function HalamanBeranda() {
  await inisialisasiDataAwal();

  const biodata = await koneksiBasisData.biodata.findFirst({
    orderBy: { dibuat_pada: "desc" },
  });

  const daftarKeahlian = await koneksiBasisData.keahlian.findMany({
    orderBy: [{ urutan: "asc" }, { dibuat_pada: "asc" }],
  });

  const daftarProyek = await koneksiBasisData.proyek.findMany({
    where: { status: "AKTIF" },
    orderBy: [{ unggulan: "desc" }, { urutan: "asc" }, { dibuat_pada: "desc" }],
  });

  const dataBiodata = biodata || {
    nama_lengkap: "Bagas Pratama",
    gelar_profesi: "Senior Fullstack Engineer & Creative Technologist",
    deskripsi_singkat:
      "Membangun arsitektur perangkat lunak modern, aplikasi web interaktif performa tinggi, dan platform digital berbasis micro-deployment yang scalable.",
    status_ketersediaan: "Tersedia untuk Kontrak & Proyek Penuh",
    url_foto_profil: null,
    url_cv: "/cv-bagas-pratama.pdf",
    email_kontak: "bagas.pratama.dev@gmail.com",
    nomor_telepon: "+62 812-3456-7890",
    lokasi: "Jakarta, Indonesia",
    tautan_github: "https://github.com",
    tautan_linkedin: "https://linkedin.com",
    tautan_twitter: "https://twitter.com",
    tautan_instagram: "https://instagram.com",
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Kursor Magnetik Halus Berbasis Fisika Pegas */}
      <KursorMagnetikInteraktif />

      {/* Kanvas Partikel & Sinar Gradien Interaktif 60 FPS */}
      <LatarBelakangInteraktif />

      {/* Floating Pill Navbar Ringkas (Ultra Compact) */}
      <NavbarPillMelayang
        namaLengkap={dataBiodata.nama_lengkap}
        gelarProfesi={dataBiodata.gelar_profesi}
      />

      {/* Side Section Scroll Tracker (Sisi Kanan Layar) */}
      <PelacakBagianSamping />

      <main className="flex-1">
        {/* BAB 01: The Hook — Cinematic Hero dengan Tipografi Kinetik & Telemetri HUD */}
        <HeroOrbitTeknologi data={dataBiodata} />

        {/* Brand & Ecosystem Marquee */}
        <MarqueeIntegrasiAlat />

        {/* Manfaat & Prinsip Solusi Nyata */}
        <BagianFilosofiKarya />

        {/* Bukti Karya Nyata — Galeri 3D Proyek & Filter Karya */}
        <GridProyek daftarProyekAwal={daftarProyek} />

        {/* Kemudahan Peluncuran Web — Micro-Deployment Engine */}
        <VisualizerAlurDeploy />

        {/* Tech Stack Arsenal & Categorized Matrix */}
        <BagianKeahlian daftarKeahlian={daftarKeahlian} />
      </main>

      {/* BAB 05: Let's Connect — Footer Interaktif */}
      <FooterPublik
        namaLengkap={dataBiodata.nama_lengkap}
        emailKontak={dataBiodata.email_kontak}
      />
    </div>
  );
}
