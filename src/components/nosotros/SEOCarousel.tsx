"use client";

import { useRef, useState, useEffect } from "react";

// ─── Artículos SEO (editá con tus notas/posts/links reales) ──────────────────
const CARDS = [
  {
    tag: "APERTURA",
    title: "Pollo Rey: la pollería que llega a Saavedra con los mejores precios",
    img: "",
  },
  {
    tag: "FRESCURA",
    title: "Sin congelados ni rodeos: así garantizamos pollo fresco todos los días",
    img: "",
  },
  {
    tag: "PRECIOS",
    title: "Cómo comer bien sin gastar de más: la propuesta de Pollo Rey",
    img: "",
  },
  {
    tag: "SAAVEDRA",
    title: "Tu pollería de confianza a pasos de casa, en el barrio de toda la vida",
    img: "",
  },
  {
    tag: "PRODUCTOS",
    title: "Cortes de pollo, huevos, aceite y más: todo lo que necesitás en un lugar",
    img: "",
  },
  {
    tag: "COMUNIDAD",
    title: "Ser parte del barrio: por qué Pollo Rey nació pensando en vos",
    img: "",
  },
];

const GAP = 36;

export function SEOCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW] = useState(400);

  // Calcula el ancho de card para que siempre entren exactamente 3
  useEffect(() => {
    const recalc = () => {
      if (!trackRef.current) return;
      const available = trackRef.current.offsetWidth;
      const w = Math.floor((available - 2 * GAP) / 3);
      if (w > 0) setCardW(Math.max(w, 240));
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  const scroll = (dir: "prev" | "next") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: dir === "next" ? cardW + GAP : -(cardW + GAP),
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-24">

      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <h2
          className="mb-14 text-center font-display font-black uppercase text-[#08234e] leading-none"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            letterSpacing: "-0.045em",
            transform: "scaleX(1.1)",
            transformOrigin: "center",
          }}
        >
          POLLO REY EN SAAVEDRA<span className="text-[#CC1414]">.</span>
        </h2>

        {/* Track wrapper */}
        <div className="relative">

          {/* Flecha izquierda */}
          <button
            onClick={() => scroll("prev")}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08234e] text-[#f1ead0] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Flecha derecha */}
          <button
            onClick={() => scroll("next")}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#08234e] text-[#f1ead0] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 19L19 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Cards track */}
          <div
            ref={trackRef}
            className="flex overflow-x-auto scrollbar-hide"
            style={{
              gap: GAP,
              scrollSnapType: "x mandatory",
              paddingBottom: 16,
            }}
          >
          {CARDS.map((card, i) => (
            <div
              key={i}
              className="group/card relative shrink-0 cursor-pointer"
              style={{
                width: cardW,
                scrollSnapAlign: "start",
              }}
            >
              {/* Back card — ligeramente más chica, apenas se nota al inclinar */}
              <div
                className="absolute rounded-2xl bg-[#CC1414] opacity-0 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:rotate-1"
                style={{ inset: "8px", transformOrigin: "center" }}
              />

              {/* Front card */}
              <a
                href="#"
                className="relative z-10 flex flex-col overflow-hidden rounded-2xl bg-white transition-transform duration-300 group-hover/card:-translate-y-1.5"
              >
                {/* Imagen */}
                <div
                  className="relative overflow-hidden bg-[#08234e]/[0.06]"
                  style={{ height: 280 }}
                >
                  {card.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.img}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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
                  {/* Tag pill */}
                  <span className="inline-flex w-fit items-center rounded-full bg-[#08234e]/[0.06] px-4 py-1 font-display text-[0.6rem] font-black uppercase tracking-widest text-[#08234e]/60">
                    {card.tag}
                  </span>

                  {/* Título con comillas */}
                  <h3
                    className="mt-5 font-display font-black uppercase text-[#08234e] leading-tight"
                    style={{ fontSize: "1.05rem", letterSpacing: "-0.025em" }}
                  >
                    &ldquo;{card.title}&rdquo;
                  </h3>
                </div>
              </a>
            </div>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
}
