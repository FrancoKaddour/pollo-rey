"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/admin/_actions/products";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

interface ProductData {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  imageUrl: string;
  categoryId: string;
  active: boolean;
  featured: boolean;
  unit: string;
}

interface Props {
  categories: Category[];
  product?: ProductData;
}

const UNITS = ["unidad", "kg", "500g", "docena", "bandeja", "paquete", "litro", "bolsa"];

export function ProductForm({ categories, product }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    comparePrice: product?.comparePrice?.toString() ?? "",
    imageUrl: product?.imageUrl ?? "",
    categoryId: product?.categoryId ?? "",
    active: product?.active ?? true,
    featured: product?.featured ?? false,
    unit: product?.unit ?? "unidad",
  });

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: prev.slug === "" || prev.slug === slugify(prev.name) ? slugify(name) : prev.slug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const data = {
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || undefined,
      price: parseFloat(form.price),
      comparePrice: form.comparePrice ? parseFloat(form.comparePrice) : undefined,
      imageUrl: form.imageUrl || undefined,
      categoryId: form.categoryId,
      active: form.active,
      featured: form.featured,
      unit: form.unit,
    };

    startTransition(async () => {
      const res = product?.id
        ? await updateProduct(product.id, data)
        : await createProduct(data);

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push("/admin/productos"), 800);
      } else {
        setError(res.error ?? "Error desconocido");
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl mb-3">
          ✓
        </div>
        <p className="font-bold text-[#4467a9]">
          {product ? "Producto actualizado" : "Producto creado"} con éxito
        </p>
        <p className="text-xs text-slate-400 mt-1">Redirigiendo…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Name + Slug */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Información básica
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Pollo Entero"
              className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Slug (URL)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              placeholder="pollo-entero"
              className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm font-mono text-slate-600 outline-none focus:border-[#4467a9] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Descripción
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            placeholder="Descripción corta del producto…"
            className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all resize-none"
          />
        </div>
      </div>

      {/* Price + Category + Unit */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Precio y categoría
        </h2>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Precio <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">$</span>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="1500"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 pl-7 pr-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Precio tachado
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.comparePrice}
                onChange={(e) => setForm((p) => ({ ...p, comparePrice: e.target.value }))}
                placeholder="2000"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 pl-7 pr-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Unidad <span className="text-red-400">*</span>
            </label>
            <select
              value={form.unit}
              onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))}
              className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Categoría <span className="text-red-400">*</span>
          </label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))}
            className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
          >
            <option value="">Seleccioná una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Image */}
      <div className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Imagen
        </h2>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            URL de la imagen
          </label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
            placeholder="https://..."
            className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-[#4467a9] outline-none focus:border-[#4467a9] focus:bg-white transition-all"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Pegá la URL de la imagen (CDN, Cloudinary, etc.)
          </p>
        </div>
        {form.imageUrl && (
          <div className="h-32 w-32 rounded-xl overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.imageUrl} alt="Preview" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
          </div>
        )}
      </div>

      {/* Toggles */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          Visibilidad
        </h2>
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-[#4467a9]">Activo</p>
              <p className="text-xs text-slate-400">Visible en el catálogo de la tienda</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
              className={`relative h-6 w-11 rounded-full transition-colors ${form.active ? "bg-[#4467a9]" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.active ? "translate-x-5.5" : "translate-x-0.5"}`}
                style={{ transform: form.active ? "translateX(22px)" : "translateX(2px)" }}
              />
            </button>
          </label>

          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="text-sm font-bold text-[#4467a9]">Destacado</p>
              <p className="text-xs text-slate-400">Aparece en el carrusel de la home</p>
            </div>
            <button
              type="button"
              onClick={() => setForm((p) => ({ ...p, featured: !p.featured }))}
              className={`relative h-6 w-11 rounded-full transition-colors ${form.featured ? "bg-amber-400" : "bg-slate-200"}`}
            >
              <span
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform"
                style={{ transform: form.featured ? "translateX(22px)" : "translateX(2px)" }}
              />
            </button>
          </label>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-[#4467a9] px-8 py-3 font-display text-sm font-black uppercase tracking-widest text-white hover:bg-[#0d3a80] transition-all disabled:opacity-50 shadow-sm"
        >
          {isPending ? "Guardando…" : product ? "Guardar cambios" : "Crear producto"}
        </button>
        <a
          href="/admin/productos"
          className="rounded-xl border-2 border-slate-100 px-6 py-3 text-sm font-bold text-slate-400 hover:border-slate-300 hover:text-slate-600 transition-all"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
