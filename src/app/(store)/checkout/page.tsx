"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, User, Phone, FileText, ArrowLeft, CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const total = totalPrice();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    zone: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);

  // Si no hay items, redirigir al catálogo
  useEffect(() => {
    if (items.length === 0) {
      router.replace("/productos");
    }
  }, [items, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Guardar pedido en BD
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          zone: form.zone,
          notes: form.notes,
          total,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            quantity: i.quantity,
            unitPrice: i.product.price,
            subtotal: i.product.price * i.quantity,
          })),
        }),
      });
    } catch {
      // Si falla el guardado, igual continuamos con WhatsApp
    }

    // Generar URL de WhatsApp y abrir
    const url = generateWhatsAppURL({
      customerName: form.customerName,
      phone: form.phone,
      zone: form.zone || undefined,
      notes: form.notes || undefined,
      total,
      items: items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        unitPrice: i.product.price,
      })),
    });

    clearCart();
    window.open(url, "_blank");
    router.push("/");
  };

  if (items.length === 0) return null;

  return (
    <div className="min-h-screen bg-[#f8f6ef] px-4 py-10 sm:px-6 sm:py-12 md:px-12">
      <div className="mx-auto max-w-[1100px]">

        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-3">
          <Link
            href="/productos"
            className="flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-widest text-[#08234e]/40 transition-colors hover:text-[#08234e]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al catálogo
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <p
            className="font-display font-black uppercase text-[#08234e]/20 leading-none"
            style={{ fontSize: "0.65rem", letterSpacing: "0.2em" }}
          >
            PASO FINAL
          </p>
          <h1
            className="mt-2 font-display font-black uppercase text-[#08234e] leading-none"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
              letterSpacing: "-0.05em",
              transform: "scaleX(1.15)",
              transformOrigin: "left",
            }}
          >
            CONFIRMÁ TU PEDIDO<span className="text-[#CC1414]">.</span>
          </h1>
          <p className="mt-3 font-sans text-sm text-[#08234e]/50">
            Completá tus datos y te redirigimos a WhatsApp con el pedido listo.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_minmax(300px,420px)]">

          {/* ── FORMULARIO ── */}
          <div className="rounded-2xl border-2 border-[#08234e]/10 bg-white p-5 sm:p-8 md:p-10">
            <h2
              className="mb-7 font-display font-black uppercase text-[#08234e]"
              style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
            >
              TUS DATOS
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="customerName"
                  className="flex items-center gap-2 font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                >
                  <User className="h-3.5 w-3.5" />
                  Nombre completo *
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  required
                  value={form.customerName}
                  onChange={handleChange}
                  placeholder="Juan García"
                  className="w-full rounded-xl border-2 border-[#08234e]/12 bg-[#f8f6ef] px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                />
              </div>

              {/* Teléfono */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                >
                  <Phone className="h-3.5 w-3.5" />
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="11 1234-5678"
                  className="w-full rounded-xl border-2 border-[#08234e]/12 bg-[#f8f6ef] px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                />
              </div>

              {/* Zona */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="zone"
                  className="font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                >
                  Barrio / Zona (opcional)
                </label>
                <input
                  id="zone"
                  name="zone"
                  type="text"
                  value={form.zone}
                  onChange={handleChange}
                  placeholder="Ej: Saavedra, Coghlan, Núñez..."
                  className="w-full rounded-xl border-2 border-[#08234e]/12 bg-[#f8f6ef] px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                />
              </div>

              {/* Notas */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="notes"
                  className="flex items-center gap-2 font-display text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#08234e]/40"
                >
                  <FileText className="h-3.5 w-3.5" />
                  Notas adicionales (opcional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Corte especial, franja horaria, algún detalle..."
                  className="w-full resize-none rounded-xl border-2 border-[#08234e]/12 bg-[#f8f6ef] px-4 py-3 font-sans text-sm text-[#08234e] placeholder-[#08234e]/25 outline-none transition-colors focus:border-[#08234e] focus:bg-white"
                />
              </div>

              {/* Aviso */}
              <p className="text-xs text-[#08234e]/35 leading-relaxed">
                Al confirmar, se abrirá WhatsApp con tu pedido pre-cargado. El pago se coordina con el local.
              </p>

              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-3 rounded-full border-2 border-[#08234e] bg-[#08234e] px-8 py-4 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#08234e] disabled:opacity-50 disabled:pointer-events-none"
              >
                {sending ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#f1ead0]/30 border-t-[#f1ead0]" />
                    Preparando pedido...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" strokeWidth={2} />
                    CONFIRMAR Y ENVIAR POR WHATSAPP
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── RESUMEN DEL PEDIDO ── */}
          <div className="rounded-2xl border-2 border-[#08234e] bg-[#08234e] p-8 text-[#f1ead0]">
            <div className="mb-6 flex items-center gap-3">
              <ShoppingBag className="h-5 w-5 text-[#f1ead0]/60" strokeWidth={1.8} />
              <h2
                className="font-display font-black uppercase text-[#f1ead0]"
                style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
              >
                TU PEDIDO
              </h2>
            </div>

            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-start justify-between gap-4 border-b border-[#f1ead0]/10 pb-3"
                >
                  <div className="flex-1">
                    <p className="font-display text-sm font-black uppercase text-[#f1ead0]" style={{ letterSpacing: "-0.01em" }}>
                      {item.product.name}
                    </p>
                    <p className="text-xs text-[#f1ead0]/40">
                      {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <p className="font-display font-black text-[#f1ead0]" style={{ fontSize: "0.9rem" }}>
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between border-t-2 border-[#f1ead0]/20 pt-5">
              <p className="font-display text-sm font-black uppercase text-[#f1ead0]/60">
                Total estimado
              </p>
              <p
                className="font-display font-black text-[#CC1414]"
                style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", letterSpacing: "-0.03em" }}
              >
                {formatPrice(total)}
              </p>
            </div>

            <p className="mt-4 text-[0.65rem] text-[#f1ead0]/30 leading-relaxed">
              * Precio sujeto a disponibilidad. El total final se confirma con el local.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
