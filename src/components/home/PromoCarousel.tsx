"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const PROMOS = [
  {
    id: 1,
    badge: "×2",
    name: "PROMO DÚO",
    includes: ["2 pollos enteros", "Carbón 3 kg", "Sal entrefina"],
    price: 11500,
    note: "Ideal para 2 personas",
  },
  {
    id: 2,
    badge: "×3",
    name: "PROMO TRÍO",
    includes: ["3 pollos enteros", "Carbón 3 kg", "Aceite girasol 1.5 L", "Sal entrefina"],
    price: 16800,
    note: "Ideal para 3–4 personas",
  },
  {
    id: 3,
    badge: "FAM",
    name: "PACK FAMILIAR",
    includes: ["4 pollos enteros", "Papas fritas 2.5 kg", "Huevos docena", "Sal entrefina"],
    price: 24500,
    note: "Para toda la familia",
  },
  {
    id: 4,
    badge: "SEM",
    name: "PROMO SEMANAL",
    includes: ["3 pollos enteros", "Huevos docena", "Aceite 1.5 L", "Sal entrefina", "Rebozador 500 g"],
    price: 19500,
    note: "Tu semana resuelta",
  },
  {
    id: 5,
    badge: "×6",
    name: "PARRILLADA ×6",
    includes: ["6 pollos enteros", "Carbón 3 kg ×2", "Sal entrefina ×2", "Rebozador 500 g"],
    price: 33000,
    note: "Para el asado grande",
  },
  {
    id: 6,
    badge: "🎉",
    name: "PROMO CUMPLE",
    includes: ["5 pollos enteros", "Papas fritas 2.5 kg ×2", "Hamburguesas ×4", "Carbón 3 kg", "Sal entrefina"],
    price: 42000,
    note: "Para la celebración",
  },
  {
    id: 7,
    badge: "EMP",
    name: "PROMO EMPRESA",
    includes: ["8 pollos enteros", "Papas fritas 2.5 kg ×2", "Huevos ×2 docenas", "Aceite 1.5 L", "Carbón 3 kg"],
    price: 54000,
    note: "Para eventos y reuniones",
  },
  {
    id: 8,
    badge: "MES",
    name: "PROMO MENSUAL",
    includes: ["4 pollos enteros", "Pechuga 2 kg", "Huevos ×2 docenas", "Aceite 1.5 L", "Rebozador 500 g"],
    price: 28000,
    note: "Tu mes resuelto",
  },
];

const CARD_W = 300; // layout width of each card in px
const STEP = 265;   // center-to-center distance between adjacent cards

/** Scale per offset distance from center */
const SCALE: Record<number, number> = { 0: 1, 1: 0.82, 2: 0.68 };

/**
 * 5 visible cards (-2…+2) + invisible ±3 staging areas = 7 slots.
 * Key by card index → React always moves each card exactly 1 step.
 */
const RENDER_OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

/** Map a slot number to a card index (wraps around the list). */
function cardAt(slot: number, len: number): number {
  return ((slot % len) + len) % len;
}

