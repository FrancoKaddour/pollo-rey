import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Términos de Servicio | Pollo Rey",
  description: "Términos y condiciones de uso del sitio web y servicio de Pollo Rey, pollería en Saavedra, Buenos Aires.",
};

export default function TerminosPage() {
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
              Términos de Servicio
            </span>
          </div>
          <h1
            className="font-display font-black uppercase text-[#4467a9] leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.045em" }}
          >
            TÉRMINOS DE SERVICIO<span className="text-[#CC1414]">.</span>
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
              1. Aceptación de los términos
            </h2>
            <p>
              Al acceder y utilizar el sitio web de <strong className="text-[#4467a9]">Pollo Rey</strong> (pollorey.com.ar), aceptás estos Términos de Servicio en su totalidad. Si no estás de acuerdo con alguna parte de estos términos, no podés utilizar nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              2. Descripción del servicio
            </h2>
            <p>
              Pollo Rey es una pollería ubicada en el barrio de Saavedra, Ciudad Autónoma de Buenos Aires, Argentina. A través de este sitio web ofrecemos:
            </p>
            <ul className="mt-3 space-y-1.5 pl-5">
              {[
                "Visualización de nuestro catálogo de productos y precios",
                "Armado de pedidos para su gestión vía WhatsApp",
                "Información sobre promociones vigentes",
                "Medios de contacto y consultas",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Los pedidos realizados a través del sitio son derivados a nuestro canal de WhatsApp para su confirmación y coordinación. <strong className="text-[#4467a9]">El sitio no procesa pagos online.</strong>
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              3. Precios y disponibilidad
            </h2>
            <p>
              Los precios publicados en el sitio son orientativos y pueden variar sin previo aviso, sujetos a disponibilidad y condiciones del mercado. La confirmación de precio final se realiza al momento de procesar el pedido. Nos reservamos el derecho de modificar precios en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              4. Zona de cobertura
            </h2>
            <p>
              El servicio de delivery tiene cobertura en Saavedra, Núñez, Coghlan, Colegiales, Palermo y Vicente López. La disponibilidad puede variar según horario y condiciones. El retiro en local está disponible en nuestra dirección en Saavedra, CABA.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              5. Uso del sitio
            </h2>
            <p>Te comprometés a usar este sitio únicamente para fines lícitos. Queda prohibido:</p>
            <ul className="mt-3 space-y-1.5 pl-5">
              {[
                "Usar el sitio de manera que cause daño o perjuicio a terceros",
                "Realizar acciones que puedan interferir con el funcionamiento del sitio",
                "Intentar acceder sin autorización a sistemas o datos",
                "Publicar o transmitir contenido ilegal, dañino o inapropiado",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[#CC1414]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              6. Limitación de responsabilidad
            </h2>
            <p>
              Pollo Rey no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso del sitio. La información publicada es de carácter informativo y no constituye una oferta vinculante.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              7. Modificaciones
            </h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en este sitio. El uso continuado del sitio tras las modificaciones implica la aceptación de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              8. Ley aplicable
            </h2>
            <p>
              Estos términos se rigen por las leyes de la República Argentina. Para cualquier disputa, las partes se someten a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-lg font-black uppercase text-[#4467a9]" style={{ letterSpacing: "-0.02em" }}>
              9. Contacto
            </h2>
            <p>
              Para consultas sobre estos términos podés escribirnos a través de nuestra{" "}
              <Link href="/contacto" className="font-semibold text-[#4467a9] underline underline-offset-2 hover:text-[#CC1414]">
                página de contacto
              </Link>
              {" "}o por WhatsApp.
            </p>
          </section>

        </div>
      </article>
    </div>
  );
}
