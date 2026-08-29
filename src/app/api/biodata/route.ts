import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";
import { ambilSesiAdmin } from "@/lib/autentikasi";

export async function GET() {
  try {
    const biodata = await koneksiBasisData.biodata.findFirst({
      orderBy: { dibuat_pada: "desc" },
    });
    const daftarKeahlian = await koneksiBasisData.keahlian.findMany({
      orderBy: [{ urutan: "asc" }, { dibuat_pada: "asc" }],
    });

    return NextResponse.json({
      sukses: true,
      biodata,
      daftarKeahlian,
    });
  } catch (galat) {
    console.error("Galat saat mengambil biodata:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memuat data biodata." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const sesi = await ambilSesiAdmin();
    if (!sesi) {
      return NextResponse.json(
        { sukses: false, pesan: "Akses ditolak. Sesi admin diperlukan." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { biodata, daftarKeahlian } = body;

    // Perbarui atau Buat Biodata
    if (biodata) {
      const biodataAda = await koneksiBasisData.biodata.findFirst();
      if (biodataAda) {
        await koneksiBasisData.biodata.update({
          where: { id: biodataAda.id },
          data: {
            nama_lengkap: biodata.nama_lengkap,
            gelar_profesi: biodata.gelar_profesi,
            deskripsi_singkat: biodata.deskripsi_singkat,
            status_ketersediaan: biodata.status_ketersediaan,
            url_foto_profil: biodata.url_foto_profil,
            url_cv: biodata.url_cv,
            email_kontak: biodata.email_kontak,
            nomor_telepon: biodata.nomor_telepon,
            lokasi: biodata.lokasi,
            tautan_github: biodata.tautan_github,
            tautan_linkedin: biodata.tautan_linkedin,
            tautan_twitter: biodata.tautan_twitter,
            tautan_instagram: biodata.tautan_instagram,
          },
        });
      } else {
        await koneksiBasisData.biodata.create({
          data: biodata,
        });
      }
    }

    // Perbarui Daftar Keahlian jika dikirim
    if (Array.isArray(daftarKeahlian)) {
      // Hapus keahlian lama dan perbarui dengan yang baru
      await koneksiBasisData.keahlian.deleteMany({});
      for (let i = 0; i < daftarKeahlian.length; i++) {
        const item = daftarKeahlian[i];
        if (item.nama_keahlian) {
          await koneksiBasisData.keahlian.create({
            data: {
              nama_keahlian: item.nama_keahlian,
              kategori: item.kategori || "Utama",
              urutan: item.urutan !== undefined ? Number(item.urutan) : i + 1,
            },
          });
        }
      }
    }

    return NextResponse.json({
      sukses: true,
      pesan: "Biodata dan keahlian berhasil diperbarui.",
    });
  } catch (galat) {
    console.error("Galat saat memperbarui biodata:", galat);
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menyimpan perubahan biodata." },
      { status: 500 }
    );
  }
}
