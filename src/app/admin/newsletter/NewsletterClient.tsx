"use client";

import { useState } from "react";
import { Download, Mail } from "lucide-react";

interface Subscriber {
  id: string;
  email: string;
  active: boolean;
  createdAt: Date;
}

interface Props {
  subscribers: Subscriber[];
}

export function NewsletterClient({ subscribers }: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [search, setSearch] = useState("");

  const filtered = subscribers.filter((s) => {
    const matchesSearch = s.email.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "active") return s.active;
    if (filter === "inactive") return !s.active;
    return true;
  });

  const exportCSV = () => {
    const rows = [
      ["Email", "Estado", "Fecha de suscripción"],
      ...filtered.map((s) => [
        s.email,
        s.active ? "Activo" : "Inactivo",
        new Date(s.createdAt).toLocaleDateString("es-AR"),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = () => {
    const emails = filtered.filter((s) => s.active).map((s) => s.email).join(", ");
    navigator.clipboard.writeText(emails);
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
        <input
          type="search"
          placeholder="Buscar email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] max-w-xs rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                filter === f
                  ? "bg-[#08234e] text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
              }`}
            >
              {{ all: "Todos", active: "Activos", inactive: "Inactivos" }[f]}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={copyEmails}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500 hover:border-slate-400 hover:text-[#08234e] transition-all"
          >
            <Mail size={12} />
            Copiar emails activos
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 rounded-lg bg-[#08234e] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0d3a80] transition-colors"
          >
            <Download size={12} />
            Exportar CSV
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Mail size={32} className="text-slate-200 mb-3" />
          <p className="text-sm font-medium text-slate-400">No hay suscriptores</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                  Email
                </th>
                <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                  Estado
                </th>
                <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                  Suscripción
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-sm font-medium text-[#08234e]">{sub.email}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                        sub.active
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {sub.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-400">
                    {new Date(sub.createdAt).toLocaleDateString("es-AR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50">
        <p className="text-xs text-slate-400">
          {filtered.length} suscriptor{filtered.length !== 1 ? "es" : ""}
          {filter !== "all" && ` • filtro: ${filter === "active" ? "activos" : "inactivos"}`}
        </p>
      </div>
    </div>
  );
}
