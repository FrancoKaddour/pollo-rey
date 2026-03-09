"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "pollo",
    name: "Pollo Fresco",
    icon: "/icons/pollo-fresco.svg",
    href: "/productos?cat=pollo",
    products: [
      {
        name: "POLLO ENTERO",
        description: "Pollo fresco de campo, sin congelar. Ideal para horno o parrilla.",
        price: 4200,
        tag: "Por unidad",
      },
      {
        name: "SUPREMA",
        description: "Pechuga deshuesada y sin piel. Corte premium, tierno y jugoso.",
        price: 2800,
        tag: "Por kg",
      },
      {
        name: "PATA MUSLO",
        description: "El corte más sabroso. Ideal para horno con papas.",
        price: 1900,
        tag: "Por kg",
      },
      {
        name: "MEDIA PECHUGA",
        description: "Pechuga con hueso, ideal para puchero o guiso.",
        price: 2100,
        tag: "Por kg",
      },
      {
        name: "ALITAS",
        description: "Alitas frescas perfectas para la parrilla o rebozadas.",
        price: 1600,
        tag: "Por kg",
      },
    ],
  },
  {
    id: "congelados",
    name: "Congelados",
    icon: "/icons/congelados.svg",
    href: "/productos?cat=papas-fritas",
    products: [
      {
        name: "PAPAS FRITAS",
        description: "Papas fritas congeladas McCain. Crocantes y doradas.",
        price: 3200,
        tag: "Bolsa 2.5 kg",
      },
      {
        name: "HAMBURGUESAS",
        description: "Hamburguesas de pollo artesanales. 4 unidades por bandeja.",
        price: 2600,
        tag: "Pack ×4",
      },
      {
        name: "NUGGETS",
        description: "Nuggets crujientes listos en 15 minutos.",
        price: 1800,
        tag: "Bolsa 500 g",
      },
    ],
  },
  {
    id: "huevos",
    name: "Huevos",
    icon: "/icons/huevos.svg",
    href: "/productos?cat=huevos",
    products: [
      {
        name: "DOCENA",
        description: "Huevos frescos de campo, tamaño grande. Directos del productor.",
        price: 1800,
        tag: "12 unidades",
      },
      {
        name: "MEDIA DOCENA",
        description: "Huevos frescos de campo. Ideal para compras chicas.",
        price: 950,
        tag: "6 unidades",
      },
    ],
  },
  {
    id: "despensa",
    name: "Despensa",
    icon: "/icons/despensa.svg",
    href: "/productos?cat=despensa",
    products: [
      {
        name: "ACEITE GIRASOL",
        description: "Aceite de girasol primera prensa. Para cocinar y aderezar.",
        price: 1400,
        tag: "Botella 1.5 L",
      },
      {
        name: "SAL ENTREFINA",
        description: "Sal entrefina 1 kg. La base de todo buen asado.",
        price: 350,
        tag: "1 kg",
      },
      {
        name: "CARBÓN 3 KG",
        description: "Carbón vegetal para asado. Enciende rápido, dura horas.",
        price: 1200,
        tag: "Bolsa 3 kg",
      },
      {
        name: "REBOZADOR",
        description: "Rebozador fino. Ideal para milanesas de pollo caseras.",
        price: 450,
        tag: "500 g",
      },
    ],
  },
];

const GAP = 28; // px between cards

