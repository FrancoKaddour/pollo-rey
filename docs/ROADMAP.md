# POLLO REY — Roadmap de Desarrollo

## FASE 1 — SETUP Y FUNDACIÓN (Semana 1)

### Sprint 1.1 — Inicialización del Proyecto
- [ ] `npx create-next-app@latest pollo-rey --typescript --tailwind --app`
- [ ] Configurar ESLint + Prettier + Husky (pre-commit hooks)
- [ ] Configurar Tailwind con design tokens de marca
- [ ] Instalar dependencias: Framer Motion, GSAP, Zustand, Prisma, Zod
- [ ] Setup variables de entorno (.env.local + .env.example)
- [ ] Crear estructura de carpetas completa

### Sprint 1.2 — Base de Datos
- [ ] Configurar Vercel Postgres (o Supabase free tier)
- [ ] Escribir schema.prisma con todos los modelos
- [ ] Ejecutar primera migración: `npx prisma migrate dev`
- [ ] Crear seed.ts con categorías y productos de ejemplo
- [ ] Verificar conexión y modelos con Prisma Studio

### Sprint 1.3 — Layout Base y Design System
- [ ] Navbar responsive (desktop + mobile hamburger)
- [ ] Footer completo
- [ ] Tokens de color y tipografía en Tailwind
- [ ] Componentes UI base: Button, Badge, Input, Skeleton
- [ ] Cargar fuentes: Syne (display) + Inter (body) via next/font

---

## FASE 2 — TIENDA PÚBLICA (Semana 2)

### Sprint 2.1 — Home Page
- [ ] Hero Section con GSAP SplitText animation
- [ ] Sección "Productos Destacados" con Framer Motion stagger
- [ ] Banner de promoción animado
- [ ] Sección "Historia de Marca" con ScrollTrigger parallax
- [ ] Newsletter form con validación y feedback
- [ ] Metadata SEO completa del home

### Sprint 2.2 — Catálogo de Productos
- [ ] API Route: GET /api/products?category=xxx
- [ ] Página de catálogo con ISR (revalidate: 60)
- [ ] ProductCard componente con hover animations
- [ ] CategoryTabs sticky con filtrado
- [ ] ProductGrid con Framer Motion stagger
- [ ] Skeleton loaders para loading states

### Sprint 2.3 — Detalle de Producto
- [ ] Página dinámica /productos/[slug]
- [ ] Galería de imágenes con zoom
- [ ] Botón "Agregar al Carrito" con microinteracción
- [ ] Productos relacionados (misma categoría)
- [ ] Schema.org Product markup
- [ ] Metadata dinámica por producto

---

## FASE 3 — CARRITO Y CHECKOUT (Semana 3)

### Sprint 3.1 — Carrito (Zustand)
- [ ] cartStore.ts: add, remove, updateQty, clear, total
- [ ] CartDrawer: slide-in desde derecha con Framer Motion
- [ ] CartItem: foto + nombre + qty controls + subtotal
- [ ] CartIcon en navbar con badge de cantidad
- [ ] Persistencia en localStorage
- [ ] Página /carrito como fallback sin JS

### Sprint 3.2 — Checkout y WhatsApp
- [ ] CheckoutForm: nombre + teléfono (React Hook Form + Zod)
- [ ] Resumen del pedido (read-only)
- [ ] whatsapp.ts: función generadora de URL wa.me
- [ ] Guardar pedido en BD (POST /api/orders)
- [ ] Botón "Enviar por WhatsApp" con confirmación modal
- [ ] Página de éxito post-pedido

---

## FASE 4 — ADMIN DASHBOARD (Semana 4)

