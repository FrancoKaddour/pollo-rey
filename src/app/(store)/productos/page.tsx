"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import type { Product, Category } from "@/types";

// ─── Inner content (uses useSearchParams → must be inside Suspense) ───────────
function ProductosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCat = searchParams.get("cat") ?? "todos";

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts]     = useState<Product[]>([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = activeCat === "todos" ? "/api/products" : `/api/products?cat=${activeCat}`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCat]);

  const handleCat = (slug: string) =>
    router.push(slug === "todos" ? "/productos" : `/productos?cat=${slug}`);

  const tabs = [
    { id: "todos", name: "Todos" },
    ...categories.map((c) => ({ id: c.slug, name: c.name })),
  ];

  return (
    <>
      {/* ── PAGE HEADER ───────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-[#08234e]/10 bg-[#f1ead0] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px] text-center">

          {/* Breadcrumb */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <Link
              href="/"
              className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-[#08234e]/35 transition-colors hover:text-[#08234e]"
            >
              Inicio
            </Link>
            <span className="text-[#08234e]/20">→</span>
            <span className="font-sans text-[0.65rem] font-black uppercase tracking-widest text-[#08234e]">
              Productos
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              letterSpacing: "-0.055em",
              transform: "scaleX(1.18)",
              transformOrigin: "center",
            }}
          >
            NUESTRO CATÁLOGO<span className="text-[#CC1414]">.</span>
          </h1>

          {/* Count */}
          {!loading && (
            <p
              className="mt-4 font-display font-black uppercase text-[#08234e]/25"
              style={{ fontSize: "0.7rem", letterSpacing: "0.2em" }}
            >
              {products.length} PRODUCTO{products.length !== 1 ? "S" : ""}
            </p>
          )}
        </div>
      </div>

      {/* ── CATALOG ───────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-10 md:px-12 md:py-12">
        <div className="mx-auto max-w-[1400px]">

          {/* Category tabs */}
          <div className="mb-10 flex justify-center gap-2 overflow-x-auto scrollbar-hide pb-1">
            {tabs.map((tab) => {
              const active = activeCat === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCat(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2.5 font-display text-xs font-black uppercase tracking-widest transition-colors ${
                    active
                      ? "border-[#08234e] bg-[#08234e] text-[#f1ead0]"
                      : "border-[#08234e]/20 bg-transparent text-[#08234e]/50 hover:border-[#08234e]/40 hover:text-[#08234e]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-black ${
                      active ? "bg-[#f1ead0]/20 text-[#f1ead0]" : "bg-[#08234e]/10 text-[#08234e]/50"
                    }`}
                  >
                    {tab.name.charAt(0)}
                  </span>
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p
                className="font-display font-black uppercase text-[#08234e]/25"
                style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", letterSpacing: "-0.03em" }}
              >
                Sin productos aquí
              </p>
              <button
                onClick={() => handleCat("todos")}
                className="mt-5 rounded-full border-2 border-[#08234e] px-7 py-2.5 font-display text-xs font-black uppercase tracking-widest text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
              >
                Ver todos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── BAND ──────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#08234e 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductosPage() {
  return (
    <Suspense>
      <ProductosContent />
    </Suspense>
  );
}
