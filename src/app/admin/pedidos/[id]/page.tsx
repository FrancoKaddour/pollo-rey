import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import type { OrderStatus } from "@/types";
import Link from "next/link";
import { OrderStatusChanger } from "./OrderStatusChanger";
import { ArrowLeft, Phone, MapPin, MessageSquare } from "lucide-react";

export const metadata = { title: "Detalle del pedido" };

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
  CANCELLED: "bg-slate-100 text-slate-500",
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: { select: { name: true, imageUrl: true, unit: true } } },
      },
    },
  });

  if (!order) notFound();

  const status = order.status as OrderStatus;
  const pipeline: OrderStatus[] = ["PENDING", "CONFIRMED", "PREPARING", "READY", "DELIVERED"];
  const currentStep = pipeline.indexOf(status);

  const whatsappUrl = `https://wa.me/${order.phone.replace(/\D/g, "")}`;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + header */}
      <div className="flex items-start gap-4">
        <Link
          href="/admin/pedidos"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#08234e] hover:border-[#08234e] transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1
              className="font-display font-black uppercase text-[#08234e] leading-none"
              style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
            >
              PEDIDO #{order.id.slice(-6).toUpperCase()}
            </h1>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_COLORS[status]}`}>
              {STATUS_LABELS[status]}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            {new Date(order.createdAt).toLocaleDateString("es-AR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Left column */}
        <div className="space-y-5">
          {/* Status pipeline */}
          {status !== "CANCELLED" && (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-5">
                Estado del pedido
              </h2>
              <div className="flex items-center gap-0">
                {pipeline.map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition-all ${
                        i <= currentStep
                          ? "bg-[#08234e] text-white"
                          : "bg-slate-100 text-slate-400"
                      } ${i === currentStep ? "ring-4 ring-[#08234e]/20 scale-110" : ""}`}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 flex flex-col items-center last:hidden">
                      <div
                        className={`h-0.5 w-full transition-all ${
                          i < currentStep ? "bg-[#08234e]" : "bg-slate-100"
                        }`}
                      />
                      <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                        {STATUS_LABELS[s]}
                      </span>
                    </div>
                    {i === pipeline.length - 1 && (
                      <span className="ml-2 text-[0.6rem] font-bold uppercase tracking-wider text-slate-400">
                        {STATUS_LABELS[s]}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Productos
              </h2>
            </div>
            <div className="divide-y divide-slate-50">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#08234e]/5 text-xs font-black text-[#08234e]">
                    {item.quantity}x
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#08234e] truncate">{item.product.name}</p>
                    <p className="text-xs text-slate-400">
                      {formatPrice(item.unitPrice)} / {item.product.unit}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#08234e]">{formatPrice(item.subtotal)}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-6 py-4 bg-[#08234e] rounded-b-2xl">
              <span className="text-sm font-bold text-[#f1ead0]/70">Total</span>
              <span className="text-xl font-black text-[#CC1414]">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="rounded-2xl bg-white p-5 shadow-sm flex gap-3">
              <MessageSquare size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Nota del cliente
                </p>
                <p className="text-sm text-slate-600">{order.notes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Customer info */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
              Datos del cliente
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-[0.65rem] text-slate-400 uppercase tracking-wider">Nombre</p>
                <p className="text-sm font-bold text-[#08234e]">{order.customerName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-slate-400" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-[#08234e] hover:text-[#CC1414] transition-colors"
                >
                  {order.phone}
                </a>
              </div>
              {order.zone && (
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-slate-400" />
                  <p className="text-sm text-slate-600">{order.zone}</p>
                </div>
              )}
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-sm font-bold text-white hover:bg-[#22c55e] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>

          {/* Status changer */}
          <OrderStatusChanger orderId={order.id} currentStatus={status} />
        </div>
      </div>
    </div>
  );
}
