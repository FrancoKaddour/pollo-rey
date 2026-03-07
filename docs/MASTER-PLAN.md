# POLLO REY — Master Plan Definitivo

> Saavedra, Buenos Aires, Argentina
> Cobertura: CABA + Vicente López
> Objetivo: el ecommerce de pollería más moderno de Buenos Aires

---

## DECISION ESTRATEGICA: LAS 3 FASES

```
FASE 1 — MVP          FASE 2 — CRECIMIENTO     FASE 3 — MARCA FUERTE
──────────────────    ──────────────────────    ─────────────────────
2-4 semanas           +4 semanas                +8 semanas

Catálogo              Cuentas de usuario        App móvil
Carrito               Sistema de puntos         Multi-sucursal
Pedido WhatsApp       Historial pedidos         Analytics avanzado
Admin dashboard       Zonas de delivery         Suscripciones
Newsletter            Promociones avanzadas     Integración delivery
SEO base              App móvil simple          Reviews / ratings
```

**Regla de oro:** lanzar con lo mínimo que genere valor real. El tiempo al mercado es más importante que el feature set completo.

---

## FUNCIONALIDADES ELIMINADAS DEL MVP

Las siguientes features fueron descartadas para MVP y movidas a Fase 2/3:

| Feature eliminada del MVP         | Por qué    | Fase |
|-----------------------------------|------------|------|
| Sistema de puntos / fidelización  | Complejidad alta, no crítico para primera venta | 2 |
| Cuentas de usuario (login)        | El checkout por WhatsApp no lo requiere | 2 |
| Historial de pedidos              | Depende de cuentas de usuario | 2 |
| Múltiples direcciones             | Depende de cuentas | 2 |
| Referidos                         | Depende de cuentas | 2 |
| Regalo de cumpleaños              | Depende de puntos | 2 |
| Codes de canje                    | Depende de puntos | 2 |
| OAuth / Google login              | No crítico en MVP | 2 |
| Zonas de delivery configurables   | MVP valida si hay demanda primero | 2 |
| GraphQL                           | REST es suficiente y más simple | — |
| React Query                       | Server Components de Next.js 14 cubren esto | — |
| Recharts / gráficos complejos     | Stats básicas son suficientes para MVP | 2 |

---

## STACK TECNOLOGICO DEFINITIVO — MVP

### Principio: mínima superficie, máximo impacto

```
Frontend                    Backend                     Infra
────────────────────        ────────────────────        ────────────────────
Next.js 14 App Router       Next.js API Routes          Vercel (free → pro)
TypeScript                  Prisma ORM                  Vercel Postgres
TailwindCSS                 PostgreSQL                  Vercel Blob (imágenes)
Framer Motion               NextAuth.js (solo admin)    Vercel Analytics
GSAP (solo hero)            bcryptjs
Zustand (solo carrito)      Resend (emails)
React Hook Form + Zod
```

### Por qué esta elección es ganadora:
- **Un solo repositorio**, un solo deploy, cero DevOps
- **Vercel Postgres + Blob** evitan configurar servicios externos en MVP
- **Next.js App Router** reemplaza React Query con Server Components nativos
- **GSAP solo en el hero** — el resto es Framer Motion (más simple de mantener)

---

## ARQUITECTURA DEFINITIVA MVP

