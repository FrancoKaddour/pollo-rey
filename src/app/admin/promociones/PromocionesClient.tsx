"use client";

import { useState, useTransition } from "react";
import {
  createPromotion,
  updatePromotion,
  togglePromotion,
  deletePromotion,
} from "@/app/admin/_actions/promotions";
import { Plus, X, Pencil, Trash2, Eye, EyeOff, Megaphone } from "lucide-react";

interface Promotion {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  badgeText: string | null;
  active: boolean;
  startDate: Date;
  endDate: Date;
}

const emptyForm = {
  title: "",
  description: "",
  imageUrl: "",
  badgeText: "",
  active: true,
  startDate: "",
  endDate: "",
};

function toDateInput(date: Date): string {
  return new Date(date).toISOString().split("T")[0];
}

export function PromocionesClient({ promotions: initial }: { promotions: Promotion[] }) {
  const [promotions, setPromotions] = useState(initial);
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
      const res = await createPromotion(form);
      if (res.ok) {
        setShowCreate(false);
        setForm(emptyForm);
        window.location.reload();
      } else {
        setError(res.error ?? "Error");
      }
    });
  };

  const startEdit = (p: Promotion) => {
    setEditingId(p.id);
    setEditForm({
      title: p.title,
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      badgeText: p.badgeText ?? "",
      active: p.active,
      startDate: toDateInput(p.startDate),
      endDate: toDateInput(p.endDate),
    });
  };

  const handleUpdate = (id: string) => {
    setError("");
    startTransition(async () => {
      const res = await updatePromotion(id, editForm);
      if (res.ok) {
        window.location.reload();
      } else {
        setError(res.error ?? "Error");
      }
    });
  };

  const handleToggle = (id: string, active: boolean) => {
    setPromotions((prev) => prev.map((p) => (p.id === id ? { ...p, active } : p)));
    startTransition(async () => {
      await togglePromotion(id, active);
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deletePromotion(id);
      if (res.ok) {
        setPromotions((prev) => prev.filter((p) => p.id !== id));
        setDeletingId(null);
      } else {
        setError(res.error ?? "Error");
        setDeletingId(null);
      }
    });
  };

  const PromoFormFields = ({
    values,
    onChange,
  }: {
    values: typeof emptyForm;
    onChange: (updates: Partial<typeof emptyForm>) => void;
  }) => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Título *
        </label>
        <input
          required
          value={values.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="2x1 en pollos los viernes"
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Descripción
        </label>
        <textarea
          rows={2}
          value={values.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Descripción de la promo…"
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Badge (ej: -20%, HOY SOLO)
        </label>
        <input
          value={values.badgeText}
          onChange={(e) => onChange({ badgeText: e.target.value })}
          placeholder="-20%"
          maxLength={30}
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          URL de imagen
        </label>
        <input
          type="url"
          value={values.imageUrl}
          onChange={(e) => onChange({ imageUrl: e.target.value })}
          placeholder="https://…"
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Fecha inicio *
        </label>
        <input
          required
          type="date"
          value={values.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
          Fecha fin *
        </label>
        <input
          required
          type="date"
          value={values.endDate}
          onChange={(e) => onChange({ endDate: e.target.value })}
          className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-3.5 py-2.5 text-sm outline-none focus:border-[#08234e] transition-colors"
        />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={values.active}
            onChange={(e) => onChange({ active: e.target.checked })}
            className="h-4 w-4 rounded accent-[#08234e]"
          />
          <span className="text-sm font-bold text-slate-600">Activa (visible en el sitio)</span>
        </label>
      </div>
    </div>
  );

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
            <h2 className="text-sm font-bold text-[#08234e]">Nueva promoción</h2>
            <button type="button" onClick={() => setShowCreate(false)} className="text-slate-400">
              <X size={16} />
            </button>
          </div>
          <PromoFormFields values={form} onChange={(u) => setForm((p) => ({ ...p, ...u }))} />
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#08234e] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0d3a80] transition-colors disabled:opacity-50"
            >
              {isPending ? "Creando…" : "Crear promoción"}
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded-xl border-2 border-slate-100 px-5 py-2.5 text-sm font-bold text-slate-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-xl bg-white border-2 border-dashed border-slate-200 px-5 py-3 text-sm font-bold text-slate-400 hover:border-[#CC1414] hover:text-[#CC1414] transition-all w-full"
        >
          <Plus size={16} />
          Agregar promoción
        </button>
      )}

      {/* Promotions grid */}
      {promotions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 text-center shadow-sm">
          <Megaphone size={32} className="text-slate-200 mb-3" />
          <p className="text-sm font-bold text-slate-400">No hay promociones</p>
          <p className="text-xs text-slate-300 mt-1">Creá una promo para activarla en el carrusel del sitio</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`rounded-2xl bg-white shadow-sm overflow-hidden border-t-4 ${
                promo.active ? "border-t-[#CC1414]" : "border-t-slate-200"
              }`}
            >
              {editingId === promo.id ? (
                <div className="p-5 space-y-4">
                  <PromoFormFields
                    values={editForm}
                    onChange={(u) => setEditForm((p) => ({ ...p, ...u }))}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(promo.id)}
                      disabled={isPending}
                      className="rounded-xl bg-[#08234e] px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
                    >
                      {isPending ? "Guardando…" : "Guardar"}
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-500"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {promo.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={promo.imageUrl}
                      alt={promo.title}
                      className="h-36 w-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-black text-[#08234e]">{promo.title}</p>
                        {promo.description && (
                          <p className="text-xs text-slate-400 mt-0.5">{promo.description}</p>
                        )}
                      </div>
                      {promo.badgeText && (
                        <span className="shrink-0 rounded-full bg-[#CC1414] px-2.5 py-0.5 text-[0.65rem] font-black text-white">
                          {promo.badgeText}
                        </span>
                      )}
                    </div>

                    <p className="text-[0.65rem] text-slate-400 mb-4">
                      {new Date(promo.startDate).toLocaleDateString("es-AR")} →{" "}
                      {new Date(promo.endDate).toLocaleDateString("es-AR")}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggle(promo.id, !promo.active)}
                        disabled={isPending}
                        className={`flex h-7 w-7 items-center justify-center rounded-lg transition-all ${
                          promo.active
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                        title={promo.active ? "Desactivar" : "Activar"}
                      >
                        {promo.active ? <Eye size={13} /> : <EyeOff size={13} />}
                      </button>
                      <button
                        onClick={() => startEdit(promo)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-[#08234e] hover:text-white transition-all"
                      >
                        <Pencil size={13} />
                      </button>
                      {deletingId === promo.id ? (
                        <div className="flex gap-1 ml-auto">
                          <button
                            onClick={() => setDeletingId(null)}
                            className="rounded-lg bg-slate-100 px-2 py-1.5 text-xs font-bold text-slate-500"
                          >
                            No
                          </button>
                          <button
                            onClick={() => handleDelete(promo.id)}
                            disabled={isPending}
                            className="rounded-lg bg-red-500 px-2 py-1.5 text-xs font-bold text-white"
                          >
                            Sí
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeletingId(promo.id)}
                          className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-red-100 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
