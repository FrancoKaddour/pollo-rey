import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "../_components/ProductForm";

export const metadata = { title: "Nuevo producto" };

export default async function NuevoProductoPage() {
  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/productos"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-[#08234e] hover:border-[#08234e] transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            NUEVO PRODUCTO
          </h1>
          <p className="mt-1 text-sm text-slate-400">Completá los datos del producto</p>
        </div>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
