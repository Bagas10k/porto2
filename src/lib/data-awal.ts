import { koneksiBasisData } from "./basis-data";
import { hashKataSandi } from "./autentikasi";

export async function inisialisasiDataAwal(): Promise<void> {
  try {
    // 1. Periksa apakah akun admin sudah ada
    const jumlahAdmin = await koneksiBasisData.pengguna.count();
    if (jumlahAdmin === 0) {
      const kataSandiAman = await hashKataSandi("admin12345");
      await koneksiBasisData.pengguna.create({
        data: {
          nama_pengguna: "admin",
          email: "admin@portofolio.id",
          kata_sandi: kataSandiAman,
          nama_lengkap: "Administrator Portofolio",
        },
      });
      console.log("Akun administrator default berhasil dibuat: admin / admin12345");
    }

    // 2. Periksa apakah biodata sudah ada
    const jumlahBiodata = await koneksiBasisData.biodata.count();
    if (jumlahBiodata === 0) {
      await koneksiBasisData.biodata.create({
        data: {
          nama_lengkap: "Bagas Pratama",
          gelar_profesi: "Senior Fullstack Engineer & Creative Technologist",
          deskripsi_singkat:
            "Membangun arsitektur perangkat lunak modern, aplikasi web interaktif performa tinggi, dan platform digital berbasis micro-deployment yang scalable.",
          status_ketersediaan: "Tersedia untuk Kontrak & Proyek Penuh",
          url_foto_profil: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
          url_cv: "/cv-bagas-pratama.pdf",
          email_kontak: "bagas.pratama.dev@gmail.com",
          nomor_telepon: "+62 812-3456-7890",
          lokasi: "Jakarta, Indonesia",
          tautan_github: "https://github.com",
          tautan_linkedin: "https://linkedin.com",
          tautan_twitter: "https://twitter.com",
          tautan_instagram: "https://instagram.com",
        },
      });
    }

    // 3. Periksa dan isi daftar keahlian
    const jumlahKeahlian = await koneksiBasisData.keahlian.count();
    if (jumlahKeahlian === 0) {
      const daftarKeahlianAwal = [
        { nama_keahlian: "TypeScript & Next.js", kategori: "Frontend", urutan: 1 },
        { nama_keahlian: "Tailwind CSS & Shadcn UI", kategori: "Frontend", urutan: 2 },
        { nama_keahlian: "React & State Management", kategori: "Frontend", urutan: 3 },
        { nama_keahlian: "Node.js & Express API", kategori: "Backend", urutan: 4 },
        { nama_keahlian: "PostgreSQL & SQLite (Prisma)", kategori: "Backend", urutan: 5 },
        { nama_keahlian: "Nginx & Linux Server", kategori: "DevOps", urutan: 6 },
        { nama_keahlian: "Docker & CI/CD Deployment", kategori: "DevOps", urutan: 7 },
        { nama_keahlian: "UI/UX & Interactive Prototyping", kategori: "Desain", urutan: 8 },
      ];

      for (const item of daftarKeahlianAwal) {
        await koneksiBasisData.keahlian.create({ data: item });
      }
    }

    // 4. Periksa dan isi contoh proyek awal
    const jumlahProyek = await koneksiBasisData.proyek.count();
    if (jumlahProyek === 0) {
      const daftarProyekAwal = [
        {
          judul: "Sistem Eksekusi Deployment Web Statis",
          slug: "kalkulator-interaktif",
          deskripsi:
            "Engine micro-deployment otomatis via ZIP dengan subpath serving berkecepatan tinggi dan isolasi aset statis.",
          tipe_media: "WEB_DEPLOYMENT",
          kategori: "Web Development",
          gambar_sampul: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
          path_statis: "projects/kalkulator-interaktif",
          tautan_tujuan: "/projects/kalkulator-interaktif/",
          daftar_tag: JSON.stringify(["Next.js", "TypeScript", "Nginx", "Static Engine"]),
          status: "AKTIF",
          jumlah_dilihat: 240,
          unggulan: true,
          urutan: 1,
        },
        {
          judul: "Showcase Video Produksi & Motion Design",
          slug: "motion-showcase-drive",
          deskripsi:
            "Eksplorasi sinematik motion branding dan integrasi video streaming responsif terhubung dengan penyimpanan cloud.",
          tipe_media: "VIDEO_DRIVE",
          kategori: "Video & Multimedia",
          gambar_sampul: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&auto=format&fit=crop&q=80",
          tautan_tujuan: "https://drive.google.com/file/d/1B4gY5exampleGoogleDriveVideoID/view",
          daftar_tag: JSON.stringify(["Google Drive Embed", "Video Player", "Motion Design"]),
          status: "AKTIF",
          jumlah_dilihat: 185,
          unggulan: true,
          urutan: 2,
        },
        {
          judul: "Desain Sistem UI Enterprise & Dashboard Analytics",
          slug: "desain-sistem-enterprise",
          deskripsi:
            "Kompilasi token desain, tipografi densitas tinggi, komponen tabel finansial terstandar WCAG AA, dan dark mode.",
          tipe_media: "GALERI_FOTO",
          kategori: "Graphic Design",
          gambar_sampul: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
          daftar_gambar: JSON.stringify([
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
          ]),
          daftar_tag: JSON.stringify(["Figma", "Design System", "WCAG AA", "UI/UX"]),
          status: "AKTIF",
          jumlah_dilihat: 310,
          unggulan: true,
          urutan: 3,
        },
        {
          judul: "Dokumentasi Arsitektur Repositori Open Source",
          slug: "arsitektur-opensource",
          deskripsi:
            "Kumpulan pustaka open source dan modul utilitas untuk akselerasi eksekusi web enterprise.",
          tipe_media: "TAUTAN_EKSTERNAL",
          kategori: "Web Development",
          gambar_sampul: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
          tautan_tujuan: "https://github.com",
          daftar_tag: JSON.stringify(["Open Source", "TypeScript", "GitHub", "Architecture"]),
          status: "AKTIF",
          jumlah_dilihat: 142,
          unggulan: false,
          urutan: 4,
        },
      ];

      for (const proyek of daftarProyekAwal) {
        await koneksiBasisData.proyek.create({ data: proyek });
      }
    }
  } catch (galat) {
    console.error("Gagal melakukan inisialisasi data awal:", galat);
  }
}
