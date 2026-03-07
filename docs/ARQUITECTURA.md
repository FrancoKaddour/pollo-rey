# POLLO REY — Arquitectura Completa del Proyecto

## 1. STACK TECNOLOGICO

### Frontend
| Tecnología        | Versión  | Propósito                              |
|-------------------|----------|----------------------------------------|
| Next.js           | 14+ (App Router) | Framework React SSR/SSG/ISR      |
| React             | 18+      | UI Library                             |
| TypeScript        | 5+       | Tipado estático                        |
| TailwindCSS       | 3+       | Estilos utility-first                  |
| Framer Motion     | 11+      | Animaciones declarativas React         |
| GSAP              | 3+       | Animaciones avanzadas / ScrollTrigger  |
| Zustand           | 4+       | Estado global (carrito, sesión)        |
| React Query       | 5+       | Data fetching y caché                  |
| React Hook Form   | 7+       | Formularios con validación             |
| Zod               | 3+       | Validación de schemas                  |

### Backend / API
| Tecnología        | Propósito                              |
|-------------------|----------------------------------------|
| Next.js API Routes | API REST integrada en el mismo proyecto |
| Prisma ORM        | ORM type-safe para PostgreSQL          |
| PostgreSQL        | Base de datos relacional principal     |
| NextAuth.js       | Autenticación (usuarios + admin)       |
| bcryptjs          | Hash de contraseñas                    |
| Sharp             | Optimización de imágenes server-side   |
| Resend / Nodemailer | Envío de emails (newsletter)         |

### Infraestructura
| Servicio          | Propósito                              |
|-------------------|----------------------------------------|
| Vercel            | Hosting + Edge Network + CI/CD         |
| Vercel Postgres   | PostgreSQL managed (o Supabase)        |
| Vercel Blob / Cloudinary | CDN de imágenes                |
| Vercel Analytics  | Performance monitoring                 |

### SEO & Performance
| Herramienta       | Propósito                              |
|-------------------|----------------------------------------|
| Next.js Metadata API | Meta tags, OpenGraph, Twitter Cards |
| Next-sitemap      | Generación de sitemap.xml              |
| Schema.org JSON-LD | Structured data markup                |
| next/image        | Optimización automática de imágenes    |
| next/font         | Optimización de fuentes                |

---

## 2. ESTRUCTURA DE CARPETAS

