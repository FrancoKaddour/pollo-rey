import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Tag, MapPin, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MarqueeBand } from "@/components/ui/MarqueeBand";
import { SEOCarousel } from "@/components/nosotros/SEOCarousel";

export const metadata: Metadata = {
  title: "Quiénes Somos — Pollo Rey | Pollería de Barrio en Saavedra",
  description:
    "Conocé la historia de Pollo Rey, la pollería de Saavedra que nació para estar en tu mesa. Pollo fresco todos los días, precios justos y atención del barrio.",
  openGraph: {
    title: "Quiénes Somos — Pollo Rey",
    description:
      "La historia detrás de la pollería más fresca de Saavedra, Buenos Aires.",
    url: "https://pollorey.com.ar/nosotros",
    images: [{ url: "/images/brand/og-image.svg", width: 1200, height: 630 }],
  },
};

// ─── Valores de la marca ──────────────────────────────────────────────────────
const VALUES: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Leaf,
    title: "Frescura Diaria",
    desc: "Recibimos pollo fresco todos los días. Sin congelados, sin rodeos. Lo que ves es lo que llevás.",
  },
  {
    icon: Tag,
    title: "Precio Justo",
    desc: "Pensamos en tu bolsillo. Precios honestos, sin especulación. El barrio merece lo mejor al menor costo.",
  },
  {
    icon: MapPin,
    title: "Somos del Barrio",
    desc: "Nacimos en Saavedra y acá nos quedamos. Tu pollería de confianza, a pasos de tu casa.",
  },
  {
    icon: Heart,
    title: "Tu Aliado",
    desc: "No somos solo un local. Somos parte de tu rutina, tu semana, tu mesa. Contá con nosotros.",
  },
];

// ─── Fotos del local (reemplazá src por tus fotos reales) ────────────────────
const PHOTOS = [
  { src: "", label: "El local — frente" },
  { src: "", label: "El equipo trabajando" },
  { src: "", label: "Cortes frescos del día" },
  { src: "", label: "Atención al cliente" },
  { src: "", label: "Nuestra heladera" },
  { src: "", label: "El barrio" },
];

