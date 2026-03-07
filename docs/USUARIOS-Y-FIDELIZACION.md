# POLLO REY — Sistema de Cuentas y Programa de Fidelización

---

## 1. MODELO DE BASE DE DATOS — AMPLIADO

```prisma
// ─────────────────────────────────────────────
// USUARIO (cliente de la tienda)
// ─────────────────────────────────────────────
model User {
  id              String    @id @default(cuid())
  email           String    @unique
  emailVerified   DateTime?
  password        String?           // null si usa OAuth (Google, etc.)
  name            String
  phone           String?
  avatarUrl       String?
  birthDate       DateTime?         // Para regalo de cumpleaños
  active          Boolean   @default(true)
  deletedAt       DateTime?         // Soft delete (RGPD/privacidad)

  // Relaciones
  addresses       Address[]
  orders          Order[]
  loyalty         LoyaltyAccount?
  pointsHistory   PointsTransaction[]
  sessions        Session[]
  accounts        Account[]         // NextAuth OAuth accounts

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([email])
}

// ─────────────────────────────────────────────
// DIRECCIÓN DE ENTREGA (múltiples por usuario)
// ─────────────────────────────────────────────
model Address {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  label       String   @default("Casa")   // "Casa", "Trabajo", etc.
  street      String
  number      String
  apartment   String?
  city        String
  province    String
  zipCode     String?
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
}

// ─────────────────────────────────────────────
// SESIONES (NextAuth — requerido)
// ─────────────────────────────────────────────
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expires      DateTime
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  @@unique([provider, providerAccountId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ─────────────────────────────────────────────
// PROGRAMA DE FIDELIZACIÓN — CUENTA DE PUNTOS
// ─────────────────────────────────────────────
model LoyaltyAccount {
  id              String    @id @default(cuid())
  userId          String    @unique
  user            User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  points          Int       @default(0)     // Puntos actuales disponibles
  totalEarned     Int       @default(0)     // Puntos ganados de por vida
  totalRedeemed   Int       @default(0)     // Puntos canjeados de por vida

  tier            LoyaltyTier @default(BRONCE)
  tierUpdatedAt   DateTime    @default(now())

  // Control de regalo de cumpleaños
  birthdayBonusSentYear Int?    // año en que se envió el último bono

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

enum LoyaltyTier {
  BRONCE    // 0 – 999 pts acumulados
  PLATA     // 1.000 – 4.999 pts acumulados
  ORO       // 5.000 – 14.999 pts acumulados
  REY       // 15.000+ pts acumulados (tier premium de marca)
}

// ─────────────────────────────────────────────
// HISTORIAL DE MOVIMIENTOS DE PUNTOS
// ─────────────────────────────────────────────
model PointsTransaction {
  id          String              @id @default(cuid())
  userId      String
  user        User                @relation(fields: [userId], references: [id], onDelete: Cascade)

  type        PointsTransactionType
  points      Int                 // positivo = ganó, negativo = canjeó
  description String              // texto legible: "Pedido #ABC123", "Canje descuento"
  orderId     String?             // referencia al pedido si aplica
  order       Order?              @relation(fields: [orderId], references: [id])
  expiresAt   DateTime?           // si los puntos tienen vencimiento

  createdAt   DateTime @default(now())
}

enum PointsTransactionType {
  EARNED_PURCHASE      // Compra
  EARNED_BIRTHDAY      // Regalo cumpleaños
  EARNED_REFERRAL      // Referido
  EARNED_WELCOME       // Bienvenida al registrarse
  EARNED_REVIEW        // Por dejar una reseña (futuro)
  REDEEMED_DISCOUNT    // Canje por descuento en pedido
  EXPIRED              // Vencimiento de puntos
  ADMIN_ADJUSTMENT     // Ajuste manual por admin
}

// ─────────────────────────────────────────────
// RECOMPENSAS CANJEABLES (catálogo de premios)
// ─────────────────────────────────────────────
model Reward {
  id            String   @id @default(cuid())
  name          String                    // "Descuento $500", "Pollo gratis"
  description   String?
  pointsCost    Int                       // Puntos necesarios para canjear
  discountType  RewardDiscountType
  discountValue Float                     // $ o %
  imageUrl      String?
  active        Boolean  @default(true)
  stock         Int?                      // null = ilimitado
  redemptions   RewardRedemption[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

enum RewardDiscountType {
  FIXED_AMOUNT    // Descuento fijo en $
  PERCENTAGE      // Descuento en %
  FREE_PRODUCT    // Producto gratis (futuro)
}

// ─────────────────────────────────────────────
// REGISTRO DE CANJES
// ─────────────────────────────────────────────
model RewardRedemption {
  id          String   @id @default(cuid())
  userId      String
  rewardId    String
  reward      Reward   @relation(fields: [rewardId], references: [id])
  pointsSpent Int
  code        String   @unique   // Código único para aplicar en checkout
  used        Boolean  @default(false)
  usedAt      DateTime?
  expiresAt   DateTime           // Código válido por X días
  createdAt   DateTime @default(now())
}

// ─────────────────────────────────────────────
// REFERIDOS
// ─────────────────────────────────────────────
model Referral {
  id              String    @id @default(cuid())
  referrerId      String                         // quien refirió
  referredId      String    @unique              // quien fue referido
  pointsAwarded   Boolean   @default(false)      // ya se otorgaron los puntos
  createdAt       DateTime  @default(now())
}
```

