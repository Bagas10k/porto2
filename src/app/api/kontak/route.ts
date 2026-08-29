import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { ambilSesiAdmin } from "@/lib/autentikasi";

// POST: Pengunjung mengirim pesan kontak
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama_pengirim, email_pengirim, subjek, isi_pesan } = body;

    if (!nama_pengirim || !email_pengirim || !isi_pesan) {
      return NextResponse.json(
        {
          sukses: false,
          pesan: "Nama, email, dan pesan wajib diisi.",
        },
        { status: 400 }
      );
    }

    // Validasi format email dasar
    const formatEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_pengirim);
    if (!formatEmailValid) {
      return NextResponse.json(
        {
          sukses: false,
          pesan: "Format alamat email tidak valid.",
        },
        { status: 400 }
      );
    }

    // Simpan ke basis data
    const pesanBaru = await koneksiBasisData.pesanMasuk.create({
      data: {
        nama_pengirim: String(nama_pengirim).trim(),
        email_pengirim: String(email_pengirim).trim().toLowerCase(),
        subjek: subjek ? String(subjek).trim() : "Pertanyaan Proyek / Kerjasama",
        isi_pesan: String(isi_pesan).trim(),
        sudah_dibaca: false,
      },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Pesan Anda berhasil terkirim! Terima kasih telah menghubungi kami.",
      data: pesanBaru,
    });
  } catch (galat) {
    console.error("Gagal menyimpan pesan kontak:", galat);
    return NextResponse.json(
      {
        sukses: false,
        pesan: "Terjadi kendala pada server saat mengirim pesan.",
      },
      { status: 500 }
    );
  }
}

// GET: Admin mengambil daftar pesan masuk
export async function GET() {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses tidak diizinkan. Silakan masuk terlebih dahulu." },
        { status: 401 }
      );
    }

    const daftarPesan = await koneksiBasisData.pesanMasuk.findMany({
      orderBy: { dibuat_pada: "desc" },
    });

    return NextResponse.json({
      sukses: true,
      data: daftarPesan,
    });
  } catch (galat) {
    console.error("Gagal mengambil daftar pesan:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memuat pesan dari server." },
      { status: 500 }
    );
  }
}
