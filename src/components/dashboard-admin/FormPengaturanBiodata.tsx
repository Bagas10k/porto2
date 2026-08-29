"use client";

import * as React from "react";
import {
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Share2,
  Award,
} from "lucide-react";

interface BiodataState {
  nama_lengkap: string;
  gelar_profesi: string;
  deskripsi_singkat: string;
  status_ketersediaan: string;
  url_foto_profil: string;
  url_cv: string;
  email_kontak: string;
  nomor_telepon: string;
  lokasi: string;
  tautan_github: string;
  tautan_linkedin: string;
  tautan_twitter: string;
  tautan_instagram: string;
}

interface ItemKeahlian {
  id?: string;
  nama_keahlian: string;
  kategori: string;
  urutan: number;
}

export function FormPengaturanBiodata() {
  const [biodata, setBiodata] = React.useState<BiodataState>({
    nama_lengkap: "",
    gelar_profesi: "",
    deskripsi_singkat: "",
    status_ketersediaan: "Tersedia untuk Pekerjaan / Proyek",
    url_foto_profil: "",
    url_cv: "",
    email_kontak: "",
    nomor_telepon: "",
    lokasi: "",
    tautan_github: "",
    tautan_linkedin: "",
    tautan_twitter: "",
    tautan_instagram: "",
  });

  const [daftarKeahlian, setDaftarKeahlian] = React.useState<ItemKeahlian[]>([]);
  const [sedangMemuat, setSedangMemuat] = React.useState(true);
  const [sedangMenyimpan, setSedangMenyimpan] = React.useState(false);
  const [pesanGalat, setPesanGalat] = React.useState<string | null>(null);
  const [pesanSukses, setPesanSukses] = React.useState<string | null>(null);

  // Ambil biodata & keahlian saat mount
  React.useEffect(() => {
    const ambilData = async () => {
      try {
        setSedangMemuat(true);
        const res = await fetch("/api/biodata");
        const data = await res.json();
        if (data.sukses && data.biodata) {
          setBiodata({
            nama_lengkap: data.biodata.nama_lengkap || "",
            gelar_profesi: data.biodata.gelar_profesi || "",
            deskripsi_singkat: data.biodata.deskripsi_singkat || "",
            status_ketersediaan:
              data.biodata.status_ketersediaan || "Tersedia untuk Pekerjaan / Proyek",
            url_foto_profil: data.biodata.url_foto_profil || "",
            url_cv: data.biodata.url_cv || "",
            email_kontak: data.biodata.email_kontak || "",
            nomor_telepon: data.biodata.nomor_telepon || "",
            lokasi: data.biodata.lokasi || "",
            tautan_github: data.biodata.tautan_github || "",
            tautan_linkedin: data.biodata.tautan_linkedin || "",
            tautan_twitter: data.biodata.tautan_twitter || "",
            tautan_instagram: data.biodata.tautan_instagram || "",
          });
        }
        if (data.sukses && Array.isArray(data.daftarKeahlian)) {
          setDaftarKeahlian(data.daftarKeahlian);
        }
      } catch {
        setPesanGalat("Gagal memuat data dari server.");
      } finally {
        setSedangMemuat(false);
      }
    };
    ambilData();
  }, []);

  const tanganiTambahKeahlian = () => {
    setDaftarKeahlian((prev) => [
      ...prev,
      { nama_keahlian: "", kategori: "Frontend", urutan: prev.length + 1 },
    ]);
  };

  const tanganiUbahKeahlian = (
    indeks: number,
    field: keyof ItemKeahlian,
    nilai: string | number
  ) => {
    setDaftarKeahlian((prev) => {
      const baru = [...prev];
      baru[indeks] = { ...baru[indeks], [field]: nilai };
      return baru;
    });
  };

  const tanganiHapusKeahlian = (indeks: number) => {
    setDaftarKeahlian((prev) => prev.filter((_, i) => i !== indeks));
  };

  const tanganiSimpanSemua = async (e: React.FormEvent) => {
    e.preventDefault();
    setPesanGalat(null);
    setPesanSukses(null);
    setSedangMenyimpan(true);

    try {
      const res = await fetch("/api/biodata", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          biodata,
          daftarKeahlian: daftarKeahlian.filter((k) => k.nama_keahlian.trim() !== ""),
        }),
      });

      const data = await res.json();
      if (data.sukses) {
        setPesanSukses("Biodata dan keahlian berhasil diperbarui!");
        setTimeout(() => setPesanSukses(null), 3000);
      } else {
        setPesanGalat(data.pesan || "Gagal memperbarui biodata.");
      }
    } catch {
      setPesanGalat("Terjadi kendala saat menyimpan data ke server.");
    } finally {
      setSedangMenyimpan(false);
    }
  };

  if (sedangMemuat) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-xs text-slate-500 font-medium">Memuat profil dan keahlian...</span>
      </div>
    );
  }

  return (
    <form onSubmit={tanganiSimpanSemua} className="space-y-6 max-w-4xl">
      
      {/* Notifikasi */}
      {pesanGalat && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{pesanGalat}</span>
        </div>
      )}

      {pesanSukses && (
        <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{pesanSukses}</span>
        </div>
      )}

      {/* 1. Informasi Identitas & Gelar */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <User className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Identitas Utama & Ketersediaan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={biodata.nama_lengkap}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, nama_lengkap: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Gelar Profesi / Headline
            </label>
            <input
              type="text"
              required
              value={biodata.gelar_profesi}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, gelar_profesi: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Deskripsi Singkat / Bio (Value Proposition)
          </label>
          <textarea
            rows={3}
            required
            value={biodata.deskripsi_singkat}
            onChange={(e) =>
              setBiodata((prev) => ({ ...prev, deskripsi_singkat: e.target.value }))
            }
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Status Ketersediaan
            </label>
            <input
              type="text"
              value={biodata.status_ketersediaan}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, status_ketersediaan: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Lokasi Domisili
            </label>
            <input
              type="text"
              value={biodata.lokasi}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, lokasi: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tautan URL CV / Resume
            </label>
            <input
              type="text"
              value={biodata.url_cv}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, url_cv: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            URL Foto Profil
          </label>
          <input
            type="text"
            value={biodata.url_foto_profil}
            onChange={(e) =>
              setBiodata((prev) => ({ ...prev, url_foto_profil: e.target.value }))
            }
            placeholder="https://images.unsplash.com/... atau /uploads/foto.jpg"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* 2. Kontak & Media Sosial */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Share2 className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Kontak & Tautan Sosial Media
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Email Kontak Utama
            </label>
            <input
              type="email"
              required
              value={biodata.email_kontak}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, email_kontak: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Nomor Telepon / WhatsApp
            </label>
            <input
              type="text"
              value={biodata.nomor_telepon}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, nomor_telepon: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tautan GitHub
            </label>
            <input
              type="url"
              value={biodata.tautan_github}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, tautan_github: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tautan LinkedIn
            </label>
            <input
              type="url"
              value={biodata.tautan_linkedin}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, tautan_linkedin: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tautan Twitter / X
            </label>
            <input
              type="url"
              value={biodata.tautan_twitter}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, tautan_twitter: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Tautan Instagram
            </label>
            <input
              type="url"
              value={biodata.tautan_instagram}
              onChange={(e) =>
                setBiodata((prev) => ({ ...prev, tautan_instagram: e.target.value }))
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3. Daftar Keahlian & Kategori */}
      <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              Daftar Keahlian & Kategori Teknologi
            </h3>
          </div>

          <button
            type="button"
            onClick={tanganiTambahKeahlian}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Keahlian</span>
          </button>
        </div>

        <div className="space-y-2">
          {daftarKeahlian.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60"
            >
              <input
                type="text"
                placeholder="Nama Keahlian (misal: Next.js)"
                value={item.nama_keahlian}
                onChange={(e) => tanganiUbahKeahlian(idx, "nama_keahlian", e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              <select
                value={item.kategori}
                onChange={(e) => tanganiUbahKeahlian(idx, "kategori", e.target.value)}
                className="w-36 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Desain">Desain</option>
                <option value="Utama">Utama</option>
              </select>

              <button
                type="button"
                onClick={() => tanganiHapusKeahlian(idx)}
                title="Hapus"
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {daftarKeahlian.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">
              Belum ada keahlian yang ditambahkan.
            </p>
          )}
        </div>
      </div>

      {/* Tombol Simpan Perubahan */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={sedangMenyimpan}
          id="tombol-simpan-biodata"
          className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all disabled:opacity-50"
        >
          {sedangMenyimpan ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{sedangMenyimpan ? "Menyimpan Perubahan..." : "Simpan Biodata & Keahlian"}</span>
        </button>
      </div>

    </form>
  );
}
