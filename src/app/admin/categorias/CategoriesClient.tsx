"use client";

import { useState, useTransition } from "react";
import { createCategory, updateCategory, deleteCategory } from "@/app/admin/_actions/categories";
import { slugify } from "@/lib/utils";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  active: boolean;
  _count: { products: number };
}

interface Props {
  categories: Category[];
}

const emptyForm = { name: "", slug: "", description: "", order: 0, active: true };

export function CategoriesClient({ categories: initial }: Props) {
  const [categories, setCategories] = useState(initial);
  const [isPending, startTransition] = useTransition();
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(emptyForm);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const res = await createCategory({
        ...form,
        slug: form.slug || slugify(form.name),
      });
      if (res.ok) {
        setShowCreate(false);
        setForm(emptyForm);
        window.location.reload();
      } else {
        setError(res.error ?? "Error");
      }
    });
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description ?? "",
      order: cat.order,
      active: cat.active,
    });
  };

  const handleUpdate = (id: string) => {
    setError("");
    startTransition(async () => {
      const res = await updateCategory(id, editForm);
      if (res.ok) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === id
              ? { ...c, ...editForm, description: editForm.description || null }
              : c
          )
        );
        setEditingId(null);
      } else {
        setError(res.error ?? "Error");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteCategory(id);
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setDeletingId(null);
      } else {
        setError(res.error ?? "Error");
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Create form */}
      {showCreate ? (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl bg-white p-6 shadow-sm border-2 border-[#08234e]/10 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#08234e]">Nueva categoría</h2>
            <button
              type="button"
              onClick={() => { setShowCreate(false); setForm(emptyForm); }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Nombre *
              </label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({
                  ...p,
                  name: e.target.value,
                  slug: p.slug === "" ? slugify(e.target.value) : p.slug,
                }))}
                placeholder="Pollo"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                placeholder="pollo"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm font-mono outline-none focus:border-[#08234e] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Descripción
              </label>
              <input
                value={form.description}
                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                placeholder="Descripción opcional"
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Orden
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#08234e] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0d3a80] transition-colors disabled:opacity-50"
            >
              {isPending ? "Creando…" : "Crear categoría"}
            </button>
            <button
              type="button"
              onClick={() => { setShowCreate(false); setForm(emptyForm); }}
              className="rounded-xl border-2 border-slate-100 px-5 py-2.5 text-sm font-bold text-slate-400 hover:border-slate-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-white border-2 border-dashed border-slate-200 px-5 py-3 text-sm font-bold text-slate-400 hover:border-[#08234e] hover:text-[#08234e] transition-all w-full"
        >
          <Plus size={16} />
          Agregar categoría
        </button>
      )}

      {/* Categories grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-2xl bg-white p-5 shadow-sm">
            {editingId === cat.id ? (
              <div className="space-y-3">
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border-2 border-slate-100 bg-slate-50 px-3 py-2 text-sm font-bold outline-none focus:border-[#08234e] transition-colors"
                />
                <input
                  value={editForm.description}
                  onChange={(e) => setEditForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Descripción"
                  className="w-full rounded-lg border-2 border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#08234e] transition-colors"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[0.6rem] font-bold uppercase tracking-wider text-slate-400">Orden</label>
                    <input
                      type="number"
                      value={editForm.order}
                      onChange={(e) => setEditForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))}
                      className="w-full rounded-lg border-2 border-slate-100 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-[#08234e] transition-colors"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                      <input
                        type="checkbox"
                        checked={editForm.active}
                        onChange={(e) => setEditForm((p) => ({ ...p, active: e.target.checked }))}
                        className="h-4 w-4 rounded accent-[#08234e]"
                      />
                      <span className="text-xs font-bold text-slate-500">Activa</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    disabled={isPending}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-400"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-[#08234e] truncate">{cat.name}</p>
                      {!cat.active && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.6rem] font-bold text-slate-400">
                          Inactiva
                        </span>
                      )}
                    </div>
                    {cat.description && (
                      <p className="text-xs text-slate-400 mt-0.5 truncate">{cat.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full bg-[#08234e]/5 px-2.5 py-1 text-xs font-black text-[#08234e]">
                    {cat._count.products}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[0.65rem] font-mono text-slate-300">/{cat.slug}</p>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => startEdit(cat)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-[#08234e] hover:text-white transition-all"
                    >
                      <Pencil size={12} />
                    </button>
                    {deletingId === cat.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => setDeletingId(null)}
                          className="rounded-lg bg-slate-100 px-1.5 py-1 text-[0.6rem] font-bold text-slate-500"
                        >
                          No
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={isPending}
                          className="rounded-lg bg-red-500 px-1.5 py-1 text-[0.6rem] font-bold text-white"
                        >
                          Sí
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(cat.id)}
                        disabled={cat._count.products > 0}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        title={cat._count.products > 0 ? "No se puede eliminar: tiene productos" : "Eliminar"}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