```
pollo-rey/
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── images/brand/         # logo, favicon, og-image
│   └── images/hero/          # imagen/video del hero
│
└── src/
    ├── app/
    │   │
    │   ├── layout.tsx                    # Root layout + providers
    │   ├── page.tsx                      # HOME
    │   ├── globals.css
    │   │
    │   ├── (store)/                      # Tienda pública
    │   │   ├── productos/
    │   │   │   ├── page.tsx              # Catálogo
    │   │   │   └── [slug]/page.tsx       # Detalle de producto
    │   │   ├── carrito/page.tsx          # Carrito
    │   │   ├── checkout/page.tsx         # Checkout → WhatsApp
    │   │   ├── nosotros/page.tsx
    │   │   └── contacto/page.tsx
    │   │
    │   ├── (admin)/                      # Panel admin
    │   │   ├── layout.tsx                # Layout protegido
    │   │   ├── admin/
    │   │   │   ├── page.tsx              # Dashboard + stats
    │   │   │   ├── productos/
    │   │   │   │   ├── page.tsx
    │   │   │   │   ├── nuevo/page.tsx
    │   │   │   │   └── [id]/page.tsx
    │   │   │   ├── categorias/page.tsx
    │   │   │   ├── pedidos/page.tsx
    │   │   │   └── promociones/page.tsx
    │   │   └── login/page.tsx
    │   │
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts
    │       ├── products/
    │       │   ├── route.ts              # GET, POST
    │       │   └── [id]/route.ts         # GET, PUT, DELETE
    │       ├── categories/route.ts
    │       ├── orders/route.ts           # POST — guarda pedido en BD
    │       ├── newsletter/route.ts
    │       └── promotions/route.ts
    │
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Badge.tsx
    │   │   ├── Input.tsx
    │   │   ├── Modal.tsx
    │   │   └── Skeleton.tsx
    │   │
    │   ├── layout/
    │   │   ├── Navbar.tsx
    │   │   ├── Footer.tsx
    │   │   └── MobileMenu.tsx
    │   │
    │   ├── home/
    │   │   ├── HeroSection.tsx           # GSAP SplitText
    │   │   ├── FeaturedProducts.tsx      # Framer stagger
    │   │   ├── PromoBanner.tsx
    │   │   ├── BrandStory.tsx
    │   │   └── Newsletter.tsx
    │   │
    │   ├── products/
    │   │   ├── ProductCard.tsx           # Framer hover
    │   │   ├── ProductGrid.tsx
    │   │   ├── ProductFilters.tsx        # Tabs por categoría
    │   │   └── ProductDetail.tsx
    │   │
    │   ├── cart/
    │   │   ├── CartDrawer.tsx            # Framer slide-in
    │   │   ├── CartItem.tsx
    │   │   └── CartSummary.tsx
    │   │
    │   ├── checkout/
    │   │   ├── CheckoutForm.tsx
    │   │   └── WhatsAppButton.tsx
    │   │
    │   └── admin/
    │       ├── Sidebar.tsx
    │       ├── StatsCard.tsx
    │       ├── ProductTable.tsx
    │       ├── ProductForm.tsx
    │       └── OrdersTable.tsx
    │
    ├── lib/
    │   ├── prisma.ts
    │   ├── auth.ts
    │   ├── whatsapp.ts
    │   ├── seo.ts
    │   ├── schemas.ts
    │   └── utils.ts
    │
    ├── store/
    │   └── cartStore.ts                  # Zustand — carrito
    │
    ├── hooks/
    │   ├── useCart.ts
    │   └── useWhatsApp.ts
    │
    └── types/
        ├── product.ts
        ├── order.ts
        └── index.ts
```

**Total de componentes MVP: ~35 archivos.** Manejable para un equipo pequeño o developer individual.

---

## MODELO DE BASE DE DATOS — MVP (schema.prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── CATEGORÍAS ───────────────────────────────────
model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  imageUrl    String?
  order       Int       @default(0)
  active      Boolean   @default(true)
  products    Product[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// ─── PRODUCTOS ────────────────────────────────────
model Product {
  id           String      @id @default(cuid())
  name         String
  slug         String      @unique
  description  String?
  price        Float
  comparePrice Float?      // precio tachado (para promos)
  imageUrl     String
  images       String[]    // galería extra
  categoryId   String
  category     Category    @relation(fields: [categoryId], references: [id])
  active       Boolean     @default(true)
  featured     Boolean     @default(false)
  unit         String      @default("unidad") // kg, unidad, docena, paquete
  orderItems   OrderItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@index([categoryId])
  @@index([slug])
}

// ─── PEDIDOS ──────────────────────────────────────
model Order {
  id           String      @id @default(cuid())
  customerName String
  phone        String
  notes        String?
  zone         String?     // "CABA", "Vicente López", etc.
  status       OrderStatus @default(PENDING)
  total        Float
  items        OrderItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt

  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING     // recibido por WhatsApp
  CONFIRMED   // admin confirmó
  PREPARING   // en preparación
  READY       // listo para entrega/retiro
  DELIVERED   // entregado
  CANCELLED   // cancelado
}

// ─── ITEMS DE PEDIDO ──────────────────────────────
model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Float
  subtotal  Float
}

