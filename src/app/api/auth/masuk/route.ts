import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { cocokkanKataSandi, buatTokenSesi, NAMA_KUKI_SESI } from "@/lib/autentikasi";
import { inisialisasiDataAwal } from "@/lib/data-awal";

export async function POST(req: NextRequest) {
  try {
    await inisialisasiDataAwal();
    const body = await req.json();
    const { nama_pengguna, kata_sandi } = body;

    if (!nama_pengguna || !kata_sandi) {
      return NextResponse.json(
        { sukses: false, pesan: "Nama pengguna dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const pengguna = await koneksiBasisData.pengguna.findFirst({
      where: {
        OR: [{ nama_pengguna: nama_pengguna.trim() }, { email: nama_pengguna.trim() }],
      },
    });

    if (!pengguna) {
      return NextResponse.json(
        { sukses: false, pesan: "Nama pengguna atau kata sandi tidak cocok." },
        { status: 401 }
      );
    }

    const kataSandiCocok = await cocokkanKataSandi(kata_sandi, pengguna.kata_sandi);
    if (!kataSandiCocok) {
      return NextResponse.json(
        { sukses: false, pesan: "Nama pengguna atau kata sandi tidak cocok." },
        { status: 401 }
      );
    }

    const token = await buatTokenSesi({
      id: pengguna.id,
      nama_pengguna: pengguna.nama_pengguna,
      email: pengguna.email,
      nama_lengkap: pengguna.nama_lengkap,
    });

    const respons = NextResponse.json({
      sukses: true,
      pesan: "Autentikasi berhasil.",
      pengguna: {
        id: pengguna.id,
        nama_pengguna: pengguna.nama_pengguna,
        nama_lengkap: pengguna.nama_lengkap,
      },
    });

    respons.cookies.set({
      name: NAMA_KUKI_SESI,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });

    return respons;
  } catch (galat) {
    console.error("Galat pada API Masuk Admin:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Terjadi kendala internal pada server autentikasi." },
      { status: 500 }
    );
  }
}
