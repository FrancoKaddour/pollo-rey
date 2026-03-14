"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/schemas";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
  return session;
}

export async function createProduct(data: unknown) {
  await requireAdmin();
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { slug, name, comparePrice, ...rest } = parsed.data;
  const finalSlug = slug || slugify(name);

  try {
    await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        comparePrice: comparePrice ?? null,
        ...rest,
      },
    });
    revalidatePath("/admin/productos");
    revalidatePath("/productos");
    revalidatePath("/");
    return { ok: true };
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
      return { ok: false, error: "Ya existe un producto con ese slug. Cambiá el nombre." };
    }
    return { ok: false, error: "Error al crear el producto" };
  }
}

export async function updateProduct(id: string, data: unknown) {
  await requireAdmin();
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { slug, name, comparePrice, ...rest } = parsed.data;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        slug: slug || slugify(name),
        comparePrice: comparePrice ?? null,
        ...rest,
      },
    });
    revalidatePath("/admin/productos");
    revalidatePath("/productos");
    revalidatePath("/");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al actualizar el producto" };
  }
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/productos");
    revalidatePath("/productos");
    return { ok: true };
  } catch {
    return { ok: false, error: "No se puede eliminar: el producto tiene pedidos asociados" };
  }
}

export async function toggleProductField(id: string, field: "active" | "featured", value: boolean) {
  await requireAdmin();
  await prisma.product.update({ where: { id }, data: { [field]: value } });
  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  return { ok: true };
}
