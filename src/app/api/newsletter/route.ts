import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    // Validación básica de formato
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return NextResponse.json({ error: "Formato de email inválido" }, { status: 400 });
    }

    // Upsert: si ya existe, lo reactiva
    await prisma.newsletter.upsert({
      where: { email: normalized },
      update: { active: true },
      create: { email: normalized },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter]", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
