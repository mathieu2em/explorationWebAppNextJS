"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Si on est déjà sur la page d'accueil, scroll directement
    if (pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Sinon, naviguer vers la page d'accueil puis scroll avec délai
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 600);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl md:text-3xl font-display font-bold gradient-text">
              Mathieu Perron
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/#work"
              onClick={(e) => handleAnchorClick(e, "work")}
              className="text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {t("nav.work")}
            </a>
            <Link
              href="/faq"
              className="text-gray-300 hover:text-gold-400 transition-colors"
            >
              {t("nav.faq")}
            </Link>
            <a
              href="/#contact"
              onClick={(e) => handleAnchorClick(e, "contact")}
              className="text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
            >
              {t("nav.contact")}
            </a>
            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://instagram.com/tattoomatha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://tiktok.com/@mathieutattoomatha"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                <FaTiktok size={20} />
              </a>
              <a
                href="https://www.facebook.com/mathieuperron1234"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-gold-400 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button
              className="text-gray-300 hover:text-gold-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-ink-600 pt-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a
                href="/#work"
                onClick={(e) => handleAnchorClick(e, "work")}
                className="text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
              >
                {t("nav.work")}
              </a>
              <Link
                href="/faq"
                className="text-gray-300 hover:text-gold-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.faq")}
              </Link>
              <a
                href="/#contact"
                onClick={(e) => handleAnchorClick(e, "contact")}
                className="text-gray-300 hover:text-gold-400 transition-colors cursor-pointer"
              >
                {t("nav.contact")}
              </a>
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://instagram.com/tattoomatha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <FaInstagram size={22} />
                </a>
                <a
                  href="https://tiktok.com/@mathieutattoomatha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <FaTiktok size={20} />
                </a>
                <a
                  href="https://www.facebook.com/mathieuperron1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gold-400 transition-colors"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
