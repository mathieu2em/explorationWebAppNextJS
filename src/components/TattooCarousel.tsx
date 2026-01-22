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
    title: "Épinette Noire",
    alt: "Épinette noire tatouée sur avant-bras avec détails réalistes",
    size: "large",
  },
  {
    src: "/tattoos/dualite-emotionnelle-cuisse.jpeg",
    title: "Dualité Émotionnelle",
    alt: "Tatouage représentant la dualité émotionnelle sur la cuisse",
    size: "medium",
  },
  {
    src: "/tattoos/mandala-epaule.jpeg",
    title: "Mandala d'Épaule",
    alt: "Mandala géométrique détaillé sur l'épaule",
    size: "large",
  },
  {
    src: "/tattoos/sacred-geometry-microrealism.jpeg",
    title: "Sacred Geometry",
    alt: "Géométrie sacrée en microréalisme",
    size: "small",
  },
  {
    src: "/tattoos/colibri-et-fleur.jpeg",
    title: "Colibri et Fleur",
    alt: "Colibri en vol près d'une fleur délicate",
    size: "small",
  },
  {
    src: "/tattoos/phoenix-cube-metatron.jpeg",
    title: "Phoenix & Cube de Métatron",
    alt: "Phoenix mythique avec cube de Métatron en géométrie sacrée",
    size: "large",
  },
  {
    src: "/tattoos/bateau-viking.jpeg",
    title: "Bateau Viking",
    alt: "Drakkar viking naviguant sur les mers nordiques",
    size: "medium",
  },
  {
    src: "/tattoos/marguerite.jpeg",
    title: "Marguerite",
    alt: "Marguerite délicate en style botanique",
    size: "small",
  },
  {
    src: "/tattoos/floral-mollet.jpeg",
    title: "Composition Florale",
    alt: "Composition florale artistique sur le mollet",
    size: "small",
  },
  {
    src: "/tattoos/huitre-perle.jpeg",
    title: "Huître et Perle",
    alt: "Huître ouverte révélant une perle précieuse",
    size: "small",
  },
  {
    src: "/tattoos/foret-nordique-avant-bras.jpeg",
    title: "Forêt Nordique",
    alt: "Paysage de forêt nordique sur l'avant-bras",
    size: "small",
  },
  {
    src: "/tattoos/mandala-coude.jpeg",
    title: "Mandala du Coude",
    alt: "Mandala circulaire centré sur le coude",
    size: "small",
  },
  {
    src: "/tattoos/memento-mori.jpeg",
    title: "Memento Mori",
    alt: "Rappel de la mortalité en style artistique",
    size: "small",
  },
  {
    src: "/tattoos/mandala-sur-mollet.png",
    title: "Mandala sur Mollet",
    alt: "Grand mandala décoratif sur le mollet",
    size: "small",
  },
  {
    src: "/tattoos/ginkgo-biloba.jpeg",
    title: "Feuille de Ginkgo Biloba",
    alt: "Feuille de Ginkgo Biloba en détail botanique",
    size: "small",
  },
  {
    src: "/tattoos/agencement-avant-bras.jpeg",
    title: "Agencement Avant-Bras",
    alt: "Composition artistique agencée sur l'avant-bras",
    size: "medium",
  },
  {
    src: "/tattoos/chibi-manga.jpeg",
    title: "Chibi Manga",
    alt: "Personnage manga en style chibi",
    size: "small",
  },
  {
    src: "/tattoos/fleur-cover.jpeg",
    title: "Fleur Cover",
    alt: "Fleur artistique en cover-up",
    size: "small",
  },
  {
    src: "/tattoos/king.jpeg",
    title: "King",
    alt: "Symbole royal King",
    size: "small",
  },
  {
    src: "/tattoos/queen.jpeg",
    title: "Queen",
    alt: "Symbole royal Queen",
    size: "small",
  },
  {
    src: "/tattoos/memorial-a-ses-enfants.jpeg",
    title: "Mémorial à ses Enfants",
    alt: "Tatouage mémorial dédié aux enfants",
    size: "medium",
  },
  {
    src: "/tattoos/F11BD132-F024-4494-9E9A-E7AC79589293_4_5005_c.jpeg",
    title: "Tatouage Artistique 1",
    alt: "Tatouage artistique unique",
    size: "small",
  },
  {
    src: "/tattoos/FDEA7EEE-D2E9-4E95-94B8-8C5241D596E6_1_105_c.jpeg",
    title: "Tatouage Artistique 2",
    alt: "Tatouage artistique créatif",
    size: "small",
  },
];

