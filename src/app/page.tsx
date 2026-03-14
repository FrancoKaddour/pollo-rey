import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { PromoCarousel } from "@/components/home/PromoCarousel";
import { ExperienceForm } from "@/components/home/ExperienceForm";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { MenuSection } from "@/components/home/MenuSection";
import { LoyaltySection } from "@/components/home/LoyaltySection";
import { prisma } from "@/lib/prisma";

// ─── Filas del texto diagonal del hero ───────────────────────────────────────
const HERO_TEXT_SOLID = "POLLO FRESCO · SAAVEDRA · BUENOS AIRES · CALIDAD · DELIVERY ·";
const HERO_TEXT_GHOST = "POLLERÍA DE BARRIO · CORTES FRESCOS · HUEVOS · DESPENSA · CABA ·";

export default async function HomePage() {

  // Promos activas desde BD (con fechas vigentes)
  const now = new Date();
  const dbPromos = await prisma.promotion.findMany({
    where: { active: true, startDate: { lte: now }, endDate: { gte: now } },
    orderBy: { startDate: "desc" },
  });

  // 4 filas alternadas sólido/ghost, dirección alterna
  const bgRows = Array.from({ length: 4 }, (_, i) => ({
    text: i % 2 === 0 ? HERO_TEXT_SOLID : HERO_TEXT_GHOST,
    solid: i % 2 === 0,
    reverse: i % 2 !== 0,
  }));

  return (
    <>
      <Navbar />
      <CartDrawer />

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f1ead0] pt-[84px]"
        aria-label="Hero"
      >
        {/* ── Background: marquees inclinados (desktop) ── */}
        <div
          className="pointer-events-none absolute inset-0 hidden md:flex md:flex-col md:justify-center"
          aria-hidden
          style={{ transform: "rotate(-6deg) scale(1.65)" }}
        >
          {bgRows.map((row, i) => (
            <div key={i} style={{ overflow: "hidden", paddingTop: "0.2em", marginTop: "-0.2em" }}>
              <div
                className="flex w-max font-display font-black uppercase"
                style={{
                  animation: `${row.reverse ? "marquee-reverse" : "marquee"} 180s linear infinite`,
                  color: row.solid ? "#4467a9" : "transparent",
                  WebkitTextStroke: row.solid ? "0px" : "1.5px #4467a9",
                  fontSize: "clamp(2rem, 3.6vw, 4.2rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1",
                }}
              >
                <span className="shrink-0 whitespace-nowrap">
                  {row.text} {row.text} {row.text}{" "}
                </span>
                <span className="shrink-0 whitespace-nowrap" aria-hidden>
                  {row.text} {row.text} {row.text}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: heading limpio ── */}
        <h1
          className="relative z-10 mb-8 text-center font-display font-black uppercase text-[#4467a9] leading-[0.88] md:hidden"
          style={{ fontSize: "clamp(2rem, 9vw, 4rem)", letterSpacing: "-0.04em", maxWidth: "14ch" }}
        >
          TU POLLERÍA DE BARRIO EN SAAVEDRA
        </h1>

        {/* ── Centro: forma arco/puerta + CTA ── */}
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/imghero2.png"
            alt="Pollo Rey"
            width={520}
            height={640}
            className="object-contain -mt-8"
            style={{ width: "clamp(240px, 55vw, 520px)", height: "auto" }}
            priority
          />

          {/* Pill CTA */}
          <Link
            href="/productos"
            className="mt-8 rounded-full bg-[#4467a9] px-12 py-4 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] shadow-lg transition-opacity hover:opacity-80"
          >
            HACER PEDIDO
          </Link>
        </div>
      </section>

      {/* ── 3. PROMOCIONES — carrusel 3 items estilo PP ───────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="mb-14 text-center font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(2rem, 6vw, 6.5rem)", letterSpacing: "-0.055em", transform: "scaleX(1.18)", transformOrigin: "center" }}
          >
            NUESTRAS PROMOS<span className="text-[#CC1414]">.</span>
          </h2>
          <PromoCarousel dbPromos={dbPromos} />
        </div>
      </section>

      {/* ── 4. BANNER "HACER PEDIDO" — rojo ──────────────────────────────────── */}
      <MarqueeBand
        direction="left"
        speed={90}
        className="bg-[#CC1414]"
        style={{ height: "clamp(140px, 16vw, 200px)" }}
      >
        <span
          className="shrink-0 select-none font-display font-black italic uppercase text-white"
          style={{ fontSize: "clamp(110px, 13vw, 160px)", letterSpacing: "-0.04em", lineHeight: 0.85, marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          HACER PEDIDO
        </span>
        <Link
          href="/productos"
          className="shrink-0 rounded-full border-2 border-white bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#CC1414]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          ORDENAR AHORA
        </Link>
        <span
          className="shrink-0 select-none font-display font-black italic uppercase text-white"
          style={{ fontSize: "clamp(110px, 13vw, 160px)", letterSpacing: "-0.04em", lineHeight: 0.85, marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          POLLO REY
        </span>
        <Link
          href="/productos"
          className="shrink-0 rounded-full border-2 border-white bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#CC1414]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          ORDENAR AHORA
        </Link>
      </MarqueeBand>

      {/* ── 4b. MENÚ — tabs + slider estilo Pretty Patty ─────────────────────── */}
      <MenuSection />

      {/* ── 5. NOSOTROS / EQUIPO ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f1ead0] px-6 py-20 md:px-12">
<div className="relative mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Imagen hero */}
            <div className="flex justify-center">
              <Image
                src="/IMGhero.png"
                alt="Pollo Rey"
                width={520}
                height={640}
                className="object-contain -mt-8"
                style={{ width: "clamp(160px, 40vw, 420px)", height: "auto" }}
              />
            </div>

            {/* Texto */}
            <div>
              <p className="mb-4 font-display text-xs font-black uppercase tracking-[0.25em] text-[#4467a9]/40">
                Sobre nosotros
              </p>
              <h2
                className="font-display font-black uppercase text-[#4467a9] leading-[0.85]"
                style={{ fontSize: "clamp(1.8rem, 5vw, 5.5rem)", letterSpacing: "-0.055em", transform: "scaleX(1.18)", transformOrigin: "left" }}
              >
                TU POLLERÍA DE BARRIO EN SAAVEDRA<span className="text-[#CC1414]">.</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[#4467a9]/55">
                Pollo Rey es una pollería nueva en Saavedra, pero detrás hay años de oficio
                y mucho amor por el barrio. Trabajamos con proveedores locales de confianza
                para traerte pollo fresco cada día, sin congelado. Cortes a medida, los
                mejores precios y ahora con delivery a tu puerta en CABA y Vicente López.
              </p>
              <Link
                href="/nosotros"
                className="mt-8 inline-block rounded-full border-2 border-[#4467a9] bg-transparent px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0]"
              >
                CONOCENOS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Checkered band ── */}
      <div
        aria-hidden
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#4467a9 0% 25%, #f1ead0 0% 50%)",
          /* tile = height/3 → always exactly 3 complete rows at any viewport */
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />

      {/* ── 5b. CALIFICÁ TU EXPERIENCIA ──────────────────────────────────────── */}
      <ExperienceForm />

      {/* ── 6. SEGUNDO BANNER — navy ──────────────────────────────────────────── */}
      <MarqueeBand
        direction="right"
        speed={90}
        className="bg-[#4467a9]"
        style={{ height: "clamp(140px, 16vw, 200px)" }}
      >
        <span
          className="shrink-0 select-none font-display font-black italic uppercase text-[#f1ead0]"
          style={{ fontSize: "clamp(110px, 13vw, 160px)", letterSpacing: "-0.04em", lineHeight: 0.85, marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          POLLO FRESCO
        </span>
        <Link
          href="/productos?cat=pollo"
          className="shrink-0 rounded-full border-2 border-[#f1ead0] bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#4467a9]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          VER CATÁLOGO
        </Link>
        <span
          className="shrink-0 select-none font-display font-black italic uppercase text-[#f1ead0]"
          style={{ fontSize: "clamp(110px, 13vw, 160px)", letterSpacing: "-0.04em", lineHeight: 0.85, marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          CORTES FRESCOS
        </span>
        <Link
          href="/productos?cat=pollo"
          className="shrink-0 rounded-full border-2 border-[#f1ead0] bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#4467a9]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          VER CATÁLOGO
        </Link>
      </MarqueeBand>

      {/* ── 7. CATEGORÍAS ─────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2
            className="mb-10 text-center font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(2rem, 6vw, 6.5rem)", letterSpacing: "-0.055em", transform: "scaleX(1.18)", transformOrigin: "center" }}
          >
            TODO LO QUE NECESITÁS<span className="text-[#CC1414]">.</span>
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
                className="group relative overflow-hidden rounded-2xl border-2 border-[#4467a9]/10 bg-white p-6 transition-all duration-200 hover:-translate-y-1.5 hover:border-[#4467a9] hover:shadow-[6px_6px_0px_0px_#4467a9]"
              >
                <h3
                  className="font-display font-black uppercase text-[#4467a9]"
                  style={{ letterSpacing: "-0.02em", fontSize: "1.1rem" }}
                >
                  {cat.name}
                </h3>
                <p className="mt-1 font-sans text-xs text-[#4467a9]/40">{cat.sub}</p>
                <span className="mt-4 block font-display text-xs font-black uppercase tracking-widest text-[#4467a9]/25 transition-colors group-hover:text-[#4467a9]">
                  VER →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LOYALTY — Sumá puntos ──────────────────────────────────────────── */}
      <LoyaltySection />

      {/* ── Checkered band ── */}
      <div
        aria-hidden
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#4467a9 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />

      {/* ── 9. NEWSLETTER ─────────────────────────────────────────────────────── */}
      <NewsletterSection />

      <Footer />
    </>
  );
}
