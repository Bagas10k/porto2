import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { ambilSesiAdmin } from "@/lib/autentikasi";
import { hapusProyekStatis } from "@/lib/penyimpanan-berkas";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const proyek = await koneksiBasisData.proyek.findUnique({
      where: { id },
    });

    if (!proyek) {
      return NextResponse.json(
        { sukses: false, pesan: "Proyek tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({ sukses: true, data: proyek });
  } catch (galat) {
    console.error("Galat saat memuat proyek:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memuat detail proyek." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses ditolak. Sesi admin diperlukan." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const proyekLama = await koneksiBasisData.proyek.findUnique({
      where: { id },
    });

    if (!proyekLama) {
      return NextResponse.json(
        { sukses: false, pesan: "Proyek tidak ditemukan." },
        { status: 404 }
      );
    }

    // Jika slug diubah, periksa keunikan slug baru
    if (body.slug && body.slug !== proyekLama.slug) {
      const slugAda = await koneksiBasisData.proyek.findUnique({
        where: { slug: body.slug.trim() },
      });
      if (slugAda) {
        return NextResponse.json(
          { sukses: false, pesan: `Slug '${body.slug}' sudah digunakan.` },
          { status: 409 }
        );
      }
    }

    const proyekDiperbarui = await koneksiBasisData.proyek.update({
      where: { id },
      data: {
        judul: body.judul !== undefined ? body.judul.trim() : undefined,
        slug: body.slug !== undefined ? body.slug.trim() : undefined,
        deskripsi: body.deskripsi !== undefined ? body.deskripsi.trim() : undefined,
        tipe_media: body.tipe_media !== undefined ? body.tipe_media : undefined,
        kategori: body.kategori !== undefined ? body.kategori : undefined,
        gambar_sampul: body.gambar_sampul !== undefined ? body.gambar_sampul : undefined,
        tautan_tujuan: body.tautan_tujuan !== undefined ? body.tautan_tujuan : undefined,
        path_statis: body.path_statis !== undefined ? body.path_statis : undefined,
        daftar_tag:
          body.daftar_tag !== undefined
            ? typeof body.daftar_tag === "string"
              ? body.daftar_tag
              : JSON.stringify(body.daftar_tag)
            : undefined,
        daftar_gambar:
          body.daftar_gambar !== undefined
            ? typeof body.daftar_gambar === "string"
              ? body.daftar_gambar
              : JSON.stringify(body.daftar_gambar)
            : undefined,
        status: body.status !== undefined ? body.status : undefined,
        unggulan: body.unggulan !== undefined ? Boolean(body.unggulan) : undefined,
        urutan: body.urutan !== undefined ? Number(body.urutan) : undefined,
      },
    });

    return NextResponse.json({
      sukses: true,
      data: proyekDiperbarui,
      pesan: "Proyek berhasil diperbarui.",
    });
  } catch (galat) {
    console.error("Galat saat memperbarui proyek:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memperbarui proyek." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses ditolak. Sesi admin diperlukan." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const proyek = await koneksiBasisData.proyek.findUnique({
      where: { id },
    });

    if (!proyek) {
      return NextResponse.json(
        { sukses: false, pesan: "Proyek tidak ditemukan." },
        { status: 404 }
      );
    }

    // Hapus file proyek statis jika ada
    if (proyek.slug) {
      await hapusProyekStatis(proyek.slug);
    }

    await koneksiBasisData.proyek.delete({
      where: { id },
    });

    return NextResponse.json({
      sukses: true,
      pesan: `Proyek '${proyek.judul}' dan berkas terkait berhasil dihapus.`,
    });
  } catch (galat) {
    console.error("Galat saat menghapus proyek:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menghapus proyek." },
      { status: 500 }
    );
  }
}
