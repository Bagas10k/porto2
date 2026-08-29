"use client";

import * as React from "react";
import {
  Globe,
  Play,
  Image as ImageIcon,
  ExternalLink,
  Edit2,
  Trash2,
  Eye,
  ArrowUpRight,
  Sparkles,
  Upload,
  Plus,
  RefreshCw,
} from "lucide-react";
import { ProyekItem } from "@/components/antarmuka-publik/KartuProyek";

interface TabelProyekAdminProps {
  daftarProyek: ProyekItem[];
  sedangMemuat: boolean;
  onTambahBaru: () => void;
  onEdit: (proyek: ProyekItem) => void;
  onHapus: (id: string, judul: string) => void;
  onMuatUlang: () => void;
}

export function TabelProyekAdmin({
  daftarProyek,
  sedangMemuat,
  onTambahBaru,
  onEdit,
  onHapus,
  onMuatUlang,
}: TabelProyekAdminProps) {
  const [filterStatus, setFilterStatus] = React.useState("SEMUA");
  const [filterTipe, setFilterTipe] = React.useState("SEMUA");

  const proyekTerfilter = React.useMemo(() => {
    return daftarProyek.filter((p) => {
      if (filterStatus !== "SEMUA" && p.status !== filterStatus) return false;
      if (filterTipe !== "SEMUA" && p.tipe_media !== filterTipe) return false;
      return true;
    });
  }, [daftarProyek, filterStatus, filterTipe]);

  const dapatkanLencanaMedia = (tipe: string) => {
    switch (tipe) {
      case "WEB_DEPLOYMENT":
        return {
          label: "Web Statis",
          ikon: Globe,
          kelas: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
        };
      case "VIDEO_DRIVE":
        return {
          label: "Video Drive",
          ikon: Play,
          kelas: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
        };
      case "GALERI_FOTO":
        return {
          label: "Galeri Foto",
          ikon: ImageIcon,
          kelas: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
        };
      default:
        return {
          label: "Tautan Web",
          ikon: ExternalLink,
          kelas: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20",
        };
    }
  };

  const dapatkanLencanaStatus = (status: string) => {
    switch (status) {
      case "AKTIF":
        return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20";
      case "DRAFT":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar Atas Tabel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        
        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="SEMUA">Semua Status</option>
            <option value="AKTIF">Aktif</option>
            <option value="DRAFT">Draft</option>
            <option value="DIARSIPKAN">Diarsipkan</option>
          </select>

          <select
            value={filterTipe}
            onChange={(e) => setFilterTipe(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="SEMUA">Semua Tipe Media</option>
            <option value="WEB_DEPLOYMENT">Web Statis</option>
            <option value="VIDEO_DRIVE">Video Drive</option>
            <option value="GALERI_FOTO">Galeri Foto</option>
            <option value="TAUTAN_EKSTERNAL">Tautan Luar</option>
          </select>

          <button
            type="button"
            onClick={onMuatUlang}
            title="Segarkan Data"
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${sedangMemuat ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Tombol Tambah Proyek Baru */}
        <button
          type="button"
          id="tombol-tambah-proyek-baru"
          onClick={onTambahBaru}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah & Deploy Proyek</span>
        </button>

      </div>

      {/* Tabel Data Enterprise Compact */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            
            {/* Sticky Table Header */}
            <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold sticky top-0 z-10 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Proyek & Kategori</th>
                <th className="py-3 px-3">Tipe Media</th>
                <th className="py-3 px-3">Subpath / Tautan</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Dilihat</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {proyekTerfilter.length > 0 ? (
                proyekTerfilter.map((proyek) => {
                  const infoMedia = dapatkanLencanaMedia(proyek.tipe_media);
                  const IkonMedia = infoMedia.ikon;

                  return (
                    <tr
                      key={proyek.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Kolom Judul & Kategori */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {proyek.gambar_sampul ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={proyek.gambar_sampul}
                              alt={proyek.judul}
                              className="w-10 h-10 rounded-lg object-cover border border-slate-200 dark:border-slate-800 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                              <IkonMedia className="w-4 h-4" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[200px] sm:max-w-[280px]">
                                {proyek.judul}
                              </span>
                              {proyek.unggulan && (
                                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                              )}
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">
                              {proyek.kategori}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Kolom Tipe Media */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${infoMedia.kelas}`}
                        >
                          <IkonMedia className="w-3 h-3" />
                          <span>{infoMedia.label}</span>
                        </span>
                      </td>

                      {/* Kolom Subpath */}
                      <td className="py-3.5 px-3">
                        <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400 truncate block max-w-[180px]">
                          {proyek.tipe_media === "WEB_DEPLOYMENT"
                            ? `/projects/${proyek.slug}/`
                            : proyek.tautan_tujuan || "-"}
                        </span>
                      </td>

                      {/* Kolom Status */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider ${dapatkanLencanaStatus(
                            proyek.status
                          )}`}
                        >
                          {proyek.status}
                        </span>
                      </td>

                      {/* Kolom Dilihat (Rata Kanan & Tabular Nums) */}
                      <td className="py-3.5 px-3 text-right font-mono text-slate-900 dark:text-slate-100 font-semibold tabular-nums">
                        {proyek.jumlah_dilihat.toLocaleString("id-ID")}
                      </td>

                      {/* Kolom Aksi */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Live Preview Langsung */}
                          <a
                            href={
                              proyek.tipe_media === "WEB_DEPLOYMENT"
                                ? `/projects/${proyek.slug}/`
                                : proyek.tautan_tujuan || "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Buka Live Link"
                            className="p-1.5 rounded-md text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </a>

                          {/* Tombol Edit */}
                          <button
                            type="button"
                            onClick={() => onEdit(proyek)}
                            title="Edit Proyek / Re-deploy"
                            className="p-1.5 rounded-md text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Tombol Hapus */}
                          <button
                            type="button"
                            onClick={() => onHapus(proyek.id, proyek.judul)}
                            title="Hapus Proyek"
                            className="p-1.5 rounded-md text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                /* Empty Row State */
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="font-semibold text-xs">Belum ada proyek yang ditemukan.</p>
                    <p className="text-[11px] mt-0.5">
                      Klik tombol &ldquo;Tambah & Deploy Proyek&rdquo; untuk mempublikasikan karya statis pertama Anda.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
