"use client";

import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      imageUrl: product.imageUrl,
      unit: product.unit,
    });
  };

  const hasDiscount =
    product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-[#08234e]/8 transition-shadow hover:shadow-[0_8px_32px_rgba(8,35,78,0.1)]"
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f1ead0]">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="font-display font-black text-[#08234e]/8 select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)" }}
            >
              PR
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-[#08234e] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#f1ead0]">
              Destacado
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Add button overlay */}
        <button
          onClick={handleAdd}
          aria-label={`Agregar ${product.name} al carrito`}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#08234e] text-[#f1ead0] opacity-0 shadow-lg transition-all duration-200 hover:scale-110 group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-[#08234e]/35">
          {product.unit}
        </p>
        <h3 className="font-display text-sm font-bold leading-snug text-[#08234e] group-hover:opacity-75 transition-opacity">
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-1 text-xs leading-relaxed text-[#08234e]/45 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <div>
            <p className="font-display text-lg font-black text-[#08234e] leading-none">
              {formatPrice(product.price)}
            </p>
            {hasDiscount && (
              <p className="mt-0.5 text-xs text-[#08234e]/35 line-through">
                {formatPrice(product.comparePrice!)}
              </p>
            )}
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-full bg-[#08234e]/6 px-3 py-1.5 text-xs font-semibold text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0] md:hidden"
          >
            <ShoppingBag className="h-3 w-3" />
            Agregar
          </button>
        </div>
      </div>
    </Link>
  );
}
