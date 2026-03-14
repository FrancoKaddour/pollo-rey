"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { OrderStatus } from "@/types";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  await requireAdmin();
  try {
    await prisma.order.update({ where: { id }, data: { status } });
    revalidatePath("/admin/pedidos");
    revalidatePath(`/admin/pedidos/${id}`);
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al actualizar el estado" };
  }
}

export async function deleteOrder(id: string) {
  await requireAdmin();
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath("/admin/pedidos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al eliminar el pedido" };
  }
}
