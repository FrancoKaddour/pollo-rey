"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { cn } from "@/lib/utils";

const links = [
  { href: "/productos", label: "Productos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_rgba(8,35,78,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="container-site">
          <nav className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-xl font-extrabold tracking-tight text-brand-navy md:text-2xl"
            >
              <span className="text-brand-gold">POLLO</span>
              <span>REY</span>
            </Link>

            {/* Links desktop */}
            <ul className="hidden items-center gap-8 md:flex">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative text-sm font-medium transition-colors hover:text-brand-navy",
                      pathname === link.href
                        ? "text-brand-navy"
                        : "text-ink-700",
                      "after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-brand-gold after:transition-all after:duration-200",
                      pathname === link.href
                        ? "after:w-full"
                        : "after:w-0 hover:after:w-full"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              <Link
                href="/productos"
                className="hidden rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-brand-cream transition-all hover:bg-brand-dark active:scale-95 md:inline-flex"
              >
                Hacer Pedido
              </Link>
              <CartIcon />
              {/* Hamburger mobile */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menú"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-brand-cream md:hidden"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5 text-brand-navy" />
                ) : (
                  <Menu className="h-5 w-5 text-brand-navy" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-ink-100 bg-white px-6 py-6 shadow-xl md:hidden"
          >
            <ul className="flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block text-lg font-medium transition-colors",
                      pathname === link.href
                        ? "text-brand-navy"
                        : "text-ink-700 hover:text-brand-navy"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/productos"
                  className="mt-2 block rounded-lg bg-brand-navy py-3 text-center text-base font-semibold text-brand-cream"
                >
                  Hacer Pedido
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay cuando el menú está abierto */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
