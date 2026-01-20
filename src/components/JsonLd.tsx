"use client";

import { useEffect, useState } from "react";
import { isRestrictiveInAppBrowser } from "@/utils/browserDetection";

export default function JsonLd() {
  // Default to false to prevent server-rendering inline scripts that break Instagram's CSP
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load JSON-LD in non-restrictive browsers (not Instagram, Facebook, etc.)
    if (!isRestrictiveInAppBrowser()) {
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad) {
    return null;
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "TattooShop",
    name: "Mathieu Perron Tattoo",
    alternateName: "Matha Tattoo",
    description:
      "Tatoueur professionnel à St-Jean-de-Matha, Lanaudière. Spécialisé en tatouages personnalisés et sur mesure. Service professionnel desservant Joliette, Rawdon, Saint-Donat, Chertsey et toute la région de Lanaudière.",
    url: "https://matha.tattoo",
    telephone: "",
    email: "mathieu.perron95@outlook.com",
    image: "https://matha.tattoo/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "St-Jean-de-Matha",
      addressRegion: "Québec",
      postalCode: "",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.2231,
      longitude: -73.5326,
    },
    areaServed: [
      {
        "@type": "City",
        name: "St-Jean-de-Matha",
      },
      {
        "@type": "City",
        name: "Joliette",
      },
      {
        "@type": "City",
        name: "Rawdon",
      },
      {
        "@type": "City",
        name: "Saint-Donat",
      },
      {
        "@type": "City",
        name: "Chertsey",
      },
      {
        "@type": "City",
        name: "Notre-Dame-des-Prairies",
      },
      {
        "@type": "City",
        name: "Saint-Félix-de-Valois",
      },
      {
        "@type": "City",
        name: "Sainte-Julienne",
      },
      {
        "@type": "City",
        name: "Crabtree",
      },
      {
        "@type": "City",
        name: "Repentigny",
      },
      {
        "@type": "City",
        name: "Terrebonne",
      },
      {
        "@type": "City",
        name: "Mascouche",
      },
      {
        "@type": "AdministrativeArea",
        name: "Lanaudière",
      },
    ],
    priceRange: "$$",
    sameAs: [
      "https://instagram.com/tattoomatha",
      "https://tiktok.com/@mathieutattoomatha",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de tatouage",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tatouage personnalisé",
            description: "Création de tatouages uniques sur mesure selon vos idées",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Consultation gratuite",
            description: "Discussion de votre projet de tatouage sans engagement",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
