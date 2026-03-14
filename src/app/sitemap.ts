import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { ARTICLES } from "@/app/(store)/blog/_content";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pollorey.com.ar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${BASE_URL}/productos`,  lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/nosotros`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/contacto`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/terminos`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${BASE_URL}/privacidad`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  // Artículos del blog (estáticos — no requieren DB)
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Páginas dinámicas de productos
  const products = await prisma.product.findMany({
    where: { active: true },
    select: { slug: true, updatedAt: true },
  });

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/productos/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
