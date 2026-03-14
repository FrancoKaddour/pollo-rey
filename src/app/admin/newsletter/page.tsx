import { prisma } from "@/lib/prisma";
import { NewsletterClient } from "./NewsletterClient";
import { Mail } from "lucide-react";

export const metadata = { title: "Newsletter" };

export default async function NewsletterPage() {
  const subscribers = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
  });

  const active = subscribers.filter((s) => s.active).length;
  const inactive = subscribers.filter((s) => !s.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            NEWSLETTER
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Gestión de suscriptores
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50">
          <Mail size={18} className="text-teal-600" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-l-teal-500">
          <p className="text-2xl font-black text-[#08234e]">{subscribers.length}</p>
          <p className="text-xs font-medium text-slate-400 mt-1">Total</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-l-green-500">
          <p className="text-2xl font-black text-green-600">{active}</p>
          <p className="text-xs font-medium text-slate-400 mt-1">Activos</p>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-l-slate-200">
          <p className="text-2xl font-black text-slate-400">{inactive}</p>
          <p className="text-xs font-medium text-slate-400 mt-1">Inactivos</p>
        </div>
      </div>

      <NewsletterClient subscribers={subscribers} />
    </div>
  );
}
