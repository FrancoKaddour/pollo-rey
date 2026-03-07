import Link from "next/link";
import { ArrowRight } from "lucide-react";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "549XXXXXXXXXX";

const col1 = [
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const col2 = [
  { href: "/productos?cat=pollo", label: "Pollo Fresco" },
  { href: "/productos?cat=cortes", label: "Cortes" },
  { href: "/productos?cat=papas-fritas", label: "Papas Fritas" },
  { href: "/productos?cat=hamburguesas", label: "Hamburguesas" },
  { href: "/productos?cat=huevos", label: "Huevos" },
  { href: "/productos?cat=despensa", label: "Despensa" },
];

export function Footer() {
  return (
    <footer className="bg-[#08234e]">
      {/* CTA grande */}
      <div className="border-b border-[#f1ead0]/10 px-6 py-20 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2
            className="font-display font-black text-[#f1ead0] leading-none"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            ¿Hacemos
            <br />
            <span className="text-[#f1ead0]/25">el pedido?</span>
          </h2>
          <div className="flex flex-col gap-4 md:items-end">
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
                "Hola! Quiero hacer un pedido a Pollo Rey."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#f1ead0] px-8 py-4 font-semibold text-[#08234e] transition-all hover:bg-white"
            >
              Pedir por WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="text-xs text-[#f1ead0]/30">
              Cobertura: CABA y Vicente López
            </p>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="px-6 py-16 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-10 sm:grid-cols-4">
          {/* Marca */}
          <div className="col-span-2 sm:col-span-1">
            <div
              className="font-display font-black text-[#f1ead0]"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
            >
              POLLO
              <span className="text-[#f1ead0]/30"> REY</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#f1ead0]/40">
              Saavedra, Buenos Aires.
              <br />
              Lun–Sáb: 8:00 – 20:00
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1ead0]/30">
              Empresa
            </p>
            <ul className="space-y-3">
              {col1.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#f1ead0]/60 transition-colors hover:text-[#f1ead0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1ead0]/30">
              Productos
            </p>
            <ul className="space-y-3">
              {col2.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#f1ead0]/60 transition-colors hover:text-[#f1ead0]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f1ead0]/30">
              Seguinos
            </p>
            <ul className="space-y-3">
              {["Instagram", "Facebook"].map((r) => (
                <li key={r}>
                  <a
                    href="#"
                    className="text-sm text-[#f1ead0]/60 transition-colors hover:text-[#f1ead0]"
                  >
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#f1ead0]/10 px-6 py-6 md:px-16 lg:px-24">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center justify-between gap-2 text-[11px] text-[#f1ead0]/20 sm:flex-row">
          <span>© {new Date().getFullYear()} Pollo Rey. Todos los derechos reservados.</span>
          <span>Buenos Aires, Argentina</span>
        </div>
      </div>
    </footer>
  );
}
