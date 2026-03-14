"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toggleProductField, deleteProduct } from "@/app/admin/_actions/products";
import { formatPrice } from "@/lib/utils";
import { Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  active: boolean;
  featured: boolean;
  unit: string;
  imageUrl: string;
  category: { name: string };
}

interface Props {
  products: Product[];
}

export function ProductsTableClient({ products: initial }: Props) {
  const [products, setProducts] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "featured">("all");
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.name.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === "active") return p.active;
    if (filter === "inactive") return !p.active;
    if (filter === "featured") return p.featured;
    return true;
  });

  const handleToggle = (id: string, field: "active" | "featured", value: boolean) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
    startTransition(async () => {
      await toggleProductField(id, field, value);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteProduct(id);
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(res.error);
      }
      setDeletingId(null);
    });
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
        <input
          type="search"
          placeholder="Buscar producto o categoría…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] max-w-xs rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
        <div className="flex gap-1.5">
          {(["all", "active", "inactive", "featured"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                filter === f
                  ? "bg-[#08234e] text-white"
                  : "bg-white border border-slate-200 text-slate-500 hover:border-slate-400"
              }`}
            >
              {{ all: "Todos", active: "Activos", inactive: "Inactivos", featured: "Destacados" }[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-5 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                Producto
              </th>
              <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                Categoría
              </th>
              <th className="px-4 py-3.5 text-left text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                Precio
              </th>
              <th className="px-4 py-3.5 text-center text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                Activo
              </th>
              <th className="px-4 py-3.5 text-center text-[0.65rem] font-bold uppercase tracking-widest text-slate-400">
                Destacado
              </th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-slate-400 font-medium">
                  No se encontraron productos
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {/* Image placeholder */}
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-[#f1ead0] flex items-center justify-center text-[0.6rem] font-black text-[#08234e]/30 overflow-hidden">
                        {product.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          product.name.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#08234e]">{product.name}</p>
                        <p className="text-[0.65rem] text-slate-400 font-mono">{product.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                      {product.category.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-[#08234e]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleToggle(product.id, "active", !product.active)}
                      disabled={isPending}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        product.active
                          ? "bg-green-100 text-green-600 hover:bg-green-200"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                      title={product.active ? "Desactivar" : "Activar"}
                    >
                      {product.active ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleToggle(product.id, "featured", !product.featured)}
                      disabled={isPending}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                        product.featured
                          ? "bg-amber-100 text-amber-500 hover:bg-amber-200"
                          : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                      }`}
                      title={product.featured ? "Quitar destacado" : "Marcar como destacado"}
                    >
                      <Star size={14} fill={product.featured ? "currentColor" : "none"} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/productos/${product.id}/editar`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-[#08234e] hover:text-white transition-all"
                      >
                        <Pencil size={13} />
                      </Link>
                      {deletingId === product.id ? (
                        <div className="flex gap-1">
                          <button
                            onClick={() => setDeletingId(null)}
                            className="rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-bold text-slate-500"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={isPending}
                            className="rounded-lg bg-red-500 px-2 py-1.5 text-xs font-bold text-white"
                          >
                            Sí
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50">
        <p className="text-xs text-slate-400">
          Mostrando {filtered.length} de {products.length} productos
        </p>
      </div>
    </div>
  );
}
