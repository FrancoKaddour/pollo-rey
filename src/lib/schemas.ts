import { z } from "zod";

// ─── Checkout ─────────────────────────────────────────────────────────────────
export const checkoutSchema = z.object({
  customerName: z
    .string()
    .min(2, "Ingresá tu nombre completo")
    .max(100, "Nombre demasiado largo"),
  phone: z
    .string()
    .min(8, "Ingresá un teléfono válido")
    .max(20, "Teléfono demasiado largo")
    .regex(/^[\d\s\-\+\(\)]+$/, "Solo números, espacios y guiones"),
  notes: z.string().max(300, "Máximo 300 caracteres").optional(),
  zone: z.string().optional(),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

// ─── Newsletter ───────────────────────────────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;

// ─── Admin — Producto ─────────────────────────────────────────────────────────
export const productSchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(120),
  slug: z.string().min(2).max(120).optional(),
  description: z.string().max(600).optional(),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  comparePrice: z.coerce.number().positive().optional().nullable(),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1, "Seleccioná una categoría"),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  unit: z.string().default("unidad"),
});

export type ProductSchema = z.infer<typeof productSchema>;

// ─── Admin — Categoría ────────────────────────────────────────────────────────
export const categorySchema = z.object({
  name: z.string().min(2, "Nombre requerido").max(80),
  slug: z.string().min(2).max(80).optional(),
  description: z.string().max(300).optional(),
  imageUrl: z.string().optional(),
  order: z.coerce.number().int().default(0),
  active: z.boolean().default(true),
});

export type CategorySchema = z.infer<typeof categorySchema>;

// ─── Admin — Login ────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña requerida"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