---

## 2. REGLAS DEL PROGRAMA DE PUNTOS

### Acumulación
| Acción                          | Puntos ganados              |
|---------------------------------|-----------------------------|
| Registro de cuenta              | +100 pts (bienvenida)       |
| Cada $100 de compra             | +1 pto (ratio base)         |
| Cumpleaños (mes de nacimiento)  | +200 pts automáticos        |
| Referir un amigo (que compre)   | +150 pts al referidor       |
| Primer pedido del referido      | +50 pts al nuevo usuario    |

> **Nota**: El ratio de puntos por compra se puede configurar desde el admin (ej: 1 pto cada $50 en tier ORO).

### Tiers y beneficios acumulativos
| Tier    | Puntos acumulados | Ratio compra         | Beneficio extra                   |
|---------|-------------------|----------------------|-----------------------------------|
| BRONCE  | 0 – 999           | $100 = 1 pto         | —                                 |
| PLATA   | 1.000 – 4.999     | $100 = 1.5 pts       | Acceso anticipado a promociones   |
| ORO     | 5.000 – 14.999    | $100 = 2 pts         | Envío prioritario + descuento 5%  |
| REY     | 15.000+           | $100 = 3 pts         | Descuento 10% + regalo mensual    |

### Canje
- 100 puntos = $50 de descuento (ratio fijo)
- Canje mínimo: 200 puntos
- Canje máximo por pedido: 50% del total
- Los puntos canjeados generan un **código único** válido 7 días

### Vencimiento
- Los puntos vencen si la cuenta no tiene actividad por 12 meses
- 30 días antes del vencimiento, el sistema envía un email de alerta

---

## 3. FLUJO DE CANJE EN CHECKOUT

```
[Usuario en checkout]
        ↓
[Tiene puntos disponibles? → muestra banner "Tenés X puntos = $Y descuento"]
        ↓
[Usuario elige cuántos puntos usar (slider o input)]
        ↓
[Sistema genera código de canje único]
        ↓
[Descuento aplicado al total estimado]
        ↓
[Mensaje WhatsApp incluye: "Código de canje: XXXX — Descuento: $YYY"]
        ↓
[Admin verifica código y aplica descuento manualmente]
        ↓
[Al confirmar el pedido, puntos canjeados se descuentan de la cuenta]
```

### Mensaje WhatsApp con canje:
```
Hola POLLO REY! Quiero hacer un pedido:

*PEDIDO*
---------------------
Nombre: Juan Pérez
Teléfono: +54 11 1234-5678
Nivel: ORO ★

*PRODUCTOS:*
• 2x Pollo Entero — $4.800
• 1x Papas Fritas 1kg — $1.200

---------------------
SUBTOTAL: $6.000
Descuento puntos (codigo: PXJ7K2): -$500
*TOTAL ESTIMADO: $5.500*

Puntos a ganar con este pedido: +60 pts

Pedido para HOY
Muchas gracias!
```

---

## 4. ESTRUCTURA DE CARPETAS — NUEVA (AMPLIADA)

