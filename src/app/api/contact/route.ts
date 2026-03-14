import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, mensaje } = await req.json();

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // Si Resend está configurado, enviar email
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: "Pollo Rey <noreply@pollorey.com.ar>",
        to: process.env.CONTACT_EMAIL ?? "admin@pollorey.com.ar",
        replyTo: email,
        subject: `Mensaje de contacto de ${nombre}`,
        text: `
Nombre: ${nombre}
Email: ${email}

Mensaje:
${mensaje}
        `.trim(),
        html: `
<h2>Nuevo mensaje de contacto</h2>
<p><strong>Nombre:</strong> ${nombre}</p>
<p><strong>Email:</strong> ${email}</p>
<hr/>
<p>${mensaje.replace(/\n/g, "<br/>")}</p>
        `,
      });
    } else {
      // Sin Resend configurado, solo logueamos en desarrollo
      console.log("[contact] Mensaje recibido:", { nombre, email, mensaje });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