// ─── PROMOCIONES ──────────────────────────────────
model Promotion {
  id          String   @id @default(cuid())
  title       String
  description String?
  imageUrl    String?
  badgeText   String?  // "2x1", "-20%", "NUEVO"
  active      Boolean  @default(true)
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime @default(now())
}

// ─── NEWSLETTER ───────────────────────────────────
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

// ─── ADMIN ────────────────────────────────────────
model AdminUser {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String    // bcrypt hash
  name      String
  createdAt DateTime  @default(now())
}
```

**7 tablas. Cero sobre-ingeniería. Todo lo necesario para el MVP.**

---

## SEED DATA — Categorías y productos iniciales

```typescript
// prisma/seed.ts
const categories = [
  { name: 'Pollo',        slug: 'pollo',        order: 1 },
  { name: 'Cortes',       slug: 'cortes',       order: 2 },
  { name: 'Papas Fritas', slug: 'papas-fritas', order: 3 },
  { name: 'Hamburguesas', slug: 'hamburguesas', order: 4 },
  { name: 'Huevos',       slug: 'huevos',       order: 5 },
  { name: 'Despensa',     slug: 'despensa',     order: 6 },
  // Despensa: aceite, rebozador, carbón, sal, condimentos
]

const products = [
  // POLLO
  { name: 'Pollo Entero',        slug: 'pollo-entero',         unit: 'kg' },
  { name: 'Pollo Trozado',       slug: 'pollo-trozado',        unit: 'kg' },
  { name: 'Pollo sin Menudos',   slug: 'pollo-sin-menudos',    unit: 'unidad' },
  // CORTES
  { name: 'Pechuga sin Hueso',   slug: 'pechuga-sin-hueso',    unit: 'kg' },
  { name: 'Muslo y Contra',      slug: 'muslo-y-contra',       unit: 'kg' },
  { name: 'Alas',                slug: 'alas',                  unit: 'kg' },
  { name: 'Menudos',             slug: 'menudos',               unit: 'kg' },
  // PAPAS
  { name: 'Papas Fritas 1kg',    slug: 'papas-fritas-1kg',     unit: 'paquete' },
  { name: 'Papas Fritas 2.5kg',  slug: 'papas-fritas-2-5kg',   unit: 'paquete' },
  // HAMBURGUESAS
  { name: 'Hamburguesa de Pollo x4', slug: 'hamburguesa-pollo-x4', unit: 'pack' },
  // HUEVOS
  { name: 'Huevos Docena',       slug: 'huevos-docena',        unit: 'docena' },
  { name: 'Huevos Media Docena', slug: 'huevos-media-docena',  unit: 'media docena' },
  // DESPENSA
  { name: 'Aceite Girasol 1.5L', slug: 'aceite-girasol',       unit: 'botella' },
  { name: 'Rebozador 500g',      slug: 'rebozador',             unit: 'paquete' },
  { name: 'Carbón 3kg',          slug: 'carbon-3kg',            unit: 'bolsa' },
  { name: 'Sal Entrefina 1kg',   slug: 'sal-entrefina',         unit: 'paquete' },
]
```

---

## FLUJO DE PEDIDO — IMPLEMENTACION REAL

### Diagrama
```
CLIENTE                      SISTEMA                      NEGOCIO
──────                       ───────                      ───────
Navega catálogo
Agrega al carrito    →       Zustand store
                             (localStorage)
