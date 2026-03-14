"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
    : 0;

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
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-[#4467a9]/10 bg-white transition-all duration-200 hover:-translate-y-1.5 hover:border-[#4467a9] hover:shadow-[6px_6px_0px_0px_#4467a9]"
    >
      {/* Image area */}
      <div
        className="relative flex items-end justify-end overflow-hidden bg-[#4467a9]/[0.06]"
        style={{ height: "clamp(130px, 30vw, 180px)" }}
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <span
            className="pointer-events-none absolute bottom-2 right-4 select-none font-display font-black italic uppercase text-[#4467a9]/10 transition-all group-hover:text-[#4467a9]/15"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1 }}
          >
            {product.name.charAt(0)}
          </span>
        )}

        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.featured && (
            <span className="rounded-full bg-[#4467a9] px-2.5 py-0.5 font-display text-[10px] font-black uppercase tracking-wide text-[#f1ead0]">
              Destacado
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-[#CC1414] px-2.5 py-0.5 font-display text-[10px] font-black text-white">
              -{discountPct}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="font-display font-black uppercase text-[#4467a9]"
          style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}
        >
          {product.name}
        </h3>

        {product.description && (
          <p className="mt-2 flex-1 text-xs leading-relaxed text-[#4467a9]/50 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price + add */}
        <div className="mt-4 flex items-center justify-between border-t border-[#4467a9]/8 pt-4">
          <div>
            <p
              className="font-display uppercase text-[#4467a9]/40"
              style={{ fontSize: "0.65rem", letterSpacing: "0.08em" }}
            >
              {product.unit}
            </p>
            <div className="flex items-baseline gap-2">
              <p
                className="font-display font-black text-[#CC1414]"
                style={{ fontSize: "1.1rem", letterSpacing: "-0.03em" }}
              >
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-xs text-[#4467a9]/30 line-through">
                  {formatPrice(product.comparePrice!)}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={handleAdd}
            aria-label={`Agregar ${product.name}`}
            className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
              added
                ? "border-[#CC1414] bg-[#CC1414] text-white"
                : "border-[#4467a9] bg-transparent text-[#4467a9] hover:bg-[#4467a9] hover:text-[#f1ead0]"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </Link>
  );
}