```
src/
├── app/
│   ├── (store)/
│   │   ├── cuenta/                     # NUEVO — área de usuario
│   │   │   ├── layout.tsx              # Layout protegido (requiere auth)
│   │   │   ├── page.tsx                # Dashboard personal del usuario
│   │   │   ├── perfil/
│   │   │   │   └── page.tsx            # Editar datos personales
│   │   │   ├── pedidos/
│   │   │   │   ├── page.tsx            # Historial de pedidos
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Detalle de pedido
│   │   │   ├── direcciones/
│   │   │   │   └── page.tsx            # Gestión de direcciones
│   │   │   ├── puntos/
│   │   │   │   └── page.tsx            # Mis puntos y movimientos
│   │   │   ├── recompensas/
│   │   │   │   └── page.tsx            # Catálogo de recompensas canjeables
│   │   │   └── eliminar-cuenta/
│   │   │       └── page.tsx            # Eliminación de cuenta (con confirmación)
│   │   │
│   │   ├── auth/                       # NUEVO — autenticación pública
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── registro/
│   │   │   │   └── page.tsx
│   │   │   ├── recuperar-password/
│   │   │   │   └── page.tsx
│   │   │   └── nueva-password/
│   │   │       └── page.tsx            # Reset de password con token
│   │   │
│   │   └── referidos/
│   │       └── page.tsx                # Landing de referidos con código personal
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── clientes/
│   │       │   ├── page.tsx            # Lista de clientes registrados
│   │       │   └── [id]/
│   │       │       └── page.tsx        # Perfil del cliente + historial + puntos
│   │       └── fidelizacion/
│   │           ├── page.tsx            # Dashboard del programa de puntos
│   │           ├── recompensas/
│   │           │   └── page.tsx        # CRUD de recompensas
│   │           └── config/
│   │               └── page.tsx        # Config: ratio pts, tiers, vencimiento
│   │
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/route.ts  # NextAuth (usuarios + admin)
│       ├── users/
│       │   ├── route.ts                # POST registro
│       │   └── [id]/
│       │       ├── route.ts            # GET perfil, PUT editar, DELETE cuenta
│       │       └── addresses/
│       │           └── route.ts        # GET/POST/DELETE direcciones
│       ├── loyalty/
│       │   ├── route.ts                # GET cuenta de puntos del usuario
│       │   ├── redeem/
│       │   │   └── route.ts            # POST canjear puntos
│       │   └── transactions/
│       │       └── route.ts            # GET historial de puntos
│       └── rewards/
│           └── route.ts                # GET catálogo de recompensas
│
├── components/
│   ├── account/                        # NUEVO — componentes de cuenta
│   │   ├── AccountDashboard.tsx        # Panel principal del usuario
│   │   ├── ProfileForm.tsx             # Editar perfil
│   │   ├── AddressCard.tsx
│   │   ├── AddressForm.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── DeleteAccountModal.tsx
│   │   └── ReferralCard.tsx            # Tarjeta con código de referido
│   │
│   ├── loyalty/                        # NUEVO — componentes de fidelización
│   │   ├── LoyaltyCard.tsx             # Tarjeta visual de nivel (tipo tarjeta de crédito)
│   │   ├── PointsBalance.tsx           # Balance actual de puntos
│   │   ├── PointsHistory.tsx           # Tabla de movimientos
│   │   ├── TierProgress.tsx            # Barra de progreso al siguiente nivel
│   │   ├── RewardCatalog.tsx           # Grid de recompensas canjeables
│   │   ├── RewardCard.tsx              # Tarjeta individual de recompensa
│   │   ├── PointsRedeemer.tsx          # Componente de canje en checkout
│   │   └── TierBadge.tsx               # Badge: BRONCE / PLATA / ORO / REY
│   │
│   └── auth/                           # NUEVO — forms de autenticación
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       ├── ForgotPasswordForm.tsx
│       └── SocialLoginButtons.tsx      # Google, etc. (opcional)
│
├── lib/
│   ├── loyalty.ts                      # NUEVO — lógica de puntos
│   │   # calcPoints(), applyTierMultiplier(), redeemPoints()
│   │   # checkAndUpgradeTier(), sendBirthdayBonus()
│   └── auth.ts                         # NUEVO — config NextAuth extendida
│
└── hooks/
    ├── useLoyalty.ts                   # NUEVO — React Query para puntos
    └── useUser.ts                      # NUEVO — sesión y perfil del usuario
```

