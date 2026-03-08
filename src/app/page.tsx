import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

// ─── Marquee content ─────────────────────────────────────────────────────────
const marqueeItemsA = [
  "POLLO FRESCO", "·", "SAAVEDRA", "·", "BUENOS AIRES", "·",
  "DELIVERY", "·", "RETIRO EN LOCAL", "·", "CALIDAD GARANTIZADA", "·",
];

const marqueeItemsB = [
  "CORTES FRESCOS", "·", "CONGELADOS", "·", "HUEVOS", "·",
  "DESPENSA", "·", "CABA", "·", "VICENTE LÓPEZ", "·",
];

// ─── Home page ────────────────────────────────────────────────────────────────
export default async function HomePage() {
  let featuredProducts: Product[] = [];

  try {
    const rows = await prisma.product.findMany({
      where: { featured: true, active: true },
      take: 8,
      include: { category: true },
    });
    featuredProducts = rows as unknown as Product[];
  } catch {
    // DB aún no inicializada — graceful fallback
  }

  return (
    <>
      <Navbar />
      <CartDrawer />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1ead0] px-6 pt-24 pb-16"
        aria-label="Hero"
      >
        {/* Eyebrow */}
        <p className="mb-10 text-center text-xs font-semibold uppercase tracking-[0.35em] text-[#08234e]/40">
          Saavedra · Buenos Aires · Desde 2009
        </p>

        {/* Heading top */}
        <h1
          className="text-center font-display font-black uppercase text-[#08234e] leading-[0.82]"
          style={{ fontSize: "clamp(4.2rem, 13vw, 12.5rem)", letterSpacing: "-0.045em" }}
        >
          TU POLLERÍA
        </h1>

        {/* Circle hero */}
        <div
          className="relative my-6 md:my-8 shrink-0"
          style={{ width: "clamp(200px, 32vw, 460px)", height: "clamp(200px, 32vw, 460px)" }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full bg-[#08234e] flex items-center justify-center">
            <span
              className="select-none font-display font-black text-[#f1ead0] leading-none"
              style={{ fontSize: "clamp(5rem, 14vw, 13rem)", opacity: 0.07, letterSpacing: "-0.05em" }}
            >
              PR
            </span>
          </div>

          {/* Floating badge — 15 años */}
          <div
            className="absolute -right-4 -top-2 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#08234e] bg-[#ffd600] text-center md:h-20 md:w-20"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <span className="font-display text-[0.55rem] font-black uppercase leading-tight text-[#08234e] md:text-[0.65rem]">
              15<br />años
            </span>
          </div>

          {/* Floating badge — CABA+VL */}
          <div
            className="absolute -bottom-3 -left-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#08234e] bg-[#f1ead0] text-center md:h-16 md:w-16"
            style={{ animation: "float 8s ease-in-out infinite 1.5s" }}
          >
            <span className="font-display text-[0.5rem] font-black uppercase leading-tight text-[#08234e] md:text-[0.6rem]">
              CABA<br />+ VL
            </span>
          </div>
        </div>

        {/* Heading bottom */}
        <h2
          className="text-center font-display font-black uppercase text-[#08234e] leading-[0.82]"
          style={{ fontSize: "clamp(4.2rem, 13vw, 12.5rem)", letterSpacing: "-0.045em" }}
        >
          DE BARRIO.
        </h2>

        {/* Sub text */}
        <p className="mt-6 text-center text-sm text-[#08234e]/50 md:text-base">
          Pollo fresco, cortes, huevos y más. Delivery en CABA y Vicente López.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#08234e] px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#f1ead0] transition-opacity hover:opacity-75"
          >
            Hacer pedido <span aria-hidden>→</span>
          </Link>
          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-full border border-[#08234e]/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#08234e] transition-colors hover:border-[#08234e] hover:bg-[#08234e]/5"
          >
            Ver el menú
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#08234e]">Scroll</span>
          <div className="h-8 w-px bg-[#08234e]" />
        </div>
      </section>

      {/* ── 2. MARQUEE DOBLE ─────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#08234e] py-4">
        <div className="flex" style={{ animation: "marquee 25s linear infinite" }}>
          {[...marqueeItemsA, ...marqueeItemsA].map((item, i) => (
            <span
              key={i}
              className={`shrink-0 px-5 font-display text-sm font-bold uppercase tracking-[0.2em] ${item === "·" ? "text-[#f1ead0]/25" : "text-[#f1ead0]"}`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-2 flex" style={{ animation: "marquee-reverse 30s linear infinite" }}>
          {[...marqueeItemsB, ...marqueeItemsB].map((item, i) => (
            <span
              key={i}
              className={`shrink-0 px-5 font-display text-sm font-bold uppercase tracking-[0.2em] ${item === "·" ? "text-[#f1ead0]/25" : "text-[#f1ead0]/70"}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. MISIÓN — cards con yellow shadow hover ────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-16 max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">
              Por qué elegirnos
            </p>
            <h2
              className="font-display font-black uppercase text-[#08234e] leading-[0.85]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              SIEMPRE FRESCO,<br />SIEMPRE LOCAL.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                emoji: "🐔",
                title: "SIEMPRE FRESCO.",
                body: "Trabajamos con proveedores locales de confianza. Nuestro pollo llega fresco cada día, sin congelado. Calidad que se nota en cada corte.",
              },
              {
                num: "02",
                emoji: "📍",
                title: "BARRIO NUESTRO.",
                body: "Estamos en Saavedra, CABA, y entregamos en todo CABA y Vicente López. Tu pollería de barrio, ahora con delivery a tu puerta.",
              },
              {
                num: "03",
                emoji: "❤️",
                title: "HECHO CON AMOR.",
                body: "Más de 15 años atendiendo al barrio. Conocemos a nuestros clientes, sabemos lo que necesitan y nos esforzamos para que vuelvan cada semana.",
              },
            ].map((card) => (
              <div key={card.num} className="card-mission rounded-2xl bg-white p-8 md:p-10">
                <p className="mb-6 font-display text-xs font-black text-[#08234e]/20">{card.num}</p>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#08234e]">
                  <span className="text-xl">{card.emoji}</span>
                </div>
                <h3
                  className="mb-3 font-display font-black uppercase text-[#08234e]"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", letterSpacing: "-0.03em" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#08234e]/55">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. LO MÁS PEDIDO ─────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">
                Productos
              </p>
              <h2
                className="font-display font-black uppercase text-[#08234e] leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
              >
                LO MÁS PEDIDO.
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden items-center gap-1.5 text-sm font-bold uppercase tracking-[0.1em] text-[#08234e]/50 transition-colors hover:text-[#08234e] md:flex"
            >
              Ver todo →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="scrollbar-hide -mx-6 flex gap-4 overflow-x-auto px-6 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-[75vw] shrink-0 md:w-auto">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center md:hidden">
                <Link
                  href="/productos"
                  className="rounded-full border border-[#08234e]/20 px-6 py-2.5 text-sm font-bold uppercase tracking-[0.08em] text-[#08234e]"
                >
                  Ver todos los productos →
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#08234e]/15 py-20 text-center">
              <p className="font-display text-sm font-bold text-[#08234e]/30">
                Ejecutá <code>npm run db:seed</code> para ver los productos destacados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 5. HISTORIA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08234e] px-6 py-28 md:px-12">
        <span
          className="pointer-events-none absolute right-[-5vw] top-1/2 -translate-y-1/2 select-none font-display font-black leading-none text-[#f1ead0]"
          style={{ fontSize: "clamp(12rem, 38vw, 34rem)", opacity: 0.04, letterSpacing: "-0.06em" }}
          aria-hidden
        >
          15
        </span>

        <div className="relative mx-auto max-w-[1200px]">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.28em] text-[#f1ead0]/35">
            Nuestra historia
          </p>
          <h2
            className="mb-14 font-display font-black uppercase text-[#f1ead0] leading-[0.85]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", letterSpacing: "-0.04em", maxWidth: "16ch" }}
          >
            15 AÑOS EN SAAVEDRA, CALIDAD EN CADA CORTE.
          </h2>

          <div className="grid grid-cols-2 gap-px border border-[#f1ead0]/10 bg-[#f1ead0]/10 md:grid-cols-3">
            {[
              { num: "15+", label: "Años de experiencia" },
              { num: "6", label: "Días a la semana" },
              { num: "CABA+VL", label: "Zonas de cobertura" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#08234e] px-8 py-8">
                <p
                  className="font-display font-black text-[#f1ead0] leading-none"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}
                >
                  {stat.num}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#f1ead0]/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-[#f1ead0]/50">
            Somos una pollería familiar de Saavedra con más de 15 años en el barrio.
            Entregamos pollo fresco de calidad, cortes a medida y los mejores precios de CABA.
            Ahora también hacemos delivery para que comer bien sea más fácil.
          </p>
        </div>
      </section>

      {/* ── 6. CATEGORÍAS GRID ───────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">Categorías</p>
            <h2
              className="font-display font-black uppercase text-[#08234e] leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
            >
              TODO LO QUE NECESITÁS.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Pollo Fresco", sub: "Entero y cortes", href: "/productos?cat=pollo", emoji: "🍗" },
              { name: "Congelados", sub: "Papas, hamburguesas", href: "/productos?cat=papas-fritas", emoji: "🧊" },
              { name: "Huevos", sub: "Docena y media", href: "/productos?cat=huevos", emoji: "🥚" },
              { name: "Despensa", sub: "Aceite, sal, carbón", href: "/productos?cat=despensa", emoji: "🛒" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border border-[#08234e]/10 bg-white p-6 transition-all duration-250 hover:-translate-y-1 hover:border-[#08234e] hover:shadow-[6px_6px_0px_0px_#ffd600]"
              >
                <span className="mb-4 block text-3xl">{cat.emoji}</span>
                <h3
                  className="font-display font-black uppercase text-[#08234e]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-[#08234e]/45">{cat.sub}</p>
                <span className="mt-4 block text-xs font-bold text-[#08234e]/35 transition-colors group-hover:text-[#08234e]">
                  Ver productos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA FINAL ─────────────────────────────────────────────────── */}
      <section className="bg-[#08234e] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1200px] text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#f1ead0]/30">
            Tu pedido
          </p>
          <h2
            className="mx-auto mb-8 font-display font-black uppercase text-[#f1ead0] leading-[0.85]"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)", letterSpacing: "-0.045em", maxWidth: "12ch" }}
          >
            ¿HACEMOS EL PEDIDO?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-[#f1ead0]/50">
            Arreglá tu carrito y hacemos el pedido por WhatsApp. Rápido, sin vueltas,
            con entrega en CABA y Vicente López.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-[#f1ead0] px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#08234e] transition-opacity hover:opacity-80"
            >
              Armar mi pedido →
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ""}?text=${encodeURIComponent("Hola POLLO REY! Quiero consultar sobre un pedido 🛒")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#f1ead0]/20 px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] text-[#f1ead0]/70 transition-colors hover:border-[#f1ead0]/50 hover:text-[#f1ead0]"
            >
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