Ir a checkout
Completa nombre
y teléfono           →       Valida con Zod
                     →       POST /api/orders
                             Guarda en BD
                     →       Genera URL wa.me
Click "Confirmar"    →       Abre WhatsApp         →      Recibe mensaje
                             con mensaje                   pre-cargado
                             pre-cargado
                                                          Admin confirma
                                                   →      PATCH /api/orders/:id
                                                          status: CONFIRMED
```

### Generador de URL WhatsApp (lib/whatsapp.ts)

```typescript
interface OrderData {
  customerName: string
  phone: string
  items: Array<{ name: string; quantity: number; unitPrice: number }>
  total: number
  notes?: string
}

export function generateWhatsAppURL(order: OrderData, businessPhone: string): string {
  const lines = [
    `Hola *POLLO REY*! Quiero hacer un pedido 🛒`,
    ``,
    `*DATOS DEL PEDIDO*`,
    `━━━━━━━━━━━━━━━━━━`,
    `👤 Nombre: ${order.customerName}`,
    `📱 Teléfono: ${order.phone}`,
    ``,
    `*PRODUCTOS:*`,
    ...order.items.map(item =>
      `• ${item.quantity}x ${item.name} — $${(item.quantity * item.unitPrice).toLocaleString('es-AR')}`
    ),
    ``,
    `━━━━━━━━━━━━━━━━━━`,
    `💰 *TOTAL: $${order.total.toLocaleString('es-AR')}*`,
    ``,
    order.notes ? `📝 Nota: ${order.notes}` : '',
    ``,
    `_Pedido generado desde pollorey.com.ar_`,
  ].filter(Boolean).join('\n')

  const encoded = encodeURIComponent(lines)
  return `https://wa.me/${businessPhone}?text=${encoded}`
}
```

---

## ADMIN DASHBOARD — DISEÑO Y FUNCIONALIDADES

### Layout
```
┌─────────────────────────────────────────────────────────┐
│  POLLO REY Admin                          [nombre] [↩]  │
├──────────┬──────────────────────────────────────────────┤
│          │                                               │
│ Dashboard│   CONTENIDO PRINCIPAL                        │
│ Pedidos  │                                               │
│ Productos│                                               │
│ Categorías│                                             │
│ Promos   │                                               │
│ Newsletter│                                             │
│          │                                               │
└──────────┴──────────────────────────────────────────────┘
```

### Dashboard principal (/admin)
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Pedidos hoy  │ │ Facturación  │ │  Productos   │ │ Suscriptores │
│     12       │ │   $48.500    │ │  activos: 18 │ │     143      │
│  +3 vs ayer  │ │   hoy        │ │              │ │              │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

PEDIDOS RECIENTES
┌────────────┬────────────────┬──────────┬──────────┬────────────┐
│ #ID        │ Cliente        │ Total    │ Estado   │ Acciones   │
├────────────┼────────────────┼──────────┼──────────┼────────────┤
│ #PR001     │ Juan Pérez     │ $4.800   │ PENDIENTE│ [Confirmar]│
│ #PR002     │ María García   │ $2.200   │ CONFIRMADO│ [Listo]   │
└────────────┴────────────────┴──────────┴──────────┴────────────┘
```

### Gestión de pedidos (/admin/pedidos)
- Tabla con filtros: Todos / Pendientes / Confirmados / Listos / Entregados
- Click en pedido: ver detalle completo + botones de cambio de estado
- Cada estado cambia el color del badge visualmente

### Gestión de productos (/admin/productos)
- Tabla: imagen, nombre, categoría, precio, estado (on/off toggle), acciones
- Formulario inline o modal para crear/editar
- Upload de imagen directo a Vercel Blob
- Slug auto-generado desde el nombre

