import { NextRequest, NextResponse } from "next/server";
import { koneksiBasisData } from "@/lib/basis-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id_proyek, jenis_interaksi } = body;

    if (id_proyek) {
      // Tambah jumlah dilihat di proyek
      await koneksiBasisData.proyek.update({
        where: { id: id_proyek },
        data: {
          jumlah_dilihat: { increment: 1 },
        },
      });

      // Rekam log interaksi
      await koneksiBasisData.statistikInteraksi.create({
        data: {
          id_proyek,
          jenis_interaksi: jenis_interaksi || "LIHAT_PROYEK",
          user_agent: req.headers.get("user-agent") || undefined,
        },
      });
    }

    return NextResponse.json({ sukses: true });
  } catch (galat) {
    console.error("Galat pada API Interaksi:", galat);
    return NextResponse.json({ sukses: false }, { status: 500 });
  }
}
