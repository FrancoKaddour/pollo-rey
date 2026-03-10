import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Limpiando datos existentes...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  console.log("Creando categorías...");
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: "Pollo", slug: "pollo", order: 1, active: true },
    }),
    prisma.category.create({
      data: { name: "Cortes", slug: "cortes", order: 2, active: true },
    }),
    prisma.category.create({
      data: { name: "Papas Fritas", slug: "papas-fritas", order: 3, active: true },
    }),
    prisma.category.create({
      data: { name: "Hamburguesas", slug: "hamburguesas", order: 4, active: true },
    }),
    prisma.category.create({
      data: { name: "Huevos", slug: "huevos", order: 5, active: true },
    }),
    prisma.category.create({
      data: {
        name: "Despensa",
        slug: "despensa",
        order: 6,
        active: true,
        description: "Aceite, rebozador, carbón, sal y condimentos",
      },
    }),
  ]);

  const [pollo, cortes, papas, hamburguesas, huevos, despensa] = categories;

  console.log("Creando productos...");
  await Promise.all([
    // POLLO
    prisma.product.create({
      data: {
        name: "Pollo Entero",
        slug: "pollo-entero",
        description: "Pollo fresco de primera calidad, sin menudos.",
        price: 4500,
        imageUrl: "",
        categoryId: pollo.id,
        active: true,
        featured: true,
        unit: "kg",
      },
    }),
    prisma.product.create({
      data: {
        name: "Pollo Trozado",
        slug: "pollo-trozado",
        description: "Pollo cortado en presas, listo para cocinar.",
        price: 5200,
        imageUrl: "",
        categoryId: pollo.id,
        active: true,
        featured: false,
        unit: "kg",
      },
    }),
    prisma.product.create({
      data: {
        name: "Pollo Sin Menudos",
        slug: "pollo-sin-menudos",
        description: "Pollo entero sin menudos.",
        price: 4800,
        imageUrl: "",
        categoryId: pollo.id,
        active: true,
        featured: false,
        unit: "unidad",
      },
    }),

    // CORTES
    prisma.product.create({
      data: {
        name: "Pechuga Sin Hueso",
        slug: "pechuga-sin-hueso",
        description: "Pechuga deshuesada, ideal para milanesas y salteados.",
        price: 7800,
        imageUrl: "",
        categoryId: cortes.id,
        active: true,
        featured: true,
        unit: "kg",
      },
    }),
    prisma.product.create({
      data: {
        name: "Muslo y Contra",
        slug: "muslo-y-contra",
        description: "El corte más jugoso y tierno.",
        price: 5500,
        imageUrl: "",
        categoryId: cortes.id,
        active: true,
        featured: false,
        unit: "kg",
      },
    }),
    prisma.product.create({
      data: {
        name: "Alas",
        slug: "alas",
        description: "Perfectas para el horno o la parrilla.",
        price: 4200,
        imageUrl: "",
        categoryId: cortes.id,
        active: true,
        featured: false,
        unit: "kg",
      },
    }),
    prisma.product.create({
      data: {
        name: "Menudos",
        slug: "menudos",
        description: "Hígado, corazón y molleja de pollo.",
        price: 2500,
        imageUrl: "",
        categoryId: cortes.id,
        active: true,
        featured: false,
        unit: "kg",
      },
    }),

    // PAPAS FRITAS
    prisma.product.create({
      data: {
        name: "Papas Fritas 1kg",
        slug: "papas-fritas-1kg",
        description: "Papas fritas congeladas, listas para freír u hornear.",
        price: 1800,
        imageUrl: "",
        categoryId: papas.id,
        active: true,
        featured: true,
        unit: "paquete",
      },
    }),
    prisma.product.create({
      data: {
        name: "Papas Fritas 2.5kg",
        slug: "papas-fritas-2-5kg",
        description: "Formato familiar, ideal para reuniones.",
        price: 3900,
        imageUrl: "",
        categoryId: papas.id,
        active: true,
        featured: false,
        unit: "paquete",
      },
    }),

    // HAMBURGUESAS
    prisma.product.create({
      data: {
        name: "Hamburguesa de Pollo x4",
        slug: "hamburguesa-pollo-x4",
        description: "Hamburguesas de pollo tiernas. Pack de 4 unidades.",
        price: 3200,
        imageUrl: "",
        categoryId: hamburguesas.id,
        active: true,
        featured: true,
        unit: "pack",
      },
    }),

    // HUEVOS
    prisma.product.create({
      data: {
        name: "Huevos Docena",
        slug: "huevos-docena",
        description: "Huevos frescos, docena.",
        price: 2800,
        imageUrl: "",
        categoryId: huevos.id,
        active: true,
        featured: false,
        unit: "docena",
      },
    }),
    prisma.product.create({
      data: {
        name: "Huevos Media Docena",
        slug: "huevos-media-docena",
        description: "Huevos frescos, media docena.",
        price: 1500,
        imageUrl: "",
        categoryId: huevos.id,
        active: true,
        featured: false,
        unit: "media docena",
      },
    }),

    // DESPENSA
    prisma.product.create({
      data: {
        name: "Aceite Girasol 1.5L",
        slug: "aceite-girasol-1-5l",
        description: "Aceite de girasol 1.5 litros.",
        price: 2200,
        imageUrl: "",
        categoryId: despensa.id,
        active: true,
        featured: false,
        unit: "botella",
      },
    }),
    prisma.product.create({
      data: {
        name: "Rebozador 500g",
        slug: "rebozador-500g",
        description: "Rebozador ideal para milanesas y pollo rebozado.",
        price: 900,
        imageUrl: "",
        categoryId: despensa.id,
        active: true,
        featured: false,
        unit: "paquete",
      },
    }),
    prisma.product.create({
      data: {
        name: "Carbón 3kg",
        slug: "carbon-3kg",
        description: "Carbón para parrilla, bolsa de 3kg.",
        price: 1800,
        imageUrl: "",
        categoryId: despensa.id,
        active: true,
        featured: false,
        unit: "bolsa",
      },
    }),
    prisma.product.create({
      data: {
        name: "Sal Entrefina 1kg",
        slug: "sal-entrefina-1kg",
        description: "Sal entrefina para cocina y parrilla.",
        price: 600,
        imageUrl: "",
        categoryId: despensa.id,
        active: true,
        featured: false,
        unit: "paquete",
      },
    }),
  ]);

  console.log("Creando admin inicial...");
  const hashedPassword = await bcrypt.hash("pollorey2025admin", 12);
  await prisma.adminUser.create({
    data: {
      email: "admin@pollorey.com.ar",
      password: hashedPassword,
      name: "Admin Pollo Rey",
    },
  });

  console.log("✅ Seed completado exitosamente!");
  console.log("Admin: admin@pollorey.com.ar / pollorey2025admin");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