```
pollo-rey/
├── .env.local                    # Variables de entorno
├── .env.example                  # Template de variables
├── next.config.js                # Configuración Next.js
├── tailwind.config.ts            # Configuración Tailwind + tokens
├── tsconfig.json
├── prisma/
│   ├── schema.prisma             # Modelo de base de datos
│   ├── seed.ts                   # Datos iniciales
│   └── migrations/               # Historial de migraciones
│
├── public/
│   ├── images/
│   │   ├── hero/                 # Imágenes del hero
│   │   ├── products/             # Imágenes de productos
│   │   └── brand/                # Logo, favicon, og-image
│   ├── fonts/                    # Fuentes locales
│   ├── sitemap.xml
│   └── robots.txt
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout + providers
│   │   ├── page.tsx              # HOME
│   │   ├── globals.css
│   │   │
│   │   ├── (store)/              # Route group — tienda pública
│   │   │   ├── productos/
│   │   │   │   ├── page.tsx      # Catálogo de productos
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Detalle de producto
│   │   │   ├── carrito/
│   │   │   │   └── page.tsx      # Carrito de compras
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx      # Checkout → WhatsApp
│   │   │   ├── auth/             # Autenticación pública
│   │   │   │   ├── login/page.tsx
│   │   │   │   ├── registro/page.tsx
│   │   │   │   ├── recuperar-password/page.tsx
│   │   │   │   └── nueva-password/page.tsx
│   │   │   ├── cuenta/           # Área privada del usuario (requiere auth)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx      # Dashboard personal
│   │   │   │   ├── perfil/page.tsx
│   │   │   │   ├── pedidos/page.tsx
│   │   │   │   ├── pedidos/[id]/page.tsx
│   │   │   │   ├── direcciones/page.tsx
│   │   │   │   ├── puntos/page.tsx
│   │   │   │   ├── recompensas/page.tsx
│   │   │   │   └── eliminar-cuenta/page.tsx
│   │   │   ├── referidos/
│   │   │   │   └── page.tsx      # Landing de referidos
│   │   │   ├── nosotros/
│   │   │   │   └── page.tsx
│   │   │   └── contacto/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (admin)/              # Route group — panel admin
│   │   │   ├── layout.tsx        # Layout del dashboard
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx      # Dashboard principal
│   │   │   │   ├── productos/
│   │   │   │   │   ├── page.tsx  # Lista de productos
│   │   │   │   │   ├── nuevo/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── categorias/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── pedidos/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── promociones/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── clientes/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── [id]/page.tsx  # Perfil + historial + puntos
│   │   │   │   └── fidelizacion/
│   │   │   │       ├── page.tsx       # Dashboard del programa
│   │   │   │       ├── recompensas/page.tsx
│   │   │   │       └── config/page.tsx
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                  # API Routes
│   │       ├── auth/
│   │       │   └── [...nextauth]/route.ts
│   │       ├── products/
│   │       │   ├── route.ts      # GET lista, POST crear
│   │       │   └── [id]/
│   │       │       └── route.ts  # GET, PUT, DELETE
│   │       ├── categories/
│   │       │   └── route.ts
│   │       ├── orders/
│   │       │   └── route.ts      # POST crear pedido
│   │       ├── users/
│   │       │   ├── route.ts      # POST registro
│   │       │   └── [id]/
│   │       │       ├── route.ts  # GET perfil, PUT editar, DELETE cuenta
│   │       │       └── addresses/route.ts
│   │       ├── loyalty/
│   │       │   ├── route.ts      # GET cuenta de puntos
│   │       │   ├── redeem/route.ts
│   │       │   └── transactions/route.ts
│   │       ├── rewards/
│   │       │   └── route.ts      # GET catálogo de recompensas
│   │       ├── newsletter/
│   │       │   └── route.ts      # POST suscribir
│   │       └── promotions/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                   # Componentes base reutilizables
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Toast.tsx
│   │   │
│   │   ├── layout/               # Layout principal
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── CartIcon.tsx
│   │   │
│   │   ├── home/                 # Secciones del home
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── PromoBanner.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   ├── Newsletter.tsx
│   │   │   └── CallToAction.tsx
│   │   │
│   │   ├── products/             # Catálogo y tarjetas
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   └── CategoryTabs.tsx
│   │   │
│   │   ├── cart/                 # Carrito
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   │
│   │   ├── checkout/             # Checkout
│   │   │   ├── CheckoutForm.tsx
│   │   │   └── WhatsAppButton.tsx
│   │   │
│   │   ├── account/              # Área privada del usuario
│   │   │   ├── AccountDashboard.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── AddressCard.tsx
│   │   │   ├── AddressForm.tsx
│   │   │   ├── OrderHistory.tsx
│   │   │   ├── DeleteAccountModal.tsx
│   │   │   └── ReferralCard.tsx
│   │   ├── loyalty/              # Programa de fidelización
│   │   │   ├── LoyaltyCard.tsx   # Tarjeta visual de nivel (tipo crédito)
│   │   │   ├── PointsBalance.tsx
│   │   │   ├── PointsHistory.tsx
│   │   │   ├── TierProgress.tsx  # Barra de progreso al siguiente tier
│   │   │   ├── RewardCatalog.tsx
│   │   │   ├── RewardCard.tsx
│   │   │   ├── PointsRedeemer.tsx # Canje en checkout
│   │   │   └── TierBadge.tsx     # Badge BRONCE/PLATA/ORO/REY
│   │   ├── auth/                 # Forms de autenticación
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   └── SocialLoginButtons.tsx
│   │   └── admin/                # Dashboard admin
│   │       ├── Sidebar.tsx
│   │       ├── StatsCard.tsx
│   │       ├── ProductTable.tsx
│   │       ├── OrdersTable.tsx
│   │       ├── ProductForm.tsx
│   │       └── Charts.tsx
│   │
│   ├── lib/
│   │   ├── prisma.ts             # Cliente Prisma singleton
│   │   ├── auth.ts               # Config NextAuth (usuarios + admin)
│   │   ├── loyalty.ts            # Lógica de puntos, tiers, canje
│   │   ├── whatsapp.ts           # Generador de mensaje WhatsApp
│   │   ├── seo.ts                # Helpers de metadata
│   │   ├── schemas.ts            # Schemas Zod
│   │   └── utils.ts              # Utilidades generales
│   │
│   ├── hooks/
│   │   ├── useCart.ts            # Hook del carrito (Zustand)
│   │   ├── useUser.ts            # Sesión y perfil del usuario
│   │   ├── useLoyalty.ts         # React Query — puntos y recompensas
│   │   ├── useProducts.ts        # React Query — productos
│   │   ├── useAnimations.ts      # GSAP / Framer hooks
│   │   └── useWhatsApp.ts        # Generador URL WhatsApp
│   │
│   ├── store/
│   │   └── cartStore.ts          # Zustand store del carrito
│   │
│   ├── types/
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── category.ts
│   │   ├── user.ts
│   │   ├── loyalty.ts
│   │   └── index.ts
│   │
│   └── styles/
│       └── animations.css        # Animaciones CSS custom
│
└── docs/
    ├── ARQUITECTURA.md           # Este archivo
    ├── DATABASE.md               # Modelo de BD
    ├── FLUJO-PEDIDOS.md          # Flujo checkout WhatsApp
    └── ROADMAP.md                # Plan de desarrollo
```

