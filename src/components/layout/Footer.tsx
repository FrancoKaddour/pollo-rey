import Link from "next/link";
import Image from "next/image";

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "549XXXXXXXXXX";
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "#";
const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "#";

export function Footer() {
  return (
    <footer className="bg-[#08234e]">

      {/* ── Main footer row (PP-style: logo izq | nav centro | acciones der) ── */}
      <div className="mx-auto max-w-[1400px] px-6 py-10 md:px-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:items-start md:gap-12">

          {/* LEFT — Logo + datos centrados */}
          <div className="flex flex-col items-center text-center md:items-center">
            <Link href="/" className="group inline-block transition-opacity hover:opacity-70">
              <Image
                src="/Logo-crop.png"
                alt="Pollo Rey"
                width={300}
                height={185}
                className="h-20 w-auto object-contain brightness-0 invert md:h-28 lg:h-36"
              />
            </Link>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#f1ead0]/40">
              Saavedra, Buenos Aires.
            </p>
            <p className="font-sans text-sm leading-relaxed text-[#f1ead0]/40">
              Lun–Sáb: 8:00 – 20:00
            </p>
          </div>

          {/* CENTER — Nav columns con headers */}
          <div className="grid grid-cols-2 gap-6 md:gap-10 md:justify-self-center">
            <div>
              <p className="mb-4 font-sans text-[0.6rem] font-black uppercase tracking-[0.25em] text-[#f1ead0]/25">
                Páginas
              </p>
              <ul className="space-y-3">
                {[
                  { href: "/nosotros", label: "NOSOTROS" },
                  { href: "/productos", label: "MENÚ" },
                  { href: "/blog", label: "BLOG" },
                  { href: "/contacto", label: "CONTACTO" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-display text-sm font-black uppercase tracking-widest text-[#f1ead0]/60 transition-colors hover:text-[#f1ead0]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 font-sans text-[0.6rem] font-black uppercase tracking-[0.25em] text-[#f1ead0]/25">
                Servicios
              </p>
              <ul className="space-y-3">
                {[
                  { href: "/productos", label: "DELIVERY" },
                  { href: "/contacto", label: "UBICACIÓN" },
                  { href: "/productos", label: "PROMOS" },
                  { href: "/contacto", label: "CONSULTAS" },
                ].map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-display text-sm font-black uppercase tracking-widest text-[#f1ead0]/60 transition-colors hover:text-[#f1ead0]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT — Social circles + CTA pill */}
          <div className="flex flex-col items-center gap-5 md:items-end">
            {/* Social icon circles */}
            <div className="flex gap-3">
              <a
                href={instagramUrl}
                target={instagramUrl !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#f1ead0]/30 text-[#f1ead0]/70 transition-colors hover:border-[#f1ead0] hover:text-[#f1ead0]"
              >
                {/* Instagram icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={facebookUrl}
                target={facebookUrl !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#f1ead0]/30 text-[#f1ead0]/70 transition-colors hover:border-[#f1ead0] hover:text-[#f1ead0]"
              >
                {/* Facebook icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${whatsappPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#f1ead0]/30 text-[#f1ead0]/70 transition-colors hover:border-[#f1ead0] hover:text-[#f1ead0]"
              >
                {/* WhatsApp icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
            </div>

            {/* CTA pill — "HACER PEDIDO" */}
            <a
              href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent("Hola! Quiero hacer un pedido a Pollo Rey.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-[#f1ead0] px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#08234e]"
            >
              HACER PEDIDO
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#f1ead0]/10 px-6 py-5 md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-2 md:flex-row md:items-center">
          <div className="flex gap-6">
            {[
              { label: "Términos de servicio", href: "/terminos" },
              { label: "Política de privacidad", href: "/privacidad" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#f1ead0]/25 hover:text-[#f1ead0]/50">
                {l.label}
              </Link>
            ))}
          </div>
          <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-[#f1ead0]/25">
            © {new Date().getFullYear()}, POLLO REY — TODOS LOS DERECHOS RESERVADOS.
          </span>
        </div>
      </div>
    </footer>
  );
}
