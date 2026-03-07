import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Pollo Fresco",
    desc: "Entero, trozado o sin menudos.",
    href: "/productos?cat=pollo",
    num: "01",
  },
  {
    name: "Cortes Especiales",
    desc: "Pechuga, muslo, alas y más.",
    href: "/productos?cat=cortes",
    num: "02",
  },
  {
    name: "Papas & Hamburguesas",
    desc: "Congelados de primera línea.",
    href: "/productos?cat=papas-fritas",
    num: "03",
  },
  {
    name: "Despensa",
    desc: "Aceite, rebozador, carbón, sal.",
    href: "/productos?cat=despensa",
    num: "04",
  },
];

const marqueePhrases = [
  "Pollo Fresco",
  "·",
  "Saavedra",
  "·",
  "Buenos Aires",
  "·",
  "Calidad Garantizada",
  "·",
  "Entrega en CABA",
  "·",
  "Cortes Especiales",
  "·",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-[#f1ead0] pt-20">
        <div className="flex min-h-[calc(100vh-80px)] flex-col lg:flex-row">

          {/* Columna izquierda — texto */}
          <div className="flex flex-1 flex-col justify-between px-6 py-16 md:px-14 lg:py-20 xl:px-20">
            {/* Tag superior */}
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/40">
              <span className="h-px w-8 bg-[#08234e]/30" />
              Pollería · Saavedra · Buenos Aires
            </p>

            {/* Headline central */}
            <div className="my-auto py-12">
              <h1
                className="font-display font-black text-[#08234e] leading-[0.92]"
                style={{
                  fontSize: "clamp(3.8rem, 8.5vw, 8.5rem)",
                  letterSpacing: "-0.04em",
                }}
              >
                La mejor
                <br />
                <span className="text-[#08234e]/20">pollería</span>
                <br />
                de Buenos
                <br />
                Aires.
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-[#08234e]/55 md:text-lg">
                Pollo fresco de primera calidad, cortes especiales y más.
                Pedidos online con entrega en CABA y Vicente López.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/productos"
                  className="group flex items-center gap-3 rounded-full bg-[#08234e] px-7 py-3.5 text-sm font-semibold text-[#f1ead0] transition-all hover:opacity-85"
                >
                  Ver Productos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/nosotros"
                  className="text-sm font-medium text-[#08234e]/40 underline underline-offset-4 transition-colors hover:text-[#08234e]"
                >
                  Quiénes somos
                </Link>
              </div>
            </div>

            {/* Stats inferiores */}
            <div className="flex flex-wrap gap-10 border-t border-[#08234e]/10 pt-8">
              {[
                { val: "15+", label: "Años de trayectoria" },
                { val: "500+", label: "Clientes satisfechos" },
                { val: "CABA", label: "y Vicente López" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display font-black text-[#08234e]"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.03em" }}
                  >
                    {s.val}
                  </div>
                  <div className="mt-0.5 text-xs uppercase tracking-[0.15em] text-[#08234e]/40">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha — bloque navy con tipografía decorativa */}
          <div className="relative flex w-full items-end justify-start overflow-hidden bg-[#08234e] lg:w-[42%]">
            {/* Tipografía decorativa de fondo */}
            <span
              className="pointer-events-none absolute -bottom-10 -left-4 select-none font-display font-black leading-none text-[#f1ead0]/[0.05]"
              style={{ fontSize: "clamp(10rem, 22vw, 22rem)", letterSpacing: "-0.05em" }}
              aria-hidden
            >
              PR
            </span>

            {/* Contenido derecho */}
            <div className="relative z-10 p-10 pb-14 md:p-14 lg:p-16">
              {/* Badge "Pedí ahora" */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f1ead0]/20 px-4 py-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f1ead0]/70">
                  Abierto · Recibimos pedidos
                </span>
              </div>

              <p
                className="font-display font-bold text-[#f1ead0] leading-tight"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em" }}
              >
                Pedí online,
                <br />
                recibís hoy.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#f1ead0]/50">
                Hacé tu pedido en minutos y se lo enviamos directo
                al WhatsApp del negocio.
              </p>

              <Link
                href="/productos"
                className="mt-8 flex w-fit items-center gap-3 rounded-full bg-[#f1ead0] px-6 py-3 text-sm font-semibold text-[#08234e] transition-all hover:bg-white"
              >
                Hacer un pedido
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Divisor + zona */}
              <div className="mt-10 border-t border-[#f1ead0]/10 pt-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f1ead0]/30">
                  Cobertura
                </p>
                <p className="mt-2 text-sm font-medium text-[#f1ead0]/60">
                  CABA — Vicente López
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-[#08234e] py-5">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {[...marqueePhrases, ...marqueePhrases, ...marqueePhrases, ...marqueePhrases].map(
            (phrase, i) => (
              <span
                key={i}
                className={
                  phrase === "·"
                    ? "mx-6 font-display text-2xl font-black text-[#f1ead0]/30"
                    : "mx-6 font-display text-2xl font-black uppercase tracking-wide text-[#f1ead0]"
                }
              >
                {phrase}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── INTRO EDITORIAL ──────────────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-14 xl:px-20">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.8fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/40">
              Nuestro compromiso
            </p>
            <div
              className="mt-4 font-display font-black leading-none text-[#08234e]/8"
              style={{ fontSize: "clamp(5rem, 12vw, 10rem)", letterSpacing: "-0.05em" }}
              aria-hidden
            >
              15
              <br />
              años
            </div>
          </div>
          <div>
            <h2
              className="font-display font-bold text-[#08234e] leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Más de 15 años llevando pollo
              fresco y de calidad a las mesas
              de Buenos Aires.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#08234e]/55">
              En Pollo Rey seleccionamos cada producto para garantizarte frescura,
              sabor y el precio justo. Con cobertura en CABA y Vicente López,
              tu pedido llega sin complicaciones.
            </p>
            <Link
              href="/nosotros"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#08234e] underline underline-offset-4 transition-opacity hover:opacity-50"
            >
              Conocer más <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ───────────────────────────────────────────────────────── */}
      <section className="bg-[#08234e] px-6 py-24 md:px-14 xl:px-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display font-bold text-[#f1ead0] leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
            >
              Nuestros productos
            </h2>
            <Link
              href="/productos"
              className="flex items-center gap-2 rounded-full border border-[#f1ead0]/20 px-6 py-2.5 text-sm text-[#f1ead0]/60 transition-all hover:border-[#f1ead0] hover:text-[#f1ead0]"
            >
              Ver todos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Grid 2x2 */}
          <div className="grid grid-cols-1 border border-[#f1ead0]/10 sm:grid-cols-2">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative flex flex-col justify-between overflow-hidden border-[#f1ead0]/10 p-10 transition-colors duration-300 hover:bg-[#f1ead0]/[0.04]"
                style={{
                  borderRight: i % 2 === 0 ? "1px solid rgba(241,234,208,0.10)" : undefined,
                  borderBottom: i < 2 ? "1px solid rgba(241,234,208,0.10)" : undefined,
                }}
              >
                {/* Número de fondo */}
                <span
                  className="select-none font-display font-black leading-none text-[#f1ead0]/[0.05] transition-all duration-500 group-hover:text-[#f1ead0]/[0.09]"
                  style={{ fontSize: "6rem", letterSpacing: "-0.05em" }}
                  aria-hidden
                >
                  {cat.num}
                </span>

                <div className="mt-8">
                  <h3
                    className="font-display font-bold text-[#f1ead0] leading-tight"
                    style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                  >
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#f1ead0]/45">{cat.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#f1ead0]/30 transition-colors group-hover:text-[#f1ead0]/70">
                    Explorar
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT CALIDAD / ENTREGA ───────────────────────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Blanco — calidad */}
        <div className="flex flex-col justify-center bg-white px-10 py-20 md:px-14 xl:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/35">
            Por qué elegirnos
          </p>
          <h2
            className="mt-6 font-display font-bold text-[#08234e] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.025em" }}
          >
            Calidad que
            <br />se ve y se siente.
          </h2>
          <ul className="mt-10 space-y-4">
            {[
              "Pollo de primera selección",
              "Control de calidad diario",
              "Precios justos y transparentes",
              "Atención personalizada",
            ].map((item) => (
              <li key={item} className="flex items-center gap-4">
                <span className="h-px w-6 shrink-0 bg-[#08234e]/25" />
                <span className="text-sm text-[#08234e]/65">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navy — entrega */}
        <div className="flex flex-col justify-center bg-[#08234e] px-10 py-20 md:px-14 xl:px-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#f1ead0]/35">
            Zona de cobertura
          </p>
          <h2
            className="mt-6 font-display font-bold text-[#f1ead0] leading-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.025em" }}
          >
            Entrega en CABA
            <br />y Vicente López.
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-[#f1ead0]/50">
            Hacé tu pedido online y lo recibís en el día.
            Rápido, simple y sin salir de tu casa.
          </p>
          <Link
            href="/productos"
            className="mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-[#f1ead0] px-7 py-3.5 text-sm font-semibold text-[#08234e] transition-all hover:bg-white"
          >
            Hacer un pedido <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────────── */}
      <section className="bg-[#f1ead0] px-6 py-24 md:px-14 xl:px-20">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#08234e]/35">
              Mantenete informado
            </p>
            <h2
              className="mt-4 font-display font-bold text-[#08234e] leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
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
              className="flex-1 rounded-full border border-[#08234e]/15 bg-white px-6 py-4 text-sm text-[#08234e] placeholder:text-[#08234e]/30 focus:border-[#08234e]/50 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-[#08234e] px-8 py-4 text-sm font-semibold text-[#f1ead0] transition-all hover:opacity-80"
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
