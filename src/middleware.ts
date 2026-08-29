import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const KUNCI_RAHASIA = new TextEncoder().encode(
  process.env.JWT_SECRET || "kunci-rahasia-autentikasi-portfolio-super-aman-2026"
);

const NAMA_KUKI_SESI = "sesi_admin_porto";

export async function middleware(req: NextRequest) {
  const jalur = req.nextUrl.pathname;

  // Proteksi rute admin
  if (jalur.startsWith("/admin")) {
    const kukiSesi = req.cookies.get(NAMA_KUKI_SESI);

    if (!kukiSesi || !kukiSesi.value) {
      const urlMasuk = new URL("/masuk-admin", req.url);
      return NextResponse.redirect(urlMasuk);
    }

    try {
      await jwtVerify(kukiSesi.value, KUNCI_RAHASIA);
      return NextResponse.next();
    } catch {
      const urlMasuk = new URL("/masuk-admin", req.url);
      const respons = NextResponse.redirect(urlMasuk);
      respons.cookies.delete(NAMA_KUKI_SESI);
      return respons;
    }
  }

  // Jika sudah login dan mengakses halaman masuk-admin, arahkan langsung ke /admin
  if (jalur === "/masuk-admin") {
    const kukiSesi = req.cookies.get(NAMA_KUKI_SESI);
    if (kukiSesi && kukiSesi.value) {
      try {
        await jwtVerify(kukiSesi.value, KUNCI_RAHASIA);
        const urlAdmin = new URL("/admin", req.url);
        return NextResponse.redirect(urlAdmin);
      } catch {
        // Token tidak valid, izinkan tetap di halaman login
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/masuk-admin"],
};
