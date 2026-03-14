"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

interface Props {
  product: Product & { category?: { name: string; slug: string } | null };
  related: Product[];
}

export function ProductDetailClient({ product, related }: Props) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const hasDiscount =
    product.comparePrice && product.comparePrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.comparePrice! - product.price) / product.comparePrice!) * 100
      )
    : 0;

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        imageUrl: product.imageUrl,
        unit: product.unit,
      },
      qty
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#4467a9]/8 bg-[#f1ead0]/50 px-6 py-3 md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center gap-1.5 text-xs text-[#4467a9]/45">
          <Link href="/" className="hover:text-[#4467a9]">
            Inicio
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/productos" className="hover:text-[#4467a9]">
            Productos
          </Link>
          {product.category && (
            <>
              <ChevronRight className="h-3 w-3" />
              <Link
                href={`/productos?cat=${product.category.slug}`}
                className="hover:text-[#4467a9]"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#4467a9]">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid gap-6 py-6 md:gap-8 md:py-8 lg:h-[calc(100svh-88px-3rem)] lg:grid-cols-2 lg:gap-16 lg:items-stretch lg:py-10">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#f1ead0] lg:aspect-auto lg:h-full">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="font-display font-black text-[#4467a9]/8 select-none"
                  style={{ fontSize: "clamp(6rem, 15vw, 12rem)" }}
                >
                  PR
                </span>
              </div>
            )}
            {product.featured && (
              <span className="absolute left-4 top-4 rounded-full bg-[#4467a9] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#f1ead0]">
                Destacado
              </span>
            )}
            {hasDiscount && (
              <span className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                -{discountPct}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col lg:justify-center lg:overflow-y-auto">
            {product.category && (
              <Link
                href={`/productos?cat=${product.category.slug}`}
                className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#4467a9]/40 hover:text-[#4467a9]"
              >
                {product.category.name}
              </Link>
            )}

            <h1
              className="font-display font-black text-[#4467a9] leading-none"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              {product.name}
            </h1>

            <p className="mt-1 text-sm text-[#4467a9]/40">{product.unit}</p>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-[#4467a9]/60">
                {product.description}
              </p>
            )}

            {/* Precio */}
            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-2xl font-black text-[#4467a9] sm:text-3xl md:text-4xl">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-lg text-[#4467a9]/30 line-through">
                  {formatPrice(product.comparePrice!)}
                </span>
              )}
            </div>

            {/* Cantidad + CTA */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Cantidad */}
              <div className="flex items-center gap-3 rounded-full border border-[#4467a9]/15 px-2 py-1">
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#4467a9]/50 transition-colors hover:bg-[#4467a9]/8 hover:text-[#4467a9]"
                  aria-label="Reducir"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="min-w-[24px] text-center font-display text-lg font-black text-[#4467a9]">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((v) => v + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#4467a9]/50 transition-colors hover:bg-[#4467a9]/8 hover:text-[#4467a9]"
                  aria-label="Aumentar"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#4467a9] py-3.5 text-sm font-semibold text-[#f1ead0] transition-opacity hover:opacity-80"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
                Agregar al carrito — {formatPrice(product.price * qty)}
              </button>
            </div>

            {/* Info extra */}
            <div className="mt-8 space-y-2 rounded-2xl bg-[#f1ead0]/60 p-4 text-xs text-[#4467a9]/50">
              <p>Cobertura: CABA y Vicente López</p>
              <p>Retiro en local: Saavedra, Buenos Aires</p>
              <p>Lun–Sáb: 8:00 – 20:00</p>
            </div>

            {/* Back link */}
            <Link
              href="/productos"
              className="mt-6 flex items-center gap-1.5 text-xs text-[#4467a9]/40 hover:text-[#4467a9]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Volver al catálogo
            </Link>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20 pb-16 md:pb-24">
            <h2 className="mb-6 font-display text-xl font-black text-[#4467a9]">
              También te puede interesar
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
