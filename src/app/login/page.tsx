"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Credenciales incorrectas. Verificá tu email y contraseña.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#4467a9] flex items-center justify-center px-4">
      {/* Checkered background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-conic-gradient(#f1ead0 0% 25%, transparent 0% 50%)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Red accent top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#CC1414]" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#4467a9] px-8 pt-10 pb-8 text-center">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Pollo Rey"
                width={200}
                height={123}
                className="mx-auto h-12 w-auto brightness-0 invert"
              />
            </Link>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-[#CC1414]" />
              <p
                className="font-sans font-black uppercase text-[#f1ead0]/50"
                style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}
              >
                PANEL DE ADMINISTRACIÓN
              </p>
              <span className="h-px w-6 bg-[#CC1414]" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pollorey.com.ar"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#4467a9] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[0.68rem] font-bold uppercase tracking-widest text-slate-400">
                Contraseña
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-300 outline-none transition-all focus:border-[#4467a9] focus:bg-white"
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#4467a9] py-3.5 font-display text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-[#0d3a80] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Ingresando…" : "Entrar al panel →"}
            </button>

            <p className="text-center text-[0.65rem] font-medium uppercase tracking-wider text-slate-300">
              Solo personal autorizado
            </p>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[#f1ead0]/30 text-xs hover:text-[#f1ead0]/60 transition-colors"
          >
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
}
