import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, Star, Truck, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ── HERO ────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-navy">
          {/* Fondo degradado decorativo */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-brand-gold/10 blur-3xl" />
            <div className="absolute bottom-0 -left-20 h-[400px] w-[400px] rounded-full bg-brand-cream/5 blur-3xl" />
          </div>

          <div className="container-site relative z-10 py-32">
            <div className="max-w-3xl">
              {/* Badge */}
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-sm font-medium text-brand-gold">
                <Star className="h-3.5 w-3.5 fill-current" />
                Saavedra, Buenos Aires
              </span>

              {/* Título */}
              <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight text-brand-cream md:text-7xl lg:text-8xl">
                El mejor{" "}
                <span className="text-brand-gold">pollo</span>
                <br />
                de Buenos Aires.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-cream/70 md:text-xl">
                Pollo fresco, cortes especiales y más. Pedidos online con
                entrega rápida en CABA y Vicente López.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-7 py-3.5 font-semibold text-brand-navy shadow-lg transition-all hover:brightness-105 active:scale-95"
                >
                  Ver Productos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-brand-cream/30 px-7 py-3.5 font-semibold text-brand-cream transition-all hover:border-brand-cream/60 active:scale-95"
                >
                  Quiénes somos
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-16 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                {[
                  { value: "15+", label: "Años en el mercado" },
                  { value: "500+", label: "Clientes satisfechos" },
                  { value: "2h", label: "Entrega express" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-display text-3xl font-extrabold text-brand-gold">
                      {stat.value}
                    </div>
                    <div className="text-sm text-brand-cream/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flecha scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-brand-cream/30 p-1">
              <div className="h-2 w-1.5 rounded-full bg-brand-cream/50 mx-auto" />
            </div>
          </div>
        </section>

        {/* ── PROPUESTAS DE VALOR ─────────────────────── */}
        <section className="bg-brand-cream/50 py-16">
          <div className="container-site">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  icon: <ShieldCheck className="h-6 w-6" />,
                  title: "Calidad garantizada",
                  desc: "Pollo fresco de primera selección, controlado diariamente.",
                },
                {
                  icon: <Truck className="h-6 w-6" />,
                  title: "Entrega en CABA y Vicente López",
                  desc: "Llevamos tu pedido hasta la puerta de tu casa.",
                },
                {
                  icon: <Star className="h-6 w-6" />,
                  title: "Más de 15 años de trayectoria",
                  desc: "El sabor y la confianza que te mereció siempre.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-brand-navy">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA PEDIDO ──────────────────────────────── */}
        <section className="bg-brand-navy py-24">
          <div className="container-site text-center">
            <h2 className="font-display text-4xl font-extrabold text-brand-cream md:text-5xl">
              ¿Listo para pedir?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-brand-cream/60">
              Armá tu pedido online y te lo enviamos por WhatsApp en segundos.
            </p>
            <Link
              href="/productos"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-gold px-8 py-4 text-lg font-bold text-brand-navy shadow-xl transition-all hover:brightness-105 active:scale-95"
            >
              Ver Todos los Productos
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
