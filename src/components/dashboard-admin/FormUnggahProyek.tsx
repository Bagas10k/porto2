"use client";

import * as React from "react";
import {
  Upload,
  FileArchive,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  Play,
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  FolderUp,
  Sparkles,
} from "lucide-react";
import { ProyekItem } from "@/components/antarmuka-publik/KartuProyek";

interface FormUnggahProyekProps {
  terbuka: boolean;
  onTutup: () => void;
  onSukses: () => void;
  proyekEdit?: ProyekItem | null;
}

export function FormUnggahProyek({
  terbuka,
  onTutup,
  onSukses,
  proyekEdit,
}: FormUnggahProyekProps) {
  const [tipeMedia, setTipeMedia] = React.useState("WEB_DEPLOYMENT");
  const [judul, setJudul] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [deskripsi, setDeskripsi] = React.useState("");
  const [kategori, setKategori] = React.useState("Web Development");
  const [gambarSampul, setGambarSampul] = React.useState("");
  const [tautanTujuan, setTautanTujuan] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [statusProyek, setStatusProyek] = React.useState("AKTIF");
  const [unggulan, setUnggulan] = React.useState(false);
  const [daftarGambarText, setDaftarGambarText] = React.useState("");

  // State Berkas ZIP
  const [berkasZip, setBerkasZip] = React.useState<File | null>(null);
  const [apakahDragOver, setApakahDragOver] = React.useState(false);
  const [statusDeployZip, setStatusDeployZip] = React.useState<string | null>(null);

  // Loading & Error States
  const [sedangMenyimpan, setSedangMenyimpan] = React.useState(false);
  const [sedangUnggahGambar, setSedangUnggahGambar] = React.useState(false);
  const [pesanGalat, setPesanGalat] = React.useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = React.useState<string | null>(null);

  // Inisialisasi data saat mode edit atau buat baru
  React.useEffect(() => {
    if (proyekEdit) {
      setTipeMedia(proyekEdit.tipe_media || "WEB_DEPLOYMENT");
      setJudul(proyekEdit.judul || "");
      setSlug(proyekEdit.slug || "");
      setDeskripsi(proyekEdit.deskripsi || "");
      setKategori(proyekEdit.kategori || "Web Development");
      setGambarSampul(proyekEdit.gambar_sampul || "");
      setTautanTujuan(proyekEdit.tautan_tujuan || "");
      setStatusProyek(proyekEdit.status || "AKTIF");
      setUnggulan(Boolean(proyekEdit.unggulan));

      let tagStr = "";
      try {
        const parsed = JSON.parse(proyekEdit.daftar_tag || "[]");
        tagStr = Array.isArray(parsed) ? parsed.join(", ") : proyekEdit.daftar_tag;
      } catch {
        tagStr = proyekEdit.daftar_tag || "";
      }
      setTags(tagStr);

      let imgStr = "";
      try {
        const parsed = JSON.parse(proyekEdit.daftar_gambar || "[]");
        imgStr = Array.isArray(parsed) ? parsed.join("\n") : proyekEdit.daftar_gambar || "";
      } catch {
        imgStr = proyekEdit.daftar_gambar || "";
      }
      setDaftarGambarText(imgStr);
    } else {
      setTipeMedia("WEB_DEPLOYMENT");
      setJudul("");
      setSlug("");
      setDeskripsi("");
      setKategori("Web Development");
      setGambarSampul("");
      setTautanTujuan("");
      setTags("Next.js, TypeScript, Tailwind");
      setStatusProyek("AKTIF");
      setUnggulan(false);
      setDaftarGambarText("");
      setBerkasZip(null);
      setStatusDeployZip(null);
    }
    setPesanGalat(null);
    setPesanSukses(null);
  }, [proyekEdit, terbuka]);

  // Otomatis buat slug saat judul diketik (jika bukan mode edit)
  const tanganiUbahJudul = (val: string) => {
    setJudul(val);
    if (!proyekEdit) {
      const slugBaru = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(slugBaru);
    }
  };

  // Handler Drag and Drop Berkas ZIP
  const tanganiDropZip = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setApakahDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith(".zip")) {
        setBerkasZip(file);
        setStatusDeployZip(`Berkas '${file.name}' (${(file.size / 1024 / 1024).toFixed(2)} MB) siap diekstrak.`);
      } else {
        setPesanGalat("Hanya berkas format .zip yang diperbolehkan untuk deployment statis.");
      }
    }
  };

  const tanganiPilihBerkasZip = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith(".zip")) {
        setBerkasZip(file);
        setStatusDeployZip(`Berkas '${file.name}' (${(file.size / 1024 / 1024).toFixed(2)} MB) siap diekstrak.`);
      } else {
        setPesanGalat("Hanya berkas format .zip yang diperbolehkan.");
      }
    }
  };

  // Handler Unggah Cover Image
  const tanganiUnggahCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const berkas = e.target.files[0];
    setSedangUnggahGambar(true);
    setPesanGalat(null);

    try {
      const dataForm = new FormData();
      dataForm.append("berkas", berkas);

      const res = await fetch("/api/unggah-gambar", {
        method: "POST",
        body: dataForm,
      });
      const data = await res.json();
      if (data.sukses) {
        setGambarSampul(data.url);
      } else {
        setPesanGalat(data.pesan || "Gagal mengunggah gambar sampul.");
      }
    } catch {
      setPesanGalat("Terjadi kesalahan jaringan saat mengunggah gambar.");
    } finally {
      setSedangUnggahGambar(false);
    }
  };

  // Submit Handler
  const tanganiSimpan = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanGalat(null);
    setPesanSukses(null);
    setSedangMenyimpan(true);

    try {
      let jalurStatisFinal = proyekEdit?.path_statis || null;
      let tautanTujuanFinal = tautanTujuan;

      // 1. Jika tipe Web Deployment dan ada berkas ZIP yang diunggah, lakukan ekstraksi terlebih dahulu
      if (tipeMedia === "WEB_DEPLOYMENT" && berkasZip) {
        const formDataZip = new FormData();
        formDataZip.append("berkas_zip", berkasZip);
        formDataZip.append("slug", slug);

        setStatusDeployZip("Sedang mengekstrak berkas ZIP ke direktori server...");
        const resZip = await fetch("/api/proyek/unggah-zip", {
          method: "POST",
          body: formDataZip,
        });
        const dataZip = await resZip.json();

        if (!dataZip.sukses) {
          setPesanGalat(dataZip.pesan || "Gagal mengekstrak berkas ZIP.");
          setSedangMenyimpan(false);
          return;
        }

        jalurStatisFinal = `projects/${slug}`;
        tautanTujuanFinal = dataZip.jalurAksesPublik;
      } else if (tipeMedia === "WEB_DEPLOYMENT" && !tautanTujuanFinal) {
        tautanTujuanFinal = `/projects/${slug}/`;
      }

      // 2. Format tagar dan galeri gambar
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const gambarArray = daftarGambarText
        .split("\n")
        .map((g) => g.trim())
        .filter(Boolean);

      // 3. Simpan Proyek ke Database
      const payload = {
        judul,
        slug,
        deskripsi,
        tipe_media: tipeMedia,
        kategori,
        gambar_sampul: gambarSampul || null,
        tautan_tujuan: tautanTujuanFinal || null,
        path_statis: jalurStatisFinal,
        daftar_tag: JSON.stringify(tagArray),
        daftar_gambar: JSON.stringify(gambarArray),
        status: statusProyek,
        unggulan,
      };

      const urlTarget = proyekEdit ? `/api/proyek/${proyekEdit.id}` : "/api/proyek";
      const metode = proyekEdit ? "PUT" : "POST";

      const res = await fetch(urlTarget, {
        method: metode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const dataRes = await res.json();
      if (dataRes.sukses) {
        setPesanSukses(proyekEdit ? "Proyek berhasil diperbarui!" : "Proyek baru dan deployment berhasil dibuat!");
        setTimeout(() => {
          onSukses();
          onTutup();
        }, 1200);
      } else {
        setPesanGalat(dataRes.pesan || "Gagal menyimpan data proyek.");
      }
    } catch (galat) {
      console.error("Galat saat menyimpan proyek:", galat);
      setPesanGalat("Terjadi kendala saat menghubungkan ke server.");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  if (!terbuka) return null;

  return (
    <div
      id="modal-form-unggah-proyek"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="flex flex-col w-full max-w-3xl my-auto bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh]">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FolderUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                {proyekEdit ? "Edit Proyek & Re-Deploy" : "Publikasikan Proyek Baru"}
              </h3>
              <p className="text-[11px] text-slate-500">
                Micro-deployment statis drag-and-drop & integrasi multimedia
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onTutup}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={tanganiSimpan} className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Pesan Notifikasi */}
          {pesanGalat && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{pesanGalat}</span>
            </div>
          )}

          {pesanSukses && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{pesanSukses}</span>
            </div>
          )}

          {/* 1. Pemilihan Tipe Media */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Tipe Media & Format Deployment
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "WEB_DEPLOYMENT", label: "Web Statis (ZIP)", ikon: Globe },
                { id: "VIDEO_DRIVE", label: "Google Drive Video", ikon: Play },
                { id: "GALERI_FOTO", label: "Galeri Foto", ikon: ImageIcon },
                { id: "TAUTAN_EKSTERNAL", label: "Tautan Web", ikon: ExternalLink },
              ].map((tipe) => {
                const Ikon = tipe.ikon;
                const aktif = tipeMedia === tipe.id;
                return (
                  <button
                    key={tipe.id}
                    type="button"
                    onClick={() => setTipeMedia(tipe.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      aktif
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <Ikon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tipe.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Drag & Drop Area Khusus Web Deployment */}
          {tipeMedia === "WEB_DEPLOYMENT" && (
            <div className="space-y-2 p-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20">
              <label className="block text-xs font-bold text-blue-950 dark:text-blue-200">
                Arsip ZIP Web Statis {proyekEdit && "(Opsional untuk Re-Deploy)"}
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setApakahDragOver(true);
                }}
                onDragLeave={() => setApakahDragOver(false)}
                onDrop={tanganiDropZip}
                className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  apakahDragOver
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/40"
                    : "border-blue-300 dark:border-blue-800/80 bg-white dark:bg-slate-900 hover:bg-blue-50/40 dark:hover:bg-slate-800/60"
                }`}
              >
                <input
                  id="input-berkas-zip"
                  type="file"
                  accept=".zip"
                  onChange={tanganiPilihBerkasZip}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />

                <FileArchive className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {berkasZip ? berkasZip.name : "Tarik & Lepas berkas .ZIP di sini, atau klik untuk memilih"}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 text-center">
                  Menerima berkas ZIP berisi HTML, CSS, JS, dan aset (wajib memiliki index.html).
                </p>

                {berkasZip && (
                  <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Berkas siap diekstrak</span>
                  </div>
                )}
              </div>

              {statusDeployZip && (
                <p className="text-[11px] font-mono text-blue-700 dark:text-blue-300 mt-1">
                  {statusDeployZip}
                </p>
              )}
            </div>
          )}

          {/* 3. Tautan Khusus Google Drive Video atau Link Eksternal */}
          {(tipeMedia === "VIDEO_DRIVE" || tipeMedia === "TAUTAN_EKSTERNAL") && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {tipeMedia === "VIDEO_DRIVE"
                  ? "Tautan Google Drive / Video URL"
                  : "Tautan URL Tujuan Eksternal"}
              </label>
              <input
                type="url"
                required
                placeholder={
                  tipeMedia === "VIDEO_DRIVE"
                    ? "https://drive.google.com/file/d/.../view atau tautan video"
                    : "https://example.com/proyek-anda"
                }
                value={tautanTujuan}
                onChange={(e) => setTautanTujuan(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
              {tipeMedia === "VIDEO_DRIVE" && (
                <p className="text-[11px] text-slate-500">
                  Sistem otomatis mengekstrak ID berkas Google Drive untuk iframe preview. Pastikan status share link adalah &ldquo;Anyone with link can view&rdquo;.
                </p>
              )}
            </div>
          )}

          {/* 4. Galeri Foto Multi URL */}
          {tipeMedia === "GALERI_FOTO" && (
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Daftar Tautan URL Gambar (Satu URL per baris)
              </label>
              <textarea
                rows={3}
                placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                value={daftarGambarText}
                onChange={(e) => setDaftarGambarText(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>
          )}

          {/* 5. Judul & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Judul Proyek <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Misal: Kalkulator Finansial Interaktif"
                value={judul}
                onChange={(e) => tanganiUbahJudul(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Slug / Subpath URL <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="kalkulator-interaktif"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">
                Akses: /projects/{slug || "slug-proyek"}/
              </p>
            </div>
          </div>

          {/* 6. Deskripsi Proyek */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Deskripsi Proyek <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Jelaskan ringkas tujuan, fitur utama, dan arsitektur proyek..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 7. Kategori & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Kategori Proyek
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Web Development">Web Development</option>
                <option value="Video & Multimedia">Video & Multimedia</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Mobile App">Mobile App</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Status Publikasi
              </label>
              <select
                value={statusProyek}
                onChange={(e) => setStatusProyek(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="AKTIF">Aktif (Tampil Publik)</option>
                <option value="DRAFT">Draft (Disembunyikan)</option>
                <option value="DIARSIPKAN">Diarsipkan</option>
              </select>
            </div>
          </div>

          {/* 8. Gambar Sampul / Cover Image */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Gambar Sampul (Cover Image)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="https://images.unsplash.com/... atau unggah berkas"
                value={gambarSampul}
                onChange={(e) => setGambarSampul(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
              <label className="cursor-pointer px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{sedangUnggahGambar ? "Mengunggah..." : "Unggah"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={tanganiUnggahCover}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 9. Tags & Unggulan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Daftar Tag (Pisahkan dengan koma)
              </label>
              <input
                type="text"
                placeholder="Next.js, Tailwind, SQLite, Nginx"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={unggulan}
                  onChange={(e) => setUnggulan(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Tandai Sebagai Proyek Unggulan
                </span>
              </label>
            </div>
          </div>

          {/* Tombol Simpan & Batal */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onTutup}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={sedangMenyimpan}
              id="tombol-simpan-proyek"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all disabled:opacity-50"
            >
              {sedangMenyimpan && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>{sedangMenyimpan ? "Memproses..." : "Simpan & Deploy"}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
