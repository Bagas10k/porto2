# 📘 Panduan Lengkap Setup Server Ubuntu & Cloudflare Tunnel

Panduan ini berisi dokumentasi resmi langkah demi langkah dari awal hingga selesai untuk memasang website portofolio dan mesin micro-deployment di **Ubuntu Server (VPS)** menggunakan **Docker** dan **Cloudflare Tunnel**.

---

## 🔍 Ringkasan Masalah yang Terjadi & Solusinya

Saat proses setup sebelumnya, terjadi 3 kendala umum dan berikut penjelasannya:

1. **Kendala 1: Port 3000 Sudah Terpakai (`address already in use`)**
   * *Penyebab*: Server Ubuntu sudah memiliki aplikasi lain yang berjalan di port 3000.
   * *Solusi*: Port host pada `docker-compose.yml` diubah menjadi `3005` (`3005:3000`).
2. **Kendala 2: Cloudflared Tidak Bisa Membaca Localhost (`connection refused / Bad Gateway`)**
   * *Penyebab*: Cloudflared dijalankan di dalam kontainer Docker, sehingga `localhost` merujuk ke dirinya sendiri, bukan ke server Ubuntu.
   * *Solusi*: Cloudflared dijalankan dengan opsi `--network host` agar dapat mengakses `localhost:3005` di server Ubuntu secara langsung.
3. **Kendala 3: Tabel Database Belum Terbuat (`table Biodata does not exist / 500 Error`)**
   * *Penyebab*: Folder volume Docker `./data` yang baru dibuat di server belum memiliki skema database SQLite.
   * *Solusi*: Menyalin template database `prisma/dev.db` ke `data/dev.db` dan memberikan izin akses tulis `chmod -R 777 data`.

---

## 🚀 Panduan Setup Lengkap dari Nol

### Prasyarat:
* Server Ubuntu (20.04 / 22.04 / 24.04).
* Akses SSH ke server.
* Akun Cloudflare & Domain yang sudah terhubung ke Cloudflare.

---

### Langkah 1: Pasang Git & Docker di Ubuntu Server
Hubungkan ke server via SSH:
```bash
ssh user@IP_SERVER_KAMU
```

Jalankan perintah instalasi Docker otomatis:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl

# Pasang Docker & Docker Compose resmi
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Masukkan user ke grup docker
sudo usermod -aG docker $USER
newgrp docker
```

---

### Langkah 2: Unduh Repositori Proyek dari GitHub
```bash
git clone https://github.com/Bagas10k/porto2.git
cd porto2
```

---

### Langkah 3: Siapkan Database & Izin Folder
Salin template database yang sudah jadi dan berikan izin tulis:
```bash
# 1. Siapkan folder data dan salin file database
mkdir -p data
cp prisma/dev.db data/dev.db

# 2. Siapkan folder proyek upload statis
mkdir -p public/projects

# 3. Berikan izin akses penuh ke folder data dan projects
sudo chmod -R 777 data public/projects
```

---

### Langkah 4: Jalankan Aplikasi Menggunakan Docker
Nyalakan kontainer di latar belakang:
```bash
docker compose up -d --build
```
*(Aplikasi sekarang berjalan di latar belakang pada port `3005`)*.

---

### Langkah 5: Hubungkan ke Cloudflare Tunnel

#### A. Di Web Dashboard Cloudflare (Zero Trust):
1. Buka [**dash.cloudflare.com**](https://dash.cloudflare.com) → **Zero Trust** → **Networks** → **Tunnels**.
2. Buat tunnel baru atau pilih tunnel yang ada → Klik **Configure**.
3. Di tab **Public Hostnames**, klik **Add a public hostname**:
   * **Subdomain**: `store` *(atau sesuai keinginanmu)*
   * **Domain**: `jajandigital.web.id`
   * **Type**: `HTTP`
   * **URL**: `localhost:3005`
4. Klik **Save hostname**.

#### B. Di Terminal Ubuntu:
Jalankan konektor Cloudflare Tunnel di latar belakang secara permanen:
```bash
docker run -d --name cf_tunnel --restart always --network host cloudflare/cloudflared:latest tunnel --no-autoupdate run --token <TOKEN_CLOUDFLARE_KAMU>
```

---

## 🛠️ Perintah Berguna untuk Pemeliharaan (Cheat Sheet)

| Kebutuhan | Perintah Terminal |
| :--- | :--- |
| **Cek Status Kontainer** | `docker ps` |
| **Melihat Log Error Aplikasi** | `docker compose logs -n 50 -f` |
| **Restart Website** | `docker compose restart` |
| **Stop Website** | `docker compose down` |
| **Tarik Pembaruan dari GitHub** | `git pull && docker compose up -d --build` |
| **Cek Respon Lokal** | `curl -I http://localhost:3005` |

---

## 🔑 Informasi Akses Awal Admin
* **URL Admin**: `https://domainkamu.com/admin` atau `https://domainkamu.com/masuk-admin`
* **Username Default**: `admin`
* **Password Default**: `admin12345`
*(Segera ubah password di menu Pengaturan setelah masuk).*
