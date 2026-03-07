"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import type { Product, Category } from "@/types";

export default function ProductosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activecat = searchParams.get("cat") ?? "todos";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Fetch products when filter changes
  useEffect(() => {
    setLoading(true);
    const url =
      activecat === "todos"
        ? "/api/products"
        : `/api/products?cat=${activecat}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activecat]);

  const handleCatClick = (slug: string) => {
    if (slug === "todos") {
      router.push("/productos");
    } else {
      router.push(`/productos?cat=${slug}`);
    }
  };

  const tabs = [{ id: "todos", name: "Todos" }, ...categories.map((c) => ({ id: c.slug, name: c.name }))];

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="bg-[#f1ead0] px-6 pb-10 pt-12 md:px-12 md:pt-16">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#08234e]/40">
            Catálogo
          </p>
          <h1
            className="font-display font-black text-[#08234e] leading-none"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Nuestros productos
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#08234e]/50">
            Pollo fresco, cortes, congelados, huevos y despensa. Todo lo que necesitás, listo para retirar o recibir en tu domicilio.
          </p>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="sticky top-20 z-30 border-b border-[#08234e]/8 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleCatClick(tab.id)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors whitespace-nowrap ${
                  activecat === tab.id
                    ? "bg-[#08234e] text-[#f1ead0]"
                    : "text-[#08234e]/55 hover:bg-[#08234e]/6 hover:text-[#08234e]"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-display text-lg font-bold text-[#08234e]/30">
              No hay productos en esta categoría
            </p>
            <button
              onClick={() => handleCatClick("todos")}
              className="mt-4 text-sm font-medium text-[#08234e] underline underline-offset-2"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-[#08234e]/40">
              {products.length} {products.length === 1 ? "producto" : "productos"}
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
