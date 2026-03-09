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
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

          {/* ── Izquierda: phone mockup ── */}
          <div className="flex justify-end md:justify-center md:pl-8">
            <div className="relative flex items-center justify-center">
              {/* Círculo cartoon detrás — SVG para nitidez perfecta */}
              <svg
                aria-hidden
                viewBox="0 0 500 500"
                style={{
                  position: "absolute",
                  width: "clamp(280px, 36vw, 460px)",
                  height: "clamp(280px, 36vw, 460px)",
                  zIndex: 0,
                  overflow: "visible",
                }}
              >
                {/* Relleno navy */}
                <circle cx="250" cy="250" r="235" fill="#08234e" />
                {/* Borde cream */}
                <circle cx="250" cy="250" r="235" fill="none" stroke="#f1ead0" strokeWidth="8" />
                {/* Borde navy exterior */}
                <circle cx="250" cy="250" r="248" fill="none" stroke="#08234e" strokeWidth="6" />
              </svg>
              <Image
                src="/app-phone.png"
                alt="App Pollo Rey — Mi Cuenta"
                width={540}
                height={830}
                className="object-contain drop-shadow-2xl relative"
                style={{ width: "clamp(320px, 42vw, 540px)", height: "auto", zIndex: 1 }}
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
              className="font-display font-black uppercase text-[#08234e] leading-[0.88]"
              style={{
                fontSize: "clamp(2.6rem, 5vw, 5.2rem)",
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
            <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-[#08234e]/50">
              Creá tu cuenta, comprá como siempre y acumulá puntos que podés
              canjear por envíos gratis, descuentos y productos de la pollería.
            </p>

            {/* Steps */}
            <div className="mt-8 flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <div key={b.number} className="flex items-start gap-5">
                  <span
                    className="shrink-0 font-display font-black text-[#08234e]/15"
                    style={{ fontSize: "1.5rem", lineHeight: 1, letterSpacing: "-0.04em" }}
                  >
                    {b.number}
                  </span>
                  <div>
                    <p
                      className="font-display font-black uppercase text-[#08234e]"
                      style={{ fontSize: "0.85rem", letterSpacing: "-0.01em" }}
                    >
                      {b.title}
                    </p>
                    <p className="text-xs leading-relaxed text-[#08234e]/45 mt-0.5">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/cuenta"
                className="rounded-full bg-[#08234e] px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#CC1414]"
              >
                CREAR MI CUENTA
              </Link>
              <Link
                href="/cuenta"
                className="rounded-full border-2 border-[#08234e]/30 bg-transparent px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#08234e] transition-colors hover:border-[#08234e] hover:bg-[#08234e] hover:text-[#f1ead0]"
              >
                VER MIS PUNTOS
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
