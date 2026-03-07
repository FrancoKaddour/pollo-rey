import Link from "next/link";
import { MapPin, Phone, Instagram, Facebook } from "lucide-react";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "549XXXXXXXXXX";

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

const categoryLinks = [
  { href: "/productos?cat=pollo", label: "Pollo Fresco" },
  { href: "/productos?cat=cortes", label: "Cortes" },
  { href: "/productos?cat=papas-fritas", label: "Papas Fritas" },
  { href: "/productos?cat=hamburguesas", label: "Hamburguesas" },
  { href: "/productos?cat=huevos", label: "Huevos" },
  { href: "/productos?cat=despensa", label: "Despensa" },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-cream/80">
      {/* CTA superior */}
      <div className="border-b border-white/10 bg-brand-dark">
        <div className="container-site py-10">
          <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-cream">
                ¿Listo para hacer tu pedido?
              </h2>
              <p className="mt-1 text-brand-cream/70">
                Enviamos a CABA y Vicente López. Respondemos rápido.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola! Quiero hacer un pedido a Pollo Rey")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#1ebe57] active:scale-95"
            >
              <WhatsAppIcon />
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container-site py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-1">
            <div className="font-display text-2xl font-extrabold tracking-tight text-brand-cream">
              <span className="text-brand-gold">POLLO</span> REY
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-cream/60">
              La mejor pollería de Saavedra. Pollo fresco y cortes de primera
              calidad, con entrega en CABA y Vicente López.
            </p>
            {/* Redes */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-cream/70 transition-colors hover:bg-white/20 hover:text-brand-cream"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-brand-cream/70 transition-colors hover:bg-white/20 hover:text-brand-cream"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-cream/40">
              Navegación
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-brand-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-cream/40">
              Productos
            </h3>
            <ul className="space-y-3">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-brand-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-cream/40">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                <span>Saavedra, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-brand-gold" />
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brand-cream"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-brand-cream/40">Horario de atención</p>
              <p className="mt-1 text-sm">Lun–Sáb: 8:00 – 20:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-brand-cream/30 sm:flex-row">
          <span>© {new Date().getFullYear()} Pollo Rey. Todos los derechos reservados.</span>
          <span>Hecho con ❤️ en Buenos Aires</span>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.533 5.854L0 24l6.335-1.51A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.37l-.36-.213-3.755.896.953-3.65-.234-.375A9.818 9.818 0 1112 21.818z" />
    </svg>
  );
}
