"use client";

import * as React from "react";
import { HeaderAdmin } from "@/components/dashboard-admin/HeaderAdmin";
import { ManajerBerkasProyek } from "@/components/dashboard-admin/ManajerBerkasProyek";
import { FormUnggahProyek } from "@/components/dashboard-admin/FormUnggahProyek";
import { ProyekItem } from "@/components/antarmuka-publik/KartuProyek";

export default function HalamanProyekAdmin() {
  const [daftarProyek, setDaftarProyek] = React.useState<ProyekItem[]>([]);
  const [sedangMemuat, setSedangMemuat] = React.useState(true);
  const [modalFormTerbuka, setModalFormTerbuka] = React.useState(false);
  const [proyekDiedit, setProyekDiedit] = React.useState<ProyekItem | null>(null);

  const muatDaftarProyek = React.useCallback(async () => {
    try {
      setSedangMemuat(true);
      const res = await fetch("/api/proyek");
      const data = await res.json();
      if (data.sukses && Array.isArray(data.data)) {
        setDaftarProyek(data.data);
      }
    } catch (galat) {
      console.error("Gagal memuat proyek:", galat);
    } finally {
      setSedangMemuat(false);
    }
  }, []);

  React.useEffect(() => {
    muatDaftarProyek();
  }, [muatDaftarProyek]);

  const tanganiTambahBaru = () => {
    setProyekDiedit(null);
    setModalFormTerbuka(true);
  };

  const tanganiEditProyek = (proyek: ProyekItem) => {
    setProyekDiedit(proyek);
    setModalFormTerbuka(true);
  };

  const tanganiHapusProyek = async (id: string, judul: string) => {
    const konfirmasi = window.confirm(
      `Apakah Anda yakin ingin menghapus proyek '${judul}' beserta seluruh berkas statis terkait?`
    );
    if (!konfirmasi) return;

    try {
      const res = await fetch(`/api/proyek/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.sukses) {
        muatDaftarProyek();
      } else {
        alert(data.pesan || "Gagal menghapus proyek.");
      }
    } catch {
      alert("Terjadi kendala jaringan saat menghapus proyek.");
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <HeaderAdmin judulHalaman="Manajemen Proyek & Deployment Statis" />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Daftar Publikasi Proyek & Static Serving
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kelola berkas ZIP web statis, tautan Google Drive Video, dan galeri desain portfolio Anda.
          </p>
        </div>

        <ManajerBerkasProyek
          daftarProyek={daftarProyek}
          sedangMemuat={sedangMemuat}
          onTambahBaru={tanganiTambahBaru}
          onEdit={tanganiEditProyek}
          onHapus={tanganiHapusProyek}
          onMuatUlang={muatDaftarProyek}
        />
      </main>

      <FormUnggahProyek
        terbuka={modalFormTerbuka}
        onTutup={() => setModalFormTerbuka(false)}
        onSukses={muatDaftarProyek}
        proyekEdit={proyekDiedit}
      />
    </div>
  );
}
