"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BodyZone {
  id: string;
  path: string;
  painLevel: number; // 1-5 (1 = low pain, 5 = extreme pain)
  nameFr: string;
  nameEn: string;
}

// Pain levels: 1 = très supportable, 5 = très douloureux
// Spacing: 3px gaps between zones for better mobile touch targets
const bodyZonesFront: BodyZone[] = [
  // Head & Neck (3px gap below head)
  { id: "head", path: "M 150,28 Q 128,28 123,50 Q 118,77 129,93 Q 140,107 150,107 Q 160,107 171,93 Q 182,77 177,50 Q 172,28 150,28 Z", painLevel: 5, nameFr: "Tête", nameEn: "Head" },
  { id: "neck-front", path: "M 138,110 L 162,110 L 167,132 L 133,132 Z", painLevel: 5, nameFr: "Cou", nameEn: "Neck" },

  // Torso (3px gaps between sections)
  { id: "chest-left", path: "M 133,135 L 142,135 L 142,178 L 118,178 L 113,152 Q 118,138 133,135 Z", painLevel: 3, nameFr: "Poitrine gauche", nameEn: "Left chest" },
  { id: "sternum", path: "M 145,135 L 155,135 L 155,178 L 145,178 Z", painLevel: 5, nameFr: "Sternum", nameEn: "Sternum" },
  { id: "chest-right", path: "M 158,135 L 167,135 Q 182,138 187,152 L 182,178 L 158,178 Z", painLevel: 3, nameFr: "Poitrine droite", nameEn: "Right chest" },
  { id: "stomach", path: "M 123,181 L 177,181 L 177,218 L 123,218 Z", painLevel: 3, nameFr: "Ventre", nameEn: "Stomach" },
  { id: "ribs-left", path: "M 107,152 L 115,178 L 120,218 L 110,218 L 100,178 Z", painLevel: 5, nameFr: "Côtes gauches", nameEn: "Left ribs" },
  { id: "ribs-right", path: "M 193,152 L 185,178 L 180,218 L 190,218 L 200,178 Z", painLevel: 5, nameFr: "Côtes droites", nameEn: "Right ribs" },
  { id: "lower-abs", path: "M 128,221 L 172,221 L 167,258 L 133,258 Z", painLevel: 4, nameFr: "Bas-ventre", nameEn: "Lower abdomen" },

  // Arms (moved 12px outward from body for better armpit access)
  { id: "shoulder-left", path: "M 108,135 Q 82,140 75,155 L 93,155 L 108,140 Z", painLevel: 2, nameFr: "Épaule gauche", nameEn: "Left shoulder" },
  { id: "shoulder-right", path: "M 192,135 Q 218,140 225,155 L 207,155 L 192,140 Z", painLevel: 2, nameFr: "Épaule droite", nameEn: "Right shoulder" },
  { id: "armpit-left", path: "M 93,158 L 110,158 L 110,180 L 93,180 Z", painLevel: 5, nameFr: "Aisselle gauche", nameEn: "Left armpit" },
  { id: "armpit-right", path: "M 190,158 L 207,158 L 207,180 L 190,180 Z", painLevel: 5, nameFr: "Aisselle droite", nameEn: "Right armpit" },
  { id: "upper-arm-left", path: "M 75,158 L 90,158 L 85,198 L 70,198 Z", painLevel: 2, nameFr: "Bras gauche (ext.)", nameEn: "Left upper arm" },
  { id: "upper-arm-right", path: "M 210,158 L 225,158 L 230,198 L 215,198 Z", painLevel: 2, nameFr: "Bras droit (ext.)", nameEn: "Right upper arm" },
  { id: "inner-arm-left", path: "M 88,158 L 105,158 L 100,198 L 83,198 Z", painLevel: 4, nameFr: "Bras gauche (int.)", nameEn: "Left inner arm" },
  { id: "inner-arm-right", path: "M 195,158 L 212,158 L 217,198 L 200,198 Z", painLevel: 4, nameFr: "Bras droit (int.)", nameEn: "Right inner arm" },
  { id: "elbow-left", path: "M 66,201 L 100,201 L 98,221 L 64,221 Z", painLevel: 5, nameFr: "Coude gauche", nameEn: "Left elbow" },
  { id: "elbow-right", path: "M 200,201 L 234,201 L 236,221 L 202,221 Z", painLevel: 5, nameFr: "Coude droit", nameEn: "Right elbow" },
  { id: "forearm-left", path: "M 60,224 L 98,224 L 88,278 L 54,278 Z", painLevel: 2, nameFr: "Avant-bras gauche", nameEn: "Left forearm" },
  { id: "forearm-right", path: "M 202,224 L 240,224 L 246,278 L 212,278 Z", painLevel: 2, nameFr: "Avant-bras droit", nameEn: "Right forearm" },
  { id: "wrist-left", path: "M 50,281 L 88,281 L 83,301 L 45,301 Z", painLevel: 4, nameFr: "Poignet gauche", nameEn: "Left wrist" },
  { id: "wrist-right", path: "M 212,281 L 250,281 L 255,301 L 217,301 Z", painLevel: 4, nameFr: "Poignet droit", nameEn: "Right wrist" },
  { id: "hand-left", path: "M 41,304 L 83,304 L 78,345 L 36,345 Z", painLevel: 5, nameFr: "Main gauche", nameEn: "Left hand" },
  { id: "hand-right", path: "M 217,304 L 259,304 L 264,345 L 222,345 Z", painLevel: 5, nameFr: "Main droite", nameEn: "Right hand" },

  // Legs (3px gaps, wider inner zones)
  { id: "hip-left", path: "M 118,261 L 135,261 L 135,278 L 113,278 Z", painLevel: 3, nameFr: "Hanche gauche", nameEn: "Left hip" },
  { id: "hip-right", path: "M 165,261 L 182,261 L 187,278 L 165,278 Z", painLevel: 3, nameFr: "Hanche droite", nameEn: "Right hip" },
  { id: "thigh-left", path: "M 113,281 L 138,281 L 133,358 L 108,358 Z", painLevel: 2, nameFr: "Cuisse gauche", nameEn: "Left thigh" },
  { id: "thigh-right", path: "M 162,281 L 187,281 L 192,358 L 167,358 Z", painLevel: 2, nameFr: "Cuisse droite", nameEn: "Right thigh" },
  { id: "inner-thigh-left", path: "M 141,281 L 148,281 L 148,358 L 136,358 Z", painLevel: 4, nameFr: "Intérieur cuisse G", nameEn: "Left inner thigh" },
  { id: "inner-thigh-right", path: "M 152,281 L 159,281 L 164,358 L 152,358 Z", painLevel: 4, nameFr: "Intérieur cuisse D", nameEn: "Right inner thigh" },
  { id: "knee-left", path: "M 108,361 L 145,361 L 143,393 L 106,393 Z", painLevel: 5, nameFr: "Genou gauche", nameEn: "Left knee" },
  { id: "knee-right", path: "M 155,361 L 192,361 L 194,393 L 157,393 Z", painLevel: 5, nameFr: "Genou droit", nameEn: "Right knee" },
  { id: "shin-left", path: "M 106,396 L 143,396 L 138,458 L 110,458 Z", painLevel: 4, nameFr: "Tibia gauche", nameEn: "Left shin" },
  { id: "shin-right", path: "M 157,396 L 194,396 L 190,458 L 162,458 Z", painLevel: 4, nameFr: "Tibia droit", nameEn: "Right shin" },
  { id: "ankle-left", path: "M 110,461 L 138,461 L 135,481 L 113,481 Z", painLevel: 4, nameFr: "Cheville gauche", nameEn: "Left ankle" },
  { id: "ankle-right", path: "M 162,461 L 190,461 L 187,481 L 165,481 Z", painLevel: 4, nameFr: "Cheville droite", nameEn: "Right ankle" },
  { id: "foot-left", path: "M 108,484 L 140,484 L 145,515 L 103,515 Z", painLevel: 5, nameFr: "Pied gauche", nameEn: "Left foot" },
  { id: "foot-right", path: "M 160,484 L 192,484 L 197,515 L 155,515 Z", painLevel: 5, nameFr: "Pied droit", nameEn: "Right foot" },
];

