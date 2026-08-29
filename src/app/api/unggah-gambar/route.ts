import { NextRequest, NextResponse } from "next/server";
import { ambilSesiAdmin } from "@/lib/autentikasi";
import { simpanBerkasGambar } from "@/lib/penyimpanan-berkas";

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
    const berkas = dataForm.get("berkas") as File | null;

    if (!berkas) {
      return NextResponse.json(
        { sukses: false, pesan: "Tidak ada berkas gambar yang diunggah." },
        { status: 400 }
      );
    }

    const arrayBuffer = await berkas.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const urlGambar = await simpanBerkasGambar(buffer, berkas.name);

    return NextResponse.json({
      sukses: true,
      url: urlGambar,
      pesan: "Gambar berhasil diunggah.",
    });
  } catch (galat) {
    console.error("Galat pada API Unggah Gambar:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menyimpan berkas gambar." },
      { status: 500 }
    );
  }
}
