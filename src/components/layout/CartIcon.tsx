"use client";

import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

export function CartIcon() {
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  return (
    <button
      onClick={toggleCart}
      aria-label={`Carrito (${count} productos)`}
      className="relative flex h-10 w-10 items-center justify-center text-[#f1ead0] transition-opacity hover:opacity-70"
    >
      <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f1ead0] text-[9px] font-black text-[#08234e]">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
