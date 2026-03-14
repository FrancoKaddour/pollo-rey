"use client";

import { useState } from "react";
import { ChevronRight, Star } from "lucide-react";

export function ExperienceForm() {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f1ead0] px-6 py-20 md:px-12 flex justify-center">
      {/* Polaroid wrapper — slight tilt, white frame */}
      <div
        style={{
          background: "#fff",
          padding: "10px 10px 40px 10px",
          boxShadow: "8px 12px 40px rgba(8,35,78,0.18)",
          transform: "rotate(0deg)",
          maxWidth: 600,
          width: "100%",
        }}
      >
        {/* Card interior — navy */}
        <div className="bg-[#4467a9] p-8 md:p-10">
          {submitted ? (
            /* ── Success state ── */
            <div className="flex flex-col items-center gap-6 py-10 text-center">
              <div
                className="flex items-center justify-center rounded-full bg-[#CC1414]"
                style={{ width: 72, height: 72 }}
              >
                <Star className="h-8 w-8 fill-[#f1ead0] text-[#f1ead0]" />
              </div>
              <h3
                className="font-display font-black uppercase text-[#f1ead0] leading-none"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", letterSpacing: "-0.04em" }}
              >
                ¡GRACIAS POR TU OPINIÓN!
              </h3>
              <p className="text-sm font-medium text-[#f1ead0]/60 max-w-[28ch]">
                Tu feedback nos ayuda a seguir mejorando cada día.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Title */}
              <h3
                className="font-display font-black italic uppercase text-[#f1ead0] leading-none text-center"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", letterSpacing: "-0.04em" }}
              >
                CALIFICÁ TU EXPERIENCIA
              </h3>

              {/* Row 1: Date + Stars */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Date */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-sans text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1ead0]/50"
                  >
                    Fecha de visita
                  </label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={today}
                    className="rounded-full border border-[#f1ead0]/20 bg-[#f1ead0]/10 px-4 py-2.5 text-sm text-[#f1ead0] outline-none focus:border-[#f1ead0]/50"
                    style={{ colorScheme: "dark" }}
                  />
                </div>

                {/* Stars */}
                <div className="flex flex-col gap-2">
                  <label
                    className="font-sans text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1ead0]/50"
                  >
                    Puntaje
                  </label>
                  <div
                    className="flex items-center gap-1.5 py-1"
                    onMouseLeave={() => setHovered(0)}
                  >
                    {[1, 2, 3, 4, 5].map((n) => {
                      const filled = n <= (hovered || stars);
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setStars(n)}
                          onMouseEnter={() => setHovered(n)}
                          aria-label={`${n} estrellas`}
                        >
                          <Star
                            className="h-7 w-7 transition-colors"
                            style={{
                              fill: filled ? "#CC1414" : "transparent",
                              color: filled ? "#CC1414" : "#f1ead0",
                              opacity: filled ? 1 : 0.35,
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Row 2: Name + Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="exp-name"
                    className="font-sans text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1ead0]/50"
                  >
                    Nombre
                  </label>
                  <input
                    id="exp-name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    className="rounded-full border border-[#f1ead0]/20 bg-[#f1ead0]/10 px-4 py-2.5 text-sm text-[#f1ead0] placeholder-[#f1ead0]/30 outline-none focus:border-[#f1ead0]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="exp-email"
                    className="font-sans text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1ead0]/50"
                  >
                    Email
                  </label>
                  <input
                    id="exp-email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    required
                    className="rounded-full border border-[#f1ead0]/20 bg-[#f1ead0]/10 px-4 py-2.5 text-sm text-[#f1ead0] placeholder-[#f1ead0]/30 outline-none focus:border-[#f1ead0]/50"
                  />
                </div>
              </div>

              {/* Feedback */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="exp-msg"
                  className="font-sans text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#f1ead0]/50"
                >
                  Tu opinión
                </label>
                <textarea
                  id="exp-msg"
                  name="message"
                  placeholder="Contanos tu experiencia..."
                  rows={4}
                  required
                  className="rounded-2xl border border-[#f1ead0]/20 bg-[#f1ead0]/10 px-4 py-3 text-sm text-[#f1ead0] placeholder-[#f1ead0]/30 outline-none focus:border-[#f1ead0]/50 resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-full bg-[#f1ead0] px-8 py-3 font-display text-sm font-black uppercase tracking-widest text-[#4467a9] transition-opacity hover:opacity-85"
                >
                  ENVIAR
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
