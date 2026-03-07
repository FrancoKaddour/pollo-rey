"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

export function CartIcon() {
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  return (
    <button
      onClick={toggleCart}
      aria-label={`Carrito (${count} productos)`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-brand-cream"
    >
      <ShoppingCart className="h-5 w-5 text-brand-navy" strokeWidth={1.8} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