---

## 3. DESIGN TOKENS (Tailwind Config)

```typescript
// tailwind.config.ts
colors: {
  brand: {
    navy:  '#08234e',   // Primary
    cream: '#f1ead0',   // Secondary
    gold:  '#d4a843',   // Accent
    red:   '#c0392b',   // CTA / urgencia
  }
}

fontFamily: {
  sans:    ['Inter', 'sans-serif'],        // Body
  display: ['Syne', 'sans-serif'],         // Headings
  mono:    ['JetBrains Mono', 'monospace'],
}
```

---

## 4. MODELO DE BASE DE DATOS (PostgreSQL / Prisma)

> Ver detalle completo del sistema de usuarios y fidelización en [USUARIOS-Y-FIDELIZACION.md](./USUARIOS-Y-FIDELIZACION.md)

### Diagrama de entidades
```
AdminUser
User ──── Address
     ──── Session / Account (NextAuth)
     ──── Order ──── OrderItem ──── Product ──── Category
     ──── LoyaltyAccount
     ──── PointsTransaction
     ──── RewardRedemption ──── Reward
Newsletter
Promotion
Referral
```

```prisma
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

model Product {
  id            String      @id @default(cuid())
  name          String
  slug          String      @unique
  description   String?
  price         Float
  comparePrice  Float?      // Precio tachado para promos
  imageUrl      String
  images        String[]    // Galería adicional
  categoryId    String
  category      Category    @relation(fields: [categoryId], references: [id])
  active        Boolean     @default(true)
  featured      Boolean     @default(false)
  stock         Int?        // null = sin límite
  unit          String      @default("unidad")  // kg, unidad, docena
  orderItems    OrderItem[]
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

model Promotion {
  id          String    @id @default(cuid())
  title       String
  description String?
  discount    Float     // Porcentaje
  imageUrl    String?
  active      Boolean   @default(true)
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime  @default(now())
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String?   // null si usa OAuth
  name          String
  phone         String?
  birthDate     DateTime?
  active        Boolean   @default(true)
  deletedAt     DateTime? // Soft delete
  addresses     Address[]
  orders        Order[]
  loyalty       LoyaltyAccount?
  pointsHistory PointsTransaction[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model LoyaltyAccount {
  id            String      @id @default(cuid())
  userId        String      @unique
  user          User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  points        Int         @default(0)
  totalEarned   Int         @default(0)
  totalRedeemed Int         @default(0)
  tier          LoyaltyTier @default(BRONCE)
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
}

enum LoyaltyTier { BRONCE PLATA ORO REY }

model PointsTransaction {
  id          String                @id @default(cuid())
  userId      String
  user        User                  @relation(fields: [userId], references: [id], onDelete: Cascade)
  type        PointsTransactionType
  points      Int
  description String
  orderId     String?
  expiresAt   DateTime?
  createdAt   DateTime              @default(now())
}

enum PointsTransactionType {
  EARNED_PURCHASE EARNED_BIRTHDAY EARNED_REFERRAL EARNED_WELCOME
  REDEEMED_DISCOUNT EXPIRED ADMIN_ADJUSTMENT
}

model Reward {
  id            String             @id @default(cuid())
  name          String
  description   String?
  pointsCost    Int
  discountType  RewardDiscountType
  discountValue Float
  active        Boolean            @default(true)
  stock         Int?
  createdAt     DateTime           @default(now())
}

enum RewardDiscountType { FIXED_AMOUNT PERCENTAGE FREE_PRODUCT }

model RewardRedemption {
  id          String   @id @default(cuid())
  userId      String
  rewardId    String
  pointsSpent Int
  code        String   @unique
  used        Boolean  @default(false)
  usedAt      DateTime?
  expiresAt   DateTime
  createdAt   DateTime @default(now())
}

model Order {
  id           String      @id @default(cuid())
  userId       String?     // null = pedido sin cuenta
  user         User?       @relation(fields: [userId], references: [id])
  customerName String
  phone        String
  notes        String?
  redeemCode   String?     // Código de canje aplicado
  discount     Float?      // Descuento por puntos
  status       OrderStatus @default(PENDING)
  total        Float
  items        OrderItem[]
  createdAt    DateTime    @default(now())
  updatedAt    DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PREPARING
  READY
  DELIVERED
  CANCELLED
}

model OrderItem {
  id        String  @id @default(cuid())
  orderId   String
  order     Order   @relation(fields: [orderId], references: [id])
  productId String
  product   Product @relation(fields: [productId], references: [id])
  quantity  Int
  unitPrice Float
  subtotal  Float
}

model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hash
  name      String
  role      AdminRole @default(EDITOR)
  createdAt DateTime @default(now())
}

enum AdminRole {
  SUPER_ADMIN
  EDITOR
}
```