const bodyZonesBack: BodyZone[] = [
  // Head & Neck (3px gaps)
  { id: "head-back", path: "M 150,28 Q 128,28 123,50 Q 118,77 129,93 Q 140,107 150,107 Q 160,107 171,93 Q 182,77 177,50 Q 172,28 150,28 Z", painLevel: 5, nameFr: "Arrière tête", nameEn: "Back of head" },
  { id: "neck-back", path: "M 138,110 L 162,110 L 167,132 L 133,132 Z", painLevel: 5, nameFr: "Nuque", nameEn: "Nape" },

  // Back (3px gaps, wider spine zones)
  { id: "upper-back-left", path: "M 113,135 L 142,135 L 142,178 L 108,178 Z", painLevel: 2, nameFr: "Haut du dos G", nameEn: "Upper back left" },
  { id: "upper-back-right", path: "M 158,135 L 187,135 L 192,178 L 158,178 Z", painLevel: 2, nameFr: "Haut du dos D", nameEn: "Upper back right" },
  { id: "spine-upper", path: "M 145,135 L 155,135 L 155,198 L 145,198 Z", painLevel: 5, nameFr: "Colonne (haut)", nameEn: "Upper spine" },
  { id: "mid-back-left", path: "M 108,181 L 142,181 L 142,228 L 113,228 Z", painLevel: 2, nameFr: "Milieu dos G", nameEn: "Mid back left" },
  { id: "mid-back-right", path: "M 158,181 L 192,181 L 187,228 L 158,228 Z", painLevel: 2, nameFr: "Milieu dos D", nameEn: "Mid back right" },
  { id: "spine-mid", path: "M 145,201 L 155,201 L 155,248 L 145,248 Z", painLevel: 5, nameFr: "Colonne (milieu)", nameEn: "Mid spine" },
  { id: "lower-back-left", path: "M 118,231 L 142,231 L 142,268 L 123,268 Z", painLevel: 3, nameFr: "Bas du dos G", nameEn: "Lower back left" },
  { id: "lower-back-right", path: "M 158,231 L 182,231 L 177,268 L 158,268 Z", painLevel: 3, nameFr: "Bas du dos D", nameEn: "Lower back right" },
  { id: "spine-lower", path: "M 145,251 L 155,251 L 155,278 L 145,278 Z", painLevel: 5, nameFr: "Colonne (bas)", nameEn: "Lower spine" },

  // Arms back view (moved 12px outward from body)
  { id: "shoulder-back-left", path: "M 108,135 Q 82,142 75,158 L 93,158 L 108,142 Z", painLevel: 2, nameFr: "Épaule arrière G", nameEn: "Left back shoulder" },
  { id: "shoulder-back-right", path: "M 192,135 Q 218,142 225,158 L 207,158 L 192,142 Z", painLevel: 2, nameFr: "Épaule arrière D", nameEn: "Right back shoulder" },
  { id: "tricep-left", path: "M 75,161 L 98,161 L 93,208 L 70,208 Z", painLevel: 2, nameFr: "Triceps gauche", nameEn: "Left tricep" },
  { id: "tricep-right", path: "M 202,161 L 225,161 L 230,208 L 207,208 Z", painLevel: 2, nameFr: "Triceps droit", nameEn: "Right tricep" },
  { id: "back-elbow-left", path: "M 66,211 L 93,211 L 91,231 L 64,231 Z", painLevel: 5, nameFr: "Coude arrière G", nameEn: "Left back elbow" },
  { id: "back-elbow-right", path: "M 207,211 L 234,211 L 236,231 L 209,231 Z", painLevel: 5, nameFr: "Coude arrière D", nameEn: "Right back elbow" },
  { id: "back-forearm-left", path: "M 60,234 L 91,234 L 85,278 L 54,278 Z", painLevel: 2, nameFr: "Avant-bras arr. G", nameEn: "Left back forearm" },
  { id: "back-forearm-right", path: "M 209,234 L 240,234 L 246,278 L 215,278 Z", painLevel: 2, nameFr: "Avant-bras arr. D", nameEn: "Right back forearm" },
  { id: "back-wrist-left", path: "M 50,281 L 85,281 L 81,301 L 46,301 Z", painLevel: 4, nameFr: "Poignet arr. G", nameEn: "Left back wrist" },
  { id: "back-wrist-right", path: "M 215,281 L 250,281 L 254,301 L 219,301 Z", painLevel: 4, nameFr: "Poignet arr. D", nameEn: "Right back wrist" },
  { id: "back-hand-left", path: "M 42,304 L 81,304 L 77,345 L 38,345 Z", painLevel: 5, nameFr: "Main arr. G", nameEn: "Left back hand" },
  { id: "back-hand-right", path: "M 219,304 L 258,304 L 262,345 L 223,345 Z", painLevel: 5, nameFr: "Main arr. D", nameEn: "Right back hand" },

  // Glutes & Legs (3px gaps)
  { id: "glute-left", path: "M 118,271 L 148,271 L 148,308 L 113,308 Z", painLevel: 1, nameFr: "Fesse gauche", nameEn: "Left glute" },
  { id: "glute-right", path: "M 152,271 L 182,271 L 187,308 L 152,308 Z", painLevel: 1, nameFr: "Fesse droite", nameEn: "Right glute" },
  { id: "back-thigh-left", path: "M 110,311 L 148,311 L 143,368 L 106,368 Z", painLevel: 2, nameFr: "Arrière cuisse G", nameEn: "Left hamstring" },
  { id: "back-thigh-right", path: "M 152,311 L 190,311 L 194,368 L 157,368 Z", painLevel: 2, nameFr: "Arrière cuisse D", nameEn: "Right hamstring" },
  { id: "back-knee-left", path: "M 106,371 L 143,371 L 140,396 L 108,396 Z", painLevel: 4, nameFr: "Arrière genou G", nameEn: "Left back knee" },
  { id: "back-knee-right", path: "M 157,371 L 194,371 L 192,396 L 160,396 Z", painLevel: 4, nameFr: "Arrière genou D", nameEn: "Right back knee" },
  { id: "back-calf-left", path: "M 108,399 L 140,399 L 135,458 L 113,458 Z", painLevel: 2, nameFr: "Mollet arrière G", nameEn: "Left back calf" },
  { id: "back-calf-right", path: "M 160,399 L 192,399 L 187,458 L 165,458 Z", painLevel: 2, nameFr: "Mollet arrière D", nameEn: "Right back calf" },
  { id: "achilles-left", path: "M 116,461 L 134,461 L 132,488 L 118,488 Z", painLevel: 5, nameFr: "Tendon d'Achille G", nameEn: "Left Achilles" },
  { id: "achilles-right", path: "M 166,461 L 184,461 L 182,488 L 168,488 Z", painLevel: 5, nameFr: "Tendon d'Achille D", nameEn: "Right Achilles" },
  { id: "heel-left", path: "M 113,491 L 137,491 L 140,515 L 110,515 Z", painLevel: 5, nameFr: "Talon gauche", nameEn: "Left heel" },
  { id: "heel-right", path: "M 163,491 L 187,491 L 190,515 L 160,515 Z", painLevel: 5, nameFr: "Talon droit", nameEn: "Right heel" },
];

