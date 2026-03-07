import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");

    const products = await prisma.product.findMany({
      where: {
        active: true,
        ...(slug ? { slug } : {}),
        ...(featured === "true" ? { featured: true } : {}),
        ...(cat
          ? {
              category: { slug: cat },
            }
          : {}),
      },
      include: { category: true },
      orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}