---

## 5. FLUJO DE PEDIDO — CHECKOUT WHATSAPP

```
[CLIENTE NAVEGA CATÁLOGO]
        ↓
[Selecciona productos → Agrega al carrito]
        ↓
[Carrito — revisa y edita cantidades]
        ↓
[Checkout — ingresa nombre + teléfono]
        ↓
[La web genera mensaje WhatsApp estructurado]
        ↓
[Click "Confirmar Pedido" → abre wa.me/...]
        ↓
[WhatsApp abre con mensaje pre-cargado]
        ↓
[El admin recibe el pedido en WhatsApp Business]
        ↓
[Admin confirma manualmente]
```

### Formato del mensaje WhatsApp:
```
Hola POLLO REY! Quiero hacer un pedido:

*PEDIDO*
---------------------
Nombre: Juan Pérez
Teléfono: +54 11 1234-5678

*PRODUCTOS:*
• 2x Pollo Entero — $4.800
• 1x Papas Fritas 1kg — $1.200
• 3x Huevos (docena) — $2.700

---------------------
*TOTAL ESTIMADO: $8.700*

Pedido para HOY (sin horario exacto)

Muchas gracias!
```

---

## 6. SECCIONES DEL SITIO — DISEÑO UX/UI

### HOME
- **Hero**: Video/imagen full-screen con overlay, título animado GSAP, CTA "Ver Productos"
- **Productos Destacados**: Grid 4 cols con cards animadas (Framer Motion stagger)
- **Banner Promo**: Sección CTA de fondo brand-navy con texto impactante
- **Historia de Marca**: Split layout imagen/texto con scroll trigger GSAP
- **Newsletter**: Form minimalista con feedback animado
- **Footer**: Links, redes, WhatsApp

### PRODUCTOS
- Filtros por categoría (tabs sticky)
- Grid responsive 2/3/4 cols
- Cards con hover: zoom imagen + aparición precio
- Skeleton loaders mientras carga

### CARRITO (Drawer lateral)
- Abre como slide-in desde la derecha
- Lista de items con foto, nombre, cantidad, subtotal
- Botones +/- para editar cantidad
- Total sticky abajo
- CTA "Ir al Checkout"

