import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  ShoppingCart,
  Package,
  Mail,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Plus,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/types";

export const metadata = { title: "Dashboard" };

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PREPARING: "Preparando",
  READY: "Listo",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  PREPARING: "bg-purple-100 text-purple-800",
  READY: "bg-teal-100 text-teal-800",
  DELIVERED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  weekAgo.setHours(0, 0, 0, 0);

  const [
    pendingCount,
    todayOrders,
    weekOrders,
    activeProducts,
    activeSubscribers,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.findMany({
      where: { createdAt: { gte: today, lte: todayEnd } },
      select: { total: true, status: true },
    }),
    prisma.order.findMany({
      where: { createdAt: { gte: weekAgo }, status: { not: "CANCELLED" } },
      select: { total: true },
    }),
    prisma.product.count({ where: { active: true } }),
    prisma.newsletter.count({ where: { active: true } }),
    prisma.order.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        items: { select: { quantity: true } },
      },
    }),
  ]);

  const todayRevenue = todayOrders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.total, 0);

  const weekRevenue = weekOrders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: "Pedidos pendientes",
      value: pendingCount,
      icon: AlertCircle,
      color: "text-[#CC1414]",
      bg: "bg-red-50",
      border: "border-l-[#CC1414]",
      href: "/admin/pedidos?status=PENDING",
      urgent: pendingCount > 0,
    },
    {
      label: "Pedidos hoy",
      value: todayOrders.length,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-l-blue-500",
      href: "/admin/pedidos",
    },
    {
      label: "Ingresos hoy",
      value: formatPrice(todayRevenue),
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-l-green-500",
      href: "/admin/pedidos",
    },
    {
      label: "Ingresos esta semana",
      value: formatPrice(weekRevenue),
      icon: TrendingUp,
      color: "text-[#4467a9]",
      bg: "bg-slate-50",
      border: "border-l-[#4467a9]",
      href: "/admin/pedidos",
    },
    {
      label: "Productos activos",
      value: activeProducts,
      icon: Package,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-l-purple-500",
      href: "/admin/productos",
    },
    {
      label: "Suscriptores",
      value: activeSubscribers,
      icon: Mail,
      color: "text-teal-600",
      bg: "bg-teal-50",
      border: "border-l-teal-500",
      href: "/admin/newsletter",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", letterSpacing: "-0.04em" }}
          >
            DASHBOARD
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-[#4467a9] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0d3a80] transition-colors shadow-sm"
        >
          <Plus size={15} />
          Nuevo producto
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`relative overflow-hidden rounded-2xl border-l-4 ${stat.border} bg-white p-5 shadow-sm hover:shadow-md transition-all group ${
              stat.urgent ? "ring-2 ring-[#CC1414]/30" : ""
            }`}
          >
            {stat.urgent && (
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[#CC1414] animate-pulse" />
            )}
            <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${stat.bg} mb-3`}>
              <stat.icon size={17} className={stat.color} />
            </div>
            <p className="text-2xl font-black text-[#4467a9] leading-none">
              {stat.value}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
            <ArrowRight
              size={14}
              className="absolute bottom-4 right-4 text-slate-200 group-hover:text-slate-400 transition-colors"
            />
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Clock size={16} className="text-[#4467a9]" />
            <h2 className="font-display font-black uppercase text-[#4467a9] text-sm tracking-wide">
              ÚLTIMOS PEDIDOS
            </h2>
          </div>
          <Link
            href="/admin/pedidos"
            className="text-xs font-bold text-[#4467a9]/40 hover:text-[#4467a9] transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart size={32} className="text-slate-200 mb-3" />
            <p className="text-sm font-medium text-slate-400">Todavía no hay pedidos</p>
            <p className="text-xs text-slate-300 mt-1">Cuando lleguen aparecerán acá</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-6 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Cliente
                  </th>
                  <th className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Teléfono
                  </th>
                  <th className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                    Fecha
                  </th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => {
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  const status = order.status as OrderStatus;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#4467a9]">
                          {order.customerName}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-500">{order.phone}</td>
                      <td className="px-4 py-4 text-sm text-slate-500">{totalItems} ítem{totalItems !== 1 ? "s" : ""}</td>
                      <td className="px-4 py-4 text-sm font-bold text-[#4467a9]">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${STATUS_COLORS[status]}`}
                        >
                          {STATUS_LABELS[status]}
                        </span>
                      </td>
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
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-[#4467a9] hover:text-white transition-all"
                        >
                          <CheckCircle size={13} />
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

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { href: "/admin/pedidos", label: "Ver pedidos", icon: ShoppingCart, color: "bg-blue-500" },
          { href: "/admin/productos/nuevo", label: "Nuevo producto", icon: Plus, color: "bg-[#4467a9]" },
          { href: "/admin/promociones", label: "Promociones", icon: AlertCircle, color: "bg-[#CC1414]" },
          { href: "/admin/newsletter", label: "Newsletter", icon: Mail, color: "bg-teal-500" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 shadow-sm hover:shadow-md transition-all group text-center"
          >
            <div className={`h-10 w-10 rounded-xl ${action.color} flex items-center justify-center`}>
              <action.icon size={18} className="text-white" />
            </div>
            <span className="text-xs font-bold text-slate-600 group-hover:text-[#4467a9] transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