---

## 5. PÁGINAS DE CUENTA — DISEÑO UX

### /cuenta — Dashboard personal
```
┌─────────────────────────────────────────────────┐
│  Hola, Juan! 👋                                  │
│  Miembro desde Enero 2025                        │
├─────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────┐  │
│  │  TARJETA DE NIVEL — ORO ★                 │  │
│  │  1.240 puntos disponibles                 │  │
│  │  ████████████░░░░ 62% → REY               │  │
│  └───────────────────────────────────────────┘  │
│                                                  │
│  [Mis Pedidos]  [Mis Puntos]  [Mis Direcciones]  │
│                                                  │
│  ÚLTIMOS PEDIDOS                                 │
│  • Pedido #001 — $4.800 — 12 feb               │
│  • Pedido #002 — $2.200 — 5 feb               │
└─────────────────────────────────────────────────┘
```

### /cuenta/puntos — Mis puntos
```
┌─────────────────────────────────────────────────┐
│  MIS PUNTOS                                      │
│                                                  │
│  Disponibles: 1.240 pts = $620 de descuento      │
│  Total ganados: 3.890 pts                        │
│  Total canjeados: 2.650 pts                      │
│                                                  │
│  HISTORIAL                                       │
│  ✅ +60 pts — Pedido #ABC123 — 12 feb           │
│  🎁 +200 pts — Regalo cumpleaños — 15 ene       │
│  ↩️  -500 pts — Canje descuento $250 — 10 ene  │
│  ✅ +100 pts — Bienvenida — 2 ene              │
└─────────────────────────────────────────────────┘
```

### /cuenta/recompensas — Catálogo de canje
```
┌────────────────────────────────────────┐
│  Recompensas disponibles               │
│  Tus puntos: 1.240                     │
├────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐           │
│  │ $500 off │  │ $1000 off│           │
│  │ 1000 pts │  │ 2000 pts │           │
│  │ [Canjear]│  │  [🔒]    │           │
│  └──────────┘  └──────────┘           │
└────────────────────────────────────────┘
```

---

## 6. LÓGICA DEL SISTEMA DE PUNTOS (lib/loyalty.ts)

```typescript
// src/lib/loyalty.ts

export const TIER_THRESHOLDS = {
  BRONCE: 0,
  PLATA:  1_000,
  ORO:    5_000,
  REY:    15_000,
} as const

export const TIER_MULTIPLIERS = {
  BRONCE: 1,
  PLATA:  1.5,
  ORO:    2,
  REY:    3,
} as const

// Puntos base: 1 pto por cada $100 de compra
const BASE_RATE = 1 / 100

export function calcPointsForPurchase(total: number, tier: LoyaltyTier): number {
  const multiplier = TIER_MULTIPLIERS[tier]
  return Math.floor(total * BASE_RATE * multiplier)
}

export function getTierForPoints(totalEarned: number): LoyaltyTier {
  if (totalEarned >= TIER_THRESHOLDS.REY)    return 'REY'
  if (totalEarned >= TIER_THRESHOLDS.ORO)    return 'ORO'
  if (totalEarned >= TIER_THRESHOLDS.PLATA)  return 'PLATA'
  return 'BRONCE'
}

export function getPointsToNextTier(totalEarned: number): number {
  const tier = getTierForPoints(totalEarned)
  const tiers: LoyaltyTier[] = ['BRONCE', 'PLATA', 'ORO', 'REY']
  const idx = tiers.indexOf(tier)
  if (idx === tiers.length - 1) return 0  // Ya es REY
  const nextThreshold = TIER_THRESHOLDS[tiers[idx + 1]]
  return nextThreshold - totalEarned
}

// Conversión: 100 puntos = $50
export function pointsToMoney(points: number): number {
  return points * 0.5
}

export function moneyToPoints(amount: number): number {
  return Math.ceil(amount / 0.5)
}
```

---

## 7. AUTENTICACIÓN — NEXTAUTH CONFIG AMPLIADA

