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
        <div className="mx-auto hidden h-[72px] max-w-[1400px] grid-cols-3 items-center px-8 md:grid">

          {/* LEFT — nav links */}
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 font-sans text-sm font-semibold uppercase tracking-[0.12em] transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[#08234e]"
                    : "text-[#08234e]/50 hover:text-[#08234e]"
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
                src="/Red_and_White_Minimalist_Fried_Chicken_Logo__1_-removebg-preview.png"
                alt="Pollo Rey"
                width={56}
                height={64}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* RIGHT — cart + CTA */}
          <div className="flex items-center justify-end gap-3">
            {/* Cart circular button */}
            <CartIcon />

            {/* CTA pill */}
            <Link
              href="/productos"
              className="rounded-full bg-[#08234e] px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#f1ead0] transition-opacity hover:opacity-75"
            >
              Hacer pedido
            </Link>
          </div>
        </div>

        {/* ── Mobile nav (logo left, burger right) ── */}
        <div className="flex h-16 items-center justify-between px-5 md:hidden">
          <Link href="/" className="transition-opacity hover:opacity-70">
            <Image
              src="/Red_and_White_Minimalist_Fried_Chicken_Logo__1_-removebg-preview.png"
              alt="Pollo Rey"
              width={44}
              height={50}
              className="object-contain"
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
                  className="block rounded-full bg-[#08234e] py-4 text-center font-sans text-sm font-bold uppercase tracking-[0.12em] text-[#f1ead0]"
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
