import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import JsonLd from "@/components/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mathieu Perron Tattoo | Tatoueur Lanaudière | St-Jean-de-Matha",
  description:
    "Tatoueur professionnel à St-Jean-de-Matha, Lanaudière. Mathieu Perron crée des tatouages personnalisés uniques. Desservant Joliette, Rawdon, Saint-Donat, Chertsey et toute la région. Réservez votre consultation!",
  keywords: [
    // Mots-clés principaux
    "tatoueur lanaudière",
    "tattoo lanaudière", 
    "tatouage lanaudière",
    "tatoueur st-jean-de-matha",
    "tattoo st-jean-de-matha",
    // Villes de Lanaudière
    "tatoueur joliette",
    "tattoo joliette",
    "tatoueur rawdon",
    "tatoueur saint-donat",
    "tatoueur chertsey",
    "tatoueur crabtree",
    "tatoueur notre-dame-des-prairies",
    "tatoueur saint-félix-de-valois",
    "tatoueur sainte-julienne",
    "tatoueur repentigny",
    "tatoueur terrebonne",
    "tatoueur mascouche",
    // Styles
    "tatouage personnalisé",
    "custom tattoo",
    "tatouage sur mesure",
    "artiste tatoueur québec",
    // Nom
    "mathieu perron tattoo",
    "matha tattoo",
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0a0a0a",
  metadataBase: new URL("https://matha.tattoo"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mathieu Perron Tattoo | Tatoueur Lanaudière",
    description: "Tatoueur professionnel à St-Jean-de-Matha, Lanaudière. Tatouages personnalisés uniques. Desservant Joliette, Rawdon, Saint-Donat et toute la région.",
    url: "https://matha.tattoo",
    siteName: "Matha Tattoo",
    locale: "fr_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathieu Perron Tattoo | Tatoueur Lanaudière",
    description: "Tatoueur professionnel à St-Jean-de-Matha. Tatouages personnalisés pour Lanaudière.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-body antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
