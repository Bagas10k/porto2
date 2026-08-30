#!/bin/sh
set -e

# Buat direktori data jika belum ada
mkdir -p /app/data

# Sinkronisasi schema database SQLite secara otomatis saat kontainer menyala
echo "Menyiapkan skema basis data SQLite..."
npx prisma db push --skip-generate

# Jalankan server Next.js standalone
echo "Menjalankan aplikasi portofolio..."
exec node server.js
