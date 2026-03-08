import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

// ─── Home page ─────────────────────────────────────────────────────────────────
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

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1ead0] pt-[72px]"
        aria-label="Hero"
      >
        {/* Diagonal background text — fills entire section */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-4 overflow-hidden"
          aria-hidden
          style={{ transform: "rotate(-12deg) scale(1.5)" }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 whitespace-nowrap"
              style={{ opacity: i % 2 === 0 ? 0.06 : 0.035 }}
            >
              {Array.from({ length: 10 }).map((_, j) => (
                <span
                  key={j}
                  className="font-display font-black uppercase text-[#08234e]"
                  style={{ fontSize: "clamp(4rem, 10vw, 9rem)", letterSpacing: "-0.04em" }}
                >
                  {i % 2 === 0 ? "POLLO REY" : "SAAVEDRA"}
                  <span className="mx-6 opacity-40">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center">
          {/* Eyebrow label */}
          <p className="mb-8 rounded-full border border-[#08234e]/15 bg-[#08234e]/5 px-5 py-2 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#08234e]/60">
            Saavedra · Buenos Aires · Desde 2009
          </p>

          {/* Top headline */}
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-[0.82]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)", letterSpacing: "-0.045em" }}
          >
            TU POLLERÍA
          </h1>

          {/* Circular product image */}
          <div
            className="relative my-8"
            style={{ width: "clamp(180px, 28vw, 420px)", height: "clamp(180px, 28vw, 420px)" }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#08234e] shadow-[0_24px_64px_rgba(8,35,78,0.25)]">
              <span
                className="absolute inset-0 flex items-center justify-center select-none font-display font-black text-[#f1ead0]"
                style={{ fontSize: "clamp(5rem, 14vw, 13rem)", opacity: 0.06, letterSpacing: "-0.05em" }}
              >
                PR
              </span>
            </div>

            {/* Badge — años */}
            <div
              className="absolute -right-4 -top-2 flex h-16 w-16 items-center justify-center rounded-full bg-[#ffd600] text-center shadow-lg md:h-20 md:w-20"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <span className="font-display text-[0.55rem] font-black uppercase leading-tight text-[#08234e] md:text-[0.65rem]">
                15<br />AÑOS
              </span>
            </div>

            {/* Badge — delivery */}
            <div
              className="absolute -bottom-3 -left-2 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1ead0] text-center shadow-lg ring-2 ring-[#08234e]/20 md:h-16 md:w-16"
              style={{ animation: "float 8s ease-in-out infinite 1.5s" }}
            >
              <span className="font-display text-[0.5rem] font-black uppercase leading-tight text-[#08234e] md:text-[0.6rem]">
                DELIVERY<br />GRATIS
              </span>
            </div>
          </div>

          {/* Bottom headline */}
          <h2
            className="font-display font-black uppercase text-[#08234e] leading-[0.82]"
            style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)", letterSpacing: "-0.045em" }}
          >
            DE BARRIO.
          </h2>

          {/* Sub copy */}
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[#08234e]/50">
            Pollo fresco, cortes, huevos y más. Delivery en CABA y Vicente López.
          </p>

          {/* CTA pill */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-[#08234e] px-10 py-4 font-sans text-sm font-bold uppercase tracking-[0.1em] text-[#f1ead0] transition-opacity hover:opacity-75"
            >
              Hacer pedido <span aria-hidden>→</span>
            </Link>
            <Link
              href="/productos"
              className="inline-flex items-center rounded-full border border-[#08234e]/20 px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.1em] text-[#08234e] transition-colors hover:border-[#08234e] hover:bg-[#08234e]/5"
            >
              Ver el menú
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#08234e]">Scroll</span>
          <div className="h-8 w-px bg-[#08234e]" />
        </div>
      </section>

      {/* ── 2. MARQUEE STRIP ────────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#08234e] py-4">
        <div className="flex" style={{ animation: "marquee 22s linear infinite" }}>
          {Array.from({ length: 2 }).flatMap((_, d) =>
            ["POLLO FRESCO", "★", "SAAVEDRA", "★", "BUENOS AIRES", "★", "DELIVERY", "★", "RETIRO EN LOCAL", "★", "CALIDAD GARANTIZADA", "★"].map(
              (item, i) => (
                <span
                  key={`${d}-${i}`}
                  className={`shrink-0 px-5 font-display text-sm font-black uppercase tracking-[0.18em] ${item === "★" ? "text-[#ffd600]/50" : "text-[#f1ead0]"}`}
                >
                  {item}
                </span>
              )
            )
          )}
        </div>
        <div className="mt-2 flex" style={{ animation: "marquee-reverse 28s linear infinite" }}>
          {Array.from({ length: 2 }).flatMap((_, d) =>
            ["CORTES FRESCOS", "★", "CONGELADOS", "★", "HUEVOS", "★", "DESPENSA", "★", "CABA", "★", "VICENTE LÓPEZ", "★"].map(
              (item, i) => (
                <span
                  key={`${d}-${i}`}
                  className={`shrink-0 px-5 font-display text-sm font-black uppercase tracking-[0.18em] ${item === "★" ? "text-[#ffd600]/30" : "text-[#f1ead0]/60"}`}
                >
                  {item}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ── 3. BIG CTA BANNER (Pretty Patty style — giant overflow text) ─────────── */}
      <section className="relative overflow-hidden bg-[#08234e] py-20 md:py-28">
        {/* Massive background text — overflows edges */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase text-[#f1ead0]"
            style={{ fontSize: "clamp(8rem, 22vw, 22rem)", letterSpacing: "-0.04em", opacity: 0.06 }}
          >
            POLLO FRESCO
          </span>
        </div>

        {/* Left pill button */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-12">
          <Link
            href="/productos"
            className="block rounded-full bg-[#f1ead0] px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#08234e] transition-opacity hover:opacity-80"
          >
            Ver menú
          </Link>
        </div>

        {/* Right pill button */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-12">
          <Link
            href="/productos"
            className="block rounded-full border border-[#f1ead0]/30 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f1ead0] transition-colors hover:border-[#f1ead0]/60"
          >
            Pedí ahora
          </Link>
        </div>

        {/* Center content */}
        <div className="relative mx-auto max-w-[1400px] px-24 text-center md:px-40">
          <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-[#f1ead0]/35">
            Pollería premium
          </p>
          <h2
            className="font-display font-black uppercase leading-[0.82] text-[#f1ead0]"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", letterSpacing: "-0.045em" }}
          >
            POLLO SIEMPRE<br />FRESCO.
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-[#f1ead0]/50">
            Cada día recibimos pollo fresco de proveedores locales. Sin congelado, sin vueltas.
          </p>
        </div>
      </section>

      {/* ── 4. MISIÓN — cards con yellow shadow hover ────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">
                Por qué elegirnos
              </p>
              <h2
                className="font-display font-black uppercase text-[#08234e] leading-[0.85]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                SIEMPRE FRESCO,<br />SIEMPRE LOCAL.
              </h2>
            </div>
            <Link
              href="/nosotros"
              className="mt-6 hidden items-center gap-1.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-[#08234e]/40 transition-colors hover:text-[#08234e] md:flex"
            >
              Conocenos →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: "🐔",
                title: "SIEMPRE FRESCO.",
                body: "Trabajamos con proveedores locales de confianza. Nuestro pollo llega fresco cada día, sin congelado. Calidad que se nota en cada corte.",
              },
              {
                num: "02",
                icon: "📍",
                title: "BARRIO NUESTRO.",
                body: "Estamos en Saavedra, CABA, y entregamos en todo CABA y Vicente López. Tu pollería de barrio, ahora con delivery a tu puerta.",
              },
              {
                num: "03",
                icon: "❤️",
                title: "HECHO CON AMOR.",
                body: "Más de 15 años atendiendo al barrio. Conocemos a nuestros clientes y nos esforzamos para que vuelvan cada semana.",
              },
            ].map((card) => (
              <div key={card.num} className="card-mission rounded-2xl bg-white p-8 md:p-10">
                <p className="mb-6 font-display text-xs font-black text-[#08234e]/15">{card.num}</p>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#08234e]">
                  <span className="text-xl">{card.icon}</span>
                </div>
                <h3
                  className="mb-3 font-display font-black uppercase text-[#08234e]"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", letterSpacing: "-0.03em" }}
                >
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#08234e]/50">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. LO MÁS PEDIDO ─────────────────────────────────────────────────────── */}
      <section className="bg-white px-6 py-24 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">
                Productos
              </p>
              <h2
                className="font-display font-black uppercase text-[#08234e] leading-none"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
              >
                LO MÁS PEDIDO.
              </h2>
            </div>
            <Link
              href="/productos"
              className="hidden font-sans text-sm font-bold uppercase tracking-[0.1em] text-[#08234e]/40 transition-colors hover:text-[#08234e] md:block"
            >
              Ver todo →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <>
              <div className="scrollbar-hide -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-[72vw] shrink-0 md:w-auto">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center md:hidden">
                <Link
                  href="/productos"
                  className="rounded-full border border-[#08234e]/20 px-6 py-3 font-sans text-sm font-bold uppercase tracking-[0.08em] text-[#08234e]"
                >
                  Ver todos →
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#08234e]/15 py-20 text-center">
              <p className="font-display text-sm font-bold text-[#08234e]/30">
                Ejecutá <code className="font-mono">npm run db:seed</code> para ver los productos destacados.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. SEGUNDA BIG CTA BANNER — "TODO FRESCO!" ──────────────────────────── */}
      <section className="relative overflow-hidden bg-[#c0392b] py-20 md:py-28">
        {/* Massive bg text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase text-white"
            style={{ fontSize: "clamp(8rem, 22vw, 22rem)", letterSpacing: "-0.04em", opacity: 0.08 }}
          >
            TODO FRESCO
          </span>
        </div>

        {/* Left pill */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 md:left-12">
          <Link
            href="/productos?cat=pollo"
            className="block rounded-full bg-white px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#c0392b] transition-opacity hover:opacity-85"
          >
            Pollo fresco
          </Link>
        </div>

        {/* Right pill */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 md:right-12">
          <Link
            href="/productos"
            className="block rounded-full border border-white/30 px-6 py-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
          >
            Ver menú
          </Link>
        </div>

        {/* Center */}
        <div className="relative mx-auto max-w-[1400px] px-24 text-center md:px-40">
          <p className="mb-4 font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">
            Delivery en CABA y Vicente López
          </p>
          <h2
            className="font-display font-black uppercase leading-[0.82] text-white"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", letterSpacing: "-0.045em" }}
          >
            DELIVERY<br />EN TU PUERTA.
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-white/50">
            Hacé tu pedido por WhatsApp y recibís en CABA y Vicente López el mismo día.
          </p>
        </div>
      </section>

      {/* ── 7. HISTORIA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08234e] px-6 py-28 md:px-12">
        <span
          className="pointer-events-none absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none font-display font-black leading-none text-[#f1ead0]"
          style={{ fontSize: "clamp(12rem, 40vw, 36rem)", opacity: 0.04, letterSpacing: "-0.06em" }}
          aria-hidden
        >
          15
        </span>

        <div className="relative mx-auto max-w-[1200px]">
          <p className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#f1ead0]/35">
            Nuestra historia
          </p>
          <h2
            className="mb-14 font-display font-black uppercase text-[#f1ead0] leading-[0.85]"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)", letterSpacing: "-0.04em", maxWidth: "16ch" }}
          >
            15 AÑOS EN SAAVEDRA.
          </h2>

          <div className="grid grid-cols-2 gap-px border border-[#f1ead0]/8 bg-[#f1ead0]/8 md:grid-cols-3">
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
                <p className="mt-2 font-sans text-xs uppercase tracking-[0.18em] text-[#f1ead0]/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-[#f1ead0]/45">
            Somos una pollería familiar de Saavedra con más de 15 años en el barrio.
            Entregamos pollo fresco de calidad, cortes a medida y los mejores precios de CABA.
          </p>
        </div>
      </section>

      {/* ── 8. CATEGORÍAS GRID ───────────────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10">
            <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#08234e]/40">Categorías</p>
            <h2
              className="font-display font-black uppercase text-[#08234e] leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              TODO LO QUE NECESITÁS.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Pollo Fresco", sub: "Entero y cortes", href: "/productos?cat=pollo", icon: "🍗" },
              { name: "Congelados", sub: "Papas, hamburguesas", href: "/productos?cat=papas-fritas", icon: "🧊" },
              { name: "Huevos", sub: "Docena y media", href: "/productos?cat=huevos", icon: "🥚" },
              { name: "Despensa", sub: "Aceite, sal, carbón", href: "/productos?cat=despensa", icon: "🛒" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border border-[#08234e]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1.5 hover:border-[#08234e] hover:shadow-[6px_6px_0px_0px_#ffd600]"
              >
                <span className="mb-4 block text-3xl">{cat.icon}</span>
                <h3
                  className="font-display font-black uppercase text-[#08234e]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-[#08234e]/40">{cat.sub}</p>
                <span className="mt-4 block font-sans text-xs font-bold uppercase tracking-[0.1em] text-[#08234e]/30 transition-colors group-hover:text-[#08234e]">
                  Ver productos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08234e] px-6 py-28 md:px-12">
        {/* Bg text */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase text-[#f1ead0]"
            style={{ fontSize: "clamp(8rem, 20vw, 20rem)", letterSpacing: "-0.04em", opacity: 0.04 }}
          >
            PEDÍ AHORA
          </span>
        </div>

        <div className="relative mx-auto max-w-[1200px] text-center">
          <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.28em] text-[#f1ead0]/30">
            Tu pedido
          </p>
          <h2
            className="mx-auto mb-8 font-display font-black uppercase text-[#f1ead0] leading-[0.82]"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)", letterSpacing: "-0.045em", maxWidth: "12ch" }}
          >
            ¿HACEMOS EL PEDIDO?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-[#f1ead0]/45">
            Armá tu carrito y mandamos el pedido directo por WhatsApp.
            Rápido, sin vueltas, con entrega en CABA y Vicente López.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-[#f1ead0] px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.08em] text-[#08234e] transition-opacity hover:opacity-85"
            >
              Armar mi pedido →
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ""}?text=${encodeURIComponent("Hola POLLO REY! Quiero consultar sobre un pedido 🛒")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#f1ead0]/20 px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.08em] text-[#f1ead0]/65 transition-colors hover:border-[#f1ead0]/50 hover:text-[#f1ead0]"
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
