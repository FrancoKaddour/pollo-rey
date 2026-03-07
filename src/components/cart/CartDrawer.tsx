"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } =
    useCartStore();
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [closeCart]);

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = totalPrice();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-[#f1ead0] shadow-[-12px_0_40px_rgba(8,35,78,0.12)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#08234e]/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#08234e]" strokeWidth={1.6} />
                <span className="font-display text-base font-bold text-[#08234e]">
                  Tu carrito
                </span>
                {items.length > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#08234e] text-[10px] font-black text-[#f1ead0]">
                    {items.length}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#08234e]/40 transition-colors hover:bg-[#08234e]/8 hover:text-[#08234e]"
                aria-label="Cerrar carrito"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#08234e]/6">
                  <ShoppingBag className="h-7 w-7 text-[#08234e]/30" strokeWidth={1.4} />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-[#08234e]">
                    Tu carrito está vacío
                  </p>
                  <p className="mt-1 text-xs text-[#08234e]/40">
                    Agregá productos para hacer tu pedido
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-2 rounded-full border border-[#08234e]/20 px-5 py-2 text-sm font-medium text-[#08234e] transition-colors hover:bg-[#08234e]/5"
                >
                  Ver productos
                </button>
              </div>
            ) : (
              <>
                {/* Items list */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <ul className="space-y-4">
                    {items.map(({ product, quantity }) => (
                      <li
                        key={product.id}
                        className="flex gap-4 border-b border-[#08234e]/8 pb-4 last:border-0"
                      >
                        {/* Imagen placeholder */}
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#08234e]/6">
                          {product.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#08234e]/20 text-xs font-bold">
                              PR
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-[#08234e] leading-tight">
                                {product.name}
                              </p>
                              <p className="text-xs text-[#08234e]/40">{product.unit}</p>
                            </div>
                            <button
                              onClick={() => removeItem(product.id)}
                              className="shrink-0 text-[#08234e]/25 transition-colors hover:text-red-500"
                              aria-label="Eliminar"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 rounded-lg border border-[#08234e]/15 bg-white/50 px-1 py-0.5">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="flex h-6 w-6 items-center justify-center rounded text-[#08234e]/50 transition-colors hover:bg-[#08234e]/8 hover:text-[#08234e]"
                                aria-label="Reducir"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-[16px] text-center text-sm font-semibold text-[#08234e]">
                                {quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="flex h-6 w-6 items-center justify-center rounded text-[#08234e]/50 transition-colors hover:bg-[#08234e]/8 hover:text-[#08234e]"
                                aria-label="Aumentar"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <p className="text-sm font-bold text-[#08234e]">
                              {formatPrice(product.price * quantity)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t border-[#08234e]/10 px-6 py-5 space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#08234e]/60">Subtotal</span>
                    <span className="font-display text-lg font-black text-[#08234e]">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-xs text-[#08234e]/35 leading-relaxed">
                    El costo de envío se calcula al confirmar el pedido por WhatsApp.
                  </p>

                  {/* CTA */}
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#08234e] py-3.5 text-sm font-semibold text-[#f1ead0] transition-opacity hover:opacity-80"
                  >
                    Continuar al pedido
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
