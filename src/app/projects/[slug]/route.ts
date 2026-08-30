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
    
    // Pastikan URL memiliki trailing slash agar relative assets ter-resolve dengan benar
    const pathname = req.nextUrl.pathname;
    if (!pathname.endsWith("/")) {
      return NextResponse.redirect(new URL(`${pathname}/`, req.url), 308);
    }

    const jalurBerkas = path.join(DIREKTORI_PROYEK_STATIS, slug, "index.html");

    if (!fsSync.existsSync(jalurBerkas)) {
      return new NextResponse("Berkas index.html proyek tidak ditemukan.", {
        status: 404,
      });
    }

    let konten = await fs.readFile(jalurBerkas, "utf-8");

    // 1. Sisipkan tag <base> jika belum ada agar semua relative link CSS/JS/Image ter-resolve ke subpath
    if (!konten.includes("<base ") && !konten.includes("<BASE ")) {
      if (konten.includes("<head>")) {
        konten = konten.replace("<head>", `<head>\n  <base href="/projects/${slug}/">`);
      } else if (konten.includes("<HEAD>")) {
        konten = konten.replace("<HEAD>", `<HEAD>\n  <base href="/projects/${slug}/">`);
      } else if (/<html[^>]*>/i.test(konten)) {
        konten = konten.replace(/<html[^>]*>/i, `$&\n<head><base href="/projects/${slug}/"></head>`);
      }
    }

    // 2. Rewrite root-relative asset paths (seperti href="/style.css" atau src="/app.js")
    konten = konten.replace(
      /(href|src)=["']\/(?!\/|projects\/|api\/|_next\/|data:)([^"']+)["']/gi,
      `$1="/projects/${slug}/$2"`
    );

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