### Stats mínimas del dashboard
```typescript
// Queries simples, sin librerías de analytics
const stats = await Promise.all([
  prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
  prisma.order.aggregate({ where: { createdAt: { gte: startOfDay } }, _sum: { total: true } }),
  prisma.product.count({ where: { active: true } }),
  prisma.newsletter.count(),
  // Top 5 productos más vendidos (última semana)
  prisma.orderItem.groupBy({
    by: ['productId'],
    _sum: { quantity: true },
    where: { order: { createdAt: { gte: startOfWeek } } },
    orderBy: { _sum: { quantity: 'desc' } },
    take: 5,
  }),
])
```

---

## DISEÑO UX/UI — COMPONENTES CLAVE

### Design Tokens
```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        brand: {
          navy:   '#08234e',  // primario — fondos, texto principal
          cream:  '#f1ead0',  // secundario — fondos alternos, highlights
          gold:   '#c9a84c',  // acento — precios, badges, CTA especiales
          red:    '#c0392b',  // urgencia — "Agotado", descuentos
          light:  '#f8f6ef',  // fondo general de la tienda
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],   // headings, hero
        sans:    ['Inter', 'sans-serif'],  // body
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      }
    }
  }
}
```

### ProductCard — spec de diseño
```
┌─────────────────────────────┐
│                             │  ← imagen 4:3, object-cover
│         [IMAGEN]            │     zoom suave en hover
│                             │
├─────────────────────────────┤
│  [badge categoría]          │
│  Nombre del Producto        │  ← font-display, semibold
│  Descripción corta...       │  ← 2 líneas max, text-sm
│                             │
│  $4.800     [+ Agregar]     │  ← precio gold, botón navy
└─────────────────────────────┘
```

### Animaciones MVP (solo las necesarias)
```typescript
// Hero: GSAP SplitText (1 animación, máximo impacto)
gsap.from(chars, { y: 80, opacity: 0, stagger: 0.04, duration: 1, ease: 'power4.out' })

// Product cards: Framer Motion stagger al entrar en viewport
const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } }

// Cart drawer: Framer Motion slide
<motion.div
  initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
/>

// Hover en cards: solo CSS (más performante que JS para hover masivo)
// .product-card:hover .product-image { transform: scale(1.04); }
```

---

## SEO — IMPLEMENTACION MVP

```typescript
// src/lib/seo.ts
export const siteMeta = {
  name:        'Pollo Rey',
  title:       'Pollo Rey — Pollería Premium en Saavedra, Buenos Aires',
  description: 'Pollo fresco, cortes especiales y más. Pedidos online con entrega en CABA y Vicente López. ¡Pedí por WhatsApp!',
  url:         'https://pollorey.com.ar',
  locale:      'es_AR',
  ogImage:     '/images/brand/og-image.jpg', // 1200x630
}

// app/layout.tsx — metadata global
export const metadata: Metadata = {
  title:       { template: '%s | Pollo Rey', default: siteMeta.title },
  description: siteMeta.description,
  openGraph:   { type: 'website', locale: 'es_AR', siteName: 'Pollo Rey' },
  robots:      { index: true, follow: true },
  alternates:  { canonical: siteMeta.url },
}

// app/productos/[slug]/page.tsx — metadata dinámica por producto
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  return {
    title:       product.name,
    description: product.description ?? `Comprá ${product.name} online. Entrega en CABA y Vicente López.`,
    openGraph:   { images: [{ url: product.imageUrl }] }
  }
}
```

### Schema.org para Google
```html
<!-- JSON-LD en layout.tsx -->
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  "name": "Pollo Rey",
  "description": "Pollería premium en Saavedra, Buenos Aires",
  "areaServed": ["CABA", "Vicente López"],
  "telephone": "+54XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Saavedra",
    "addressLocality": "Buenos Aires",
    "addressCountry": "AR"
  },
  "hasMap": "https://maps.google.com/?q=Saavedra+Buenos+Aires",
  "openingHours": "Mo-Sa 08:00-20:00"
})}</script>
```

