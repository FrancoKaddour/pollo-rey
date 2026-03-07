import { type ClassValue, clsx } from "clsx";

/**
 * Combina clases CSS de forma condicional (clsx sin twMerge por ahora).
 * Para Tailwind v4 no se necesita twMerge dado que los conflictos son menos comunes.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Convierte un string en slug URL-friendly */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/** Formatea un precio en pesos argentinos */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/** Trunca un texto a N caracteres */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}
