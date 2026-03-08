"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronDown, ChevronRight } from "lucide-react";
import { CartIcon } from "./CartIcon";
import { cn } from "@/lib/utils";

// ─── Estructura del mega-menu ────────────────────────────────────────────────
const megaMenu = [
  {
    label: "Pollo Entero y Cortes",
    href: "/productos?cat=pollo",
    items: [
      { label: "Pollo Entero", href: "/productos/pollo-entero" },
      { label: "Pollo Trozado", href: "/productos/pollo-trozado" },
      { label: "Pollo sin Menudos", href: "/productos/pollo-sin-menudos" },
      { label: "Pechuga sin Hueso", href: "/productos/pechuga-sin-hueso" },
      { label: "Muslo y Contra", href: "/productos/muslo-y-contra" },
      { label: "Alas de Pollo", href: "/productos/alas" },
      { label: "Menudos", href: "/productos/menudos" },
    ],
  },
  {
    label: "Congelados",
    href: "/productos?cat=papas-fritas",
    items: [
      { label: "Papas Fritas 1kg", href: "/productos/papas-fritas-1kg" },
      { label: "Papas Fritas 2.5kg", href: "/productos/papas-fritas-2-5kg" },
      { label: "Hamburguesa de Pollo x4", href: "/productos/hamburguesa-pollo-x4" },
    ],
  },
  {
    label: "Huevos",
    href: "/productos?cat=huevos",
    items: [
      { label: "Huevos Docena", href: "/productos/huevos-docena" },
      { label: "Huevos Media Docena", href: "/productos/huevos-media-docena" },
    ],
  },
  {
    label: "Despensa",
    href: "/productos?cat=despensa",
    items: [
      { label: "Aceite Girasol 1.5L", href: "/productos/aceite-girasol-1-5l" },
      { label: "Rebozador 500g", href: "/productos/rebozador-500g" },
      { label: "Carbón 3kg", href: "/productos/carbon-3kg" },
      { label: "Sal Entrefina 1kg", href: "/productos/sal-entrefina-1kg" },
    ],
  },
];

// Links simples (sin dropdown)
const simpleLinks = [
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

// ─── Dropdown desktop ────────────────────────────────────────────────────────
function MegaDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute left-0 right-0 top-full z-50 border-t border-[#08234e]/10 bg-[#f1ead0] shadow-[0_12px_40px_rgba(8,35,78,0.12)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-8 md:px-12">
        {/* Header del dropdown */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/productos"
            onClick={onClose}
            className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#08234e]/50 hover:text-[#08234e]"
          >
            Ver todos los productos →
          </Link>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-0 md:grid-cols-4">
          {megaMenu.map((cat) => (
            <div key={cat.label}>
              {/* Nombre de categoría */}
              <Link
                href={cat.href}
                onClick={onClose}
                className="group mb-3 flex items-center gap-1.5 font-display text-sm font-bold text-[#08234e] hover:opacity-70"
              >
                {cat.label}
                <ChevronRight className="h-3 w-3 opacity-40 transition-opacity group-hover:opacity-100" />
              </Link>

              {/* Divisor */}
              <div className="mb-3 h-px bg-[#08234e]/10" />

              {/* Subcategorías */}
              <ul className="space-y-2 pb-6">
                {cat.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block text-sm text-[#08234e]/60 transition-colors hover:text-[#08234e]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Navbar principal ────────────────────────────────────────────────────────
export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Cerrar todo al cambiar de ruta
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 bg-[#f1ead0] shadow-[0_1px_0_rgba(8,35,78,0.08)]">
        <nav ref={navRef} className="relative">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-12">

            {/* ── Logo ── */}
            <Link href="/" className="group flex items-baseline gap-0 shrink-0">
              <span
                className="font-display text-xl font-black text-[#08234e] transition-opacity group-hover:opacity-60"
                style={{ letterSpacing: "-0.05em" }}
              >
                POLLO
              </span>
              <span
                className="font-display text-xl font-black text-[#08234e]/30 transition-opacity group-hover:opacity-60"
                style={{ letterSpacing: "-0.05em" }}
              >
                REY
              </span>
            </Link>

            {/* ── Nav links desktop ── */}
            <ul className="hidden items-center gap-1 md:flex">
              {/* Todos los productos con dropdown */}
              <li>
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-[0.1em] transition-colors",
                    dropdownOpen
                      ? "text-[#08234e] bg-[#08234e]/6"
                      : "text-[#08234e]/50 hover:text-[#08234e] hover:bg-[#08234e]/5"
                  )}
                >
                  Productos
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                  />
                </button>
              </li>

              {/* Links simples */}
              {simpleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium uppercase tracking-[0.1em] transition-colors",
                      pathname === link.href
                        ? "text-[#08234e]"
                        : "text-[#08234e]/55 hover:text-[#08234e] hover:bg-[#08234e]/5"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Acciones ── */}
            <div className="flex items-center gap-3">
              <Link
                href="/productos"
                className="hidden rounded-full bg-[#08234e] px-5 py-2 text-xs font-bold uppercase tracking-[0.1em] text-[#f1ead0] transition-opacity hover:opacity-75 md:block"
              >
                Hacer Pedido
              </Link>
              <CartIcon />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="flex h-9 w-9 items-center justify-center text-[#08234e] md:hidden"
                aria-label="Menú"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* ── Mega dropdown desktop ── */}
          <AnimatePresence>
            {dropdownOpen && <MegaDropdown onClose={() => setDropdownOpen(false)} />}
          </AnimatePresence>
        </nav>
      </header>

      {/* ── Menú móvil ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-[#f1ead0] pt-20"
          >
            <div className="px-6 py-6">
              {/* Accordion de categorías */}
              <div className="border-t border-[#08234e]/10">
                {/* "Todos los productos" con accordion */}
                <div className="border-b border-[#08234e]/10">
                  <button
                    onClick={() =>
                      setMobileExpanded((v) => (v === "productos" ? null : "productos"))
                    }
                    className="flex w-full items-center justify-between py-4 font-display text-lg font-bold text-[#08234e]"
                  >
                    Productos
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[#08234e]/40 transition-transform duration-200",
                        mobileExpanded === "productos" && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileExpanded === "productos" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {megaMenu.map((cat) => (
                          <div key={cat.label} className="mb-5 pl-2">
                            <Link
                              href={cat.href}
                              className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#08234e]"
                            >
                              {cat.label}
                            </Link>
                            <ul className="space-y-2.5 pl-3">
                              {cat.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    href={item.href}
                                    className="block text-sm text-[#08234e]/60"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="pb-4">
                          <Link
                            href="/productos"
                            className="text-sm font-semibold text-[#08234e] underline underline-offset-2"
                          >
                            Ver todos los productos →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Links simples móvil */}
                {simpleLinks.map((link) => (
                  <div key={link.href} className="border-b border-[#08234e]/10">
                    <Link
                      href={link.href}
                      className="block py-4 font-display text-lg font-bold text-[#08234e]"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>

              {/* CTA móvil */}
              <div className="mt-8">
                <Link
                  href="/productos"
                  className="block rounded-full bg-[#08234e] py-4 text-center font-semibold text-[#f1ead0]"
                >
                  Hacer Pedido
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {(mobileOpen || dropdownOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/10 md:hidden"
            onClick={() => {
              setMobileOpen(false);
              setDropdownOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