---

## ROADMAP DE DESARROLLO — MVP (4 semanas)

### SEMANA 1 — Fundación

| Día | Tarea |
|-----|-------|
| 1-2 | Setup: `create-next-app`, Tailwind config, Prisma init, Vercel Postgres |
| 3   | schema.prisma + migración + seed de categorías y productos |
| 4   | Navbar + Footer + layout base + fuentes + design tokens |
| 5   | Componentes UI base: Button, Badge, Input, Skeleton, Modal |

### SEMANA 2 — Tienda pública

| Día | Tarea |
|-----|-------|
| 1   | Home: HeroSection con GSAP (título animado) |
| 2   | Home: FeaturedProducts + PromoBanner + Newsletter |
| 3   | Página Productos: grid + filtros por categoría + ProductCard |
| 4   | Detalle de producto + metadata SEO dinámica |
| 5   | SEO: sitemap, robots.txt, JSON-LD |

### SEMANA 3 — Carrito y Checkout

| Día | Tarea |
|-----|-------|
| 1   | cartStore.ts (Zustand) + persistencia localStorage |
| 2   | CartDrawer (slide-in) + CartItem + CartSummary |
| 3   | CheckoutForm (React Hook Form + Zod) |
| 4   | lib/whatsapp.ts + POST /api/orders + flujo completo |
| 5   | Testing del flujo end-to-end + página de nosotros + contacto |

### SEMANA 4 — Admin y Launch

| Día | Tarea |
|-----|-------|
| 1   | NextAuth admin + login page + middleware de protección |
| 2   | Admin: dashboard stats + tabla de pedidos |
| 3   | Admin: CRUD productos + upload imagen a Vercel Blob |
| 4   | Admin: categorías + promociones + newsletter list |
| 5   | Deploy Vercel + dominio + variables de entorno + QA final |

---

## FEATURES MVP — LISTA DEFINITIVA

### Incluidas en MVP

**Tienda pública**
- [x] Home con hero animado (GSAP SplitText)
- [x] Sección de productos destacados (Framer Motion)
- [x] Banner de promociones
- [x] Sección historia de marca
- [x] Newsletter (captura de email)
- [x] Catálogo de productos con filtros por categoría
- [x] Detalle de producto
- [x] Carrito (drawer lateral, Zustand, persistente)
- [x] Checkout: nombre + teléfono + notas
- [x] Envío automático a WhatsApp con mensaje estructurado
- [x] Guardado del pedido en BD
- [x] Página Nosotros
- [x] Página Contacto con mapa y WhatsApp
- [x] Footer completo

**Admin dashboard**
- [x] Login seguro (NextAuth + bcrypt)
- [x] Dashboard: stats del día (pedidos, facturación, productos, suscriptores)
- [x] Top 5 productos más vendidos
- [x] Tabla de pedidos con cambio de estado
- [x] CRUD completo de productos
- [x] Upload de imágenes
- [x] CRUD de categorías
- [x] Crear y gestionar promociones
- [x] Lista de suscriptores newsletter

**Técnico**
- [x] SEO completo: metadata, OpenGraph, sitemap, schema.org
- [x] Performance: next/image, lazy load, ISR
- [x] Responsive: mobile-first
- [x] TypeScript estricto

---

## FEATURES FASE 2 — POST-LANZAMIENTO

*Activar después de validar que el negocio funciona online*

**Cuentas de usuario**
- [ ] Registro e inicio de sesión (email/contraseña)
- [ ] Perfil editable
- [ ] Historial de pedidos
- [ ] Repetir pedido anterior
- [ ] Múltiples direcciones de entrega
- [ ] Recuperar contraseña

**Fidelización**
- [ ] Sistema de puntos por compra
- [ ] Niveles: Bronce / Plata / Oro / Rey
- [ ] Catálogo de recompensas
- [ ] Canje de puntos en checkout
- [ ] Bonus de cumpleaños
- [ ] Programa de referidos

