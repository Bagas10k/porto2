import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { ambilSesiAdmin } from "@/lib/autentikasi";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const kategori = searchParams.get("kategori");

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (kategori && kategori !== "SEMUA") where.kategori = kategori;

    const daftarProyek = await koneksiBasisData.proyek.findMany({
      where,
      orderBy: [{ unggulan: "desc" }, { urutan: "asc" }, { dibuat_pada: "desc" }],
    });

    return NextResponse.json({ sukses: true, data: daftarProyek });
  } catch (galat) {
    console.error("Galat saat mengambil daftar proyek:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memuat daftar proyek." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses ditolak. Sesi admin diperlukan." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      judul,
      slug,
      deskripsi,
      tipe_media,
      kategori,
      gambar_sampul,
      tautan_tujuan,
      path_statis,
      daftar_tag,
      daftar_gambar,
      status,
      unggulan,
      urutan,
    } = body;

    if (!judul || !slug || !deskripsi) {
      return NextResponse.json(
        { sukses: false, pesan: "Judul, slug, dan deskripsi proyek wajib diisi." },
        { status: 400 }
      );
    }

    // Pastikan slug unik
    const proyekAda = await koneksiBasisData.proyek.findUnique({
      where: { slug: slug.trim() },
    });

    if (proyekAda) {
      return NextResponse.json(
        { sukses: false, pesan: `Slug '${slug}' sudah digunakan pada proyek lain.` },
        { status: 409 }
      );
    }

    const proyekBaru = await koneksiBasisData.proyek.create({
      data: {
        judul: judul.trim(),
        slug: slug.trim(),
        deskripsi: deskripsi.trim(),
        tipe_media: tipe_media || "WEB_DEPLOYMENT",
        kategori: kategori || "Web Development",
        gambar_sampul: gambar_sampul || null,
        tautan_tujuan: tautan_tujuan || null,
        path_statis: path_statis || null,
        daftar_tag: typeof daftar_tag === "string" ? daftar_tag : JSON.stringify(daftar_tag || []),
        daftar_gambar:
          typeof daftar_gambar === "string"
            ? daftar_gambar
            : JSON.stringify(daftar_gambar || []),
        status: status || "AKTIF",
        unggulan: Boolean(unggulan),
        urutan: Number(urutan) || 0,
      },
    });

    return NextResponse.json({
      sukses: true,
      data: proyekBaru,
      pesan: "Proyek baru berhasil disimpan.",
    });
  } catch (galat) {
    console.error("Galat saat membuat proyek baru:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menyimpan proyek baru." },
      { status: 500 }
    );
  }
}
