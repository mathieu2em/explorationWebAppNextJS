"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaCheck, FaExclamationCircle } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

interface FormData {
  name: string;
  email: string;
  phone: string;
  tattooStyle: string;
  placement: string;
  size: string;
  description: string;
  referenceImages: string;
  budget: string;
  availability: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  
  const tattooStyleKeys = [
    "style.traditional",
    "style.neoTraditional",
    "style.japanese",
    "style.blackwork",
    "style.geometric",
    "style.dotwork",
    "style.realism",
    "style.microRealism",
    "style.fineLine",
    "style.watercolor",
    "style.tribal",
    "style.lettering",
    "style.illustrative",
    "style.other",
  ];

  const sizeKeys = [
    "size.tiny",
    "size.small",
    "size.medium",
    "size.large",
    "size.extraLarge",
    "size.fullSleeve",
    "size.halfSleeve",
    "size.fullBack",
    "size.notSure",
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    tattooStyle: "",
    placement: "",
    size: "",
    description: "",
    referenceImages: "",
    budget: "",
    availability: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email via API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }
      
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        tattooStyle: "",
        placement: "",
        size: "",
        description: "",
        referenceImages: "",
        budget: "",
        availability: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-ink-900 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gray-100">{t("contact.title1")}</span>
            <span className="gradient-text">{t("contact.title2")}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-4 sm:p-6 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.name")} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder="Jean Tremblay"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.email")} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder="jean@exemple.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.phone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder="(450) 123-4567"
              />
            </div>

            {/* Tattoo Style */}
            <div>
              <label htmlFor="tattooStyle" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.style")} *
              </label>
              <select
                id="tattooStyle"
                name="tattooStyle"
                required
                value={formData.tattooStyle}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white focus:border-gold-400 transition-colors"
              >
                <option value="">{t("contact.style.select")}</option>
                {tattooStyleKeys.map((styleKey) => (
                  <option key={styleKey} value={t(styleKey)}>
                    {t(styleKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Placement */}
            <div>
              <label htmlFor="placement" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.placement")} *
              </label>
              <input
                type="text"
                id="placement"
                name="placement"
                required
                value={formData.placement}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder={t("contact.placement.placeholder")}
              />
            </div>

            {/* Size */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.size")} *
              </label>
              <select
                id="size"
                name="size"
                required
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white focus:border-gold-400 transition-colors"
              >
                <option value="">{t("contact.size.select")}</option>
                {sizeKeys.map((sizeKey) => (
                  <option key={sizeKey} value={t(sizeKey)}>
                    {t(sizeKey)}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.budget")}
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder={t("contact.budget.placeholder")}
              />
            </div>

            {/* Availability */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                {t("contact.availability")}
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors"
                placeholder={t("contact.availability.placeholder")}
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              {t("contact.description.label")} *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors resize-none"
              placeholder={t("contact.description.placeholder")}
            />
          </div>

          {/* Reference Images */}
          <div className="mt-6">
            <label htmlFor="referenceImages" className="block text-sm font-medium text-gray-300 mb-2">
              {t("contact.references")}
            </label>
            <textarea
              id="referenceImages"
              name="referenceImages"
              rows={2}
              value={formData.referenceImages}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-ink-700 border border-ink-600 rounded-lg text-white placeholder-gray-500 focus:border-gold-400 transition-colors resize-none"
              placeholder={t("contact.references.placeholder")}
            />
            <p className="mt-2 text-xs text-gray-500">
              {t("contact.references.note")}
            </p>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-ink-600 text-gray-400 cursor-not-allowed"
                  : "bg-gold-400 text-ink-900 hover:bg-gold-500 transform hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {t("contact.sending")}
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  {t("contact.submit")}
                </>
              )}
            </button>
          </div>

          {/* Status Messages */}
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-900/30 border border-green-500/30 rounded-lg flex items-center gap-3"
            >
              <FaCheck className="text-green-500 flex-shrink-0" />
              <p className="text-green-400">
                {t("contact.success")}
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center gap-3"
            >
              <FaExclamationCircle className="text-red-500 flex-shrink-0" />
              <p className="text-red-400">
                {t("contact.error")}
              </p>
            </motion.div>
          )}
        </motion.form>

        {/* Alternative contact */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8"
        >
          {t("contact.alternative")}{" "}
          <a
            href="https://instagram.com/tattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:underline"
          >
            Instagram
          </a>
        </motion.p>
      </div>
    </section>
  );
}
