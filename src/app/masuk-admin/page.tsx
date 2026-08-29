"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Terminal, Shield, Lock, User, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PengalihTema } from "@/components/pengalih-tema";

export default function HalamanMasukAdmin() {
  const [namaPengguna, setNamaPengguna] = React.useState("");
  const [kataSandi, setKataSandi] = React.useState("");
  const [sedangMemuat, setSedangMemuat] = React.useState(false);
  const [pesanGalat, setPesanGalat] = React.useState<string | null>(null);
  const router = useRouter();

  const tanganiMasuk = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanGalat(null);
    setSedangMemuat(true);

    try {
      const res = await fetch("/api/auth/masuk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pengguna: namaPengguna,
          kata_sandi: kataSandi,
        }),
      });

      const data = await res.json();
      if (data.sukses) {
        router.push("/admin");
        router.refresh();
      } else {
        setPesanGalat(data.pesan || "Nama pengguna atau kata sandi tidak valid.");
      }
    } catch {
      setPesanGalat("Terjadi kendala saat menghubungkan ke server.");
    } finally {
      setSedangMemuat(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors relative">
      
      {/* Top Controls */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="absolute top-6 right-6">
        <PengalihTema />
      </div>

      {/* Kartu Login */}
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Admin Panel Login
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Masuk untuk mengelola portofolio & deployment statis
          </p>
        </div>

        {pesanGalat && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{pesanGalat}</span>
          </div>
        )}

        <form onSubmit={tanganiMasuk} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nama Pengguna / Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-nama-pengguna"
                type="text"
                required
                placeholder="admin"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="input-kata-sandi"
                type="password"
                required
                placeholder="••••••••"
                value={kataSandi}
                onChange={(e) => setKataSandi(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            id="tombol-submit-masuk"
            disabled={sedangMemuat}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all disabled:opacity-50 mt-2"
          >
            {sedangMemuat && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{sedangMemuat ? "Memverifikasi..." : "Masuk ke Dashboard"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500">
          <p>Kredensial bawaan awal: <strong className="font-mono text-slate-700 dark:text-slate-300">admin</strong> / <strong className="font-mono text-slate-700 dark:text-slate-300">admin12345</strong></p>
        </div>

      </div>

    </div>
  );
}
