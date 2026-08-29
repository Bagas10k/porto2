"use client";

import * as React from "react";
import { HeaderAdmin } from "@/components/dashboard-admin/HeaderAdmin";
import {
  Mail,
  MailOpen,
  Reply,
  Trash2,
  CheckCircle2,
  Search,
  RefreshCw,
  Clock,
  User,
  ShieldCheck,
  AlertCircle,
  Inbox,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PesanItem {
  id: string;
  nama_pengirim: string;
  email_pengirim: string;
  subjek: string | null;
  isi_pesan: string;
  sudah_dibaca: boolean;
  dibuat_pada: string;
}

export default function HalamanPesanAdmin() {
  const [daftarPesan, setDaftarPesan] = React.useState<PesanItem[]>([]);
  const [sedangMemuat, setSedangMemuat] = React.useState(true);
  const [kataKunci, setKataKunci] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"SEMUA" | "BELUM_DIBACA" | "SUDAH_DIBACA">("SEMUA");
  const [pesanTerpilih, setPesanTerpilih] = React.useState<PesanItem | null>(null);

  const muatPesan = React.useCallback(async () => {
    try {
      setSedangMemuat(true);
      const res = await fetch("/api/kontak");
      const data = await res.json();
      if (data.sukses && Array.isArray(data.data)) {
        setDaftarPesan(data.data);
        if (data.data.length > 0 && !pesanTerpilih) {
          setPesanTerpilih(data.data[0]);
        }
      }
    } catch (galat) {
      console.error("Gagal memuat pesan:", galat);
    } finally {
      setSedangMemuat(false);
    }
  }, [pesanTerpilih]);

  React.useEffect(() => {
    muatPesan();
  }, [muatPesan]);

  // Filter pesan
  const pesanTerfilter = daftarPesan.filter((p) => {
    const cocokKataKunci =
      p.nama_pengirim.toLowerCase().includes(kataKunci.toLowerCase()) ||
      p.email_pengirim.toLowerCase().includes(kataKunci.toLowerCase()) ||
      (p.subjek && p.subjek.toLowerCase().includes(kataKunci.toLowerCase())) ||
      p.isi_pesan.toLowerCase().includes(kataKunci.toLowerCase());

    if (filterStatus === "BELUM_DIBACA") return cocokKataKunci && !p.sudah_dibaca;
    if (filterStatus === "SUDAH_DIBACA") return cocokKataKunci && p.sudah_dibaca;
    return cocokKataKunci;
  });

  const totalBelumDibaca = daftarPesan.filter((p) => !p.sudah_dibaca).length;

  async function tandaiStatusBaca(id: string, statusSekarang: boolean) {
    try {
      const res = await fetch(`/api/kontak/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sudah_dibaca: !statusSekarang }),
      });
      const data = await res.json();
      if (data.sukses) {
        setDaftarPesan((prev) =>
          prev.map((p) => (p.id === id ? { ...p, sudah_dibaca: !statusSekarang } : p))
        );
        if (pesanTerpilih && pesanTerpilih.id === id) {
          setPesanTerpilih({ ...pesanTerpilih, sudah_dibaca: !statusSekarang });
        }
      }
    } catch (galat) {
      console.error("Gagal update status baca:", galat);
    }
  }

  async function hapusPesan(id: string) {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin menghapus pesan ini?");
    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/kontak/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.sukses) {
        setDaftarPesan((prev) => prev.filter((p) => p.id !== id));
        if (pesanTerpilih && pesanTerpilih.id === id) {
          const sisa = daftarPesan.filter((p) => p.id !== id);
          setPesanTerpilih(sisa.length > 0 ? sisa[0] : null);
        }
      }
    } catch (galat) {
      console.error("Gagal menghapus pesan:", galat);
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <HeaderAdmin judulHalaman="Pusat Pesan & Inbox Klien" />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Metrik Header */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Pesan Masuk</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">{daftarPesan.length}</h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pesan Belum Dibaca</p>
              <div className="flex items-center gap-2 mt-1">
                {totalBelumDibaca > 0 && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />}
                <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalBelumDibaca}</h3>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pesan Selesai Diproses</p>
              <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {daftarPesan.length - totalBelumDibaca}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Cari pengirim, email, atau isi pesan..."
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-blue-500 w-64 sm:w-80"
              />
            </div>

            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
              {[
                { id: "SEMUA", label: "Semua" },
                { id: "BELUM_DIBACA", label: `Belum Dibaca (${totalBelumDibaca})` },
                { id: "SUDAH_DIBACA", label: "Sudah Dibaca" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterStatus(f.id as typeof filterStatus)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    filterStatus === f.id
                      ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={muatPesan}
            title="Muat Ulang Pesan"
            className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors self-end sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${sedangMemuat ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Master-Detail Split Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* List Sisi Kiri */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col">
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Daftar Pesan Masuk ({pesanTerfilter.length})
            </div>

            <div className="flex-1 divide-y divide-slate-100 dark:divide-slate-800/80 overflow-y-auto max-h-[600px]">
              {pesanTerfilter.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <Inbox className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold">Tidak ada pesan yang cocok.</p>
                </div>
              ) : (
                pesanTerfilter.map((pesan) => {
                  const terpilih = pesanTerpilih?.id === pesan.id;
                  return (
                    <div
                      key={pesan.id}
                      onClick={() => {
                        setPesanTerpilih(pesan);
                        if (!pesan.sudah_dibaca) {
                          tandaiStatusBaca(pesan.id, false);
                        }
                      }}
                      className={`p-4 transition-all cursor-pointer text-left relative ${
                        terpilih
                          ? "bg-blue-50/80 dark:bg-blue-950/30 border-l-4 border-blue-600"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          {!pesan.sudah_dibaca && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          )}
                          <h4
                            className={`text-xs truncate ${
                              !pesan.sudah_dibaca ? "font-black text-slate-900 dark:text-white" : "font-semibold text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {pesan.nama_pengirim}
                          </h4>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {new Date(pesan.dibuat_pada).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>

                      <p className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate mb-1">
                        {pesan.subjek || "Pertanyaan Proyek"}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {pesan.isi_pesan}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Detail View Sisi Kanan */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between">
            {pesanTerpilih ? (
              <div className="space-y-6">
                {/* Header Detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 text-[10px] font-mono font-bold">
                        {pesanTerpilih.subjek || "Pertanyaan Proyek"}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(pesanTerpilih.dibuat_pada).toLocaleString("id-ID", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pesanTerpilih.nama_pengirim}
                    </h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                      {pesanTerpilih.email_pengirim}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => tandaiStatusBaca(pesanTerpilih.id, pesanTerpilih.sudah_dibaca)}
                      title={pesanTerpilih.sudah_dibaca ? "Tandai Belum Dibaca" : "Tandai Sudah Dibaca"}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {pesanTerpilih.sudah_dibaca ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => hapusPesan(pesanTerpilih.id)}
                      title="Hapus Pesan"
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Isi Pesan */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {pesanTerpilih.isi_pesan}
                </div>

                {/* Quick Reply CTA */}
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h5 className="text-xs font-bold text-blue-900 dark:text-blue-300">
                      Balas Langsung ke {pesanTerpilih.nama_pengirim}
                    </h5>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400">
                      Membuka aplikasi email bawaan dengan format balasan otomatis.
                    </p>
                  </div>

                  <a
                    href={`mailto:${pesanTerpilih.email_pengirim}?subject=Re: ${encodeURIComponent(
                      pesanTerpilih.subjek || "Pertanyaan Proyek"
                    )}&body=Halo ${encodeURIComponent(
                      pesanTerpilih.nama_pengirim
                    )},%0D%0A%0D%0ATerima kasih telah menghubungi saya mengenai...`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Balas via Email</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400 space-y-2">
                <Mail className="w-10 h-10 mx-auto opacity-30" />
                <p className="text-xs font-semibold">Pilih pesan di sebelah kiri untuk melihat detail.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
