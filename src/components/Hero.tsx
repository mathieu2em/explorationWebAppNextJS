"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import FloatingBubbles from "./FloatingBubbles";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-800 to-ink-900">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating tattoo bubbles */}
      <FloatingBubbles />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-4 sm:mb-6 px-2">
            <span className="text-gray-100">{t("hero.title1")}</span>
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6"
        >
          {t("hero.description")}
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex items-center justify-center gap-2 text-gold-400 mb-10"
        >
          <FaMapMarkerAlt />
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=St-Jean-de-Matha,QC,Canada"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-base hover:underline hover:text-gold-500 transition-colors"
          >
            St-Jean-de-Matha, Québec
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-gold-400 text-ink-900 font-semibold rounded-lg hover:bg-gold-500 transition-all transform hover:scale-105 shadow-lg shadow-gold-400/20 text-sm sm:text-base"
          >
            {t("hero.cta.book")}
          </a>
          <a
            href="#work"
            className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 border border-gold-400/30 text-gold-400 font-semibold rounded-lg hover:bg-gold-400/10 transition-all text-sm sm:text-base"
          >
            {t("hero.cta.work")}
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          <a
            href="https://instagram.com/tattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
          >
            <FaInstagram size={24} />
            <span className="text-sm">@tattoomatha</span>
          </a>
          <a
            href="https://tiktok.com/@mathieutattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-gold-400 transition-colors"
          >
            <FaTiktok size={22} />
            <span className="text-sm">@mathieutattoomatha</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gold-400/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-gold-400 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
