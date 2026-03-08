"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-shadow duration-300",
          scrolled
            ? "bg-[#f1ead0] shadow-[0_2px_20px_rgba(8,35,78,0.10)]"
            : "bg-[#f1ead0]"
        )}
      >
        {/* ── Desktop nav (3-column grid: left links | center logo | right actions) ── */}
        <div className="mx-auto hidden h-[88px] max-w-[1400px] grid-cols-3 items-center px-8 md:grid">

          {/* LEFT — nav links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 font-sans text-sm font-medium uppercase tracking-[0.12em] transition-colors hover:text-[#CC1414]",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-black"
                    : "text-black"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CENTER — logo */}
          <div className="flex justify-center">
            <Link href="/" className="transition-opacity hover:opacity-70">
              <Image
                src="/Logo-crop.png"
                alt="Pollo Rey"
                width={300}
                height={185}
                className="h-16 w-auto object-contain [mix-blend-mode:multiply]"
                priority
              />
            </Link>
          </div>

          {/* RIGHT — cart + CTA */}
          <div className="flex items-center justify-end gap-3">
            {/* Delivery icon */}
            <Link
              href="/productos"
              aria-label="Delivery"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black bg-transparent text-black transition-all hover:border-[#CC1414] hover:text-[#CC1414]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M16.4 17.6C16.4 19.4778 17.8775 21 19.7 21C21.5225 21 23 19.4778 23 17.6C23 15.7222 21.5225 14.2 19.7 14.2C17.8775 14.2 16.4 15.7222 16.4 17.6ZM16.4 17.6L10.9 17.5997M10.9 17.5997V15.7452C10.9 13.4136 10.9 12.249 10.2554 11.5245C9.6108 10.8 8.5746 10.8 6.5 10.8H5.84C5.4319 10.8 5.2273 10.8 5.0546 10.8148C4.01011 10.9072 3.02922 11.4154 2.28838 12.248C1.54754 13.0807 1.09536 14.1831 1.0132 15.357C1 15.5511 1 15.7823 1 16.2398C1 16.3547 1 16.4128 1.0033 16.4598C1.02373 16.7535 1.1368 17.0293 1.32214 17.2376C1.50747 17.4459 1.75289 17.573 2.0142 17.596C2.07942 17.5994 2.14471 17.6006 2.21 17.5997H10.9ZM4.3 7.39972H9.8M2.1 4H7.6M12 4H12.5421C13.7772 4 14.3942 4 14.8901 4.38122C15.387 4.76117 15.6631 5.44713 16.2145 6.81903L19.1867 14.2M18.3068 11.65L19.006 11.01C19.276 10.7626 19.4115 10.6402 19.5049 10.4783C19.5689 10.3689 19.6185 10.2475 19.6517 10.1187C19.7 9.92875 19.7 9.72093 19.7 9.30528C19.7 8.51733 19.7 8.12462 19.5645 7.8301C19.4735 7.6325 19.3417 7.46873 19.1826 7.3558C18.9464 7.1875 18.6282 7.1875 17.9947 7.1875H16.62M9.25 17.6C9.25 18.5017 8.90232 19.3665 8.28345 20.0042C7.66458 20.6418 6.82521 21 5.95 21C5.07479 21 4.23542 20.6418 3.61655 20.0042C2.99768 19.3665 2.65 18.5017 2.65 17.6" />
              </svg>
            </Link>
            {/* Cart circular button */}
            <CartIcon />

            {/* CTA pill */}
            <Link
              href="/productos"
              className="rounded-full border-2 border-[#08234e] bg-transparent px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
            >
              Hacer pedido
            </Link>
          </div>
        </div>

        {/* ── Mobile nav (logo left, burger right) ── */}
        <div className="flex h-20 items-center justify-between px-5 md:hidden">
          <Link href="/" className="transition-opacity hover:opacity-70">
            <Image
              src="/Logo-crop.png"
              alt="Pollo Rey"
              width={300}
              height={185}
              className="h-10 w-auto object-contain [mix-blend-mode:multiply]"
              priority
            />
          </Link>
          <div className="flex items-center gap-2">
            <CartIcon />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center text-[#08234e]"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.26 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-72 flex-col bg-[#f1ead0] px-6 pt-20 pb-8 shadow-2xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center text-[#08234e]/60"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl px-4 py-3 font-display text-xl font-black",
                      pathname === link.href
                        ? "text-[#08234e]"
                        : "text-[#08234e]/50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  href="/productos"
                  className="block rounded-full border-2 border-[#08234e] bg-transparent py-4 text-center font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#08234e] transition-colors hover:bg-[#08234e] hover:text-[#f1ead0]"
                >
                  Hacer pedido
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
