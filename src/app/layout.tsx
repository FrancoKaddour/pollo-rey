import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Pollo Rey",
    default: "Pollo Rey — Pollería Premium en Saavedra, Buenos Aires",
  },
  description:
    "Pollo fresco, cortes especiales, papas fritas y más. Pedidos online con entrega en CABA y Vicente López. ¡Pedí por WhatsApp!",
  keywords: [
    "pollería",
    "pollo fresco",
    "Saavedra",
    "Buenos Aires",
    "CABA",
    "pedido online",
    "pollo entero",
    "cortes de pollo",
  ],
  authors: [{ name: "Pollo Rey" }],
  creator: "Pollo Rey",
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Pollo Rey",
    title: "Pollo Rey — Pollería Premium",
    description:
      "Pollo fresco y cortes especiales. Pedidos online con entrega en CABA y Vicente López.",
    images: [
      {
        url: "/images/brand/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pollo Rey — Pollería Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pollo Rey — Pollería Premium",
    description:
      "Pollo fresco y cortes especiales. Pedidos online con entrega en CABA y Vicente López.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