// ─── Component ────────────────────────────────────────────────────────────────
export function MenuSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  // Measure container width for responsive card sizing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Reset on tab change
  useEffect(() => {
    setCurrentIdx(0);
  }, [activeTab]);

  const products = CATEGORIES[activeTab].products;

  // On desktop show 3 cards, on small screens show 1
  const visible = containerW >= 640 ? 3 : 1;
  const cardW = containerW > 0 ? (containerW - (visible - 1) * GAP) / visible : 280;
  const maxIdx = Math.max(0, products.length - visible);

  const prev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const next = () => setCurrentIdx((i) => Math.min(maxIdx, i + 1));

  const translateX = -currentIdx * (cardW + GAP);

  return (
    <section className="bg-[#f1ead0] px-6 py-20 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-14 md:grid-cols-[300px_1fr] md:gap-16 lg:grid-cols-[360px_1fr]">

          {/* ── Left: heading ── */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#CC1414]" />
              <p
                className="font-sans font-black uppercase text-[#CC1414]"
                style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
              >
                NUESTROS PRODUCTOS
              </p>
            </div>

            <h2
              className="font-display font-black uppercase text-[#08234e] leading-[0.88]"
              style={{ fontSize: "clamp(2rem, 3.2vw, 3.4rem)", letterSpacing: "-0.055em", transform: "scaleX(1.18)", transformOrigin: "left", lineHeight: 1 }}
            >
              LO QUE TE
              <br />
              PUEDE
              <br />
              INTERESAR<span className="text-[#CC1414]">.</span>
            </h2>

            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-[#08234e]/50">
              Pollo fresco todos los días, cortes a medida, huevos de campo y
              todo lo que necesitás para cocinar bien en casa.
            </p>

            <Link
              href="/productos"
              className="mt-8 inline-block self-start rounded-full border-2 border-[#08234e] bg-transparent px-8 py-3 font-display text-xs font-black uppercase tracking-widest text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
            >
              VER TODO →
            </Link>
          </div>

          {/* ── Right: tabs + slider ── */}
          <div className="flex min-w-0 flex-col gap-7">

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {CATEGORIES.map((cat, i) => {
                const active = activeTab === i;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(i)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-full border-2 px-4 py-2.5 font-display text-xs font-black uppercase tracking-widest transition-colors ${
                      active
                        ? "border-[#08234e] bg-[#08234e] text-[#f1ead0]"
                        : "border-[#08234e]/20 bg-transparent text-[#08234e]/50 hover:border-[#08234e]/40 hover:text-[#08234e]"
                    }`}
                  >
                    {/* Icon — drop your SVG in /public/icons/[id].svg */}
                    <TabIcon src={cat.icon} alt={cat.name} active={active} />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Slider */}
            <div ref={containerRef} className="relative min-w-0 overflow-hidden">
              {/* Track */}
              <div
                className="flex"
                style={{
                  gap: GAP,
                  transform: `translateX(${translateX}px)`,
                  transition: "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  willChange: "transform",
                }}
              >
                {products.map((product, i) => (
                  <div
                    key={i}
                    className="shrink-0 overflow-hidden bg-white"
                    style={{ width: cardW }}
                  >
                    {/* Image placeholder — replace with <Image> once tenés las fotos */}
                    <div
                      className="relative flex items-end justify-end overflow-hidden bg-[#08234e]/[0.06]"
                      style={{ height: 180 }}
                    >
                      <span
                        className="pointer-events-none absolute bottom-2 right-4 select-none font-display font-black italic uppercase text-[#08234e]/10"
                        style={{ fontSize: "5rem", lineHeight: 1 }}
                      >
                        {product.name.charAt(0)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3
                        className="font-display font-black uppercase text-[#08234e]"
                        style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}
                      >
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#08234e]/50 line-clamp-3">
                        <strong className="font-black text-[#08234e]/60">descripción:</strong>{" "}
                        {product.description}
                      </p>
                      <p
                        className="mt-3 font-display uppercase text-[#08234e]/50"
                        style={{ fontSize: "0.7rem", letterSpacing: "0.05em" }}
                      >
                        {product.tag}{" "}
                        <strong className="font-black text-[#CC1414]">
                          {formatPrice(product.price)}
                        </strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Bottom bar: arrows + fraction ── */}
              <div className="mt-6 flex items-center gap-4 border-t border-[#08234e]/10 pt-5">
                <button
                  onClick={prev}
                  disabled={currentIdx === 0}
                  aria-label="Anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#08234e] text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0] disabled:cursor-not-allowed disabled:opacity-20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <button
                  onClick={next}
                  disabled={currentIdx >= maxIdx}
                  aria-label="Siguiente"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#08234e] text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0] disabled:cursor-not-allowed disabled:opacity-20"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 19L19 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <span
                  className="font-display font-black uppercase text-[#08234e]"
                  style={{ fontSize: "0.72rem", letterSpacing: "0.18em" }}
                >
                  {currentIdx + 1} OF {products.length}
                </span>

                {/* Dots */}
                <div className="ml-auto flex items-center gap-1.5">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIdx(Math.min(i, maxIdx))}
                      aria-label={`Producto ${i + 1}`}
                      className={`rounded-full transition-all ${
                        i === currentIdx
                          ? "h-1.5 w-5 bg-[#08234e]"
                          : "h-1.5 w-1.5 bg-[#08234e]/25"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Tab icon with img fallback ───────────────────────────────────────────────
function TabIcon({ src, alt, active }: { src: string; alt: string; active: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    // Fallback: first letter
    return (
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-black ${
          active ? "bg-[#f1ead0]/20 text-[#f1ead0]" : "bg-[#08234e]/10 text-[#08234e]/50"
        }`}
      >
        {alt.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={28}
      height={28}
      onError={() => setFailed(true)}
      className={`h-7 w-7 object-contain transition-all ${
        active ? "brightness-0 invert" : "opacity-50"
      }`}
    />
  );
}
