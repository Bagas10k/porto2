import { NextResponse } from "next/server";
import { NAMA_KUKI_SESI } from "@/lib/autentikasi";

export async function POST() {
  const respons = NextResponse.json({
    sukses: true,
    pesan: "Sesi admin telah ditutup.",
  });

  respons.cookies.set({
    name: NAMA_KUKI_SESI,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return respons;
}
