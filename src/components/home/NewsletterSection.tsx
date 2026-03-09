"use client";

import { useState } from "react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
  };

  return (
    <section
      className="relative flex flex-col overflow-hidden bg-[#f1ead0]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* Content — vertically centered */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 items-center px-6 py-12 md:px-12">
        {done ? (
          /* ── Success ── */
          <div className="flex flex-col gap-3">
            <p
              className="font-sans font-black uppercase text-[#CC1414]"
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
            >
              ¡LISTO, ESTÁS DENTRO!
            </p>
            <h2
              className="font-display font-black uppercase text-[#08234e] leading-none"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", letterSpacing: "-0.055em" }}
            >
              BIENVENIDO<br />AL BARRIO.
            </h2>
            <p className="mt-2 text-sm font-medium text-[#08234e]/40 max-w-[32ch]">
              Cada semana te avisamos antes que a nadie: promos, novedades y descuentos.
            </p>
          </div>
        ) : (
          <div className="grid w-full items-center gap-12 md:grid-cols-[1fr_400px]">

            {/* ── Left: copy ── */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#CC1414]" />
                <p className="font-sans font-black uppercase text-[#CC1414]" style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}>
                  NEWSLETTER
                </p>
              </div>

              <h2 className="font-display font-black uppercase leading-none" style={{ letterSpacing: "-0.055em", transform: "scaleX(1.18)", transformOrigin: "left" }}>
                <span className="block text-[#08234e]" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
                  ¿SABÉS LO
                </span>
                <span className="block text-[#CC1414]" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
                  QUE SE VIENE?
                </span>
              </h2>

              <p className="mt-5 max-w-[38ch] text-sm leading-relaxed text-[#08234e]/50">
                Promos exclusivas, novedades de temporada y descuentos de barrio —
                directo a tu casilla antes que a nadie.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Promos antes que nadie", "Sin spam", "Podés darte de baja"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#08234e]/15 px-3.5 py-1 font-sans text-[0.68rem] font-medium uppercase tracking-wider text-[#08234e]/40"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p
                className="font-display font-black uppercase text-[#08234e] leading-none"
                style={{ fontSize: "1.1rem", letterSpacing: "-0.03em" }}
              >
                SUSCRIBITE GRATIS
              </p>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-full border-2 border-[#08234e]/20 bg-white px-6 py-3.5 text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e]"
              />

              <button
                type="submit"
                className="w-full rounded-full bg-[#08234e] py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#CC1414]"
              >
                QUIERO SER EL PRIMERO →
              </button>

              <p className="text-center text-[0.65rem] font-medium uppercase tracking-wider text-[#08234e]/25">
                Cero spam · Solo lo que importa · Cancelás cuando querés
              </p>
            </form>

          </div>
        )}
      </div>

      {/* Bottom red accent line */}
      <div className="h-1.5 bg-[#CC1414]" />
    </section>
  );
}
