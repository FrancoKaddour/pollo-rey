import { prisma } from "@/lib/prisma";
import { PromocionesClient } from "./PromocionesClient";
import { Megaphone } from "lucide-react";

export const metadata = { title: "Promociones" };

export default async function PromocionesPage() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { startDate: "desc" },
  });

  const active = promotions.filter((p) => p.active).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="font-display font-black uppercase text-[#08234e] leading-none"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", letterSpacing: "-0.04em" }}
          >
            PROMOCIONES
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            {promotions.length} promo{promotions.length !== 1 ? "s" : ""} · {active} activa{active !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
          <Megaphone size={18} className="text-[#CC1414]" />
        </div>
      </div>

      <PromocionesClient promotions={promotions} />
    </div>
  );
}
