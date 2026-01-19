"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaFacebook, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-ink-900 border-t border-ink-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              Mathieu Perron
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              {t("footer.description")}
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=St-Jean-de-Matha,QC,Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gold-400 text-sm hover:underline hover:text-gold-500 transition-colors"
            >
              <FaMapMarkerAlt />
              <span>St-Jean-de-Matha, Québec</span>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.links")}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/#work"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {t("footer.viewWork")}
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  {t("footer.bookSession")}
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/tattoomatha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@mathieutattoomatha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/mathieuperron1234"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Facebook
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-gold-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.connect")}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t("footer.connectDesc")}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/tattoomatha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://tiktok.com/@mathieutattoomatha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all"
              >
                <FaTiktok size={18} />
              </a>
              <a
                href="https://www.facebook.com/mathieuperron1234"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ink-700 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
              >
                <FaFacebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ink-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} Mathieu Perron Tattoo. {t("footer.rights")}
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            {t("footer.madeWith")} <FaHeart className="text-red-500" size={12} /> {t("footer.forLovers")}
          </p>
        </div>
      </div>
    </footer>
  );
}
