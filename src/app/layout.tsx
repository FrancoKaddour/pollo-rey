import type { Metadata } from "next";
import { Inter, Syne, Paytone_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

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

const paytoneOne = Paytone_One({
  variable: "--font-paytone",
  subsets: ["latin"],
  weight: "400",
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
        url: "/images/brand/og-image.svg",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: "Pollo Rey",
  description:
    "Pollería de barrio en Saavedra, CABA. Pollo fresco, cortes especiales, papas fritas y más. Pedidos por WhatsApp.",
  url: "https://pollorey.com.ar",
  logo: "https://pollorey.com.ar/Logo-crop.png",
  image: "https://pollorey.com.ar/images/brand/og-image.svg",
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE
    ? `+${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}`
    : undefined,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saavedra",
    addressRegion: "Ciudad Autónoma de Buenos Aires",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.5526,
    longitude: -58.4857,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  servesCuisine: "Pollo",
  hasMap: "https://maps.google.com/?q=Saavedra,CABA,Argentina",
  areaServed: [
    { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    { "@type": "City", name: "Vicente López" },
  ],
  sameAs: [
    // "https://www.instagram.com/pollorey",
    // "https://www.facebook.com/pollorey",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${syne.variable} ${paytoneOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
