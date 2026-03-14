"use client";

import { useTransition, useState } from "react";
import { updateOrderStatus, deleteOrder } from "@/app/admin/_actions/orders";
import type { OrderStatus } from "@/types";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmado",
  PREPARING: "Preparando",
  READY: "Listo",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const STATUS_NEXT: Partial<Record<OrderStatus, { status: OrderStatus; label: string; color: string }>> = {
  PENDING: { status: "CONFIRMED", label: "✓ Confirmar pedido", color: "bg-blue-500 hover:bg-blue-600" },
  CONFIRMED: { status: "PREPARING", label: "🍗 Comenzar preparación", color: "bg-purple-500 hover:bg-purple-600" },
  PREPARING: { status: "READY", label: "✓ Marcar como listo", color: "bg-teal-500 hover:bg-teal-600" },
  READY: { status: "DELIVERED", label: "🏠 Marcar como entregado", color: "bg-green-500 hover:bg-green-600" },
};

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
}

export function OrderStatusChanger({ orderId, currentStatus }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const next = STATUS_NEXT[currentStatus];

  const handleAdvance = () => {
    if (!next) return;
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, next.status);
      if (!res.ok) setError(res.error ?? "Error");
    });
  };

  const handleCancel = () => {
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, "CANCELLED");
      if (!res.ok) setError(res.error ?? "Error");
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteOrder(orderId);
      if (res.ok) {
        router.push("/admin/pedidos");
      } else {
        setError(res.error ?? "Error al eliminar");
      }
    });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
        Cambiar estado
      </h2>

      {/* All status options */}
      <div className="grid grid-cols-2 gap-2">
        {(Object.keys(STATUS_LABELS) as OrderStatus[]).map((s) => (
          <button
            key={s}
            onClick={() =>
              startTransition(async () => {
                const res = await updateOrderStatus(orderId, s);
                if (!res.ok) setError(res.error ?? "Error");
              })
            }
            disabled={isPending || currentStatus === s}
            className={`rounded-xl py-2 px-3 text-xs font-bold transition-all ${
              currentStatus === s
                ? "bg-[#4467a9] text-white cursor-default"
                : "bg-slate-50 text-slate-500 hover:bg-slate-100 disabled:opacity-40"
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Quick advance */}
      {next && (
        <button
          onClick={handleAdvance}
          disabled={isPending}
          className={`w-full rounded-xl py-3 text-sm font-bold text-white transition-all disabled:opacity-50 ${next.color}`}
        >
          {isPending ? "Actualizando…" : next.label}
        </button>
      )}

      {/* Cancel */}
      {currentStatus !== "CANCELLED" && currentStatus !== "DELIVERED" && (
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="w-full rounded-xl border-2 border-red-100 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
        >
          Cancelar pedido
        </button>
      )}

      {/* Delete */}
      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className="w-full rounded-xl py-2 text-xs font-medium text-slate-300 hover:text-red-400 transition-colors"
        >
          Eliminar pedido
        </button>
      ) : (
        <div className="rounded-xl bg-red-50 p-3 space-y-2">
          <p className="text-xs font-bold text-red-700 text-center">¿Eliminar permanentemente?</p>
          <div className="flex gap-2">
            <button
              onClick={() => setConfirmDelete(false)}
              className="flex-1 rounded-lg bg-white border border-slate-200 py-1.5 text-xs font-bold text-slate-500"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex-1 rounded-lg bg-red-500 py-1.5 text-xs font-bold text-white hover:bg-red-600 disabled:opacity-50"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs font-medium text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
