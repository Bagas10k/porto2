import { NextResponse } from "next/server";
import { ambilSesiAdmin } from "@/lib/autentikasi";

export async function GET() {
  const sesi = await ambilSesiAdmin();
  if (!sesi) {
    return NextResponse.json({ terautentikasi: false }, { status: 401 });
  }
  return NextResponse.json({
    terautentikasi: true,
    pengguna: sesi,
  });
}