### CHECKOUT
- Form: Nombre completo + Teléfono
- Resumen del pedido (read-only)
- Botón verde "Enviar Pedido por WhatsApp" (ícono WhatsApp)

### ADMIN DASHBOARD
- Sidebar colapsable
- Stats cards: Pedidos hoy, Productos activos, Suscriptores
- Tabla de productos con CRUD inline
- Tabla de pedidos con cambio de estado
- Gráfico de pedidos por día (Recharts)

---

## 7. ANIMACIONES

### Framer Motion — Variantes base
```typescript
// Aparición de cards
export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

// Stagger de grids
export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

// Hover de tarjeta
export const cardHover = {
  scale: 1.03,
  boxShadow: '0 20px 60px rgba(8,35,78,0.15)',
  transition: { duration: 0.2 }
}
```

### GSAP — ScrollTrigger
```typescript
// Hero title split text
gsap.from('.hero-title span', {
  y: 120, opacity: 0, duration: 1.2,
  stagger: 0.08, ease: 'power4.out',
  scrollTrigger: { trigger: '.hero', start: 'top center' }
})

// Parallax secciones
gsap.to('.parallax-img', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: { scrub: true }
})
```

---

## 8. SEO — CONFIGURACIÓN

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: { template: '%s | Pollo Rey', default: 'Pollo Rey — Pollería Premium' },
  description: 'La mejor pollería de la zona. Pollo fresco, cortes especiales, y más.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://pollorey.com.ar',
    siteName: 'Pollo Rey',
    images: [{ url: '/images/brand/og-image.jpg', width: 1200, height: 630 }]
  },
  twitter: { card: 'summary_large_image' }
}

// Schema.org para Google
const schema = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Pollo Rey",
  "servesCuisine": "Pollo, Comida Rápida",
  "hasMenu": "https://pollorey.com.ar/productos",
  "telephone": "+54XXXXXXXXXX",
  "address": { "@type": "PostalAddress", "addressCountry": "AR" }
}
```

---

## 9. PERFORMANCE TARGETS

| Métrica         | Target    |
|-----------------|-----------|
| LCP             | < 2.0s    |
| FID / INP       | < 100ms   |
| CLS             | < 0.1     |
| TTI             | < 3.0s    |
| Lighthouse      | 90+       |
| Tamaño bundle   | < 150KB   |

### Estrategias:
- `next/image` con WebP/AVIF automático
- Lazy loading en cards fuera del viewport
- Fuentes con `font-display: swap` + next/font
- Code splitting automático por route
- ISR (Incremental Static Regeneration) en catálogo
- Edge Runtime para API routes críticas

---

## 10. CHECKOUT CON PUNTOS — FLUJO ACTUALIZADO

```
[Usuario autenticado en checkout]
        ↓
[Sistema detecta puntos disponibles]
        ↓
[Muestra banner: "Tenés 1.240 pts = $620 de descuento"]
        ↓
[Usuario elige cuántos puntos usar]
        ↓
[Descuento aplicado al total + código de canje generado]
        ↓
[Mensaje WhatsApp incluye código: "Canje: PXJ7K2 — Descuento: $500"]
        ↓
[Admin verifica y aplica descuento — confirma pedido]
        ↓
[Sistema acredita puntos ganados por la compra al usuario]
```

---

## 11. VARIABLES DE ENTORNO

```bash
# .env.local

# Base de datos
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# WhatsApp Business
WHATSAPP_PHONE="5491XXXXXXXXX"  # número sin + ni espacios

# Storage de imágenes
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."

# Email (newsletter)
RESEND_API_KEY="..."
EMAIL_FROM="hola@pollorey.com.ar"

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# OAuth (opcional, para login con Google)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Programa de puntos
LOYALTY_WELCOME_POINTS=100
LOYALTY_BIRTHDAY_POINTS=200
LOYALTY_REFERRAL_POINTS=150
LOYALTY_BASE_RATE=1          # 1 pto por cada $100
LOYALTY_EXPIRY_MONTHS=12     # Inactividad para vencer puntos
```
