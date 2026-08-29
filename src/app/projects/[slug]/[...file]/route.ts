import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import fsSync from "fs";
import { DIREKTORI_PROYEK_STATIS } from "@/lib/penyimpanan-berkas";

export const dynamic = "force-dynamic";

const TIPE_MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mp3": "audio/mpeg",
  ".pdf": "application/pdf",
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; file: string[] }> }
) {
  try {
    const { slug, file } = await params;
    const jalurRelatif = file.join("/");

    // Pencegahan path traversal
    if (jalurRelatif.includes("..")) {
      return new NextResponse("Akses dilarang.", { status: 403 });
    }

    let jalurBerkas = path.join(DIREKTORI_PROYEK_STATIS, slug, jalurRelatif);

    if (!fsSync.existsSync(jalurBerkas)) {
      // Jika jalur adalah folder, cari index.html
      const jalurIndexFolder = path.join(jalurBerkas, "index.html");
      if (fsSync.existsSync(jalurIndexFolder)) {
        jalurBerkas = jalurIndexFolder;
      } else {
        return new NextResponse("Berkas aset proyek statis tidak ditemukan.", {
          status: 404,
        });
      }
    }

    const ekstensi = path.extname(jalurBerkas).toLowerCase();
    const tipeKonten = TIPE_MIME[ekstensi] || "application/octet-stream";

    const konten = await fs.readFile(jalurBerkas);
    return new NextResponse(konten, {
      headers: {
        "Content-Type": tipeKonten,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (galat) {
    console.error("Galat saat menyajikan berkas aset statis:", galat);
    return new NextResponse("Terjadi kesalahan server saat menyajikan aset statis.", {
      status: 500,
    });
  }
}
