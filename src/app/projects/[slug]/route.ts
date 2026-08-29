import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import { DIREKTORI_PROYEK_STATIS } from "@/lib/penyimpanan-berkas";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const jalurBerkas = path.join(DIREKTORI_PROYEK_STATIS, slug, "index.html");

    if (!fsSync.existsSync(jalurBerkas)) {
      return new NextResponse("Berkas index.html proyek tidak ditemukan.", {
        status: 404,
      });
    }

    const konten = await fs.readFile(jalurBerkas);
    return new NextResponse(konten, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (galat) {
    console.error("Galat saat menyajikan proyek statis root:", galat);
    return new NextResponse("Terjadi kesalahan server saat menyajikan proyek statis.", {
      status: 500,
    });
  }
}
