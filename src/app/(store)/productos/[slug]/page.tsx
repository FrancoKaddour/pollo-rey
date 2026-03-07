import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "./ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: { category: true },
  });
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: `${product.name} — Pollo Rey`,
    description: product.description ?? `Comprá ${product.name} en Pollo Rey. Entrega en CABA y Vicente López.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug, active: true },
    include: { category: true },
  });

  if (!product) notFound();

  // Productos relacionados (misma categoría, distinto slug)
  const related = await prisma.product.findMany({
    where: {
      active: true,
      categoryId: product.categoryId,
      slug: { not: product.slug },
    },
    take: 4,
    orderBy: { featured: "desc" },
  });

  return (
    <ProductDetailClient
      product={JSON.parse(JSON.stringify(product))}
      related={JSON.parse(JSON.stringify(related))}
    />
  );
}
