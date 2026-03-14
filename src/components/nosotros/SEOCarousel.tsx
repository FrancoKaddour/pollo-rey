"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Artículos SEO ────────────────────────────────────────────────────────────
const CARDS = [
  {
    tag: "APERTURA",
    title: "Pollo Rey: la pollería que llega a Saavedra con los mejores precios",
    img: "",
    href: "/blog/apertura",
  },
  {
    tag: "FRESCURA",
    title: "Sin congelados ni rodeos: así garantizamos pollo fresco todos los días",
    img: "",
    href: "/blog/pollo-fresco",
  },
  {
    tag: "PRECIOS",
    title: "Cómo comer bien sin gastar de más: la propuesta de Pollo Rey",
    img: "",
    href: "/blog/precios",
  },
  {
    tag: "SAAVEDRA",
    title: "Tu pollería de confianza a pasos de casa, en el barrio de toda la vida",
    img: "",
    href: "/blog/saavedra",
  },
  {
    tag: "PRODUCTOS",
    title: "Cortes de pollo, huevos, aceite y más: todo lo que necesitás en un lugar",
    img: "",
    href: "/blog/catalogo",
  },
  {
    tag: "COMUNIDAD",
    title: "Ser parte del barrio: por qué Pollo Rey nació pensando en vos",
    img: "",
    href: "/blog/comunidad",
  },
];

/** Slots renderizados: ±2 son staging invisibles, ±1 y 0 son visibles */
const RENDER_OFFSETS = [-2, -1, 0, 1, 2] as const;

const SCALE_SIDE = 0.82;

function cardAt(slot: number, len: number): number {
  return ((slot % len) + len) % len;
}

export function SEOCarousel() {
  const [rawIdx, setRawIdx] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [cx, setCx] = useState(0);
  const [cardW, setCardW] = useState(420);
  const [hovered, setHovered] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const len = CARDS.length;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setCx(w / 2);
      // Centro ocupa ~35% del ancho, mínimo 260, máximo 440
      setCardW(Math.max(260, Math.min(440, Math.floor(w * 0.35))));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Gap exacto de 1rem (16px) entre el borde de la card central y la lateral
  const step = Math.floor(cardW * (1 + SCALE_SIDE) / 2) + 16;

  const prev = () => { setRawIdx((i) => i - 1); setHovered(null); };
  const next = () => { setRawIdx((i) => i + 1); setHovered(null); };

  const activeCardIdx = ((rawIdx % len) + len) % len;

  const goTo = (target: number) => {
    const current = ((rawIdx % len) + len) % len;
    let diff = target - current;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    setRawIdx((r) => r + diff);
    setHovered(null);
  };

  return (
    <section className="bg-[#f1ead0] pt-16 pb-16 md:pt-24 md:pb-24">

      {/* Heading */}
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <h2
          className="mb-2 text-center font-display font-black uppercase text-[#08234e] leading-none"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            letterSpacing: "-0.045em",
            transform: "scaleX(1.1)",
            transformOrigin: "center",
          }}
        >
          POLLO REY EN SAAVEDRA<span className="text-[#CC1414]">.</span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative mx-auto max-w-[1400px]">

        {/* Viewport — clipPath corta laterales pero no top/bottom → hover no se clipea */}
        <div
          ref={viewportRef}
          className="relative"
          style={{ height: 420, clipPath: "inset(-40px 0 -40px 0)" }}
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
            const card = CARDS[cardIdx];
            const isActive = offset === 0;
            const absOff = Math.abs(offset);
            const scale = absOff === 0 ? 1 : SCALE_SIDE;
            // ±2 son invisible (staging), ±1 semi-opacas, centro opaca
            const opacity = cx > 0 ? (absOff >= 2 ? 0 : isActive ? 1 : 0.4) : 0;
            const isHovered = hovered === cardIdx;

            return (
              <div
                key={cardIdx}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: cx - cardW / 2,
                  width: cardW,
                  transform: `translateX(${offset * step}px) scale(${scale})`,
                  transformOrigin: "center bottom",
                  opacity,
                  transition:
                    "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
                  willChange: "transform, opacity",
                  zIndex: isActive ? 10 : 1,
                  pointerEvents: absOff <= 1 ? "auto" : "none",
                }}
                onMouseEnter={() => setHovered(cardIdx)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Back card roja — visible solo en hover de la card activa */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    background: "#CC1414",
                    border: "1.5px solid #000",
                    transformOrigin: "center center",
                    transform: isHovered ? "rotate(4deg) translateY(-6px)" : "rotate(0deg)",
                    transition: "transform 300ms ease-out",
                  }}
                />

                {/* Front card */}
                <Link
                  href={card.href}
                  className="relative flex w-full flex-col overflow-hidden bg-white"
                  style={{
                    zIndex: 1,
                    border: "1.5px solid #000",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0px)",
                    transition: "transform 300ms ease-out",
                  }}
                >
                  {/* Imagen */}
                  <div
                    className="relative overflow-hidden bg-[#08234e]/[0.06]"
                    style={{ height: 240 }}
                  >
                    {card.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.img}
                        alt={card.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <span
                        className="absolute bottom-4 right-6 select-none font-display font-black italic uppercase text-[#08234e]/10"
                        style={{ fontSize: "7rem", lineHeight: 1 }}
                      >
                        PR
                      </span>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col p-7">
                    <div className="font-display text-[0.6rem] font-black uppercase tracking-widest text-[#08234e]/50">
                      {card.tag}
                    </div>
                    <h3
                      className="mt-4 font-display font-black uppercase text-[#08234e] leading-tight"
                      style={{ fontSize: "1.05rem", letterSpacing: "-0.025em" }}
                    >
                      &ldquo;{card.title}&rdquo;
                    </h3>
                  </div>
                </Link>
              </div>
            );
          })}

          {/* Flecha izquierda */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08234e] text-[#f1ead0] shadow-lg transition-transform hover:scale-105 active:scale-95 md:left-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08234e] text-[#f1ead0] shadow-lg transition-transform hover:scale-105 active:scale-95 md:right-5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L19 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a artículo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeCardIdx ? "w-6 bg-[#08234e]" : "w-1.5 bg-[#08234e]/25"
              }`}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
