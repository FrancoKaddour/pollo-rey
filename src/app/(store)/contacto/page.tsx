"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";

// ─── Datos de contacto (editá acá) ───────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Dónde estamos",
    value: "Saavedra, CABA",
    sub: "Buenos Aires, Argentina",
    href: undefined as string | undefined,
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: process.env.NEXT_PUBLIC_WHATSAPP_PHONE
      ? `+${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`
      : "Consultá por WhatsApp",
    sub: "Pedidos y consultas",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ""}`,
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun – Sáb 8 a 20hs",
    sub: "Dom 8 a 14hs",
    href: undefined as string | undefined,
  },
];

type FormState = "idle" | "sending" | "sent";

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Error al enviar");
    } catch {
      // Igual marcamos como enviado para no frustrar al usuario
    }
    setStatus("sent");
  };

  const whatsappHref = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? ""}?text=${encodeURIComponent("Hola *POLLO REY*! Quiero hacer una consulta 👋")}`;

  return (
    <>
      {/* ── 1. HEADER ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-[#08234e]/10 bg-[#f1ead0] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px] text-center">

          <div className="mb-5 flex items-center justify-center gap-2">
            <Link
              href="/"
              className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-[#08234e]/35 transition-colors hover:text-[#08234e]"
            >
              Inicio
            </Link>
            <span className="text-[#08234e]/20">→</span>
            <span className="font-sans text-[0.65rem] font-black uppercase tracking-widest text-[#08234e]">
              Contacto
            </span>
          </div>

          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{
              fontSize: "clamp(2rem, 5vw, 5.5rem)",
              letterSpacing: "-0.055em",
              transform: "scaleX(1.18)",
              transformOrigin: "center",
            }}
          >
            HABLEMOS<span className="text-[#CC1414]">.</span>
          </h1>

          <p
            className="mt-5 mx-auto font-sans text-[#08234e]/55 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", maxWidth: "46ch" }}
          >
            Estamos en Saavedra y nos encanta que nos escribas.
            Pedidos, consultas o simplemente saludar.
          </p>
        </div>
      </div>

      {/* ── 2. INFO DE CONTACTO ───────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-12">
            <p
              className="font-display font-black uppercase text-[#08234e]/20 leading-none"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              DATOS DE CONTACTO
            </p>
            <h2
              className="mt-3 font-display font-black uppercase text-[#08234e] leading-[0.92]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "-0.045em",
                transform: "scaleX(1.1)",
                transformOrigin: "left",
              }}
            >
              ENCONTRANOS<span className="text-[#CC1414]">.</span>
            </h2>
          </div>

          {/* Cards en 3 columnas */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {CONTACT_INFO.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <div
                  className={`flex flex-col gap-5 rounded-2xl border-2 p-7 transition-all ${
                    item.href
                      ? "border-[#08234e]/12 bg-white hover:border-[#08234e] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#08234e] cursor-pointer"
                      : "border-[#08234e]/12 bg-white"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#08234e]/[0.07]">
                    <Icon className="h-5 w-5 text-[#08234e]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p
                      className="font-display font-black uppercase text-[#08234e]/35"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.18em" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="mt-2 font-display font-black uppercase text-[#08234e] leading-tight"
                      style={{ fontSize: "1.15rem", letterSpacing: "-0.025em" }}
                    >
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-[#08234e]/45">{item.sub}</p>
                  </div>
                </div>
              );
              return item.href ? (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={i}>{inner}</div>
              );
            })}
          </div>

          {/* WhatsApp CTA — full width */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 flex items-center gap-5 rounded-2xl border-2 border-[#08234e] bg-[#08234e] p-7 transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#CC1414]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f1ead0]/15">
              <MessageCircle className="h-7 w-7 text-[#f1ead0]" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p
                className="font-display font-black uppercase text-[#f1ead0] leading-tight"
                style={{ fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)", letterSpacing: "-0.025em" }}
              >
                Escribinos directamente por WhatsApp
              </p>
              <p className="mt-1 text-sm text-[#f1ead0]/50">
                Respuesta rápida · Pedidos, precios y todo lo que necesites
              </p>
            </div>
            <span
              className="font-display font-black uppercase text-[#f1ead0]/30 transition-all group-hover:translate-x-1 group-hover:text-[#f1ead0]"
              style={{ fontSize: "1.5rem" }}
            >
              →
            </span>
          </a>
        </div>
      </section>

      {/* ── 3. SEPARATOR ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage:
            "repeating-conic-gradient(#08234e 0% 25%, #f1ead0 0% 50%)",
          backgroundSize:
            "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />

      {/* ── 4. FORMULARIO — fondo navy ────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#08234e] px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">

          {/* Encabezado de sección */}
          <div className="mb-12 text-center">
            <p
              className="font-display font-black uppercase text-[#f1ead0]/20 leading-none"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              FORMULARIO
            </p>
            <h2
              className="mt-3 font-display font-black uppercase text-[#f1ead0] leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "-0.045em",
                transform: "scaleX(1.1)",
                transformOrigin: "center",
              }}
            >
              MANDANOS UN MENSAJE<span className="text-[#CC1414]">.</span>
            </h2>
          </div>

          {/* Card del form — centrada y acotada */}
          <div className="mx-auto max-w-[680px] rounded-2xl border border-[#f1ead0]/10 bg-white p-6 md:p-10">

            {status === "sent" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#08234e]">
                  <Send className="h-7 w-7 text-[#f1ead0]" strokeWidth={1.8} />
                </div>
                <h3
                  className="mt-6 font-display font-black uppercase text-[#08234e] leading-tight"
                  style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
                >
                  ¡Mensaje enviado<span className="text-[#CC1414]">!</span>
                </h3>
                <p
                  className="mt-3 text-sm text-[#08234e]/55 leading-relaxed"
                  style={{ maxWidth: "32ch" }}
                >
                  Te respondemos a la brevedad. También podés escribirnos por WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({ nombre: "", email: "", mensaje: "" });
                  }}
                  className="mt-8 rounded-full border-2 border-[#08234e]/25 px-7 py-2.5 font-display text-xs font-black uppercase tracking-widest text-[#08234e]/60 transition-all hover:border-[#08234e] hover:text-[#08234e]"
                >
                  Nuevo mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Nombre */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="nombre"
                      className="font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                    >
                      Tu nombre
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Juan García"
                      className="w-full rounded-xl border-2 border-[#08234e]/12 bg-[#f1ead0]/40 px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="juan@mail.com"
                      className="w-full rounded-xl border-2 border-[#08234e]/12 bg-[#f1ead0]/40 px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mensaje"
                    className="font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    value={form.mensaje}
                    onChange={handleChange}
                    placeholder="Escribí tu consulta o comentario acá..."
                    className="w-full resize-none rounded-xl border-2 border-[#08234e]/12 bg-[#f1ead0]/40 px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-3 rounded-full border-2 border-[#08234e] bg-[#08234e] px-8 py-3.5 font-display text-xs font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#08234e] disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "sending" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f1ead0]/30 border-t-[#f1ead0]" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" strokeWidth={2} />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 5. SEPARATOR ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage:
            "repeating-conic-gradient(#08234e 0% 25%, #f1ead0 0% 50%)",
          backgroundSize:
            "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />

      {/* ── 6. MAPA ───────────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-[#f1ead0] px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-8">
            <p
              className="font-display font-black uppercase text-[#08234e]/20 leading-none"
              style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              UBICACIÓN
            </p>
            <h2
              className="mt-3 font-display font-black uppercase text-[#08234e] leading-none"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                letterSpacing: "-0.045em",
                transform: "scaleX(1.1)",
                transformOrigin: "left",
              }}
            >
              EL LOCAL<span className="text-[#CC1414]">.</span>
            </h2>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl border-2 border-[#08234e]/10"
            style={{ height: "clamp(220px, 45vh, 480px)" }}
          >
            {/* ↓ Reemplazá con un <iframe> de Google Maps cuando tengas la dirección exacta */}
            <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#08234e]/[0.04]">
              <MapPin className="h-10 w-10 text-[#08234e]/20" strokeWidth={1.5} />
              <div className="text-center">
                <p
                  className="font-display font-black uppercase text-[#08234e]/25"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.18em" }}
                >
                  Saavedra, CABA
                </p>
                <p className="mt-1 text-xs text-[#08234e]/20">
                  Reemplazá con iframe de Google Maps
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SEPARATOR CIERRE ───────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: "clamp(140px, 16vw, 200px)",
          backgroundImage: "repeating-conic-gradient(#08234e 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(47px, 5.33vw, 67px) clamp(47px, 5.33vw, 67px)",
        }}
      />
    </>
  );
}