export default function TattooCarousel() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");
  const [selectedAlt, setSelectedAlt] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tattoos, setTattoos] = useState<Array<{ src: string; title: string; alt: string; size: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Magnifying glass state
  const [magnifierActive, setMagnifierActive] = useState<number | null>(null);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [magnifierSize] = useState(isMobile ? 120 : 180); // Size of the magnifier circle
  const [zoomLevel] = useState(isMobile ? 2 : 3); // Zoom level for magnification
  const [imageRect, setImageRect] = useState({ width: 0, height: 0, offsetX: 0, offsetY: 0 });

  // Fetch tattoos from Sanity
  useEffect(() => {
    async function fetchTattoos() {
      try {
        const sanityTattoos = await client.fetch<Tattoo[]>(TATTOOS_QUERY);

        if (sanityTattoos && sanityTattoos.length > 0) {
          // Convert Sanity data to component format
          const formattedTattoos = sanityTattoos.map((tattoo) => ({
            src: urlFor(tattoo.image).url(),
            title: tattoo.title,
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

  // Prevent body scroll when modal with magnifier is active
  useEffect(() => {
    if (selectedImage && magnifierActive) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "auto";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    };
  }, [selectedImage, magnifierActive]);

  // Reset imageRect when selected image changes
  useEffect(() => {
    if (selectedImage) {
      setImageRect({ width: 0, height: 0, offsetX: 0, offsetY: 0 });
    }
  }, [selectedImage]);

  // Calculate actual image dimensions and offset for object-contain
  const calculateImageRect = (containerEl: HTMLDivElement) => {
    if (!selectedImage) return;

    // Find the actual img element inside the container
    const imgElement = containerEl.querySelector('img');
    if (!imgElement) return;

    // Wait for image to load
    if (!imgElement.complete) {
      imgElement.onload = () => calculateImageRect(containerEl);
      return;
    }

    const containerRect = containerEl.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const naturalWidth = imgElement.naturalWidth;
    const naturalHeight = imgElement.naturalHeight;

    if (!naturalWidth || !naturalHeight) return;

    const imgAspect = naturalWidth / naturalHeight;
    const containerAspect = containerWidth / containerHeight;

    let renderWidth, renderHeight, offsetX, offsetY;

    if (imgAspect > containerAspect) {
      // Image is wider - fit to width
      renderWidth = containerWidth;
      renderHeight = containerWidth / imgAspect;
      offsetX = 0;
      offsetY = (containerHeight - renderHeight) / 2;
    } else {
      // Image is taller - fit to height
      renderHeight = containerHeight;
      renderWidth = containerHeight * imgAspect;
      offsetX = (containerWidth - renderWidth) / 2;
      offsetY = 0;
    }

    setImageRect({ width: renderWidth, height: renderHeight, offsetX, offsetY });
  };

  // Handle magnifier movement in modal
  const handleModalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMobile) {
      const containerEl = e.currentTarget;
      if (!imageRect.width) {
        calculateImageRect(containerEl);
        // Wait for next frame to ensure imageRect is updated
        requestAnimationFrame(() => {
          const rect = containerEl.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMagnifierPos({ x, y });
          setMagnifierActive(1);
        });
        return;
      }
      const rect = containerEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMagnifierPos({ x, y });
      setMagnifierActive(1);
    }
  };

  const handleModalMouseLeave = () => {
    if (!isMobile) {
      setMagnifierActive(null);
    }
  };

  // Handle touch-based magnifier for mobile in modal
  const handleModalTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) {
      const rect = e.currentTarget.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setMagnifierPos({ x, y });
      setMagnifierActive(1);
    }
  };

  const handleModalTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) {
      setMagnifierActive(1);
      calculateImageRect(e.currentTarget);
    }
  };

  const handleModalTouchEnd = () => {
    if (isMobile) {
      setMagnifierActive(null);
    }
  };

  // Add non-passive touch event listeners to prevent scroll
  useEffect(() => {
    if (!selectedImage) return;

    const modalImageElement = document.querySelector('.magnifier-container');
    if (!modalImageElement) return;

    const preventDefaultTouch = (e: Event) => {
      if (magnifierActive === 1) {
        e.preventDefault();
      }
    };

    modalImageElement.addEventListener('touchstart', preventDefaultTouch, { passive: false });
    modalImageElement.addEventListener('touchmove', preventDefaultTouch, { passive: false });

    return () => {
      modalImageElement.removeEventListener('touchstart', preventDefaultTouch);
      modalImageElement.removeEventListener('touchmove', preventDefaultTouch);
    };
  }, [selectedImage, magnifierActive]);

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
                setSelectedTitle(image.title);
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
                  <p className="text-gold-400 font-semibold text-sm md:text-base">{image.title}</p>
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
              className="relative max-w-3xl max-h-[80vh] w-full z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton fermer */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 md:-top-12 right-0 text-gold-400 hover:text-gold-500 transition-colors bg-ink-900/50 rounded-full p-2"
              >
                <FaTimes size={24} />
              </button>

              {/* Instructions pour la loupe */}
              <div className="text-center mb-3 text-gold-400/60 text-xs md:text-sm">
                {isMobile
                  ? t("gallery.magnifier.mobile")
                  : t("gallery.magnifier.desktop")}
              </div>

              {/* Image agrandie avec loupe */}
              <div className="relative max-h-[70vh] flex items-center justify-center bg-ink-900/50 rounded-lg border-2 border-gold-500/30 p-4 overflow-visible">
                <div
                  className="magnifier-container relative w-full h-[65vh] cursor-crosshair overflow-hidden rounded-lg"
                  onMouseMove={handleModalMouseMove}
                  onMouseLeave={handleModalMouseLeave}
                  onMouseEnter={(e) => {
                    if (!isMobile && !imageRect.width) {
                      calculateImageRect(e.currentTarget);
                    }
                  }}
                  onTouchStart={handleModalTouchStart}
                  onTouchMove={handleModalTouchMove}
                  onTouchEnd={handleModalTouchEnd}
                  style={{ touchAction: magnifierActive === 1 ? 'none' : 'auto' }}
                  ref={(el) => {
                    if (el && selectedImage && !imageRect.width) {
                      // Calculate on mount with a small delay to ensure image is rendered
                      setTimeout(() => calculateImageRect(el), 100);
                    }
                  }}
                >
                  <Image
                    src={selectedImage}
                    alt={selectedTitle}
                    fill
                    sizes="(max-width: 768px) 90vw, 60vw"
                    className="object-contain rounded-lg"
                    quality={85}
                    priority
                  />

                  {/* Magnifying Glass in Modal */}
                  {magnifierActive === 1 && imageRect.width > 0 && (() => {
                    // Calculate position relative to the actual image (not container)
                    const relativeX = magnifierPos.x - imageRect.offsetX;
                    const relativeY = magnifierPos.y - imageRect.offsetY;

                    // The point in the zoomed image that should be at the center of the magnifier
                    const zoomedPointX = relativeX * zoomLevel;
                    const zoomedPointY = relativeY * zoomLevel;

                    // Background position to center that point in the magnifier
                    const bgPosX = (magnifierSize / 2) - zoomedPointX;
                    const bgPosY = (magnifierSize / 2) - zoomedPointY;

                    // Position magnifier - check if it would be clipped at top on mobile
                    let magnifierOffset = 0;
                    let arrowPosition: 'top' | 'bottom' = 'top';

                    if (isMobile) {
                      const magnifierWithOffsetTop = magnifierPos.y - magnifierSize / 2 - (magnifierSize + 30);

                      // If magnifier would be clipped at top, position it below finger instead
                      if (magnifierWithOffsetTop < 0) {
                        magnifierOffset = -(magnifierSize + 30); // Position below
                        arrowPosition = 'bottom';
                      } else {
                        magnifierOffset = magnifierSize + 30; // Position above
                        arrowPosition = 'top';
                      }
                    }

                    const magnifierLeft = magnifierPos.x - magnifierSize / 2;
                    const magnifierTop = magnifierPos.y - magnifierSize / 2 - magnifierOffset;

                    return (
                      <div
                        className="absolute pointer-events-none border-4 border-gold-400 rounded-full shadow-2xl bg-ink-900"
                        style={{
                          width: `${magnifierSize}px`,
                          height: `${magnifierSize}px`,
                          left: `${magnifierLeft}px`,
                          top: `${magnifierTop}px`,
                          backgroundImage: `url(${selectedImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: `${imageRect.width * zoomLevel}px ${imageRect.height * zoomLevel}px`,
                          backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                          boxShadow:
                            "0 0 20px rgba(212, 175, 55, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.5)",
                          zIndex: 9999,
                        }}
                      >
                        {/* Pointer indicator for mobile */}
                        {isMobile && (
                          arrowPosition === 'top' ? (
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gold-400" />
                          ) : (
                            <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gold-400" />
                          )
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Titre et description */}
              <div className="mt-4 text-center">
                <h3 className="text-gold-400 text-lg md:text-xl font-display font-bold">
                  {selectedTitle}
                </h3>
                <p className="text-gold-400/70 text-sm md:text-base mt-2">
                  {selectedAlt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
