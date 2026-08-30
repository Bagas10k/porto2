# 🚀 Portofolio Personal & Static Micro-Deployment Engine

Platform portofolio personal kelas enterprise untuk **Bagas Pratama** (*Senior Fullstack Engineer & Creative Technologist*) yang dilengkapi dengan mesin **Static Micro-Deployment Otomatis** (unggah file `.zip` langsung aktif menjadi website live di subpath `/projects/[nama-proyek]/`).

---

## ✨ Fitur Utama

- **Tipografi 100% Solid & Bebas Gradasi**: Kontras tinggi sesuai standar WCAG AA dengan pendaran aksen modern.
- **Interaksi Fisika Pegas 60 FPS**: Kursor magnetik ganda (*dual spring*) dan tombol hover magnetik berbasis `context7` & `framer-motion`.
- **Formulir Kontak Cepat & Inbox Admin**: Pengunjung dapat langsung mengirim pesan dari beranda yang tersimpan di basis data dan dapat dibalas dari dashboard admin.
- **Mesin Micro-Deployment Statis**: Unggah berkas ZIP (React SPA, HTML/CSS/JS, atau Mini Apps), ekstrak otomatis dengan proteksi Zip-Slip, dan sajikan subpath serving secara instan.
- **Dashboard Admin Lengkap**:
  - `/admin/proyek`: Manajer berkas, telemetri kapasitas storage, dan drag & drop uploader.
  - `/admin/pesan`: Manajemen inbox pesan masuk dan tombol balas via email.
  - `/admin/pengaturan`: Pengaturan profil biodata, tautan sosial, dan kata sandi admin.
  - `/admin/panduan-server`: Panduan lengkap perintah server Linux.
- **Siap Deployment Produksi**: Dibungkus dengan `Dockerfile` standalone, `docker-compose.yml`, `nginx.conf`, dan dukungan penuh **Cloudflare Tunnel**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router, Standalone Mode)
- **Styling**: Tailwind CSS v4
- **Animasi**: Framer Motion (Physics Spring, AnimatePresence)
- **Basis Data & ORM**: Prisma ORM (SQLite / PostgreSQL)
- **Ikon**: Lucide Icons
- **Deployment**: Docker Compose, Cloudflare Tunnel, Nginx Reverse Proxy

---

## 📖 Panduan Instalasi & Setup Server

Untuk panduan lengkap langkah demi langkah memasang website ini di **Ubuntu Server (VPS)** dan menghubungkannya ke **Cloudflare Tunnel**, silakan baca dokumen resmi berikut:

👉 [**PANDUAN_SETUP_SERVER_DAN_TUNNEL.md**](./PANDUAN_SETUP_SERVER_DAN_TUNNEL.md)

---

## 💻 Menjalankan di Komputer Lokal

```bash
# 1. Install dependensi
npm install

# 2. Sinkronisasi database Prisma
npx prisma db push

# 3. Jalankan server pengembangan
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browsermu.

---

## 📄 Lisensi
Hak Cipta © 2026 Bagas Pratama. Dilindungi undang-undang.
