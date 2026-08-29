# Catatan Bug, Error, & Progres Terlewati

Dokumen ini mencatat secara langsung kendala teknis, akar masalah, dan status penyelesaian selama pengembangan aplikasi.

---

## Daftar Bug & Error yang Diselesaikan

### 1. Inkompatibilitas Sintaks Separator `&&` pada Windows PowerShell
- **Gejala**: Perintah npm install gagal dengan pesan `The token '&&' is not a valid statement separator`.
- **Akar Masalah**: PowerShell Windows menggunakan tanda titik koma `;` untuk pemisah perintah berurutan.
- **Solusi**: Disesuaikan menggunakan pemisah `;` pada terminal PowerShell.
- **Status**: Terselesaikan (OK).

### 2. Breaking Changes Konfigurasi Datasource URL Prisma 7 pada SQLite
- **Gejala**: Peringatan `The datasource property url is no longer supported in schema files`.
- **Akar Masalah**: Prisma 7 memerlukan driver adapter terpisah (`@prisma/adapter-better-sqlite3`) yang membutuhkan build tools C++ native di Windows.
- **Solusi**: Digunakan Prisma v6 stabil untuk SQLite native tanpa overhead kompilasi external.
- **Status**: Terselesaikan (OK).

### 3. Ekspor Brand Icons Lucide React
- **Gejala**: `error TS2305: Module 'lucide-react' has no exported member 'Github', 'Linkedin', 'Twitter', 'Instagram'`.
- **Akar Masalah**: Pustaka `lucide-react` versi terbaru menghapus beberapa brand icon demi standarisasi.
- **Solusi**: Dibuat komponen independen [IkonSosial.tsx](file:///c:/Users/bagas/Desktop/porto/src/components/IkonSosial.tsx) berbasis SVG murni yang ringan dan presisi.
- **Status**: Terselesaikan (OK).

### 4. Direct Subpath Serving pada Iframe Live Preview Modal
- **Gejala**: Permintaan URL `/projects/kalkulator-interaktif` di dalam iframe mengembalikan 404 pada Next.js router.
- **Akar Masalah**: Next.js App Router memerlukan explicit route handler untuk membaca dan mengalirkan file statis internal tanpa bergantung pada web server Nginx saat mode dev lokal.
- **Solusi**: Dibuat Catch-All Route Handlers pada [projects/[slug]/route.ts](file:///c:/Users/bagas/Desktop/porto/src/app/projects/%5Bslug%5D/route.ts) dan [projects/[slug]/[...file]/route.ts](file:///c:/Users/bagas/Desktop/porto/src/app/projects/%5Bslug%5D/%5B...file%5D/route.ts) yang otomatis melayani berkas HTML, CSS, JS, dan gambar sesuai MIME-Type.
- **Status**: Terselesaikan (OK).

---

## Status Verifikasi & Solusi
- TypeScript `npx tsc --noEmit`: 0 error.
- Next.js `npm run build`: Kompilasi sukses 100% (14 rute terkompilasi).
- Live Browser DevTools Inspection (`take_snapshot`, `list_console_messages`): Rute beranda publik dengan Orbiting Hero dan dashboard admin berjalan lancar tanpa exception runtime.
