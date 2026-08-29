import { HeaderAdmin } from "@/components/dashboard-admin/HeaderAdmin";
import { FormPengaturanBiodata } from "@/components/dashboard-admin/FormPengaturanBiodata";

export const dynamic = "force-dynamic";

export default function HalamanPengaturanAdmin() {
  return (
    <div className="flex-1 flex flex-col">
      <HeaderAdmin judulHalaman="Pengaturan Biodata & Keahlian" />

      <main className="flex-1 p-6 sm:p-8 space-y-6 max-w-7xl">
        <div className="space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Profil Publik & Keahlian Teknologi
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Perbarui biodata, status ketersediaan kerja, kontak sosial media, dan badge keahlian tanpa menyentuh kode sumber.
          </p>
        </div>

        <FormPengaturanBiodata />
      </main>
    </div>
  );
}
