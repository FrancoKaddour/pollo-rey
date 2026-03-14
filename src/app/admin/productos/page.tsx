import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Plus, Package } from "lucide-react";
import { ProductsTableClient } from "./ProductsTableClient";

export const metadata = { title: "Productos" };

export default async function ProductosPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: { select: { name: true } } },
      orderBy: [{ category: { order: "asc" } }, { name: "asc" }],
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  const active = products.filter((p) => p.active).length;
  const featured = products.filter((p) => p.featured).length;
  const inactive = products.filter((p) => !p.active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            PRODUCTOS
          </h1>
          <div className="mt-1 flex gap-3 text-xs text-slate-400 font-medium">
            <span>{products.length} total</span>
            <span className="text-green-500">•  {active} activos</span>
            {inactive > 0 && <span className="text-slate-300">•  {inactive} inactivos</span>}
            <span className="text-amber-500">•  {featured} destacados</span>
          </div>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="flex items-center gap-2 rounded-xl bg-[#08234e] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#0d3a80] transition-colors shadow-sm"
        >
          <Plus size={15} />
          Nuevo producto
        </Link>
      </div>

      {/* Stats mini */}
      <div className="flex gap-3 flex-wrap">
        {categories.map((cat) => {
          const count = products.filter((p) => p.categoryId === cat.id).length;
          return (
            <div key={cat.id} className="rounded-full bg-white border border-slate-100 px-3.5 py-1.5 text-xs font-bold shadow-sm">
              <span className="text-slate-400">{cat.name}</span>
              <span className="ml-2 text-[#08234e]">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm">
          <Package size={36} className="text-slate-200 mb-4" />
          <p className="text-sm font-bold text-slate-400">No hay productos</p>
          <Link
            href="/admin/productos/nuevo"
            className="mt-4 rounded-xl bg-[#08234e] px-4 py-2.5 text-sm font-bold text-white"
          >
            + Crear primer producto
          </Link>
        </div>
      ) : (
        <ProductsTableClient products={products} />
      )}
    </div>
  );
}
