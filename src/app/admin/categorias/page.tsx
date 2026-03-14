import { prisma } from "@/lib/prisma";
import { CategoriesClient } from "./CategoriesClient";
import { Tag } from "lucide-react";

export const metadata = { title: "Categorías" };

export default async function CategoriasPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            CATEGORÍAS
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {categories.length} categoría{categories.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4467a9]/5">
          <Tag size={18} className="text-[#4467a9]" />
        </div>
      </div>

      <CategoriesClient categories={categories} />
    </div>
  );
}
