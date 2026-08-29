import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { ambilSesiAdmin } from "@/lib/autentikasi";

// PATCH: Tandai sudah dibaca / belum dibaca
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const { sudah_dibaca } = body;

    const pesanTerupdate = await koneksiBasisData.pesanMasuk.update({
      where: { id },
      data: { sudah_dibaca: Boolean(sudah_dibaca) },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Status pesan berhasil diperbarui.",
      data: pesanTerupdate,
    });
  } catch (galat) {
    console.error("Gagal memperbarui status pesan:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memperbarui status pesan." },
      { status: 500 }
    );
  }
}

// DELETE: Hapus pesan masuk
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses tidak diizinkan." },
        { status: 401 }
      );
    }

    const { id } = await params;
    await koneksiBasisData.pesanMasuk.delete({
      where: { id },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Pesan berhasil dihapus.",
    });
  } catch (galat) {
    console.error("Gagal menghapus pesan:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menghapus pesan." },
      { status: 500 }
    );
  }
}
