import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Pâtisserie artisanale sur commande à Alger`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "pâtisserie artisanale",
    "gâteau anniversaire Alger",
    "wedding cake Algérie",
    "number cake",
    "cupcakes sur commande",
    "sweet table Alger",
    "traiteur sucré salé",
    "Gourmandises By Nani",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: `${siteConfig.name} | Pâtisserie artisanale sur commande`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/gallery/wedding-cake-3-etages.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Pâtisserie artisanale sur commande`,
    description: siteConfig.description,
    images: ["/images/gallery/wedding-cake-3-etages.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: siteConfig.name,
  description: siteConfig.description,
  image: `${siteConfig.url}/images/gallery/wedding-cake-3-etages.png`,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: "DZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.lat,
    longitude: siteConfig.location.lng,
  },
  servesCuisine: "Pâtisserie",
  priceRange: "$$",
  sameAs: [siteConfig.socials.instagram, siteConfig.socials.facebook],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${playfair.variable} ${poppins.variable} antialiased`}>
        <Loader />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
