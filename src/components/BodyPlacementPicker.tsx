"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaUndo } from "react-icons/fa";
import { BodyZone, bodyZonesBack, bodyZonesFront } from "@/components/PainMap";
import { useLanguage } from "@/context/LanguageContext";

type View = "front" | "back";

interface BodyPlacementPickerProps {
  value: string;
  onChange: (value: string) => void;
  customPlaceholder: string;
}

function zoneName(zone: BodyZone, language: string) {
  return language === "fr" ? zone.nameFr : zone.nameEn;
}

function parseCustom(value: string, selectedName: string | null) {
  if (!value || !selectedName) return value;
  const prefix = `${selectedName} - `;
  return value.startsWith(prefix) ? value.slice(prefix.length) : "";
}

export default function BodyPlacementPicker({ value, onChange, customPlaceholder }: BodyPlacementPickerProps) {
  const { language } = useLanguage();
  const [view, setView] = useState<View>("front");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const zones = view === "front" ? bodyZonesFront : bodyZonesBack;
  const allZones = useMemo(() => [...bodyZonesFront, ...bodyZonesBack], []);
  const selectedZone = allZones.find((zone) => {
    const name = zoneName(zone, language);
    return value === name || value.startsWith(`${name} - `);
  });
  const selectedName = selectedZone ? zoneName(selectedZone, language) : null;
  const customValue = parseCustom(value, selectedName);

  const copy = language === "fr"
    ? {
        front: "Avant",
        back: "Arrière",
        tap: "Tape une zone",
        selected: "Zone choisie",
        clear: "Effacer",
        refine: "Préciser, optionnel",
      }
    : {
        front: "Front",
        back: "Back",
        tap: "Tap a zone",
        selected: "Selected area",
        clear: "Clear",
        refine: "Add detail, optional",
      };

  const selectZone = (zone: BodyZone) => {
    onChange(zoneName(zone, language));
  };

  const updateCustom = (detail: string) => {
    if (!selectedName) {
      onChange(detail);
      return;
    }
    onChange(detail ? `${selectedName} - ${detail}` : selectedName);
  };

  return (
    <div className="rounded-3xl border border-ink-600 bg-ink-900/45 p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <p className="text-sm font-medium text-gray-300">{copy.tap}</p>
          <p className="text-xs text-gray-500">{selectedName || customPlaceholder}</p>
        </div>
        <div className="inline-flex rounded-full border border-ink-600 bg-ink-800 p-1">
          {(["front", "back"] as View[]).map((side) => (
            <button
              key={side}
              type="button"
              onClick={() => setView(side)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                view === side ? "bg-gold-400 text-ink-900" : "text-gray-400 hover:text-gold-400"
              }`}
            >
              {side === "front" ? copy.front : copy.back}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-4 items-center">
        <div className="relative mx-auto w-full max-w-[220px] rounded-3xl bg-gradient-to-b from-ink-800 to-ink-900 p-2 border border-ink-600 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.10),_transparent_62%)]" />
          <svg viewBox="0 0 320 530" className="relative z-10 w-full h-auto max-h-[360px]">
            <defs>
              <filter id="booking-placement-glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {zones.map((zone) => {
              const name = zoneName(zone, language);
              const selected = selectedName === name;
              const hovered = hoveredId === zone.id;
              return (
                <path
                  key={zone.id}
                  d={zone.path}
                  fill={selected ? "#ef4444" : hovered ? "#f59e0b" : "#374151"}
                  fillOpacity={selected ? 0.95 : hovered ? 0.85 : 0.42}
                  stroke={selected ? "#fecaca" : hovered ? "#fbbf24" : "#4b5563"}
                  strokeWidth={selected ? 2.4 : hovered ? 1.8 : 1}
                  filter={selected || hovered ? "url(#booking-placement-glow)" : undefined}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredId(zone.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => selectZone(zone)}
                />
              );
            })}
          </svg>
        </div>

        <div className="space-y-3">
          <motion.div
            key={selectedName || "empty"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border p-4 ${
              selectedName ? "border-red-400/40 bg-red-500/10" : "border-ink-600 bg-ink-800/60"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-1">
              {selectedName ? copy.selected : copy.tap}
            </p>
            <p className="text-lg font-semibold text-gray-100 flex items-center gap-2">
              {selectedName && <FaCheck className="text-red-400" size={14} />}
              {selectedName || (language === "fr" ? "Aucune zone choisie" : "No area selected")}
            </p>
          </motion.div>

          <input
            type="text"
            value={selectedName ? customValue : value}
            onChange={(event) => updateCustom(event.target.value)}
            className="w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
            placeholder={selectedName ? copy.refine : customPlaceholder}
          />

          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-2 rounded-full border border-ink-600 px-3 py-2 text-sm text-gray-400 transition-all hover:border-gold-400/50 hover:text-gold-400"
            >
              <FaUndo size={12} />
              {copy.clear}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
