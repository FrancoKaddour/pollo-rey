import Image from "next/image";
import Link from "next/link";

const BENEFITS = [
  {
    number: "01",
    title: "COMPRÁS",
    desc: "Cada compra suma puntos automáticamente a tu cuenta.",
  },
  {
    number: "02",
    title: "ACUMULÁS",
    desc: "Cuanto más comprás, más puntos tenés disponibles.",
  },
  {
    number: "03",
    title: "CANJEÁS",
    desc: "Usá tus puntos en envíos gratis, descuentos y productos.",
  },
];

export function LoyaltySection() {
  return (
    <section className="bg-[#f1ead0] px-6 py-20 md:px-12 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-20">

          {/* ── Izquierda: phone mockup ── */}
          <div className="flex justify-end md:justify-center md:pl-8">
            <div className="relative flex items-center justify-center">
              {/* Círculo cartoon detrás — SVG para nitidez perfecta */}
              <svg
                aria-hidden
                viewBox="0 0 500 500"
                style={{
                  position: "absolute",
                  width: "clamp(200px, 50vw, 460px)",
                  height: "clamp(200px, 50vw, 460px)",
                  zIndex: 0,
                  overflow: "visible",
                }}
              >
                {/* Relleno navy */}
                <circle cx="250" cy="250" r="235" fill="#4467a9" />
                {/* Borde cream */}
                <circle cx="250" cy="250" r="235" fill="none" stroke="#f1ead0" strokeWidth="8" />
                {/* Borde navy exterior */}
                <circle cx="250" cy="250" r="248" fill="none" stroke="#4467a9" strokeWidth="6" />
              </svg>
              <Image
                src="/app-phone.png"
                alt="App Pollo Rey — Mi Cuenta"
                width={540}
                height={830}
                className="object-contain drop-shadow-2xl relative"
                style={{ width: "clamp(220px, 55vw, 540px)", height: "auto", zIndex: 1 }}
              />
            </div>
          </div>

          {/* ── Derecha: copy ── */}
          <div>
            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#CC1414]" />
              <p
                className="font-sans font-black uppercase text-[#CC1414]"
                style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
              >
                PROGRAMA DE PUNTOS
              </p>
            </div>

            {/* Heading */}
            <h2
              className="font-display font-black uppercase text-[#4467a9] leading-[0.88]"
              style={{
                fontSize: "clamp(1.9rem, 5vw, 5.2rem)",
                letterSpacing: "-0.055em",
                transform: "scaleX(1.18)",
                transformOrigin: "left",
              }}
            >
              SUMÁ PUNTOS
              <br />
              CON CADA
              <br />
              COMPRA<span className="text-[#CC1414]">.</span>
            </h2>

            {/* Sub */}
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-[#4467a9]/50">
              Creá tu cuenta, comprá como siempre y acumulá puntos que podés
              canjear por envíos gratis, descuentos y productos de la pollería.
            </p>

            {/* Steps */}
            <div className="mt-8 flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <div key={b.number} className="flex items-start gap-5">
                  <span
                    className="shrink-0 font-display font-black text-[#4467a9]/15"
                    style={{ fontSize: "1.5rem", lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {b.number}
                  </span>
                  <div>
                    <p
                      className="font-display font-black uppercase text-[#4467a9]"
                      style={{ fontSize: "0.85rem", letterSpacing: "-0.01em" }}
                    >
                      {b.title}
                    </p>
                    <p className="text-xs leading-relaxed text-[#4467a9]/45 mt-0.5">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Próximamente badge */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#4467a9]/15 bg-white px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#CC1414] animate-pulse" />
              <span className="text-[0.65rem] font-black uppercase tracking-widest text-[#4467a9]/40">
                PRÓXIMAMENTE
              </span>
            </div>

            {/* CTA */}
            <div className="mt-4 flex flex-wrap gap-3 sm:flex-nowrap">
              <Link
                href="/#newsletter"
                className="rounded-full bg-[#4467a9] px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#CC1414]"
              >
                QUIERO SER EL PRIMERO
              </Link>
              <Link
                href="/contacto"
                className="rounded-full border-2 border-[#4467a9]/30 bg-transparent px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#4467a9] transition-colors hover:border-[#4467a9] hover:bg-[#4467a9] hover:text-[#f1ead0]"
              >
                CONTACTANOS
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
