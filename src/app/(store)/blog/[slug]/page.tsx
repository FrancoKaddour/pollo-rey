import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ARTICLES, getArticle } from "../_content";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Pollo Rey`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const otherArticles = ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f1ead0]">
      {/* Header */}
      <div className="mx-auto max-w-[900px] px-6 pt-12 pb-0 md:px-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4467a9]/40 hover:text-[#4467a9] transition-colors"
        >
          <ArrowLeft size={12} />
          Volver al blog
        </Link>

        {/* Tag */}
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#CC1414]" />
          <p
            className="font-sans font-black uppercase text-[#CC1414]"
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
          >
            {article.tag}
          </p>
        </div>

        {/* Title */}
        <h1
          className="font-display font-black uppercase text-[#4467a9] leading-[0.9]"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.045em",
          }}
        >
          {article.title}<span className="text-[#CC1414]">.</span>
        </h1>

        {/* Meta */}
        <div className="mt-5 flex items-center gap-4 text-xs font-medium text-[#4467a9]/30">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{article.readTime} min de lectura</span>
        </div>
      </div>

      {/* Red separator */}
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <div className="mt-8 h-0.5 bg-[#CC1414]" />
      </div>

      {/* Article content */}
      <article className="mx-auto max-w-[900px] px-6 py-12 md:px-12">
        <div
          className="prose-article space-y-5 text-[#4467a9]/70 leading-relaxed"
          style={{ fontSize: "1rem", lineHeight: "1.8" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* CTA band */}
      <div className="bg-[#4467a9] px-6 py-12 text-center">
        <p
          className="font-display font-black uppercase text-[#f1ead0] leading-none mb-6"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "-0.04em" }}
        >
          ¿Listo para pedir?<span className="text-[#CC1414]">.</span>
        </p>
        <Link
          href="/productos"
          className="inline-block rounded-full bg-[#CC1414] px-10 py-4 font-display text-sm font-black uppercase tracking-widest text-white transition-opacity hover:opacity-80"
        >
          VER CATÁLOGO →
        </Link>
      </div>

      {/* More articles */}
      {otherArticles.length > 0 && (
        <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12">
          <h2
            className="mb-8 font-display font-black uppercase text-[#4467a9]"
            style={{ fontSize: "1.5rem", letterSpacing: "-0.04em" }}
          >
            MÁS ARTÍCULOS
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {otherArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-2xl bg-white border border-[#4467a9]/8 p-6 hover:border-[#4467a9] hover:-translate-y-1 transition-all duration-200"
              >
                <span className="text-[0.6rem] font-black uppercase tracking-widest text-[#CC1414]">
                  {a.tag}
                </span>
                <h3
                  className="mt-2 font-display font-black uppercase text-[#4467a9] leading-tight group-hover:text-[#CC1414] transition-colors"
                  style={{ fontSize: "0.9rem", letterSpacing: "-0.02em" }}
                >
                  {a.title}
                </h3>
                <p className="mt-3 text-xs text-[#4467a9]/40 line-clamp-2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
