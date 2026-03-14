import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, zone, notes, total, items } = body;

    if (!customerName || !phone || !items?.length) {
      return NextResponse.json({ error: "Datos del pedido incompletos" }, { status: 400 });
    }

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        zone: zone || null,
        notes: notes || null,
        total,
        status: "PENDING",
        items: {
          create: items.map((item: {
            productId: string;
            quantity: number;
            unitPrice: number;
            subtotal: number;
          }) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            subtotal: item.subtotal,
          })),
        },
      },
    });

    return NextResponse.json({ ok: true, orderId: order.id });
  } catch (error) {
    console.error("[orders]", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
