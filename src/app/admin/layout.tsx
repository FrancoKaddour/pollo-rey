import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "@/components/admin/Sidebar";

export const metadata = {
  title: { template: "%s | Admin Pollo Rey", default: "Admin | Pollo Rey" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const pendingOrders = await prisma.order.count({
    where: { status: "PENDING" },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        userName={session.user?.name ?? "Admin"}
        userEmail={session.user?.email ?? ""}
        pendingOrders={pendingOrders}
      />

      {/* Main content — offset for sidebar */}
      <div className="lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-slate-100 bg-white/95 backdrop-blur-sm px-6 shadow-sm">
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            {pendingOrders > 0 && (
              <a
                href="/admin/pedidos"
                className="flex items-center gap-2 rounded-full bg-[#CC1414]/10 px-3 py-1.5 text-xs font-bold text-[#CC1414] hover:bg-[#CC1414]/20 transition-colors"
              >
                <span className="h-2 w-2 rounded-full bg-[#CC1414] animate-pulse" />
                {pendingOrders} pedido{pendingOrders !== 1 ? "s" : ""} pendiente{pendingOrders !== 1 ? "s" : ""}
              </a>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
