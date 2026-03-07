// ─── Tipos del dominio de POLLO REY ──────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  comparePrice: number | null;
  imageUrl: string;
  categoryId: string;
  category?: Category;
  active: boolean;
  featured: boolean;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  notes: string | null;
  zone: string | null;
  status: OrderStatus;
  total: number;
  items?: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Promotion {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  badgeText: string | null;
  active: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
}

// ─── Carrito ──────────────────────────────────────────────────────────────────

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  unit: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

// ─── Formularios ─────────────────────────────────────────────────────────────

export interface CheckoutFormData {
  customerName: string;
  phone: string;
  notes?: string;
  zone?: string;
}

export interface NewsletterFormData {
  email: string;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