export function PromoCarousel() {
  /**
   * rawIdx: unbounded integer that represents the current "position" on
   * an infinite tape. Never wraps — this eliminates all jump artefacts.
   */
  const [rawIdx, setRawIdx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cx, setCx] = useState(0); // measured container centre X
  const len = PROMOS.length;

  /* Keep cx in sync with container width */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setCx(el.clientWidth / 2);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const prev = () => setRawIdx((i) => i - 1);
  const next = () => setRawIdx((i) => i + 1);

  /** Logical card index shown at the centre slot */
  const activeCardIdx = ((rawIdx % len) + len) % len;

  /** Navigate to a specific card via the shortest circular path */
  const goTo = (target: number) => {
    const current = ((rawIdx % len) + len) % len;
    let diff = target - current;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    setRawIdx((r) => r + diff);
  };

  return (
    <div className="relative">
      {/* ── Viewport ── */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden"
        style={{ height: 430 }}
      >
        {RENDER_OFFSETS.map((offset) => {
          const slot = rawIdx + offset;
          const cardIdx = cardAt(slot, len);
          const promo = PROMOS[cardIdx];
          const isActive = offset === 0;
          const absOff = Math.abs(offset);

          /* ±3 are invisible staging areas; ±2 and ±1 are visible side cards */
          const opacity = cx > 0 ? (absOff >= 3 ? 0 : isActive ? 1 : 0.42) : 0;
          const scale = SCALE[absOff] ?? 0.55;

          return (
            <div
              /**
               * KEY = card index.
               * This is the core fix: React keeps the same DOM node for
               * card N regardless of which slot it occupies. The transform
               * animates the card from its old slot to its new slot — always
               * exactly one step, no teleporting.
               */
              key={cardIdx}
              style={{
                position: "absolute",
                bottom: 0,
                /* All cards share the same base left; translateX does the work */
                left: cx - CARD_W / 2,
                width: CARD_W,
                transform: `translateX(${offset * STEP}px) scale(${scale})`,
                transformOrigin: "center bottom",
                opacity,
                transition:
                  "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
                willChange: "transform, opacity",
                zIndex: isActive ? 10 : 1,
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <PromoCard promo={promo} />
            </div>
          );
        })}

        {/* ── Arrows (inside viewport so they stay vertically centred) ── */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#08234e] bg-transparent text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0] md:h-12 md:w-12"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#08234e] bg-transparent text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0] md:h-12 md:w-12"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="mt-10 flex justify-center gap-2">
        {PROMOS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a promo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === activeCardIdx ? "w-6 bg-[#08234e]" : "w-1.5 bg-[#08234e]/25"
            }`}
          />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/productos"
          className="rounded-full border-2 border-[#08234e] bg-transparent px-10 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
        >
          VER TODAS LAS PROMOS
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PromoCard — fixed size, parent scales it
───────────────────────────────────────── */
function PromoCard({ promo }: { promo: (typeof PROMOS)[0] }) {
  return (
    <div className="flex flex-col items-center text-center" style={{ width: CARD_W }}>
      {/* Badge */}
      <div
        className="flex items-center justify-center rounded-full bg-[#08234e] font-display font-black text-[#f1ead0]"
        style={{
          width: 118,
          height: 118,
          fontSize: "1.85rem",
          letterSpacing: "-0.03em",
          marginBottom: "1.15rem",
        }}
      >
        {promo.badge}
      </div>

      {/* Name */}
      <h3
        className="font-display font-black uppercase text-[#08234e]"
        style={{ fontSize: "1.85rem", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.45rem" }}
      >
        {promo.name}
      </h3>

      {/* Note */}
      <p
        className="font-display font-black uppercase text-[#08234e]/40"
        style={{ fontSize: "0.63rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}
      >
        {promo.note}
      </p>

      {/* Divider */}
      <div className="w-10 border-t-2 border-[#08234e]/15" style={{ marginBottom: "0.75rem" }} />

      {/* Includes */}
      <div style={{ marginBottom: "0.9rem", width: "100%" }}>
        <p className="font-black uppercase tracking-wider text-[#08234e]" style={{ fontSize: "0.78rem", letterSpacing: "0.12em", marginBottom: "0.4rem" }}>
          INCLUYE
        </p>
        <ul className="inline-flex flex-col items-start gap-0.5">
          {promo.includes.map((item, i) => (
            <li key={i} className="flex items-baseline gap-1.5 text-[#08234e]" style={{ fontSize: "0.82rem", lineHeight: 1.45 }}>
              <span className="shrink-0 font-black text-[#CC1414]" style={{ fontSize: "0.5rem" }}>▸</span>
              <span className="font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <p
        className="font-display font-black text-[#CC1414]"
        style={{ fontSize: "2.1rem", letterSpacing: "-0.04em" }}
      >
        {formatPrice(promo.price)}
      </p>
    </div>
  );
}
