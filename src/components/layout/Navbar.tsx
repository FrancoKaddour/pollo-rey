"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#08234e] shadow-[0_2px_40px_rgba(8,35,78,0.25)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link href="/" className="group flex items-baseline gap-1">
            <span
              className="font-display text-2xl font-black tracking-tight text-[#f1ead0] transition-opacity group-hover:opacity-80"
              style={{ letterSpacing: "-0.04em" }}
            >
              POLLO
            </span>
            <span
              className="font-display text-2xl font-black tracking-tight text-[#f1ead0]/50 transition-opacity group-hover:opacity-80"
              style={{ letterSpacing: "-0.04em" }}
            >
              REY
            </span>
          </Link>

          {/* Nav links desktop */}
          <nav className="hidden items-center gap-10 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium uppercase tracking-[0.12em] transition-colors duration-200",
                  pathname === link.href
                    ? "text-[#f1ead0]"
                    : "text-[#f1ead0]/60 hover:text-[#f1ead0]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-4">
            <Link
              href="/productos"
              className="hidden items-center gap-2 rounded-full border border-[#f1ead0]/30 px-5 py-2 text-sm font-semibold text-[#f1ead0] transition-all duration-200 hover:border-[#f1ead0] hover:bg-[#f1ead0]/10 md:flex"
            >
              Hacer Pedido
            </Link>
            <CartIcon />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center text-[#f1ead0] md:hidden"
              aria-label="Menú"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#08234e] px-8 pt-28 pb-12"
          >
            <nav className="flex flex-col gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-4xl font-bold text-[#f1ead0]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/productos"
                className="block rounded-full bg-[#f1ead0] py-4 text-center font-semibold text-[#08234e]"
              >
                Hacer Pedido
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