function getPainColor(level: number): string {
  switch (level) {
    case 1: return "#22c55e"; // green-500 - très supportable
    case 2: return "#84cc16"; // lime-500 - supportable
    case 3: return "#eab308"; // yellow-500 - modéré
    case 4: return "#f97316"; // orange-500 - douloureux
    case 5: return "#ef4444"; // red-500 - très douloureux
    default: return "#6b7280";
  }
}

function getPainLabel(level: number, language: string): string {
  const labels = {
    fr: {
      1: "Très supportable",
      2: "Supportable", 
      3: "Modéré",
      4: "Douloureux",
      5: "Très douloureux",
    },
    en: {
      1: "Very bearable",
      2: "Bearable",
      3: "Moderate",
      4: "Painful",
      5: "Very painful",
    },
  };
  return labels[language as keyof typeof labels]?.[level as keyof typeof labels.fr] || "";
}

function BodySVG({
  zones,
  hoveredZone,
  setHoveredZone,
}: {
  zones: BodyZone[];
  hoveredZone: BodyZone | null;
  setHoveredZone: (zone: BodyZone | null) => void;
}) {
  return (
    <svg viewBox="0 0 320 530" className="w-full h-full max-h-[500px]">
      {/* Body outline for context */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {zones.map((zone) => (
        <path
          key={zone.id}
          d={zone.path}
          fill={getPainColor(zone.painLevel)}
          fillOpacity={hoveredZone?.id === zone.id ? 0.9 : 0.6}
          stroke={hoveredZone?.id === zone.id ? "#fff" : getPainColor(zone.painLevel)}
          strokeWidth={hoveredZone?.id === zone.id ? 2 : 1}
          className="cursor-pointer transition-all duration-200"
          filter={hoveredZone?.id === zone.id ? "url(#glow)" : undefined}
          onMouseEnter={() => setHoveredZone(zone)}
          onMouseLeave={() => setHoveredZone(null)}
          onClick={() => setHoveredZone(zone)}
        />
      ))}
    </svg>
  );
}

export default function PainMap() {
  const { language } = useLanguage();
  const [hoveredZone, setHoveredZone] = useState<BodyZone | null>(null);
  const [view, setView] = useState<"front" | "back">("front");

  const content = {
    fr: {
      title: "Carte de la ",
      titleHighlight: "Douleur",
      subtitle: "Découvrez le niveau de douleur de chaque zone du corps. Survolez ou touchez une zone pour plus de détails.",
      front: "Avant",
      back: "Arrière",
      hoverPrompt: "Survolez une zone pour voir le niveau de douleur",
      painLevel: "Niveau de douleur",
      tip: "💡 J'offre de la crème anesthésiante à mon studio pour votre confort!",
    },
    en: {
      title: "Pain ",
      titleHighlight: "Map",
      subtitle: "Discover the pain level for each body zone. Hover or tap a zone for more details.",
      front: "Front",
      back: "Back",
      hoverPrompt: "Hover over a zone to see the pain level",
      painLevel: "Pain level",
      tip: "💡 I offer numbing cream at my studio for your comfort!",
    },
  };

  const t = content[language as keyof typeof content] || content.fr;
  const zones = view === "front" ? bodyZonesFront : bodyZonesBack;

  return (
    <section id="painmap" className="py-16 sm:py-20 bg-ink-800/50 scroll-mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t.title}
            <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Body visualization */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* View toggle */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setView("front")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "front"
                    ? "bg-gold-500 text-ink-900"
                    : "bg-ink-700 text-gray-300 hover:bg-ink-600"
                }`}
              >
                {t.front}
              </button>
              <button
                onClick={() => setView("back")}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === "back"
                    ? "bg-gold-500 text-ink-900"
                    : "bg-ink-700 text-gray-300 hover:bg-ink-600"
                }`}
              >
                {t.back}
              </button>
            </div>

            {/* SVG Container */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700">
              <BodySVG
                zones={zones}
                hoveredZone={hoveredZone}
                setHoveredZone={setHoveredZone}
              />
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Selected zone info */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700 min-h-[180px]">
              {hoveredZone ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {language === "fr" ? hoveredZone.nameFr : hoveredZone.nameEn}
                  </h3>
                  <div 
                    className="inline-block px-4 py-2 rounded-full text-white font-medium mb-4"
                    style={{ backgroundColor: getPainColor(hoveredZone.painLevel) }}
                  >
                    {getPainLabel(hoveredZone.painLevel, language)}
                  </div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          level <= hoveredZone.painLevel
                            ? "text-white scale-110"
                            : "bg-ink-700 text-gray-500"
                        }`}
                        style={{
                          backgroundColor: level <= hoveredZone.painLevel ? getPainColor(level) : undefined,
                        }}
                      >
                        {level}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 text-center">
                  <p>{t.hoverPrompt}</p>
                </div>
              )}
            </div>

            {/* Pain level legend */}
            <div className="bg-ink-900/50 rounded-2xl p-6 border border-ink-700">
              <h4 className="text-lg font-semibold text-white mb-4">{t.painLevel}</h4>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getPainColor(level) }}
                    />
                    <div className="flex-1 h-2 bg-ink-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: getPainColor(level),
                          width: `${level * 20}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-300 w-32 text-right">
                      {getPainLabel(level, language)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="bg-gradient-to-r from-gold-500/10 to-gold-600/10 border border-gold-500/30 rounded-xl p-4 text-center">
              <p className="text-gold-400 font-medium">{t.tip}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
