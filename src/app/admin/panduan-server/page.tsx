"use client";

import { HeaderAdmin } from "@/components/dashboard-admin/HeaderAdmin";
import { Server, Copy, Check, ShieldAlert, Terminal, ArrowUpRight } from "lucide-react";
import * as React from "react";

export default function HalamanPanduanServer() {
  const [tersalin, setTersalin] = React.useState(false);

  const konfigurasiNginx = `# Konfigurasi Nginx: /etc/nginx/sites-available/portofolio.conf
server {
    listen 80;
    server_name domainkamu.com www.domainkamu.com;

    # 1. Aplikasi Utama Next.js (Node.js App)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # 2. Mesin Penyaji Proyek Statis (Static Micro-Deployments Serving)
    location /projects/ {
        alias /var/www/static-projects/;
        index index.html;
        try_files $uri $uri/ =404;

        # Keamanan dasar: Blokir eksekusi skrip dinamis pada file statis
        location ~* \\.(php|pl|py|sh|cgi|exe|bat)$ {
            deny all;
        }

        # Cache kontrol untuk performa optimal
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    # 3. Penyimpanan Media & Gambar Unggahan
    location /uploads/ {
        alias /var/www/uploads/;
        try_files $uri =404;
        expires 30d;
        add_header Cache-Control "public, max-age=2592000, immutable";
    }

    # Batas ukuran unggahan ZIP proyek (maksimal 50MB)
    client_max_body_size 50M;
}`;

  const salinKePapanKlip = () => {
    navigator.clipboard.writeText(konfigurasiNginx);
    setTersalin(true);
    setTimeout(() => setTersalin(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <HeaderAdmin judulHalaman="Panduan Konfigurasi Server Linux & Nginx" />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-5xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Arsitektur Deployment Linux & Subpath Nginx
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Panduan lengkap konfigurasi Nginx Reverse Proxy dan izin direktori untuk server Linux mandiri.
          </p>
        </div>

        {/* 1. Konfigurasi Nginx Block */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                1. Berkas Konfigurasi Nginx (/etc/nginx/sites-available/portofolio.conf)
              </h3>
            </div>

            <button
              type="button"
              onClick={salinKePapanKlip}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
            >
              {tersalin ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{tersalin ? "Tersalin!" : "Salin Konfigurasi"}</span>
            </button>
          </div>

          <pre className="p-4 rounded-lg bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800 leading-relaxed">
            {konfigurasiNginx}
          </pre>
        </div>

        {/* 2. Setup Direktori & Hak Akses Linux */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              2. Perintah Pembuatan Direktori & Hak Akses (Ubuntu/Debian)
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Jalankan perintah berikut di terminal server Linux untuk menyiapkan folder penyimpanan proyek statis dan unggahan:
            </p>

            <pre className="p-3.5 rounded-lg bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto border border-slate-800 leading-loose">
              {`# Buat direktori penyimpanan
sudo mkdir -p /var/www/static-projects
sudo mkdir -p /var/www/uploads

# Berikan kepemilikan kepada user web server (www-data)
sudo chown -R www-data:www-data /var/www/static-projects /var/www/uploads
sudo chmod -R 755 /var/www/static-projects /var/www/uploads

# Aktifkan konfigurasi Nginx dan muat ulang service
sudo ln -s /etc/nginx/sites-available/portofolio.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx`}
            </pre>
          </div>
        </div>

        {/* 3. Sertifikat SSL Let's Encrypt */}
        <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              3. Penerapan SSL HTTPS Otomatis (Certbot)
            </h3>
          </div>

          <pre className="p-3.5 rounded-lg bg-slate-950 text-sky-400 text-xs font-mono overflow-x-auto border border-slate-800">
            sudo certbot --nginx -d domainkamu.com -d www.domainkamu.com
          </pre>
        </div>

      </main>
    </div>
  );
}
