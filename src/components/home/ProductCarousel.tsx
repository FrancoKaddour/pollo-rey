"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface Props {
  products: Product[];
}

export function ProductCarousel({ products }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#08234e]/15 py-24 text-center">
        <p className="font-display font-black uppercase text-[#08234e]/30">
          Ejecutá <code className="font-mono text-sm">npm run db:seed</code> para ver los productos
        </p>
      </div>
    );
  }

  const len = products.length;
  const prev = () => setActiveIdx((i) => (i - 1 + len) % len);
  const next = () => setActiveIdx((i) => (i + 1) % len);

  const getProduct = (offset: number) => products[(activeIdx + offset + len) % len];

  const prevItem = getProduct(-1);
  const activeItem = getProduct(0);
  const nextItem = getProduct(1);

  return (
    <div className="relative flex items-end justify-center gap-0 md:gap-6">
      {/* Prev arrow */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-0 top-[35%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#c0392b] text-[#c0392b] transition-colors hover:bg-[#c0392b] hover:text-white md:h-12 md:w-12"
      >
        <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {/* Prev item */}
      <div
        className="hidden md:flex flex-col items-center gap-3"
        style={{ transform: "scale(0.72)", transformOrigin: "center bottom", opacity: 0.55 }}
      >
        <ProductCircle product={prevItem} size="sm" />
        <p
          className="font-display font-black uppercase text-[#08234e] text-center"
          style={{ fontSize: "0.85rem", letterSpacing: "-0.02em" }}
        >
          {prevItem.name}
        </p>
        <p className="font-display font-black text-[#c0392b] text-sm">
          {formatPrice(prevItem.price)}
        </p>
      </div>

      {/* Active item — center, large */}
      <div className="z-10 flex flex-col items-center gap-4 px-4 md:px-8">
        <Link href={`/productos/${activeItem.slug}`}>
          <ProductCircle product={activeItem} size="lg" />
        </Link>
        <div className="max-w-[280px] text-center">
          <h3
            className="font-display font-black uppercase text-[#08234e]"
            style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", letterSpacing: "-0.03em" }}
          >
            {activeItem.name}
          </h3>
          {activeItem.description && (
            <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-[#08234e]/50">
              {activeItem.description}
            </p>
          )}
          <p
            className="mt-2 font-display font-black text-[#c0392b]"
            style={{ fontSize: "1.3rem" }}
          >
            {formatPrice(activeItem.price)}
            <span className="ml-2 text-sm text-[#08234e]/40 font-sans font-normal normal-case">
              / {activeItem.unit}
            </span>
          </p>
          <button
            onClick={() =>
              addItem(
                {
                  id: activeItem.id,
                  name: activeItem.name,
                  slug: activeItem.slug,
                  price: activeItem.price,
                  imageUrl: activeItem.imageUrl,
                  unit: activeItem.unit,
                },
                1
              )
            }
            className="mt-4 w-full rounded-full bg-[#08234e] py-3 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-opacity hover:opacity-80"
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>

      {/* Next item */}
      <div
        className="hidden md:flex flex-col items-center gap-3"
        style={{ transform: "scale(0.72)", transformOrigin: "center bottom", opacity: 0.55 }}
      >
        <ProductCircle product={nextItem} size="sm" />
        <p
          className="font-display font-black uppercase text-[#08234e] text-center"
          style={{ fontSize: "0.85rem", letterSpacing: "-0.02em" }}
        >
          {nextItem.name}
        </p>
        <p className="font-display font-black text-[#c0392b] text-sm">
          {formatPrice(nextItem.price)}
        </p>
      </div>

      {/* Next arrow */}
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-0 top-[35%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#c0392b] text-[#c0392b] transition-colors hover:bg-[#c0392b] hover:text-white md:h-12 md:w-12"
      >
        <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
      </button>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {products.slice(0, Math.min(products.length, 8)).map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIdx ? "w-6 bg-[#08234e]" : "w-1.5 bg-[#08234e]/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCircle({
  product,
  size,
}: {
  product: Product;
  size: "sm" | "lg";
}) {
  const dim =
    size === "lg"
      ? "clamp(200px, 28vw, 360px)"
      : "clamp(130px, 18vw, 240px)";

  return (
    <div
      className="relative overflow-hidden rounded-full bg-[#08234e]"
      style={{ width: dim, height: dim }}
    >
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="select-none font-display font-black text-[#f1ead0]"
            style={{ fontSize: size === "lg" ? "5rem" : "3rem", opacity: 0.1 }}
          >
            PR
          </span>
        </div>
      )}
    </div>
  );
}
