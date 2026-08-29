import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import AdmZip from "adm-zip";

// Lokasi penyimpanan berkas unggahan dan proyek statis
export const DIREKTORI_UNGGAHAN =
  process.env.UPLOAD_PATH || path.join(process.cwd(), "public", "uploads");

export const DIREKTORI_PROYEK_STATIS =
  process.env.STATIC_DEPLOY_PATH || path.join(process.cwd(), "public", "projects");

// Pastikan direktori tujuan tersedia
export async function pastikanDirektoriTersedia(jalurDirektori: string): Promise<void> {
  try {
    await fs.mkdir(jalurDirektori, { recursive: true });
  } catch (galat) {
    console.error("Gagal memastikan direktori tersedia:", galat);
  }
}

// Simpan berkas gambar ke direktori unggahan
export async function simpanBerkasGambar(
  berkasBuffer: Buffer,
  namaBerkasAsli: string
): Promise<string> {
  await pastikanDirektoriTersedia(DIREKTORI_UNGGAHAN);

  const ekstensi = path.extname(namaBerkasAsli).toLowerCase();
  const namaBerkasUnik = `gambar-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ekstensi}`;
  const jalurPenuh = path.join(DIREKTORI_UNGGAHAN, namaBerkasUnik);

  await fs.writeFile(jalurPenuh, berkasBuffer);
  return `/uploads/${namaBerkasUnik}`;
}

export interface HasilValidasiZip {
  valid: boolean;
  pesan: string;
  adaIndexHtml: boolean;
  jalurSubfolderIndex?: string;
}

// Validasi struktur dan keamanan berkas ZIP
export function validasiBerkasZip(zipBuffer: Buffer): HasilValidasiZip {
  try {
    const zip = new AdmZip(zipBuffer);
    const entriZip = zip.getEntries();

    if (entriZip.length === 0) {
      return { valid: false, pesan: "Berkas ZIP kosong.", adaIndexHtml: false };
    }

    let adaIndexHtml = false;
    let jalurSubfolderIndex = "";
    const ekstensiDilarang = [".php", ".phtml", ".py", ".sh", ".bash", ".exe", ".cgi", ".pl", ".bat", ".cmd"];

    for (const entri of entriZip) {
      const namaEntri = entri.entryName;

      // Pencegahan Zip Slip (Path Traversal)
      if (namaEntri.includes("..") || path.isAbsolute(namaEntri)) {
        return {
          valid: false,
          pesan: `Potensi bahaya path traversal terdeteksi pada berkas: ${namaEntri}`,
          adaIndexHtml: false,
        };
      }

      // Cek ekstensi dilarang
      const ekstensi = path.extname(namaEntri).toLowerCase();
      if (ekstensiDilarang.includes(ekstensi)) {
        return {
          valid: false,
          pesan: `Berkas dengan ekstensi '${ekstensi}' tidak diizinkan pada deployment statis.`,
          adaIndexHtml: false,
        };
      }

      // Deteksi index.html
      const namaDasar = path.basename(namaEntri).toLowerCase();
      if (namaDasar === "index.html") {
        adaIndexHtml = true;
        const direktori = path.dirname(namaEntri);
        if (direktori !== "." && direktori !== "") {
          jalurSubfolderIndex = direktori;
        }
      }
    }

    if (!adaIndexHtml) {
      return {
        valid: false,
        pesan: "Berkas 'index.html' tidak ditemukan pada arsip ZIP. Pastikan terdapat file index.html di akar atau subfolder proyek.",
        adaIndexHtml: false,
      };
    }

    return { valid: true, pesan: "Validasi ZIP berhasil.", adaIndexHtml: true, jalurSubfolderIndex };
  } catch (galat) {
    console.error("Galat saat memvalidasi ZIP:", galat);
    return { valid: false, pesan: "Format berkas ZIP rusak atau tidak terbaca.", adaIndexHtml: false };
  }
}

// Ekstrak berkas ZIP ke direktori proyek statis sesuai slug
export async function ekstrakProyekStatis(
  zipBuffer: Buffer,
  slugProyek: string
): Promise<{ sukses: boolean; jalurAksesPublik: string; pesan: string }> {
  try {
    const validasi = validasiBerkasZip(zipBuffer);
    if (!validasi.valid) {
      return { sukses: false, jalurAksesPublik: "", pesan: validasi.pesan };
    }

    const folderTargetProyek = path.join(DIREKTORI_PROYEK_STATIS, slugProyek);

    // Hapus folder lama jika proyek di-redeploy
    if (fsSync.existsSync(folderTargetProyek)) {
      await fs.rm(folderTargetProyek, { recursive: true, force: true });
    }

    await pastikanDirektoriTersedia(folderTargetProyek);

    const zip = new AdmZip(zipBuffer);
    
    // Jika index.html ada di dalam subfolder teratas, ratakan direktori (flatten top directory)
    if (validasi.jalurSubfolderIndex) {
      const segmenRoot = validasi.jalurSubfolderIndex.split("/")[0].split("\\")[0];
      const entriZip = zip.getEntries();

      for (const entri of entriZip) {
        if (entri.isDirectory) continue;
        
        let namaRelatif = entri.entryName;
        if (namaRelatif.startsWith(segmenRoot + "/") || namaRelatif.startsWith(segmenRoot + "\\")) {
          namaRelatif = namaRelatif.substring(segmenRoot.length + 1);
        }

        const jalurTujuanBerkas = path.join(folderTargetProyek, namaRelatif);
        await pastikanDirektoriTersedia(path.dirname(jalurTujuanBerkas));
        await fs.writeFile(jalurTujuanBerkas, entri.getData());
      }
    } else {
      zip.extractAllTo(folderTargetProyek, true);
    }

    const jalurAksesPublik = `/projects/${slugProyek}/`;
    return {
      sukses: true,
      jalurAksesPublik,
      pesan: `Proyek statis '${slugProyek}' berhasil dideploy ke ${jalurAksesPublik}`,
    };
  } catch (galat) {
    console.error("Galat saat mengekstrak proyek statis:", galat);
    return {
      sukses: false,
      jalurAksesPublik: "",
      pesan: "Gagal mengekstrak berkas proyek ke direktori server.",
    };
  }
}

// Hapus proyek statis dari server
export async function hapusProyekStatis(slugProyek: string): Promise<boolean> {
  try {
    const folderTargetProyek = path.join(DIREKTORI_PROYEK_STATIS, slugProyek);
    if (fsSync.existsSync(folderTargetProyek)) {
      await fs.rm(folderTargetProyek, { recursive: true, force: true });
      return true;
    }
    return false;
  } catch (galat) {
    console.error("Galat saat menghapus proyek statis:", galat);
    return false;
  }
}
