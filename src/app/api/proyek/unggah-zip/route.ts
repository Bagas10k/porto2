import { NextRequest, NextResponse } from "next/server";
import { ambilSesiAdmin } from "@/lib/autentikasi";
import { ekstrakProyekStatis } from "@/lib/penyimpanan-berkas";

export async function POST(req: NextRequest) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses ditolak. Sesi admin diperlukan." },
        { status: 401 }
      );
    }

    const dataForm = await req.formData();
    const berkasZip = dataForm.get("berkas_zip") as File | null;
    const slug = dataForm.get("slug") as string | null;

    if (!berkasZip || !slug) {
      return NextResponse.json(
        { sukses: false, pesan: "Berkas ZIP dan slug proyek wajib disertakan." },
        { status: 400 }
      );
    }

    // Bersihkan slug
    const slugBersih = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-");

    if (!slugBersih) {
      return NextResponse.json(
        { sukses: false, pesan: "Format slug proyek tidak valid." },
        { status: 400 }
      );
    }

    const arrayBuffer = await berkasZip.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const hasilEkstraksi = await ekstrakProyekStatis(buffer, slugBersih);

    if (!hasilEkstraksi.sukses) {
      return NextResponse.json(
        { sukses: false, pesan: hasilEkstraksi.pesan },
        { status: 422 }
      );
    }

    return NextResponse.json({
      sukses: true,
      slug: slugBersih,
      jalurAksesPublik: hasilEkstraksi.jalurAksesPublik,
      data: {
        slug: slugBersih,
        url_tujuan: hasilEkstraksi.jalurAksesPublik,
      },
      pesan: hasilEkstraksi.pesan,
    });
  } catch (galat: any) {
    console.error("Galat pada API Unggah ZIP Proyek:", galat);
    return NextResponse.json(
      { sukses: false, pesan: galat?.message || "Terjadi kesalahan internal saat memproses berkas ZIP." },
      { status: 500 }
    );
  }
}
