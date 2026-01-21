"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { client } from "../../sanity/lib/client";
import { TATTOOS_QUERY, type Tattoo } from "../../sanity/lib/queries";
import { urlFor } from "../../sanity/lib/image";

// 🎨 FALLBACK DATA - Used if Sanity is not configured yet
// Once Sanity is set up, data will be fetched from CMS
const fallbackTattooImages = [
  {
    src: "/tattoos/epinette-noire-avant-bras.jpeg",
    alt: "Épinette Noire",
    size: "large",
  },
  {
    src: "/tattoos/dualite-emotionnelle-cuisse.jpeg",
    alt: "Dualité Émotionnelle",
    size: "medium",
  },
  {
    src: "/tattoos/mandala-epaule.jpeg",
    alt: "Mandala d'Épaule",
    size: "large",
  },
  {
    src: "/tattoos/sacred-geometry-microrealism.jpeg",
    alt: "Sacred Geometry",
    size: "small",
  },
  {
    src: "/tattoos/colibri-et-fleur.jpeg",
    alt: "Colibri et Fleur",
    size: "small",
  },
  {
    src: "/tattoos/phoenix-cube-metatron.jpeg",
    alt: "Phoenix & Cube de Métatron",
    size: "large",
  },
  {
    src: "/tattoos/bateau-viking.jpeg",
    alt: "Bateau Viking",
    size: "medium",
  },
  {
    src: "/tattoos/marguerite.jpeg",
    alt: "Marguerite",
    size: "small",
  },
  {
    src: "/tattoos/floral-mollet.jpeg",
    alt: "Composition Florale",
    size: "small",
  },
  {
    src: "/tattoos/huitre-perle.jpeg",
    alt: "Huître et Perle",
    size: "small",
  },
  {
    src: "/tattoos/foret-nordique-avant-bras.jpeg",
    alt: "Forêt Nordique",
    size: "small",
  },
  {
    src: "/tattoos/mandala-coude.jpeg",
    alt: "Mandala du Coude",
    size: "small",
  },
  {
    src: "/tattoos/memento-mori.jpeg",
    alt: "Memento Mori",
    size: "small",
  },
  {
    src: "/tattoos/mandala-sur-mollet.png",
    alt: "Mandala sur Mollet",
    size: "small",
  },
  {
    src: "/tattoos/ginkgo-biloba.jpeg",
    alt: "Feuille de Ginkgo Biloba",
    size: "small",
  },
  {
    src: "/tattoos/agencement-avant-bras.jpeg",
    alt: "Agencement Avant-Bras",
    size: "medium",
  },
  {
    src: "/tattoos/chibi-manga.jpeg",
    alt: "Chibi Manga",
    size: "small",
  },
  {
    src: "/tattoos/fleur-cover.jpeg",
    alt: "Fleur Cover",
    size: "small",
  },
  {
    src: "/tattoos/king.jpeg",
    alt: "King",
    size: "small",
  },
  {
    src: "/tattoos/queen.jpeg",
    alt: "Queen",
    size: "small",
  },
  {
    src: "/tattoos/memorial-a-ses-enfants.jpeg",
    alt: "Mémorial à ses Enfants",
    size: "medium",
  },
  {
    src: "/tattoos/F11BD132-F024-4494-9E9A-E7AC79589293_4_5005_c.jpeg",
    alt: "Tatouage 22",
    size: "small",
  },
  {
    src: "/tattoos/FDEA7EEE-D2E9-4E95-94B8-8C5241D596E6_1_105_c.jpeg",
    alt: "Tatouage 23",
    size: "small",
  },
];

export default function TattooCarousel() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tattoos, setTattoos] = useState<Array<{ src: string; alt: string; size: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch tattoos from Sanity
  useEffect(() => {
    async function fetchTattoos() {
      try {
        const sanityTattoos = await client.fetch<Tattoo[]>(TATTOOS_QUERY);

        if (sanityTattoos && sanityTattoos.length > 0) {
          // Convert Sanity data to component format
          const formattedTattoos = sanityTattoos.map((tattoo) => ({
            src: urlFor(tattoo.image).url(),
            alt: tattoo.alt,
            size: tattoo.size,
          }));
          setTattoos(formattedTattoos);
        } else {
          // Use fallback data if no Sanity content
          setTattoos(fallbackTattooImages);
        }
      } catch (error) {
        console.log("Sanity not configured yet, using fallback data");
        setTattoos(fallbackTattooImages);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTattoos();
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 13 sur desktop (4 colonnes), 14 sur mobile (2 colonnes = pair)
  const INITIAL_DISPLAY_COUNT = isMobile ? 14 : 13;
  const displayedImages = showAll ? tattoos : tattoos.slice(0, INITIAL_DISPLAY_COUNT);

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-gold-400">Loading gallery...</p>
      </div>
    );
  }

  const getSizeClass = (size: string) => {
    switch (size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2 md:row-span-1";
      case "small":
        return "md:col-span-1 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <>
      {/* Grille de galerie */}
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[220px]">
          {displayedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${getSizeClass(image.size)} relative overflow-hidden rounded-lg cursor-pointer group`}
              onClick={() => {
                setSelectedImage(image.src);
                setSelectedAlt(image.alt);
              }}
            >
              {/* Image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                quality={75}
                loading="lazy"
              />
              
              {/* Overlay au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-gold-400 font-semibold text-sm md:text-base">{image.alt}</p>
                </div>
              </div>
              
              {/* Bordure dorée au hover */}
              <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-all duration-300 rounded-lg" />
            </motion.div>
          ))}
        </div>

        {/* Bouton Voir plus / Voir moins */}
        {tattoos.length > INITIAL_DISPLAY_COUNT && (
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 bg-gold-400/10 border-2 border-gold-400/30 text-gold-400 font-semibold rounded-lg hover:bg-gold-400/20 hover:border-gold-400/50 transition-all"
            >
              {showAll
                ? t("gallery.viewLess")
                : `${t("gallery.viewMore")} (${tattoos.length - INITIAL_DISPLAY_COUNT} ${t("gallery.moreCount")})`
              }
            </motion.button>
          </div>
        )}
      </div>

      {/* Modal pour afficher l'image en grand */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/95 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-3xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 md:-top-12 right-0 text-gold-400 hover:text-gold-500 transition-colors bg-ink-900/50 rounded-full p-2"
              >
                <FaTimes size={24} />
              </button>

              {/* Image agrandie */}
              <div className="relative max-h-[70vh] flex items-center justify-center bg-ink-900/50 rounded-lg border-2 border-gold-500/30 p-4">
                <div className="relative w-full h-[65vh]">
                  <Image
                    src={selectedImage}
                    alt={selectedAlt}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-contain rounded-lg"
                    quality={85}
                    priority
                  />
                </div>
              </div>

              {/* Titre */}
              <div className="mt-4 text-center">
                <h3 className="text-gold-400 text-lg md:text-xl font-display font-bold">
                  {selectedAlt}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
