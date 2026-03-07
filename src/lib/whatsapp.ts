export interface CartItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderData {
  customerName: string;
  phone: string;
  items: CartItem[];
  total: number;
  notes?: string;
  zone?: string;
}

/**
 * Genera la URL de WhatsApp con el pedido pre-cargado como mensaje.
 * El cliente hace click y se abre WhatsApp Business del negocio.
 */
export function generateWhatsAppURL(order: OrderData): string {
  const businessPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";

  const itemsText = order.items
    .map((item) => {
      const subtotal = (item.quantity * item.unitPrice).toLocaleString("es-AR");
      return `• ${item.quantity}x ${item.name} — $${subtotal}`;
    })
    .join("\n");

  const lines = [
    `Hola *POLLO REY*! Quiero hacer un pedido 🛒`,
    ``,
    `*DATOS*`,
    `━━━━━━━━━━━━━━━━`,
    `👤 Nombre: ${order.customerName}`,
    `📱 Tel: ${order.phone}`,
    order.zone ? `📍 Zona: ${order.zone}` : null,
    ``,
    `*PRODUCTOS:*`,
    itemsText,
    ``,
    `━━━━━━━━━━━━━━━━`,
    `💰 *TOTAL: $${order.total.toLocaleString("es-AR")}*`,
    order.notes ? `\n📝 Nota: ${order.notes}` : null,
    ``,
    `_Pedido desde pollorey.com.ar_`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `https://wa.me/${businessPhone}?text=${encodeURIComponent(lines)}`;
}