```typescript
// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Login con email/contraseña
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        if (!user || !user.password || user.deletedAt) return null
        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name }
      }
    }),
    // Login con Google (opcional)
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string
      return session
    }
  },
  pages: {
    signIn:  '/auth/login',
    signOut: '/auth/login',
    error:   '/auth/login',
  }
}
```

---

## 8. ELIMINACIÓN DE CUENTA — SOFT DELETE

```typescript
// Flujo de baja de cuenta respetando privacidad
// 1. Usuario confirma con contraseña
// 2. Se aplica soft delete (deletedAt = now())
// 3. Email de confirmación de baja enviado
// 4. Sesiones invalidadas
// 5. Los pedidos históricos se conservan (desvinculados del email)
// 6. Después de 30 días: anonimización total de datos

// PATCH /api/users/[id]
// body: { action: 'delete', password: '...' }
async function deleteAccount(userId: string, password: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.password) throw new Error('No autorizado')
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) throw new Error('Contraseña incorrecta')

  await prisma.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `deleted_${userId}@removed.local`,  // libera el email
      name: 'Usuario eliminado',
      phone: null,
      avatarUrl: null,
    }
  })
}
```

---

## 9. ADMIN — PANEL DE FIDELIZACIÓN

### Vistas nuevas en el dashboard admin:

**`/admin/fidelizacion`** — Overview
- Total de miembros por tier (gráfico de torta)
- Puntos otorgados este mes vs. canjeados
- Recompensas más canjeadas
- Alertas: puntos próximos a vencer

**`/admin/fidelizacion/recompensas`** — CRUD de recompensas
- Crear recompensa: nombre, puntos, tipo descuento, stock
- Activar/desactivar recompensas
- Ver historial de canjes por recompensa

**`/admin/fidelizacion/config`** — Configuración
- Ratio puntos/compra por tier
- Puntos de bienvenida
- Días de validez de códigos de canje
- Meses antes de vencimiento
- Toggle para activar/desactivar el programa completo

**`/admin/clientes/[id]`** — Perfil detallado de cliente
- Datos personales
- Nivel y puntos
- Historial de pedidos
- Historial de puntos
- Botón: ajuste manual de puntos (con razón)

---

## 10. NUEVAS VARIABLES DE ENTORNO

```bash
# Autenticación
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Programa de puntos
LOYALTY_WELCOME_POINTS=100
LOYALTY_BIRTHDAY_POINTS=200
LOYALTY_REFERRAL_POINTS=150
LOYALTY_BASE_RATE=1          # 1 pto por cada $100
LOYALTY_POINTS_PER_MONEY=100 # 100 pesos por punto de canje
LOYALTY_EXPIRY_MONTHS=12     # Meses de inactividad para vencer puntos

# Email (también para reset de password)
RESEND_API_KEY="..."
EMAIL_FROM="hola@pollorey.com.ar"
```

---

## 11. ROADMAP — FASES ACTUALIZADAS

### Fase 3b — Cuentas de usuario (agregar después de Fase 3)
- [ ] Extender schema Prisma: User, Address, Session, Account
- [ ] Configurar NextAuth para usuarios + admins (mismo proveedor, roles distintos)
- [ ] Páginas: login, registro, recuperar contraseña
- [ ] Área /cuenta: perfil, pedidos, direcciones
- [ ] Soft delete de cuenta con confirmación
- [ ] Vincular pedidos a usuario autenticado

### Fase 3c — Programa de fidelización
- [ ] Modelos: LoyaltyAccount, PointsTransaction, Reward, RewardRedemption, Referral
- [ ] lib/loyalty.ts: lógica de puntos, tiers, canje
- [ ] Cron job o trigger: otorgar puntos al confirmar pedido
- [ ] Cron job mensual: bonus de cumpleaños
- [ ] Cron job mensual: alerta de puntos por vencer
- [ ] Checkout con componente de canje de puntos
- [ ] Admin: dashboard de fidelización + CRUD recompensas
- [ ] Página referidos con código personal

### Tiempo adicional estimado
- Sistema de cuentas: +1 semana
- Programa de puntos: +1 semana
- **Total MVP con fidelización: ~7 semanas**
```