### Sprint 4.1 — Autenticación Admin
- [ ] NextAuth.js con credentials provider
- [ ] Página /admin/login
- [ ] Middleware de protección de rutas /admin/*
- [ ] Seed del primer usuario admin

### Sprint 4.2 — CRUD Productos y Categorías
- [ ] Layout del dashboard con sidebar
- [ ] Stats cards: pedidos, productos, suscriptores
- [ ] Tabla de productos con búsqueda y paginación
- [ ] Formulario crear/editar producto
- [ ] Upload de imágenes a Cloudinary
- [ ] Toggle activo/inactivo inline
- [ ] CRUD de categorías

### Sprint 4.3 — Pedidos y Estadísticas
- [ ] Tabla de pedidos con filtros por estado
- [ ] Cambio de estado de pedidos
- [ ] Gráfico de pedidos por día (Recharts)
- [ ] Tabla de suscriptores newsletter
- [ ] Exportar pedidos a CSV (simple)

---

## FASE 5 — SEO, PERFORMANCE Y LAUNCH (Semana 5)

### Sprint 5.1 — SEO Completo
- [ ] Metadata API en todas las páginas
- [ ] OpenGraph images dinámicas (/api/og)
- [ ] sitemap.xml dinámico con next-sitemap
- [ ] robots.txt
- [ ] JSON-LD: FoodEstablishment + Product schemas
- [ ] Canonical URLs
- [ ] Hreflang si aplica

### Sprint 5.2 — Performance
- [ ] Auditoría Lighthouse (target: 90+)
- [ ] Optimización de imágenes: WebP + lazy load
- [ ] Bundle analysis: `@next/bundle-analyzer`
- [ ] Reducir JavaScript no crítico
- [ ] Prefetch de rutas frecuentes

### Sprint 5.3 — QA y Deploy
- [ ] Testing cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Testing mobile (iOS Safari, Android Chrome)
- [ ] Deploy en Vercel con dominio custom
- [ ] Variables de entorno en producción
- [ ] Configurar Analytics (Vercel Analytics + GA4)
- [ ] Test de flujo completo: catálogo → carrito → checkout → WhatsApp

---

## FASE 6 — MEJORAS FUTURAS (Post-launch)

| Feature                         | Prioridad | Notas                            |
|---------------------------------|-----------|----------------------------------|
| Pago online (MercadoPago)       | Alta      | Fase 2 del negocio               |
| App móvil (React Native)        | Media     | Reutiliza API backend            |
| Sistema de reviews/ratings      | Media     | Social proof                     |
| Loyalty program / puntos        | Media     | Retención de clientes            |
| Multi-sucursal                  | Baja      | Si el negocio escala             |
| Integración delivery (Rappi)    | Media     | API de terceros                  |
| Chat en vivo                    | Baja      | Widget Crisp o similar           |
| Push notifications              | Media     | Promociones a suscriptores       |

---

## ESTIMACIÓN DE TIEMPO

| Fase    | Descripción              | Duración estimada |
|---------|--------------------------|-------------------|
| Fase 1  | Setup y fundación        | 1 semana          |
| Fase 2  | Tienda pública           | 1 semana          |
| Fase 3  | Carrito y checkout       | 1 semana          |
| Fase 4  | Admin dashboard          | 1 semana          |
| Fase 5  | SEO, perf y launch       | 1 semana          |
| **Total** | **MVP completo**       | **~5 semanas**    |

---

## COMANDOS DE INICIO RÁPIDO

```bash
# 1. Crear proyecto Next.js
npx create-next-app@latest pollo-rey \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd pollo-rey

# 2. Instalar dependencias core
npm install framer-motion gsap @gsap/react zustand @tanstack/react-query
npm install prisma @prisma/client
npm install next-auth bcryptjs
npm install react-hook-form @hookform/resolvers zod
npm install sharp cloudinary

# 3. Dependencias de desarrollo
npm install -D @types/bcryptjs prisma

# 4. Inicializar Prisma
npx prisma init

# 5. Primera migración (después de editar schema.prisma)
npx prisma migrate dev --name init

# 6. Abrir Prisma Studio
npx prisma studio

# 7. Correr en desarrollo
npm run dev
```