**Operaciones**
- [ ] Zonas de delivery configurables (CABA / V. López / etc.)
- [ ] Horarios de atención configurables
- [ ] Disponibilidad de stock por producto
- [ ] Notificaciones por email al cliente (confirmación de pedido)
- [ ] Exportar pedidos a CSV

---

## FEATURES FASE 3 — MARCA FUERTE

*Activar al superar ~100 pedidos/mes y validar demanda*

**Escala**
- [ ] Multi-sucursal (selección de sede en checkout)
- [ ] App móvil (React Native, reutiliza API)
- [ ] Sistema de delivery propio con tracking

**Growth**
- [ ] Integración con plataformas de delivery (PedidosYa, Rappi)
- [ ] Reviews y calificaciones de productos
- [ ] Analytics avanzado (cohorts, LTV, churn)
- [ ] Push notifications (promos)
- [ ] Programa de suscripción mensual (caja de productos)

**Operaciones avanzadas**
- [ ] POS interno (para despacho en mostrador)
- [ ] Gestión de inventario con alertas de stock
- [ ] Módulo contable básico

---

## VARIABLES DE ENTORNO — MVP

```bash
# .env.local

# Base de datos (Vercel Postgres)
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."  # para migraciones

# NextAuth (admin)
NEXTAUTH_SECRET="genera con: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp Business
NEXT_PUBLIC_WHATSAPP_PHONE="5491XXXXXXXXX"  # sin + ni espacios

# Vercel Blob (imágenes)
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Email newsletter
RESEND_API_KEY="re_..."
NEXT_PUBLIC_EMAIL_FROM="hola@pollorey.com.ar"

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

---

## COMANDOS PARA INICIAR EL PROYECTO HOY

```bash
# 1. Crear proyecto
npx create-next-app@latest pollo-rey \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd pollo-rey

# 2. Dependencias MVP (sin extras)
npm install \
  framer-motion \
  gsap \
  @gsap/react \
  zustand \
  prisma \
  @prisma/client \
  next-auth \
  bcryptjs \
  react-hook-form \
  @hookform/resolvers \
  zod \
  resend \
  @vercel/blob

npm install -D \
  @types/bcryptjs \
  prisma

# 3. Inicializar Prisma
npx prisma init --datasource-provider postgresql

# 4. Fuentes (Google Fonts via next/font)
# Syne + Inter — se importan en src/app/layout.tsx

# 5. Dev server
npm run dev
```

---

## RECOMENDACIONES PARA ESCALAR A FUTURO

### Arquitectura
1. **Separar frontend y backend** cuando el tráfico supere ~10k visitas/mes — migrar API a un servicio independiente (Node.js + Express o Fastify)
2. **Redis para sesiones y caché** — reducir carga en PostgreSQL para productos y categorías
3. **Queue para pedidos** (BullMQ) — cuando el volumen de pedidos sea alto, evitar pérdidas
4. **CDN de imágenes** — migrar de Vercel Blob a Cloudinary cuando se necesite transformación avanzada

### Base de datos
5. **Read replicas** — cuando las lecturas superen las escrituras significativamente
6. **Particionado por fecha** en tabla `Order` — a partir de ~1M de registros
7. **Full-text search** con Postgres `tsvector` o Meilisearch para búsqueda de productos

### Negocio
8. **Validar primero con WhatsApp** — no implementar pagos online hasta confirmar que el canal digital genera ventas reales
9. **Newsletter antes que redes** — el email propio es el activo más valioso, capturarlo desde el día 1
10. **Lanzar con 1 sucursal** — la arquitectura multi-sucursal agrega semanas de desarrollo; validar demanda antes
11. **Google My Business** — completar el perfil desde el día 1, es tráfico orgánico gratis para una pollería local
12. **Dominio .com.ar** — más confianza para clientes argentinos vs .com genérico
```
