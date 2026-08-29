"use client";

import * as React from "react";

interface PartikelKode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ukuran: number;
  simbol: string;
  opasitas: number;
  warna: string;
  faktorRotasi: number;
  sudut: number;
}

const DAFTAR_SIMBOL = [
  "λ", "fn()", "async", "AST", "01", "import",
  "Vector3", "Prompt", "Tensor", "Agent", "LLM",
  "{}", "=>", "yield", "sandbox", "wasm", "diff",
];

const DAFTAR_WARNA = [
  "rgba(59, 130, 246,",   // Blue
  "rgba(16, 185, 129,",   // Emerald
  "rgba(168, 85, 247,",   // Purple
  "rgba(6, 182, 212,",    // Cyan
];

export function KanvasPartikelGeneratif() {
  const refKanvas = React.useRef<HTMLCanvasElement>(null);
  const posisiMouse = React.useRef<{ x: number; y: number; aktif: boolean }>({
    x: -1000,
    y: -1000,
    aktif: false,
  });

  React.useEffect(() => {
    const kanvas = refKanvas.current;
    if (!kanvas) return;

    const ctx = kanvas.getContext("2d");
    if (!ctx) return;

    let idAnimasi: number;
    let lebar = (kanvas.width = window.innerWidth);
    let tinggi = (kanvas.height = window.innerHeight);

    function aturUkuranKanvas() {
      if (!kanvas) return;
      lebar = kanvas.width = window.innerWidth;
      tinggi = kanvas.height = window.innerHeight;
    }

    window.addEventListener("resize", aturUkuranKanvas);

    function tanganiGerakMouse(e: MouseEvent) {
      posisiMouse.current = {
        x: e.clientX,
        y: e.clientY,
        aktif: true,
      };
    }

    function tanganiMouseKeluar() {
      posisiMouse.current.aktif = false;
    }

    window.addEventListener("mousemove", tanganiGerakMouse, { passive: true });
    window.addEventListener("mouseleave", tanganiMouseKeluar);

    // Inisialisasi Partikel
    const jumlahPartikel = Math.min(45, Math.floor((lebar * tinggi) / 28000));
    const partikelList: PartikelKode[] = [];

    for (let i = 0; i < jumlahPartikel; i++) {
      partikelList.push({
        x: Math.random() * lebar,
        y: Math.random() * tinggi,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        ukuran: Math.random() * 3 + 9,
        simbol: DAFTAR_SIMBOL[Math.floor(Math.random() * DAFTAR_SIMBOL.length)],
        opasitas: Math.random() * 0.4 + 0.15,
        warna: DAFTAR_WARNA[Math.floor(Math.random() * DAFTAR_WARNA.length)],
        faktorRotasi: (Math.random() - 0.5) * 0.01,
        sudut: Math.random() * Math.PI * 2,
      });
    }

    // Loop Animasi 60 FPS
    function perbaruiDanGambar() {
      if (!ctx) return;
      ctx.clearRect(0, 0, lebar, tinggi);

      const mx = posisiMouse.current.x;
      const my = posisiMouse.current.y;
      const mouseAktif = posisiMouse.current.aktif;

      // 1. Gambar Garis Koneksi Antar Partikel Dekat
      for (let i = 0; i < partikelList.length; i++) {
        for (let j = i + 1; j < partikelList.length; j++) {
          const dx = partikelList[i].x - partikelList[j].x;
          const dy = partikelList[i].y - partikelList[j].y;
          const jarakKuadrat = dx * dx + dy * dy;
          const jarakMaksimal = 140;

          if (jarakKuadrat < jarakMaksimal * jarakMaksimal) {
            const jarak = Math.sqrt(jarakKuadrat);
            const kekuatanGaris = (1 - jarak / jarakMaksimal) * 0.12;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(148, 163, 184, ${kekuatanGaris})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(partikelList[i].x, partikelList[i].y);
            ctx.lineTo(partikelList[j].x, partikelList[j].y);
            ctx.stroke();
          }
        }
      }

      // 2. Perbarui & Gambar Simbol Partikel
      for (let i = 0; i < partikelList.length; i++) {
        const p = partikelList[i];

        // Gravitasi Mouse
        if (mouseAktif) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const jarakMouse = Math.sqrt(dx * dx + dy * dy);
          const radiusPengaruh = 180;

          if (jarakMouse < radiusPengaruh && jarakMouse > 10) {
            const gaya = (1 - jarakMouse / radiusPengaruh) * 0.08;
            p.vx += (dx / jarakMouse) * gaya;
            p.vy += (dy / jarakMouse) * gaya;

            // Gambar sinar koneksi ke kursor
            ctx.beginPath();
            ctx.strokeStyle = `${p.warna}${(1 - jarakMouse / radiusPengaruh) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        // Terapkan Redaman Gesekan
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Gerakkan
        p.x += p.vx;
        p.y += p.vy;
        p.sudut += p.faktorRotasi;

        // Pantulan Batas Layar
        if (p.x < -40) p.x = lebar + 40;
        if (p.x > lebar + 40) p.x = -40;
        if (p.y < -40) p.y = tinggi + 40;
        if (p.y > tinggi + 40) p.y = -40;

        // Gambar Teks Simbol Kode
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.sudut);
        ctx.font = `700 ${p.ukuran}px monospace`;
        ctx.fillStyle = `${p.warna}${p.opasitas})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.simbol, 0, 0);
        ctx.restore();
      }

      idAnimasi = requestAnimationFrame(perbaruiDanGambar);
    }

    idAnimasi = requestAnimationFrame(perbaruiDanGambar);

    return () => {
      cancelAnimationFrame(idAnimasi);
      window.removeEventListener("resize", aturUkuranKanvas);
      window.removeEventListener("mousemove", tanganiGerakMouse);
      window.removeEventListener("mouseleave", tanganiMouseKeluar);
    };
  }, []);

  return (
    <canvas
      ref={refKanvas}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 select-none opacity-60"
    />
  );
}
