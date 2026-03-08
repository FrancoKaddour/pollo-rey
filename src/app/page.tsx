import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import type { Product } from "@/types";

// ─── Filas del texto diagonal del hero ───────────────────────────────────────
const HERO_TEXT_SOLID = "POLLO FRESCO · SAAVEDRA · BUENOS AIRES · CALIDAD · DELIVERY ·";
const HERO_TEXT_GHOST = "POLLERÍA DE BARRIO · CORTES FRESCOS · HUEVOS · DESPENSA · CABA ·";

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
    /* graceful fallback */
  }

  // 10 filas alternadas sólido/ghost
  const bgRows = Array.from({ length: 10 }, (_, i) => ({
    text: i % 2 === 0 ? HERO_TEXT_SOLID : HERO_TEXT_GHOST,
    solid: i % 2 === 0,
  }));

  return (
    <>
      <Navbar />
      <CartDrawer />

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1ead0] pt-[72px]"
        aria-label="Hero"
      >
        {/* ── Background: texto diagonal denso (desktop) ── */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
          aria-hidden
          style={{ transform: "rotate(-9deg) scale(1.65)" }}
        >
          {bgRows.map((row, i) => (
            <div
              key={i}
              className="whitespace-nowrap font-display font-black uppercase leading-[1.05]"
              style={
                row.solid
                  ? { color: "#08234e", fontSize: "clamp(3.5rem, 7vw, 7.5rem)", letterSpacing: "-0.02em" }
                  : {
                      color: "rgba(8,35,78,0.14)",
                      fontSize: "clamp(3.5rem, 7vw, 7.5rem)",
                      letterSpacing: "-0.02em",
                    }
              }
            >
              {row.text}&nbsp;&nbsp;&nbsp;{row.text}&nbsp;&nbsp;&nbsp;{row.text}
            </div>
          ))}
        </div>

        {/* ── Mobile: heading limpio ── */}
        <h1
          className="relative z-10 mb-8 text-center font-display font-black uppercase text-[#08234e] leading-[0.88] md:hidden"
          style={{ fontSize: "clamp(2.4rem, 10vw, 4rem)", letterSpacing: "-0.04em", maxWidth: "14ch" }}
        >
          TU POLLERÍA DE BARRIO EN SAAVEDRA
        </h1>

        {/* ── Centro: imagen circular + CTA ── */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Círculo navy externo (borde) + círculo cream interno con imagen */}
          <div
            className="relative rounded-full bg-[#08234e] p-3 shadow-[0_20px_60px_rgba(8,35,78,0.35)]"
            style={{ width: "clamp(240px, 34vw, 480px)", height: "clamp(240px, 34vw, 480px)" }}
          >
            {/* Círculo interno cream */}
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#f1ead0]">
              <Image
                src="/Red_and_White_Minimalist_Fried_Chicken_Logo__1_-removebg-preview.png"
                alt="Pollo Rey"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
          </div>

          {/* Pill CTA */}
          <Link
            href="/productos"
            className="mt-8 rounded-full bg-[#08234e] px-12 py-4 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] shadow-lg transition-opacity hover:opacity-80"
          >
            HACER PEDIDO
          </Link>
        </div>
      </section>

      {/* ── 2. MARQUEE ────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#08234e] py-3.5">
        {/* Exactamente 2 copias → translateX(-50%) loops sin salto */}
        <div
          className="flex w-max"
          style={{ animation: "marquee 24s linear infinite" }}
        >
          {[0, 1].flatMap((d) =>
            ["POLLO FRESCO", "★", "SAAVEDRA", "★", "BUENOS AIRES", "★", "DELIVERY", "★", "CALIDAD GARANTIZADA", "★", "CORTES FRESCOS", "★"].map(
              (item, i) => (
                <span
                  key={`${d}-${i}`}
                  className={`shrink-0 px-5 font-display font-black uppercase tracking-widest ${
                    item === "★"
                      ? "text-[#f1ead0]/25 text-sm"
                      : "text-[#f1ead0] text-sm"
                  }`}
                >
                  {item}
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ── 3. PRODUCTOS — carrusel 3 items (PP-style) ────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="mb-14 text-center font-display font-black uppercase text-[#08234e]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            LO MÁS PEDIDO
          </h2>

          <ProductCarousel products={featuredProducts} />

          <div className="mt-16 flex justify-center">
            <Link
              href="/productos"
              className="rounded-full border-2 border-[#08234e] px-10 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
            >
              VER MENÚ COMPLETO
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. BANNER "HACER PEDIDO" (PP ORDER NOW style — rojo, overflow) ─────── */}
      <section
        className="relative overflow-hidden bg-[#E5351A]"
        style={{ height: "clamp(80px, 11vw, 120px)" }}
      >
        {/* Texto MASIVO blanco que overflowea arriba y abajo */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase text-white"
            style={{
              fontSize: "clamp(6rem, 18vw, 18rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            HACER PEDIDO
          </span>
        </div>

        {/* Pill izquierda */}
        <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 md:left-14">
          <Link
            href="/productos"
            className="block rounded-full border-2 border-white px-5 py-2.5 font-display text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#E5351A]"
          >
            HACER PEDIDO
          </Link>
        </div>

        {/* Pill derecha */}
        <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 md:right-14">
          <Link
            href="/productos"
            className="block rounded-full border-2 border-white px-5 py-2.5 font-display text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#E5351A]"
          >
            HACER PEDIDO
          </Link>
        </div>
      </section>

      {/* ── 5. NOSOTROS / EQUIPO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f1ead0] px-6 py-20 md:px-12">
        {/* Texto diagonal de fondo — más sutil */}
        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-[0.06] md:block"
          aria-hidden
          style={{ transform: "rotate(-9deg) scale(1.5)" }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="whitespace-nowrap font-display font-black uppercase text-[#08234e] leading-[1.05]"
              style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
            >
              {i % 2 === 0 ? "NUESTRO EQUIPO · BARRIO SAAVEDRA · " : "15 AÑOS · CALIDAD · "}
              {i % 2 === 0 ? "NUESTRO EQUIPO · BARRIO SAAVEDRA · " : "15 AÑOS · CALIDAD · "}
              {i % 2 === 0 ? "NUESTRO EQUIPO · BARRIO SAAVEDRA · " : "15 AÑOS · CALIDAD · "}
            </div>
          ))}
        </div>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Foto del equipo (placeholder) */}
            <div className="relative overflow-hidden rounded-2xl bg-[#08234e]/10" style={{ aspectRatio: "4/3" }}>
              <div className="flex h-full w-full items-center justify-center">
                <span
                  className="select-none font-display font-black text-[#08234e]"
                  style={{ fontSize: "clamp(5rem, 15vw, 12rem)", opacity: 0.06 }}
                >
                  PR
                </span>
              </div>
              {/* Grid overlay sobre la foto */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(8,35,78,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,35,78,0.08) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            {/* Texto */}
            <div>
              <p className="mb-4 font-display text-xs font-black uppercase tracking-[0.25em] text-[#08234e]/40">
                Sobre nosotros
              </p>
              <h2
                className="font-display font-black uppercase text-[#08234e] leading-[0.88]"
                style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.04em" }}
              >
                TU POLLERÍA DE BARRIO EN SAAVEDRA.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#08234e]/55">
                Somos una pollería familiar con más de 15 años en Saavedra, CABA.
                Trabajamos con proveedores locales de confianza para traerte pollo fresco
                cada día, sin congelado. Cortes a medida, los mejores precios y
                ahora con delivery a tu puerta en CABA y Vicente López.
              </p>
              <Link
                href="/nosotros"
                className="mt-8 inline-block rounded-full bg-[#08234e] px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-opacity hover:opacity-80"
              >
                CONOCENOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SEGUNDO BANNER — azul navy ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-[#08234e]"
        style={{ height: "clamp(80px, 11vw, 120px)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span
            className="select-none whitespace-nowrap font-display font-black uppercase text-[#f1ead0]"
            style={{
              fontSize: "clamp(6rem, 18vw, 18rem)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            POLLO FRESCO
          </span>
        </div>

        <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2 md:left-14">
          <Link
            href="/productos?cat=pollo"
            className="block rounded-full border-2 border-[#f1ead0] px-5 py-2.5 font-display text-xs font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#08234e]"
          >
            VER CATÁLOGO
          </Link>
        </div>

        <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 md:right-14">
          <Link
            href="/productos?cat=pollo"
            className="block rounded-full border-2 border-[#f1ead0] px-5 py-2.5 font-display text-xs font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#08234e]"
          >
            POLLO FRESCO
          </Link>
        </div>
      </section>

      {/* ── 7. CATEGORÍAS ─────────────────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="mb-10 font-display font-black uppercase text-[#08234e]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
          >
            TODO LO QUE NECESITÁS.
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: "Pollo Fresco", sub: "Entero y cortes", href: "/productos?cat=pollo" },
              { name: "Congelados", sub: "Papas, hamburguesas", href: "/productos?cat=papas-fritas" },
              { name: "Huevos", sub: "Docena y media docena", href: "/productos?cat=huevos" },
              { name: "Despensa", sub: "Aceite, sal, carbón", href: "/productos?cat=despensa" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative overflow-hidden rounded-2xl border-2 border-[#08234e]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1.5 hover:border-[#08234e] hover:shadow-[6px_6px_0px_0px_#08234e]"
              >
                <h3
                  className="font-display font-black uppercase text-[#08234e]"
                  style={{ letterSpacing: "-0.02em", fontSize: "1.1rem" }}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-[#08234e]/40">{cat.sub}</p>
                <span className="mt-4 block font-display text-xs font-black uppercase tracking-widest text-[#08234e]/25 transition-colors group-hover:text-[#08234e]">
                  VER →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
