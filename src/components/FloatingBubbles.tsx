"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

interface TattooItem {
  id: number;
  image: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
}

// Ajoute tes tatouages préférés ici!
// Mets les images dans /public/tattoos/
const featuredTattoos: TattooItem[] = [
  {
    id: 1,
    image: "/tattoos/tattoo1.jpg",
    titleFr: "Serpent Géométrique",
    titleEn: "Geometric Snake",
    descriptionFr: "Un serpent stylisé avec des éléments géométriques. Réalisé en 3 heures sur l'avant-bras.",
    descriptionEn: "A stylized snake with geometric elements. Completed in 3 hours on the forearm.",
  },
  {
    id: 2,
    image: "/tattoos/tattoo2.jpg",
    titleFr: "Rose Traditionnelle",
    titleEn: "Traditional Rose",
    descriptionFr: "Rose classique style old school avec ombrage traditionnel.",
    descriptionEn: "Classic old school style rose with traditional shading.",
  },
  {
    id: 3,
    image: "/tattoos/tattoo3.jpg",
    titleFr: "Mandala Dotwork",
    titleEn: "Dotwork Mandala",
    descriptionFr: "Mandala détaillé en pointillisme. Un travail de patience de 5 heures.",
    descriptionEn: "Detailed mandala in dotwork. A 5-hour patience work.",
  },
  {
    id: 4,
    image: "/tattoos/tattoo4.jpg",
    titleFr: "Portrait Réaliste",
    titleEn: "Realistic Portrait",
    descriptionFr: "Portrait en noir et gris, technique réaliste avec dégradés subtils.",
    descriptionEn: "Black and grey portrait, realistic technique with subtle gradients.",
  },
  {
    id: 5,
    image: "/tattoos/tattoo5.jpg",
    titleFr: "Fleurs Minimalistes",
    titleEn: "Minimalist Flowers",
    descriptionFr: "Composition florale fine line, délicate et élégante.",
    descriptionEn: "Fine line floral composition, delicate and elegant.",
  },
];

// Positions initiales des bulles (en pourcentage)
const bubblePositions = [
  { x: 8, y: 20, size: 80 },
  { x: 85, y: 15, size: 90 },
  { x: 12, y: 70, size: 70 },
  { x: 80, y: 65, size: 85 },
  { x: 50, y: 85, size: 75 },
];

function Bubble({ 
  tattoo, 
  position, 
  index, 
  onClick 
}: { 
  tattoo: TattooItem; 
  position: { x: number; y: number; size: number };
  index: number;
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute cursor-pointer group"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: position.size,
        height: position.size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: [0, 10, -5, 8, 0],
        y: [0, -8, 5, -10, 0],
      }}
      transition={{
        opacity: { delay: index * 0.2, duration: 0.5 },
        scale: { delay: index * 0.2, duration: 0.5 },
        x: {
          duration: 8 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        y: {
          duration: 10 + index * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.15 }}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gold-500/20 blur-md group-hover:bg-gold-500/40 transition-all" />
      
      {/* Border ring */}
      <div className="absolute inset-0 rounded-full border-2 border-gold-500/50 group-hover:border-gold-400 transition-all" />
      
      {/* Image */}
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <img
          src={tattoo.image}
          alt={tattoo.titleFr}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback si l'image n'existe pas
            (e.target as HTMLImageElement).src = `https://picsum.photos/200?random=${tattoo.id}`;
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
          <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Voir
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function Modal({ 
  tattoo, 
  onClose,
  language 
}: { 
  tattoo: TattooItem; 
  onClose: () => void;
  language: string;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative max-w-2xl w-full bg-ink-800 rounded-2xl overflow-hidden border border-gold-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {/* Image */}
        <div className="relative aspect-square max-h-[60vh] overflow-hidden">
          <img
            src={tattoo.image}
            alt={language === "fr" ? tattoo.titleFr : tattoo.titleEn}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/600?random=${tattoo.id}`;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-2xl font-display font-bold text-white mb-2">
            {language === "fr" ? tattoo.titleFr : tattoo.titleEn}
          </h3>
          <p className="text-gray-400">
            {language === "fr" ? tattoo.descriptionFr : tattoo.descriptionEn}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingBubbles() {
  const [selectedTattoo, setSelectedTattoo] = useState<TattooItem | null>(null);
  const { language } = useLanguage();

  return (
    <>
      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {featuredTattoos.map((tattoo, index) => (
          <div key={tattoo.id} className="pointer-events-auto">
            <Bubble
              tattoo={tattoo}
              position={bubblePositions[index]}
              index={index}
              onClick={() => setSelectedTattoo(tattoo)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedTattoo && (
          <Modal
            tattoo={selectedTattoo}
            onClose={() => setSelectedTattoo(null)}
            language={language}
          />
        )}
      </AnimatePresence>
    </>
  );
}
