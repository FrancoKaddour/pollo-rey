"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/schemas";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("No autorizado");
}

export async function createCategory(data: unknown) {
  await requireAdmin();
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { slug, name, ...rest } = parsed.data;

  try {
    await prisma.category.create({
      data: { name, slug: slug || slugify(name), ...rest },
    });
    revalidatePath("/admin/categorias");
    revalidatePath("/productos");
    return { ok: true };
  } catch (e: unknown) {
    if (e && typeof e === "object" && "code" in e && (e as { code: string }).code === "P2002") {
      return { ok: false, error: "Ya existe una categoría con ese nombre" };
    }
    return { ok: false, error: "Error al crear la categoría" };
  }
}

export async function updateCategory(id: string, data: unknown) {
  await requireAdmin();
  const parsed = categorySchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0].message };

  const { slug, name, ...rest } = parsed.data;

  try {
    await prisma.category.update({
      where: { id },
      data: { name, slug: slug || slugify(name), ...rest },
    });
    revalidatePath("/admin/categorias");
    revalidatePath("/productos");
    return { ok: true };
  } catch {
    return { ok: false, error: "Error al actualizar la categoría" };
  }
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categorias");
    revalidatePath("/productos");
    return { ok: true };
  } catch {
    return { ok: false, error: "No se puede eliminar: la categoría tiene productos asociados" };
  }
}
