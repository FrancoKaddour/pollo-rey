"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────
export interface DbPromo {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  badgeText: string | null;
  startDate: Date;
  endDate: Date;
}

interface UnifiedPromo {
  id: string | number;
  badge: string;
  name: string;
  note?: string;
  includes?: string[];
  price?: number;
  imageUrl?: string;
}

// ─── Fallback hardcodeado ─────────────────────────────────────────────────────
const FALLBACK_PROMOS: UnifiedPromo[] = [
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

function toUnified(p: DbPromo): UnifiedPromo {
  const endDate = new Date(p.endDate);
  const note = p.description
    ? p.description
    : `Válido hasta el ${endDate.toLocaleDateString("es-AR", { day: "numeric", month: "long" })}`;
  return {
    id: p.id,
    badge: p.badgeText || "★",
    name: p.title,
    note,
    imageUrl: p.imageUrl || undefined,
  };
}

const CARD_W = 300;
const STEP = 265;
const SCALE: Record<number, number> = { 0: 1, 1: 0.82, 2: 0.68 };
const RENDER_OFFSETS = [-3, -2, -1, 0, 1, 2, 3] as const;

function cardAt(slot: number, len: number): number {
  return ((slot % len) + len) % len;
}

interface Props {
  dbPromos?: DbPromo[];
}

export function PromoCarousel({ dbPromos }: Props) {
  const promos: UnifiedPromo[] =
    dbPromos && dbPromos.length > 0 ? dbPromos.map(toUnified) : FALLBACK_PROMOS;

  const [rawIdx, setRawIdx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cx, setCx] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const len = promos.length;

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
  const activeCardIdx = ((rawIdx % len) + len) % len;

  const goTo = (target: number) => {
    const current = ((rawIdx % len) + len) % len;
    let diff = target - current;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    setRawIdx((r) => r + diff);
  };

  return (
    <div className="relative">
      {/* Viewport */}
      <div
        ref={viewportRef}
        className="relative overflow-hidden"
        style={{ height: "clamp(460px, 65vh, 560px)" }}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
          touchStartX.current = null;
        }}
      >
        {RENDER_OFFSETS.map((offset) => {
          const slot = rawIdx + offset;
          const cardIdx = cardAt(slot, len);
          const promo = promos[cardIdx];
          const isActive = offset === 0;
          const absOff = Math.abs(offset);
          // Responsive: <800px → 3 cards (±1), ≥800px → 5 cards (±2)
          const maxVisible = cx * 2 < 800 ? 1 : 2;
          const opacity = cx > 0 ? (absOff > maxVisible ? 0 : isActive ? 1 : 0.42) : 0;
          const scale = SCALE[absOff] ?? 0.55;

          return (
            <div
              key={cardIdx}
              style={{
                position: "absolute",
                bottom: 0,
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

        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#4467a9] bg-transparent text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0] md:h-12 md:w-12"
        >
          <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#4467a9] bg-transparent text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0] md:h-12 md:w-12"
        >
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-10 flex justify-center gap-2">
        {promos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir a promo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === activeCardIdx ? "w-6 bg-[#4467a9]" : "w-1.5 bg-[#4467a9]/25"
            }`}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/productos"
          className="rounded-full border-2 border-[#4467a9] bg-transparent px-10 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0]"
        >
          VER TODAS LAS PROMOS
        </Link>
      </div>
    </div>
  );
}

// ─── PromoCard ────────────────────────────────────────────────────────────────
function PromoCard({ promo }: { promo: UnifiedPromo }) {
  return (
    <div className="flex flex-col items-center text-center" style={{ width: CARD_W }}>
      {/* Badge circle */}
      {promo.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={promo.imageUrl}
          alt={promo.name}
          className="rounded-full object-cover"
          style={{ width: 118, height: 118, marginBottom: "1.15rem" }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-[#4467a9] font-display font-black text-[#f1ead0]"
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
      )}

      {/* Name */}
      <h3
        className="font-display font-black uppercase text-[#4467a9]"
        style={{ fontSize: "clamp(1.3rem, 4vw, 1.85rem)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.45rem" }}
      >
        {promo.name}
      </h3>

      {/* Note */}
      {promo.note && (
        <p
          className="font-display font-black uppercase text-[#4467a9]/40"
          style={{ fontSize: "0.63rem", letterSpacing: "0.18em", marginBottom: "0.75rem" }}
        >
          {promo.note}
        </p>
      )}

      <div className="w-10 border-t-2 border-[#4467a9]/15" style={{ marginBottom: "0.75rem" }} />

      {/* Includes list (hardcoded promos) */}
      {promo.includes && promo.includes.length > 0 && (
        <div style={{ marginBottom: "0.9rem", width: "100%" }}>
          <p
            className="font-black uppercase tracking-wider text-[#4467a9]"
            style={{ fontSize: "0.78rem", letterSpacing: "0.12em", marginBottom: "0.4rem" }}
          >
            INCLUYE
          </p>
          <ul className="inline-flex flex-col items-start gap-0.5">
            {promo.includes.map((item, i) => (
              <li
                key={i}
                className="flex items-baseline gap-1.5 text-[#4467a9]"
                style={{ fontSize: "0.82rem", lineHeight: 1.45 }}
              >
                <span className="shrink-0 font-black text-[#CC1414]" style={{ fontSize: "0.5rem" }}>
                  ▸
                </span>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price (hardcoded promos only) */}
      {promo.price && (
        <p
          className="font-display font-black text-[#CC1414]"
          style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", letterSpacing: "-0.04em" }}
        >
          {formatPrice(promo.price)}
        </p>
      )}

      {/* DB promo — consultá precio CTA */}
      {!promo.price && !promo.includes && (
        <Link
          href="/productos"
          className="rounded-full border-2 border-[#4467a9] bg-transparent px-5 py-2 font-display text-xs font-black uppercase tracking-widest text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0]"
        >
          VER PROMO →
        </Link>
      )}
    </div>
  );
}
