import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, ChevronDown } from "lucide-react";

// Categorías destacadas para la grilla visual
const categories = [
  {
    name: "Pollo Fresco",
    desc: "Entero, trozado o sin menudos. La mejor calidad del mercado.",
    href: "/productos?cat=pollo",
    label: "01",
  },
  {
    name: "Cortes Especiales",
    desc: "Pechuga, muslo, alas y más. Listos para cocinar.",
    href: "/productos?cat=cortes",
    label: "02",
  },
  {
    name: "Papas & Hamburguesas",
    desc: "Congelados de primera línea para tu mesa.",
    href: "/productos?cat=papas-fritas",
    label: "03",
  },
  {
    name: "Despensa",
    desc: "Aceite, rebozador, carbón, sal y condimentos.",
    href: "/productos?cat=despensa",
    label: "04",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── 1. HERO full-viewport ─────────────────────────────────────────── */}
      <section className="relative flex h-screen min-h-[640px] flex-col items-start justify-end overflow-hidden bg-[#08234e]">
        {/* Ruido / textura sutil */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Círculo decorativo */}
        <div className="pointer-events-none absolute -right-32 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full border border-[#f1ead0]/[0.06]" />
        <div className="pointer-events-none absolute -right-16 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full border border-[#f1ead0]/[0.06]" />

        {/* Contenido */}
        <div className="relative z-10 w-full px-6 pb-20 md:px-16 lg:px-24">
          {/* Tag */}
          <p className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f1ead0]/40">
            <span className="h-px w-8 bg-[#f1ead0]/40" />
            Saavedra · Buenos Aires
          </p>

          {/* Headline principal */}
          <h1
            className="max-w-5xl font-display font-black text-[#f1ead0] leading-none"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            El sabor que
            <br />
            <span className="text-[#f1ead0]/30">conocés</span> y
            <br />
            confiás.
          </h1>

          {/* CTA row */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <Link
              href="/productos"
              className="group flex items-center gap-3 rounded-full bg-[#f1ead0] px-8 py-4 font-semibold text-[#08234e] transition-all duration-300 hover:bg-white"
            >
              Ver Productos
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/nosotros"
              className="text-sm font-medium uppercase tracking-[0.12em] text-[#f1ead0]/50 transition-colors hover:text-[#f1ead0]"
            >
              Quiénes somos
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex items-center gap-3 text-[#f1ead0]/30">
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* ── 2. INTRO — texto editorial ───────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/40">
              Nuestro compromiso
            </p>
          </div>
          <div>
            <h2
              className="font-display font-bold text-[#08234e] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
            >
              Más de 15 años llevando pollo fresco y de calidad a las mesas de
              Buenos Aires.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#08234e]/60">
              En Pollo Rey seleccionamos cuidadosamente cada producto para
              garantizarte frescura, sabor y el precio justo. Con cobertura en
              CABA y Vicente López, tu pedido llega sin complicaciones.
            </p>
            <Link
              href="/nosotros"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#08234e] underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              Conocer más
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. GRILLA DE CATEGORÍAS ──────────────────────────────────────── */}
      <section className="bg-[#08234e] px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display font-bold text-[#f1ead0] leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
            >
              Nuestros
              <br />
              <span className="text-[#f1ead0]/30">productos</span>
            </h2>
            <Link
              href="/productos"
              className="flex items-center gap-2 rounded-full border border-[#f1ead0]/20 px-6 py-2.5 text-sm text-[#f1ead0]/70 transition-all hover:border-[#f1ead0]/60 hover:text-[#f1ead0]"
            >
              Ver todos
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grid de categorías */}
          <div className="grid grid-cols-1 gap-px bg-[#f1ead0]/10 border border-[#f1ead0]/10 sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex flex-col justify-between bg-[#08234e] p-10 transition-colors duration-300 hover:bg-[#f1ead0]/5"
              >
                {/* Número */}
                <span className="font-display text-[80px] font-black leading-none text-[#f1ead0]/[0.06] transition-all duration-500 group-hover:text-[#f1ead0]/10">
                  {cat.label}
                </span>

                {/* Info */}
                <div className="mt-6">
                  <h3 className="font-display text-2xl font-bold text-[#f1ead0]">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#f1ead0]/50">
                    {cat.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#f1ead0]/40 transition-colors group-hover:text-[#f1ead0]/70">
                    Explorar
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SPLIT — Calidad / entrega ─────────────────────────────────── */}
      <section className="bg-[#f1ead0]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* Izquierda — fondo blanco */}
          <div className="flex flex-col justify-center px-10 py-20 md:px-16 lg:px-24 bg-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/40">
              Por qué elegirnos
            </p>
            <h2
              className="mt-6 font-display font-bold text-[#08234e] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              Calidad que
              <br />se ve y se siente.
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                "Pollo de primera selección",
                "Control de calidad diario",
                "Precios justos y transparentes",
                "Atención personalizada",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-[#08234e]/40" />
                  <span className="text-sm text-[#08234e]/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Derecha — fondo navy */}
          <div className="flex flex-col justify-center bg-[#08234e] px-10 py-20 md:px-16 lg:px-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f1ead0]/40">
              Zona de cobertura
            </p>
            <h2
              className="mt-6 font-display font-bold text-[#f1ead0] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "-0.02em" }}
            >
              Entrega en
              <br />todo CABA y
              <br />Vicente López.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-[#f1ead0]/50">
              Hacé tu pedido online y lo recibís en el día. Rápido, simple y
              sin salir de tu casa.
            </p>
            <Link
              href="/productos"
              className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#f1ead0] px-7 py-3.5 text-sm font-semibold text-[#08234e] transition-all hover:bg-white"
            >
              Hacer un pedido
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. MARQUEE — texto en movimiento ─────────────────────────────── */}
      <section className="overflow-hidden border-y border-[#08234e]/10 bg-[#f1ead0] py-5">
        <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="mx-8 font-display text-4xl font-black uppercase tracking-tight text-[#08234e]/10"
            >
              Pollo Rey · Saavedra · Buenos Aires · Pollo Fresco ·
            </span>
          ))}
        </div>
      </section>

      {/* ── 6. NEWSLETTER ───────────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/40">
              Mantenete informado
            </p>
            <h2
              className="mt-4 font-display font-bold text-[#08234e] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
            >
              Ofertas y novedades
              <br />en tu correo.
            </h2>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="tu@email.com"
              required
              className="flex-1 rounded-full border border-[#08234e]/20 bg-white px-6 py-3.5 text-sm text-[#08234e] placeholder:text-[#08234e]/30 focus:border-[#08234e] focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#08234e] px-7 py-3.5 text-sm font-semibold text-[#f1ead0] transition-all hover:opacity-80 active:scale-95"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}