export default function NosotrosPage() {
  return (
    <>
      {/* ── 1. PAGE HEADER ────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-[#4467a9]/10 bg-[#f1ead0] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px] text-center">

          {/* Breadcrumb */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <Link
              href="/"
              className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-[#4467a9]/35 transition-colors hover:text-[#4467a9]"
            >
              Inicio
            </Link>
            <span className="text-[#4467a9]/20">→</span>
            <span className="font-sans text-[0.65rem] font-black uppercase tracking-widest text-[#4467a9]">
              Nosotros
            </span>
          </div>

          {/* Heading */}
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{
              fontSize: "clamp(2rem, 5vw, 5.5rem)",
              letterSpacing: "-0.055em",
              transform: "scaleX(1.18)",
              transformOrigin: "center",
            }}
          >
            QUIÉNES SOMOS<span className="text-[#CC1414]">.</span>
          </h1>

          {/* Tagline */}
          <p
            className="mt-5 mx-auto font-sans text-[#4467a9]/55 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", maxWidth: "52ch" }}
          >
            Una pollería que recién nace en Saavedra con ganas de ser parte de tu día a día.
          </p>
        </div>
      </div>

      {/* ── 2. HISTORIA SPLIT ─────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-20">

          {/* Texto */}
          <div>
            <p
              className="font-display font-black uppercase text-[#4467a9]/15 leading-none"
              style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)", letterSpacing: "0.18em" }}
            >
              NUESTRA HISTORIA
            </p>
            <h2
              className="mt-4 font-display font-black uppercase text-[#4467a9] leading-[0.9]"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                letterSpacing: "-0.045em",
              }}
            >
              NACIMOS PARA ESTAR EN TU{" "}
              <span className="text-[#CC1414]">MESA.</span>
            </h2>
            <div
              className="mt-7 space-y-4 font-sans text-[#4467a9]/65 leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", maxWidth: "48ch" }}
            >
              <p>
                Pollo Rey es una pollería nueva en Saavedra, pero detrás hay años de oficio y
                mucho amor por el barrio. Abrimos las puertas con una convicción clara:
                <strong className="font-semibold text-[#4467a9]"> ser accesibles, frescos y honestos.</strong>
              </p>
              <p>
                Sabemos lo que significa hacer rendir el presupuesto familiar. Por eso trabajamos
                todos los días para ofrecerte los mejores cortes al precio más justo — sin vueltas.
              </p>
              <p>
                Queremos que nos conozcas, que confíes en nosotros y que cuando pienses en pollo,
                pienses en Pollo Rey. Así de simple.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/productos"
                className="rounded-full border-2 border-[#4467a9] bg-[#4467a9] px-7 py-3 font-display text-xs font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#4467a9]"
              >
                Ver productos
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border-2 border-[#4467a9]/30 px-7 py-3 font-display text-xs font-black uppercase tracking-widest text-[#4467a9]/60 transition-all hover:border-[#4467a9] hover:text-[#4467a9]"
              >
                Contactarnos
              </Link>
            </div>
          </div>

          {/* Foto principal */}
          <div className="relative">
            <div
              className="relative overflow-hidden rounded-2xl border-2 border-[#4467a9]/10"
              style={{ aspectRatio: "4/5" }}
            >
              {/* ↓ Reemplazá con <img src="/fotos/local-frente.jpg" ... /> cuando tengas las fotos */}
              <div className="flex h-full w-full flex-col items-center justify-center bg-[#4467a9]/[0.06]">
                <span
                  className="font-display font-black italic uppercase text-[#4467a9]/15 select-none"
                  style={{ fontSize: "clamp(5rem, 10vw, 9rem)", lineHeight: 1 }}
                >
                  PR
                </span>
                <p className="mt-3 font-display text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#4467a9]/25">
                  Foto del local
                </p>
              </div>
            </div>

            {/* Sticker flotante */}
            <div className="absolute -bottom-4 -left-4 flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 border-[#4467a9] bg-[#f1ead0] text-center shadow-[4px_4px_0px_0px_#4467a9] sm:h-24 sm:w-24 md:h-28 md:w-28">
              <span
                className="font-display font-black uppercase text-[#4467a9] leading-none"
                style={{ fontSize: "0.55rem", letterSpacing: "0.1em" }}
              >
                SAAVEDRA
              </span>
              <span
                className="font-display font-black uppercase text-[#CC1414] leading-none"
                style={{ fontSize: "0.95rem", letterSpacing: "-0.02em" }}
              >
                CABA
              </span>
              <span
                className="font-display font-black uppercase text-[#4467a9]/40 leading-none"
                style={{ fontSize: "0.5rem", letterSpacing: "0.08em" }}
              >
                BUENOS AIRES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. BANNER ROJO ────────────────────────────────────────────────────── */}
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
          TU POLLERÍA
        </span>
        <Link
          href="/contacto"
          className="shrink-0 rounded-full border-2 border-white bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#CC1414]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          CONOCERNOS
        </Link>
        <span
          className="shrink-0 select-none font-display font-black italic uppercase text-white"
          style={{ fontSize: "clamp(110px, 13vw, 160px)", letterSpacing: "-0.04em", lineHeight: 0.85, marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          DE BARRIO
        </span>
        <Link
          href="/contacto"
          className="shrink-0 rounded-full border-2 border-white bg-transparent px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-[#CC1414]"
          style={{ whiteSpace: "nowrap", marginRight: "clamp(2rem, 3vw, 3.5rem)" }}
        >
          SAAVEDRA
        </Link>
      </MarqueeBand>

      {/* ── 4. VALORES ────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-12 text-center">
            <p
              className="font-display font-black uppercase text-[#4467a9]/20 leading-none"
              style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)", letterSpacing: "0.2em" }}
            >
              LO QUE NOS MUEVE
            </p>
            <h2
              className="mt-3 font-display font-black uppercase text-[#4467a9] leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                letterSpacing: "-0.045em",
                transform: "scaleX(1.1)",
                transformOrigin: "center",
              }}
            >
              NUESTROS VALORES<span className="text-[#CC1414]">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
              <div
                key={i}
                className={`flex flex-col rounded-2xl border-2 p-7 ${
                  i === 0
                    ? "border-[#4467a9] bg-[#4467a9]"
                    : "border-[#4467a9]/12 bg-white"
                }`}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-full ${
                  i === 0 ? "bg-[#f1ead0]/15" : "bg-[#4467a9]/[0.07]"
                }`}>
                  <Icon
                    className={`h-5 w-5 ${i === 0 ? "text-[#f1ead0]" : "text-[#4467a9]"}`}
                    strokeWidth={1.8}
                  />
                </div>
                <h3
                  className={`mt-5 font-display font-black uppercase leading-tight ${
                    i === 0 ? "text-[#f1ead0]" : "text-[#4467a9]"
                  }`}
                  style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
                >
                  {v.title}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed ${
                    i === 0 ? "text-[#f1ead0]/65" : "text-[#4467a9]/55"
                  }`}
                >
                  {v.desc}
                </p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* ── 5a. SEPARATOR ─────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#4467a9 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />

      {/* ── 5. GALERÍA DE FOTOS ───────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#4467a9] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-12">
            <p
              className="font-display font-black uppercase text-[#f1ead0]/25 leading-none"
              style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)", letterSpacing: "0.2em" }}
            >
              EL LOCAL
            </p>
            <h2
              className="mt-3 font-display font-black uppercase text-[#f1ead0] leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                letterSpacing: "-0.045em",
              }}
            >
              ASÍ SOMOS<span className="text-[#CC1414]">.</span>
            </h2>
          </div>

          {/* Grid de fotos: 2 grandes + 4 pequeñas */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-6">
            {PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl border border-[#f1ead0]/10 bg-[#f1ead0]/[0.05] ${
                  i < 2 ? "col-span-1 md:col-span-1 lg:col-span-2" : "col-span-1 lg:col-span-2"
                }`}
                style={{ aspectRatio: i < 2 ? "4/5" : "1/1" }}
              >
                {photo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.src}
                    alt={photo.label}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
                    <span
                      className="font-display font-black italic uppercase text-[#f1ead0]/10 select-none"
                      style={{ fontSize: i < 2 ? "3.5rem" : "2.5rem", lineHeight: 1 }}
                    >
                      PR
                    </span>
                    <p className="font-display text-[0.5rem] font-black uppercase tracking-[0.15em] text-[#f1ead0]/20">
                      {photo.label}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. MANIFIESTO / CARTA ─────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[860px] text-center">

          <p
            className="font-display font-black uppercase text-[#4467a9]/20 leading-none"
            style={{ fontSize: "clamp(0.65rem, 1vw, 0.75rem)", letterSpacing: "0.2em" }}
          >
            NUESTRA PROMESA
          </p>

          <blockquote
            className="mt-8 font-display font-black uppercase text-[#4467a9] leading-[0.92]"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            &ldquo;UN POLLO FRESCO CADA DÍA, A UN PRECIO QUE TU BOLSILLO{" "}
            <span className="text-[#CC1414]">AGRADECE.</span>&rdquo;
          </blockquote>

          <div
            className="mx-auto mt-8 space-y-4 text-center font-sans text-[#4467a9]/60 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)", maxWidth: "72ch" }}
          >
            <p>
              Sabemos que elegir dónde comprar importa. Y sabemos que cuando la economía aprieta,
              cada peso cuenta. Por eso en Pollo Rey no especulamos ni inflamos los márgenes.
            </p>
            <p>
              Nuestra misión es simple: que puedas acceder a productos de calidad, frescos y bien
              cortados, sin tener que resignarte a nada. Que la pollería de tu barrio sea un lugar de
              confianza, no una incógnita.
            </p>
            <p>
              Somos nuevos, pero llegamos para quedarnos. Y queremos construir esa confianza
              contigo, día a día, pedido a pedido.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/productos"
              className="rounded-full border-2 border-[#4467a9] bg-[#4467a9] px-8 py-3.5 font-display text-xs font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#4467a9]"
            >
              Explorar catálogo
            </Link>
            <Link
              href="/contacto"
              className="rounded-full border-2 border-[#4467a9] px-8 py-3.5 font-display text-xs font-black uppercase tracking-widest text-[#4467a9] transition-all hover:bg-[#4467a9] hover:text-[#f1ead0]"
            >
              Hablar con nosotros
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. SEO CAROUSEL ───────────────────────────────────────────────────── */}
      <SEOCarousel />

      {/* ── 8. SEPARATOR + CIERRE ─────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#4467a9 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />
    </>
  );
}
