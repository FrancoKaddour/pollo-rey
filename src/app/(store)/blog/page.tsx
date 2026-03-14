import type { Metadata } from "next";
import Link from "next/link";
import { ARTICLES } from "./_content";

export const metadata: Metadata = {
  title: "Blog | Pollo Rey",
  description:
    "Artículos sobre Pollo Rey en Saavedra, Buenos Aires. Frescura, precios justos, comunidad y todo lo que necesitás saber sobre tu pollería de barrio.",
  openGraph: {
    title: "Blog | Pollo Rey — Saavedra, Buenos Aires",
    description:
      "Artículos sobre Pollo Rey en Saavedra, Buenos Aires. Frescura, precios y comunidad.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f1ead0]">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-12 md:px-12">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#CC1414]" />
          <p
            className="font-sans font-black uppercase text-[#CC1414]"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
          >
            BLOG
          </p>
        </div>
        <h1
          className="font-display font-black uppercase text-[#4467a9] leading-none"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.055em",
            transform: "scaleX(1.15)",
            transformOrigin: "left",
          }}
        >
          POLLO REY<br />
          EN SAAVEDRA<span className="text-[#CC1414]">.</span>
        </h1>
        <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-[#4467a9]/50">
          Todo sobre nuestra pollería: cómo garantizamos frescura, por qué nacimos
          en Saavedra, y cómo podés comer bien sin gastar de más.
        </p>
      </div>

      {/* Red line */}
      <div className="h-1 bg-[#CC1414]" />

      {/* Articles grid */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-[#4467a9]/8 hover:border-[#4467a9] hover:-translate-y-1.5 hover:shadow-[6px_6px_0px_0px_#4467a9] transition-all duration-200"
            >
              {/* Image placeholder */}
              <div className="relative h-44 overflow-hidden bg-[#4467a9]/5 flex items-end justify-end p-5">
                <span
                  className="select-none font-display font-black italic uppercase text-[#4467a9]/10"
                  style={{ fontSize: "6rem", lineHeight: 1 }}
                >
                  PR
                </span>
                <span className="absolute top-4 left-4 rounded-full bg-[#CC1414] px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white">
                  {article.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h2
                  className="font-display font-black uppercase text-[#4467a9] leading-tight group-hover:text-[#CC1414] transition-colors"
                  style={{ fontSize: "1rem", letterSpacing: "-0.02em" }}
                >
                  {article.title}
                </h2>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-[#4467a9]/50">
                  {article.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="text-[0.65rem] font-medium text-[#4467a9]/30">
                    {new Date(article.date).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {" · "}{article.readTime} min
                  </p>
                  <span className="text-xs font-black uppercase tracking-widest text-[#4467a9]/30 group-hover:text-[#CC1414] transition-colors">
                    LEER →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
