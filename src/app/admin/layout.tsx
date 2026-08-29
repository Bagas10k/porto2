import { redirect } from "next/navigation";
import { ambilSesiAdmin } from "@/lib/autentikasi";
import { SidebarAdmin } from "@/components/dashboard-admin/SidebarAdmin";

export const dynamic = "force-dynamic";

export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const sesi = await ambilSesiAdmin();

  if (!sesi) {
    redirect("/masuk-admin");
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
