import { koneksiBasisData } from "@/lib/basis-data";
import { HeaderAdmin } from "@/components/dashboard-admin/HeaderAdmin";
import {
  FolderGit2,
  Globe,
  Eye,
  Activity,
  Plus,
  Sparkles,
  ArrowUpRight,
  HardDrive,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HalamanUtamaAdmin() {
  const totalProyek = await koneksiBasisData.proyek.count();
  const totalWebStatis = await koneksiBasisData.proyek.count({
    where: { tipe_media: "WEB_DEPLOYMENT" },
  });
  const totalProyekAktif = await koneksiBasisData.proyek.count({
    where: { status: "AKTIF" },
  });

  const agregatViews = await koneksiBasisData.proyek.aggregate({
    _sum: { jumlah_dilihat: true },
  });
  const totalDilihat = agregatViews._sum.jumlah_dilihat || 0;

  const proyekTerbaru = await koneksiBasisData.proyek.findMany({
    take: 5,
    orderBy: { diperbarui_pada: "desc" },
  });

  const totalInteraksi = await koneksiBasisData.statistikInteraksi.count();

  return (
    <div className="flex-1 flex flex-col">
      <HeaderAdmin judulHalaman="Ringkasan & Metrik Performa" />

      <main className="flex-1 p-6 sm:p-8 space-y-8 max-w-7xl">
        
        {/* Banner Selamat Datang & Quick Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Micro-Deployment Engine Aktif</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Pusat Kendali Portofolio & Subpath Serving
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Unggah arsip ZIP proyek web statis, kelola galeri multimedia, dan pantau statistik interaksi secara terpusat.
            </p>
          </div>

          <Link
            href="/admin/proyek"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold shadow-sm transition-all hover:scale-105 shrink-0"
          >
            <Plus className="w-4 h-4 text-blue-600" />
            <span>Deploy Proyek Baru</span>
          </Link>
        </div>

        {/* 4 Kartu KPI Metrik (Enterprise Compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold">Total Proyek</span>
              <FolderGit2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalProyek}
            </div>
            <p className="text-[11px] text-slate-500">
              {totalProyekAktif} proyek berstatus aktif publik
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold">Live Web Statis</span>
              <Globe className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalWebStatis}
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              Tersaji via subpath /projects/[slug]/
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold">Total Penayangan</span>
              <Eye className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalDilihat.toLocaleString("id-ID")}
            </div>
            <p className="text-[11px] text-slate-500">
              Akumulasi tayangan seluruh karya
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
              <span className="text-xs font-semibold">Total Interaksi</span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalInteraksi.toLocaleString("id-ID")}
            </div>
            <p className="text-[11px] text-slate-500">
              Klik demo, video, dan unduhan CV
            </p>
          </div>

        </div>

        {/* Tabel Ringkasan Proyek Terkini */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Karya & Micro-Deployment Terbaru
            </h3>
            <Link
              href="/admin/proyek"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Kelola Semua Proyek</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Judul Proyek</th>
                    <th className="py-3 px-3">Tipe</th>
                    <th className="py-3 px-3">Subpath / Tautan</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Dilihat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {proyekTerbaru.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                        {p.judul}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        {p.tipe_media}
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                        {p.tipe_media === "WEB_DEPLOYMENT"
                          ? `/projects/${p.slug}/`
                          : p.tautan_tujuan || "-"}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums">
                        {p.jumlah_dilihat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
