import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Pollo Rey",
  description: "Política de privacidad y tratamiento de datos personales de Pollo Rey, conforme a la Ley 25.326 de Protección de Datos Personales de Argentina.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#f1ead0]">
      {/* Header */}
      <div className="border-b border-[#4467a9]/10 px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-4 flex items-center gap-2">
            <Link
              href="/"
              className="font-sans text-[0.65rem] font-bold uppercase tracking-widest text-[#4467a9]/35 transition-colors hover:text-[#4467a9]"
            >
              Inicio
            </Link>
            <span className="text-[#4467a9]/20">→</span>
            <span className="font-sans text-[0.65rem] font-black uppercase tracking-widest text-[#4467a9]">
              Política de Privacidad
            </span>
          </div>
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.045em" }}
          >
            POLÍTICA DE PRIVACIDAD<span className="text-[#CC1414]">.</span>
          </h1>
          <p className="mt-4 text-sm text-[#4467a9]/45">
            Última actualización: marzo de 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-[860px] px-6 py-12 md:px-12">
        <div className="space-y-8 text-[#4467a9]/70 leading-relaxed" style={{ fontSize: "0.95rem" }}>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              1. Responsable del tratamiento
            </h2>
            <p>
              <strong className="text-[#4467a9]">Pollo Rey</strong>, con domicilio en Saavedra, Ciudad Autónoma de Buenos Aires, Argentina, es responsable del tratamiento de los datos personales que se recopilan a través de este sitio web. Esta política está redactada de conformidad con la <strong className="text-[#4467a9]">Ley 25.326 de Protección de Datos Personales</strong> y su normativa complementaria.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              2. Datos que recopilamos
            </h2>
            <p>Recopilamos los siguientes datos personales:</p>
            <ul className="mt-3 space-y-3 pl-5">
              {[
                { title: "Newsletter", desc: "Dirección de email cuando te suscribís voluntariamente a nuestras novedades." },
                { title: "Formulario de contacto", desc: "Nombre, email y mensaje cuando nos escribís a través del formulario." },
                { title: "Datos de pedido", desc: "Nombre, teléfono y dirección de entrega al realizar un pedido vía WhatsApp." },
                { title: "Datos técnicos", desc: "Información de navegación (dirección IP, tipo de navegador) recopilada automáticamente para el correcto funcionamiento del sitio." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
                  <span>
                    <strong className="text-[#4467a9]">{item.title}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              3. Finalidad del tratamiento
            </h2>
            <p>Utilizamos tus datos exclusivamente para:</p>
            <ul className="mt-3 space-y-1.5 pl-5">
              {[
                "Procesar y gestionar tus pedidos",
                "Responder a tus consultas y mensajes",
                "Enviarte novedades y promociones (solo si te suscribiste al newsletter)",
                "Mejorar la experiencia de uso del sitio",
                "Cumplir obligaciones legales cuando corresponda",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              <strong className="text-[#4467a9]">No vendemos ni cedemos tus datos a terceros</strong> con fines comerciales.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              4. Base legal del tratamiento
            </h2>
            <p>
              El tratamiento de tus datos se realiza con base en tu consentimiento expreso (suscripción al newsletter, envío de formulario) y en la ejecución de la relación comercial (gestión de pedidos).
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              5. Conservación de datos
            </h2>
            <p>
              Conservamos tus datos el tiempo necesario para cumplir las finalidades descritas y las obligaciones legales aplicables. Los suscriptores al newsletter pueden darse de baja en cualquier momento. Los datos de pedidos se conservan por el período que exige la legislación fiscal argentina.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              6. Tus derechos (Ley 25.326)
            </h2>
            <p>De acuerdo con la Ley 25.326, tenés derecho a:</p>
            <ul className="mt-3 space-y-1.5 pl-5">
              {[
                "Acceder a tus datos personales que obren en nuestros registros",
                "Solicitar la rectificación de datos inexactos o incompletos",
                "Solicitar la supresión de tus datos (derecho al olvido)",
                "Oponerte al tratamiento de tus datos para fines de marketing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, contactanos a través de nuestra{" "}
              <Link href="/contacto" className="font-semibold text-[#4467a9] underline underline-offset-2 hover:text-[#CC1414]">
                página de contacto
              </Link>
              . La Dirección Nacional de Protección de Datos Personales (DNPDP) es el organismo de control competente para recibir denuncias y reclamos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              7. Seguridad
            </h2>
            <p>
              Implementamos medidas técnicas y organizativas adecuadas para proteger tus datos contra acceso no autorizado, pérdida o divulgación. El sitio utiliza conexión cifrada (HTTPS) para la transmisión de datos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              8. Cookies
            </h2>
            <p>
              Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de seguimiento ni de publicidad de terceros sin tu consentimiento previo.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              9. Modificaciones
            </h2>
            <p>
              Podemos actualizar esta política en cualquier momento. Las modificaciones se publicarán en esta página con la fecha de actualización. Te recomendamos revisarla periódicamente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              10. Contacto
            </h2>
            <p>
              Para cualquier consulta sobre esta política o el tratamiento de tus datos, podés contactarnos a través de nuestra{" "}
              <Link href="/contacto" className="font-semibold text-[#4467a9] underline underline-offset-2 hover:text-[#CC1414]">
                página de contacto
              </Link>.
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
