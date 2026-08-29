import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const KUNCI_RAHASIA = new TextEncoder().encode(
  process.env.JWT_SECRET || "kunci-rahasia-autentikasi-portfolio-super-aman-2026"
);

export const NAMA_KUKI_SESI = "sesi_admin_porto";

export interface DataSesiAdmin {
  id: string;
  nama_pengguna: string;
  email: string;
  nama_lengkap: string;
}

export async function hashKataSandi(kataSandiPolos: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(kataSandiPolos, salt);
}

export async function cocokkanKataSandi(kataSandiPolos: string, kataSandiHash: string): Promise<boolean> {
  return bcrypt.compare(kataSandiPolos, kataSandiHash);
}

export async function buatTokenSesi(payload: DataSesiAdmin): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(KUNCI_RAHASIA);
}

export async function verifikasiTokenSesi(token: string): Promise<DataSesiAdmin | null> {
  try {
    const { payload } = await jwtVerify(token, KUNCI_RAHASIA);
    return payload as unknown as DataSesiAdmin;
  } catch (error) {
    console.error("Gagal memverifikasi token sesi admin:", error);
    return null;
  }
}

export async function ambilSesiAdmin(): Promise<DataSesiAdmin | null> {
  const daftarKuki = await cookies();
  const kukiSesi = daftarKuki.get(NAMA_KUKI_SESI);
  if (!kukiSesi || !kukiSesi.value) {
    return null;
  }
  return verifikasiTokenSesi(kukiSesi.value);
}
