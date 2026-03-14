import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f1ead0] px-6 text-center">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/Logo-crop.png"
          alt="Pollo Rey"
          width={300}
          height={185}
          className="mb-10 h-20 w-auto object-contain [mix-blend-mode:multiply]"
        />
      </Link>

      {/* 404 gigante */}
      <p
        className="select-none font-display font-black italic uppercase leading-none text-[#4467a9]/8"
        style={{ fontSize: "clamp(8rem, 30vw, 22rem)", letterSpacing: "-0.06em" }}
      >
        404
      </p>

      {/* Texto */}
      <div className="-mt-8 md:-mt-16">
        <h1
          className="font-display font-black uppercase text-[#4467a9] leading-none"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "-0.05em",
            transform: "scaleX(1.15)",
            transformOrigin: "center",
          }}
        >
          ESTA PÁGINA NO EXISTE<span className="text-[#CC1414]">.</span>
        </h1>

        <p className="mt-5 font-sans text-sm text-[#4467a9]/50" style={{ maxWidth: "38ch", margin: "1.25rem auto 0" }}>
          Puede que el link esté roto o que la página haya sido movida.
          Pero el pollo fresco sigue en su lugar.
        </p>
      </div>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="rounded-full border-2 border-[#4467a9] bg-[#4467a9] px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#f1ead0] transition-colors hover:bg-[#f1ead0] hover:text-[#4467a9]"
        >
          Volver al inicio
        </Link>
        <Link
          href="/productos"
          className="rounded-full border-2 border-[#4467a9] bg-transparent px-8 py-3.5 font-display text-sm font-black uppercase tracking-widest text-[#4467a9] transition-colors hover:bg-[#4467a9] hover:text-[#f1ead0]"
        >
          Ver productos
        </Link>
      </div>

      {/* Banda tablero abajo */}
      <div
        aria-hidden="true"
        className="fixed bottom-0 left-0 right-0"
        style={{
          height: "clamp(40px, 5vw, 60px)",
          backgroundImage: "repeating-conic-gradient(#4467a9 0% 25%, #f1ead0 0% 50%)",
          backgroundSize: "clamp(20px, 2.5vw, 30px) clamp(20px, 2.5vw, 30px)",
        }}
      />
    </div>
  );
}
