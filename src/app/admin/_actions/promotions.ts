"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
}

const promotionSchema = z.object({
  title: z.string().min(2, "Título requerido").max(100),
  description: z.string().max(300).optional(),
  imageUrl: z.string().optional(),
  badgeText: z.string().max(30).optional(),
  active: z.boolean().default(true),
  startDate: z.string().min(1, "Fecha de inicio requerida"),
  endDate: z.string().min(1, "Fecha de fin requerida"),
});

export async function createPromotion(data: unknown) {
  await requireAdmin();
  const parsed = promotionSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { startDate, endDate, ...rest } = parsed.data;

  try {
    await prisma.promotion.create({
      data: {
        ...rest,
        description: rest.description ?? null,
        imageUrl: rest.imageUrl ?? null,
        badgeText: rest.badgeText ?? null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    revalidatePath("/admin/promociones");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al crear la promoción" };
  }
}

export async function updatePromotion(id: string, data: unknown) {
  await requireAdmin();
  const parsed = promotionSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { startDate, endDate, ...rest } = parsed.data;

  try {
    await prisma.promotion.update({
      where: { id },
      data: {
        ...rest,
        description: rest.description ?? null,
        imageUrl: rest.imageUrl ?? null,
        badgeText: rest.badgeText ?? null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });
    revalidatePath("/admin/promociones");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al actualizar la promoción" };
  }
}

export async function togglePromotion(id: string, active: boolean) {
  await requireAdmin();
  await prisma.promotion.update({ where: { id }, data: { active } });
  revalidatePath("/admin/promociones");
  revalidatePath("/");
  return { ok: true };
}

export async function deletePromotion(id: string) {
  await requireAdmin();
  try {
    await prisma.promotion.delete({ where: { id } });
    revalidatePath("/admin/promociones");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al eliminar la promoción" };
  }
}
