import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import { ShoppingCart, Filter } from "lucide-react";

export const metadata = { title: "Pedidos" };

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PREPARING: "Preparando",
  READY: "Listo",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  PREPARING: "bg-purple-100 text-purple-800 border-purple-200",
  READY: "bg-teal-100 text-teal-800 border-teal-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
};

const ALL_STATUSES = ["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED", "CANCELLED"] as const;

export default async function PedidosPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const statusFilter = params.status as OrderStatus | undefined;

  const orders = await prisma.order.findMany({
    where: statusFilter ? { status: statusFilter } : {},
    include: {
      items: {
        include: { product: { select: { name: true } } },
        orderBy: { product: { name: "asc" } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Count by status
  const counts = await prisma.order.groupBy({
    by: ["status"],
    _count: { _all: true },
  });
  const countMap = Object.fromEntries(counts.map((c) => [c.status, c._count._all]));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            PEDIDOS
          </h1>
          <p className="mt-1 text-sm text-slate-400">{orders.length} resultado{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} className="text-slate-400" />
        <Link
          href="/admin/pedidos"
          className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
            !statusFilter
              ? "bg-[#4467a9] text-white border-[#4467a9]"
              : "border-slate-200 text-slate-500 hover:border-slate-400"
          }`}
        >
          Todos ({Object.values(countMap).reduce((a, b) => a + b, 0)})
        </Link>
        {ALL_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/pedidos?status=${s}`}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
              statusFilter === s
                ? "bg-[#4467a9] text-white border-[#4467a9]"
                : "border-slate-200 text-slate-500 hover:border-slate-400"
            }`}
          >
            {STATUS_LABELS[s]} ({countMap[s] ?? 0})
          </Link>
        ))}
      </div>

      {/* Orders table */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart size={36} className="text-slate-200 mb-4" />
            <p className="text-sm font-bold text-slate-400">No hay pedidos</p>
            <p className="text-xs text-slate-300 mt-1">
              {statusFilter ? `No hay pedidos con estado "${STATUS_LABELS[statusFilter]}"` : "Todavía no llegaron pedidos"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Cliente
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Teléfono
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Productos
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Total
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Estado
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Zona
                  </th>
                  <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Fecha
                  </th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.map((order) => {
                  const status = order.status as OrderStatus;
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-[#4467a9]">{order.customerName}</p>
                        <p className="text-[0.65rem] text-slate-400 font-mono">
                          #{order.id.slice(-6).toUpperCase()}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-600">{order.phone}</td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-slate-600">{totalItems} ítem{totalItems !== 1 ? "s" : ""}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[160px]">
                          {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-[#4467a9]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[0.65rem] font-bold ${STATUS_COLORS[status]}`}>
                          {STATUS_LABELS[status]}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-slate-400">{order.zone ?? "—"}</td>
                      <td className="px-4 py-4 text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/pedidos/${order.id}`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-[#4467a9] hover:text-[#4467a9] transition-all opacity-0 group-hover:opacity-100"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
