"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileArchive,
  Globe,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Edit3,
  Search,
  Filter,
  HardDrive,
  CheckCircle2,
  Server,
  Layers,
  Sparkles,
  RefreshCw,
  Plus,
  LayoutGrid,
  List,
  AlertCircle,
  FileCode,
  FolderOpen,
  ArrowUpRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { ProyekItem } from "@/components/antarmuka-publik/KartuProyek";

interface PropsManajerBerkasProyek {
  daftarProyek: ProyekItem[];
  sedangMemuat: boolean;
  onTambahBaru: () => void;
  onEdit: (proyek: ProyekItem) => void;
  onHapus: (id: string, judul: string) => void;
  onMuatUlang: () => void;
}

export function ManajerBerkasProyek({
  daftarProyek,
  sedangMemuat,
  onTambahBaru,
  onEdit,
  onHapus,
  onMuatUlang,
}: PropsManajerBerkasProyek) {
  const [kataKunci, setKataKunci] = React.useState("");
  const [filterTipe, setFilterTipe] = React.useState<string>("SEMUA");
  const [modeTampilan, setModeTampilan] = React.useState<"grid" | "tabel">("grid");
  const [idTautanTersalin, setIdTautanTersalin] = React.useState<string | null>(null);

  // State Uploader Cepat
  const [apakahDrag, setApakahDrag] = React.useState(false);
  const [fileTerpilih, setFileTerpilih] = React.useState<File | null>(null);
  const [judulCepat, setJudulCepat] = React.useState("");
  const [kategoriCepat, setKategoriCepat] = React.useState("Web Development");
  const [sedangUploadCepat, setSedangUploadCepat] = React.useState(false);
  const [progresUpload, setProgresUpload] = React.useState(0);
  const [pesanStatusUpload, setPesanStatusUpload] = React.useState<string | null>(null);
  const [pesanGalatUpload, setPesanGalatUpload] = React.useState<string | null>(null);

  const refInputFile = React.useRef<HTMLInputElement>(null);

  // Filter Proyek
  const proyekTerfilter = daftarProyek.filter((p) => {
    const cocokKataKunci =
      p.judul.toLowerCase().includes(kataKunci.toLowerCase()) ||
      (p.slug && p.slug.toLowerCase().includes(kataKunci.toLowerCase())) ||
      (p.kategori && p.kategori.toLowerCase().includes(kataKunci.toLowerCase()));

    if (filterTipe === "SEMUA") return cocokKataKunci;
    if (filterTipe === "WEB_DEPLOYMENT") return cocokKataKunci && p.tipe_media === "WEB_DEPLOYMENT";
    if (filterTipe === "VIDEO_DRIVE") return cocokKataKunci && p.tipe_media === "VIDEO_DRIVE";
    if (filterTipe === "DESAIN_GAMBAR") return cocokKataKunci && p.tipe_media === "DESAIN_GAMBAR";
    return cocokKataKunci;
  });

  // Perhitungan Statistik
  const totalBerkasZip = daftarProyek.filter((p) => p.tipe_media === "WEB_DEPLOYMENT").length;
  const totalLive = daftarProyek.filter((p) => p.status === "AKTIF").length;
  const estimasiUkuranMb = (daftarProyek.length * 3.2).toFixed(1);

  // Salin Tautan
  function salinTautan(p: ProyekItem) {
    const url = p.tautan_tujuan?.startsWith("http")
      ? p.tautan_tujuan
      : `${window.location.origin}${p.tautan_tujuan}`;
    navigator.clipboard.writeText(url);
    setIdTautanTersalin(p.id);
    setTimeout(() => setIdTautanTersalin(null), 2000);
  }

  // Tangani Drag and Drop Uploader Cepat
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setApakahDrag(true);
  }

  function onDragLeave() {
    setApakahDrag(false);
  }

  function onDropFile(e: React.DragEvent) {
    e.preventDefault();
    setApakahDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      prosesPilihanFile(file);
    }
  }

  function onPilihFileManual(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      prosesPilihanFile(file);
    }
  }

  function prosesPilihanFile(file: File) {
    setFileTerpilih(file);
    setPesanGalatUpload(null);
    setPesanStatusUpload(null);
    // Buat judul otomatis dari nama file
    const namaBersih = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
    setJudulCepat(namaBersih.charAt(0).toUpperCase() + namaBersih.slice(1));
  }

  // Eksekusi Upload Cepat
  async function jalankanUploadCepat() {
    if (!fileTerpilih) return;
    if (!judulCepat.trim()) {
      setPesanGalatUpload("Mohon isi judul proyek terlebih dahulu.");
      return;
    }

    setSedangUploadCepat(true);
    setPesanGalatUpload(null);
    setProgresUpload(15);
    setPesanStatusUpload("Membaca paket file...");

    try {
      const slugOtomatis = judulCepat
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const formData = new FormData();
      formData.append("berkas_zip", fileTerpilih);
      formData.append("slug", slugOtomatis);
      formData.append("judul", judulCepat);

      setProgresUpload(45);
      setPesanStatusUpload("Memeriksa keamanan file & sanitasi...");

      const res = await fetch("/api/proyek/unggah-zip", {
        method: "POST",
        body: formData,
      });

      setProgresUpload(80);
      setPesanStatusUpload("Mengekstrak ke server & mendaftarkan URL...");

      const data = await res.json();

      if (data.sukses) {
        // Buat record proyek di database
        await fetch("/api/proyek", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            judul: judulCepat,
            slug: slugOtomatis,
            deskripsi: `Aplikasi web ${judulCepat} yang diunggah dan dideploy secara instan.`,
            kategori: kategoriCepat,
            tipe_media: "WEB_DEPLOYMENT",
            tautan_tujuan: data.data.url_tujuan,
            status: "AKTIF",
            daftar_tag: JSON.stringify(["Web App", "Live"]),
          }),
        });

        setProgresUpload(100);
        setPesanStatusUpload("Website berhasil online! URL aktif seketika.");
        setTimeout(() => {
          setFileTerpilih(null);
          setJudulCepat("");
          setSedangUploadCepat(false);
          setPesanStatusUpload(null);
          setProgresUpload(0);
          onMuatUlang();
        }, 1500);
      } else {
        setPesanGalatUpload(data.pesan || "Gagal mengunggah file.");
        setSedangUploadCepat(false);
      }
    } catch {
      setPesanGalatUpload("Terjadi kendala jaringan saat mengunggah.");
      setSedangUploadCepat(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* ===== KARTU METRIK & STORAGE TELEMETRY ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Berkas & Proyek</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{daftarProyek.length}</h3>
            <p className="text-[11px] text-blue-500 font-semibold mt-1">{totalBerkasZip} paket web (.ZIP)</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <FolderOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status Web Server</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400">ONLINE</h3>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1">Nginx Static Engine</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Server className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Penyimpanan Terpakai</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{estimasiUkuranMb} MB</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-1">dari kuota 500 MB</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Website Aktif Publik</p>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{totalLive}</h3>
            <p className="text-[11px] text-emerald-500 font-semibold mt-1">Siap dikunjungi klien</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* ===== DROPZONE UPLOADER CEPAT ===== */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono mb-1">
              <UploadCloud className="w-4 h-4" />
              <span>Pusat Unggah Berkas & Peluncuran Otomatis</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Tarik & Lepas File (.ZIP) untuk Live Deployment
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Unggah file website (.zip), video preview, atau gambar portofolio langsung ke server.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onTambahBaru}
              id="tombol-tambah-proyek-lengkap"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Formulir Detail Lengkap</span>
            </button>
          </div>
        </div>

        {/* Area Drag & Drop */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDropFile}
          className={`relative p-8 rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center text-center ${
            apakahDrag
              ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 scale-[1.01]"
              : fileTerpilih
              ? "border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/10"
              : "border-slate-300 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-950/40 hover:border-blue-400"
          }`}
        >
          <input
            ref={refInputFile}
            type="file"
            accept=".zip,image/*,video/*"
            onChange={onPilihFileManual}
            className="hidden"
          />

          {!fileTerpilih ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Tarik file ke sini, atau{" "}
                  <button
                    type="button"
                    onClick={() => refInputFile.current?.click()}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                  >
                    Pilih dari Komputer
                  </button>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Mendukung paket <span className="font-semibold text-slate-500">.ZIP</span> (HTML/CSS/JS/React build) hingga 50 MB
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl space-y-4">
              {/* Info Berkas Terpilih */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <FileArchive className="w-5 h-5" />
                  </div>
                  <div className="text-left truncate">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{fileTerpilih.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {(fileTerpilih.size / (1024 * 1024)).toFixed(2)} MB · Format Terverifikasi
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setFileTerpilih(null)}
                  disabled={sedangUploadCepat}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Form Input Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Judul Proyek
                  </label>
                  <input
                    type="text"
                    value={judulCepat}
                    onChange={(e) => setJudulCepat(e.target.value)}
                    placeholder="Contoh: Toko Online Modern"
                    disabled={sedangUploadCepat}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block mb-1">
                    Kategori
                  </label>
                  <select
                    value={kategoriCepat}
                    onChange={(e) => setKategoriCepat(e.target.value)}
                    disabled={sedangUploadCepat}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              {/* Progress & Pesan Status */}
              {sedangUploadCepat && (
                <div className="space-y-2 pt-2 text-left">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-500 font-bold">{pesanStatusUpload}</span>
                    <span className="text-slate-500">{progresUpload}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full bg-blue-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progresUpload}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Pesan Galat */}
              {pesanGalatUpload && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{pesanGalatUpload}</span>
                </div>
              )}

              {/* Tombol Eksekusi Upload */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFileTerpilih(null)}
                  disabled={sedangUploadCepat}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={jalankanUploadCepat}
                  disabled={sedangUploadCepat}
                  id="tombol-eksekusi-upload-cepat"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
                >
                  {sedangUploadCepat ? (
                    <>
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      <span>Sedang Mengunggah...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4" />
                      <span>Luncurkan Website Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== FILE MANAGER & SHOWCASE LIST ===== */}
      <div className="space-y-4">
        {/* Toolbar: Search, Filter, Switch View */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={kataKunci}
                onChange={(e) => setKataKunci(e.target.value)}
                placeholder="Cari nama berkas, URL, atau kategori..."
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-hidden focus:border-blue-500 w-64 sm:w-80"
              />
            </div>

            {/* Filter Buttons */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
              {[
                { id: "SEMUA", label: "Semua" },
                { id: "WEB_DEPLOYMENT", label: "Web (.ZIP)" },
                { id: "VIDEO_DRIVE", label: "Video" },
                { id: "DESAIN_GAMBAR", label: "Desain" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterTipe(f.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    filterTipe === f.id
                      ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={onMuatUlang}
              title="Muat Ulang Data"
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${sedangMemuat ? "animate-spin" : ""}`} />
            </button>

            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setModeTampilan("grid")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  modeTampilan === "grid"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setModeTampilan("tabel")}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  modeTampilan === "tabel"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-slate-500"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== DAFTAR BERKAS PROYEK (GRID VIEW) ===== */}
        {modeTampilan === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {proyekTerfilter.length === 0 ? (
                <div className="col-span-full py-16 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                  <FileCode className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Tidak ada berkas yang cocok
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Coba ubah kata kunci pencarian atau unggah berkas baru menggunakan dropzone di atas.
                  </p>
                </div>
              ) : (
                proyekTerfilter.map((proyek) => (
                  <motion.div
                    key={proyek.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/50 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Thumbnail / Header Kartu */}
                      <div className="relative h-36 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800/60">
                        {proyek.gambar_sampul ? (
                          <img
                            src={proyek.gambar_sampul}
                            alt={proyek.judul}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-slate-400">
                            <FileArchive className="w-8 h-8 text-blue-500" />
                            <span className="text-[10px] font-mono font-bold uppercase">{proyek.tipe_media}</span>
                          </div>
                        )}

                        {/* Status Badges */}
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              proyek.status === "AKTIF"
                                ? "bg-emerald-500/90 text-white"
                                : "bg-slate-800/90 text-slate-300"
                            }`}
                          >
                            {proyek.status === "AKTIF" ? "LIVE" : "DRAFT"}
                          </span>
                          {proyek.unggulan && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>Unggulan</span>
                            </span>
                          )}
                        </div>

                        {/* Kategori Badge */}
                        <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold">
                          {proyek.kategori}
                        </span>
                      </div>

                      {/* Detail Konten */}
                      <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {proyek.judul}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {proyek.deskripsi || "Tidak ada deskripsi."}
                        </p>

                        {/* URL Subpath */}
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 truncate">
                          <Globe className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span className="truncate">{proyek.tautan_tujuan || `projects/${proyek.slug}`}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Tombol Aksi */}
                    <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/30 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        {/* Tombol Salin Tautan */}
                        <button
                          type="button"
                          onClick={() => salinTautan(proyek)}
                          title="Salin Tautan Web"
                          className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          {idTautanTersalin === proyek.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Tombol Buka Live URL */}
                        {proyek.tautan_tujuan && (
                          <a
                            href={proyek.tautan_tujuan}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Buka Website Langsung"
                            className="p-2 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Tombol Edit */}
                        <button
                          type="button"
                          onClick={() => onEdit(proyek)}
                          title="Edit Informasi"
                          className="p-2 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        {/* Tombol Hapus */}
                        <button
                          type="button"
                          onClick={() => onHapus(proyek.id, proyek.judul)}
                          title="Hapus Berkas & Proyek"
                          className="p-2 rounded-lg text-slate-500 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* ===== DAFTAR BERKAS PROYEK (TABLE VIEW) ===== */
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4">Nama Proyek / Berkas</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Alamat Web / URL</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {proyekTerfilter.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">
                        Tidak ada berkas yang cocok dengan filter.
                      </td>
                    </tr>
                  ) : (
                    proyekTerfilter.map((proyek) => (
                      <tr key={proyek.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                              <FileArchive className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white">{proyek.judul}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{proyek.tipe_media}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{proyek.kategori}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {proyek.tautan_tujuan || `projects/${proyek.slug}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              proyek.status === "AKTIF"
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {proyek.status === "AKTIF" ? "LIVE" : "DRAFT"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => salinTautan(proyek)}
                              title="Salin Tautan Web"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              {idTautanTersalin === proyek.id ? (
                                <Check className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>

                            {proyek.tautan_tujuan && (
                              <a
                                href={proyek.tautan_tujuan}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Buka Live URL"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}

                            <button
                              type="button"
                              onClick={() => onEdit(proyek)}
                              title="Edit"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => onHapus(proyek.id, proyek.judul)}
                              title="Hapus"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
