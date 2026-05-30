"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBolt,
  FaCheck,
  FaChevronDown,
  FaExclamationCircle,
  FaInstagram,
  FaPaperPlane,
  FaPhoneAlt,
  FaRegClock,
  FaRulerCombined,
} from "react-icons/fa";
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

type FieldKey = keyof FormData;

const emptyForm: FormData = {
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
};

function mergeValue(current: string, value: string) {
  if (!current) return value;
  if (current === value) return "";
  return value;
}

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [showExtras, setShowExtras] = useState(false);
  const [callbackMode, setCallbackMode] = useState(false);

  const copy = useMemo(() => {
    if (language === "en") {
      return {
        intro: "Describe the tattoo in your own words. The quick options are just shortcuts, use only what helps.",
        badge: "Fast intake, no endless form",
        ideaTitle: "Tell me the tattoo idea",
        ideaPlaceholder: "Example: a blackwork raven with geometric details on my forearm. I want something dark, clean, and symbolic...",
        contactTitle: "How do I reach you?",
        name: "Name",
        email: "Email",
        phone: "Phone",
        phoneOptional: "Phone, optional",
        refs: "Reference links, optional",
        refsPlaceholder: "Pinterest, Instagram, Drive links, or tell me you will send them by DM...",
        extras: "Add quick details",
        hideExtras: "Hide details",
        style: "Style",
        placement: "Placement",
        size: "Size",
        budget: "Budget",
        availability: "Availability",
        customPlacement: "Type a placement",
        customAvailability: "Or type a specific availability",
        submit: "Send my tattoo idea",
        sending: "Sending...",
        callback: "Skip this, call me instead",
        callbackTitle: "Call me instead",
        callbackText: "Leave a name and phone number. I will call you to talk through the project.",
        callbackSubmit: "Ask for a call",
        success: "Done. Your request was sent. I will get back to you soon.",
        error: "Something went wrong. Try again or DM me on Instagram.",
        required: "Add your idea and either an email or phone number.",
        contactHint: "Email is best, phone is enough if you want a call.",
      };
    }

    return {
      intro: "Décris ton tattoo dans tes mots. Les options rapides sont juste des raccourcis, utilise seulement ce qui aide.",
      badge: "Brief rapide, pas de formulaire interminable",
      ideaTitle: "Décris-moi l'idée du tattoo",
      ideaPlaceholder: "Ex: un corbeau blackwork avec des détails géométriques sur l'avant-bras. Je veux quelque chose de sombre, clean et symbolique...",
      contactTitle: "Je te rejoins comment?",
      name: "Nom",
      email: "Courriel",
      phone: "Téléphone",
      phoneOptional: "Téléphone, optionnel",
      refs: "Liens de référence, optionnel",
      refsPlaceholder: "Pinterest, Instagram, Drive, ou dis-moi que tu vas me les envoyer en DM...",
      extras: "Ajouter des détails rapides",
      hideExtras: "Masquer les détails",
      style: "Style",
      placement: "Emplacement",
      size: "Grandeur",
      budget: "Budget",
      availability: "Disponibilités",
      customPlacement: "Écrire un emplacement",
      customAvailability: "Ou écrire une disponibilité précise",
      submit: "Envoyer mon idée de tattoo",
      sending: "Envoi...",
      callback: "Skip ça, appelle-moi plutôt",
      callbackTitle: "Appelle-moi plutôt",
      callbackText: "Laisse ton nom et ton numéro. Je vais t'appeler pour qu'on parle du projet.",
      callbackSubmit: "Demander un appel",
      success: "C'est envoyé. Je te reviens bientôt.",
      error: "Oups, ça n'a pas fonctionné. Réessaie ou écris-moi sur Instagram.",
      required: "Ajoute ton idée et au moins un courriel ou un numéro.",
      contactHint: "Le courriel est idéal, le téléphone suffit si tu veux un appel.",
    };
  }, [language]);

  const options = useMemo(() => {
    if (language === "en") {
      return {
        tattooStyle: ["Blackwork", "Geometric", "Fine line", "Realistic", "Lettering", "Not sure"],
        placement: ["Forearm", "Arm", "Leg", "Back", "Chest", "Ribs", "Hand", "Not sure"],
        size: ["Small", "Medium", "Large", "Sleeve / big project", "Not sure"],
        budget: ["Under $300", "$300 to $600", "$600 to $1000", "$1000+", "Let's discuss"],
        availability: ["Weeknights", "Weekend", "Flexible", "After 7pm", "Specific dates"],
      };
    }

    return {
      tattooStyle: ["Blackwork", "Géométrique", "Fine line", "Réaliste", "Lettrage", "Pas sûr"],
      placement: ["Avant-bras", "Bras", "Jambe", "Dos", "Torse", "Côtes", "Main", "Pas sûr"],
      size: ["Petit", "Moyen", "Grand", "Manchette / gros projet", "Pas sûr"],
      budget: ["Moins de 300$", "300$ à 600$", "600$ à 1000$", "1000$+", "À discuter"],
      availability: ["Soirs de semaine", "Weekend", "Flexible", "Après 19h", "Dates précises"],
    };
  }, [language]);

  const canSubmit = formData.description.trim().length > 4 && (formData.email.trim() || formData.phone.trim());
  const canCallback = formData.phone.trim().length > 4;

  const updateField = (field: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleChip = (field: FieldKey, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: mergeValue(prev[field], value) }));
  };

  const submitPayload = async (payload: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setSubmitStatus("success");
      setFormData(emptyForm);
      setCallbackMode(false);
      setShowExtras(false);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitPayload(formData);
  };

  const handleCallback = () => {
    if (!canCallback) return;

    submitPayload({
      ...emptyForm,
      name: formData.name || (language === "fr" ? "Client à rappeler" : "Callback request"),
      email: formData.email,
      phone: formData.phone,
      tattooStyle: language === "fr" ? "À discuter par téléphone" : "To discuss by phone",
      placement: language === "fr" ? "À discuter" : "To discuss",
      size: language === "fr" ? "À discuter" : "To discuss",
      description:
        formData.description ||
        (language === "fr"
          ? "Le client demande à être appelé pour discuter du projet."
          : "The client requested a call to discuss the project."),
      referenceImages: formData.referenceImages,
      budget: formData.budget,
      availability: formData.availability || (language === "fr" ? "À confirmer par téléphone" : "To confirm by phone"),
    });
  };

  const ChipGroup = ({ field, items }: { field: FieldKey; items: string[] }) => (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const active = formData[field] === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => toggleChip(field, item)}
            className={`rounded-full border px-3 py-2 text-sm transition-all ${
              active
                ? "border-gold-400 bg-gold-400 text-ink-900 shadow-lg shadow-gold-400/10"
                : "border-ink-600 bg-ink-800/75 text-gray-300 hover:border-gold-400/50 hover:text-gold-400"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-ink-900 scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-gold-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-sm text-gold-400">
            <FaBolt size={13} />
            {copy.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-gray-100">{t("contact.title1")}</span>
            <span className="gradient-text">{t("contact.title2")}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{copy.intro}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="glass relative rounded-3xl border border-gold-400/10 p-4 sm:p-6 md:p-8 shadow-2xl shadow-black/30"
        >
          <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

          <AnimatePresence mode="wait">
            {!callbackMode ? (
              <motion.div key="brief" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr] gap-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold uppercase tracking-[0.2em] text-gold-400 mb-3">
                        {copy.ideaTitle}
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(event) => updateField("description", event.target.value)}
                        rows={8}
                        className="w-full rounded-3xl border border-ink-600 bg-ink-800/80 px-5 py-5 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 resize-none text-base leading-relaxed"
                        placeholder={copy.ideaPlaceholder}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{copy.refs}</label>
                      <input
                        type="text"
                        value={formData.referenceImages}
                        onChange={(event) => updateField("referenceImages", event.target.value)}
                        className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                        placeholder={copy.refsPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="rounded-3xl border border-ink-600 bg-ink-800/45 p-4 sm:p-5 space-y-4">
                    <h3 className="text-xl font-display font-bold text-gray-100">{copy.contactTitle}</h3>
                    <p className="text-sm text-gray-500">{copy.contactHint}</p>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      className="w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                      placeholder={copy.name}
                    />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      className="w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                      placeholder={copy.email}
                    />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      className="w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                      placeholder={copy.phoneOptional}
                    />

                    {!canSubmit && (
                      <p className="text-sm text-gold-400/80">{copy.required}</p>
                    )}

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || isSubmitting}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-4 font-semibold transition-all ${
                        !canSubmit || isSubmitting
                          ? "bg-ink-600 text-gray-400 cursor-not-allowed"
                          : "bg-gold-400 text-ink-900 hover:bg-gold-500 hover:scale-[1.01] shadow-lg shadow-gold-400/20"
                      }`}
                    >
                      {isSubmitting ? copy.sending : copy.submit}
                      <FaPaperPlane size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setCallbackMode(true)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-gold-400/25 bg-gold-400/10 px-5 py-3 text-gold-400 transition-all hover:border-gold-400/60 hover:bg-gold-400/15"
                    >
                      <FaPhoneAlt size={14} />
                      {copy.callback}
                    </button>
                  </div>
                </div>

                <div className="mt-6 rounded-3xl border border-ink-600 bg-ink-800/35 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setShowExtras((value) => !value)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ink-700/40 transition-colors"
                  >
                    <span className="flex items-center gap-3 text-gray-100 font-semibold">
                      <FaRulerCombined className="text-gold-400" />
                      {showExtras ? copy.hideExtras : copy.extras}
                    </span>
                    <FaChevronDown className={`text-gold-400 transition-transform ${showExtras ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {showExtras && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 pb-5 pt-1">
                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">{copy.style}</p>
                            <ChipGroup field="tattooStyle" items={options.tattooStyle} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">{copy.size}</p>
                            <ChipGroup field="size" items={options.size} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">{copy.placement}</p>
                            <ChipGroup field="placement" items={options.placement} />
                            <input
                              type="text"
                              value={formData.placement}
                              onChange={(event) => updateField("placement", event.target.value)}
                              className="mt-3 w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                              placeholder={copy.customPlacement}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-300 mb-3">{copy.budget}</p>
                            <ChipGroup field="budget" items={options.budget} />
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                              <FaRegClock className="text-gold-400" />
                              {copy.availability}
                            </p>
                            <ChipGroup field="availability" items={options.availability} />
                            <input
                              type="text"
                              value={formData.availability}
                              onChange={(event) => updateField("availability", event.target.value)}
                              className="mt-3 w-full rounded-2xl border border-ink-600 bg-ink-900/60 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                              placeholder={copy.customAvailability}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : (
              <motion.div key="callback" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="max-w-2xl mx-auto text-center py-4">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-400 border border-gold-400/30">
                  <FaPhoneAlt size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-100 mb-3">{copy.callbackTitle}</h3>
                <p className="text-gray-400 mb-8">{copy.callbackText}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                    placeholder={copy.name}
                  />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                    placeholder={copy.phone}
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setCallbackMode(false)}
                    className="rounded-2xl border border-ink-600 px-5 py-3 text-gray-300 transition-all hover:border-gold-400/50 hover:text-gold-400"
                  >
                    {language === "fr" ? "Retour au brief" : "Back to brief"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCallback}
                    disabled={!canCallback || isSubmitting}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all ${
                      !canCallback || isSubmitting
                        ? "bg-ink-600 text-gray-400 cursor-not-allowed"
                        : "bg-gold-400 text-ink-900 hover:bg-gold-500 hover:scale-[1.01] shadow-lg shadow-gold-400/20"
                    }`}
                  >
                    {isSubmitting ? copy.sending : copy.callbackSubmit}
                    <FaPhoneAlt size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-900/30 border border-green-500/30 rounded-2xl flex items-center gap-3"
            >
              <FaCheck className="text-green-500 flex-shrink-0" />
              <p className="text-green-400">{copy.success}</p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-900/30 border border-red-500/30 rounded-2xl flex items-center gap-3"
            >
              <FaExclamationCircle className="text-red-500 flex-shrink-0" />
              <p className="text-red-400">{copy.error}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8"
        >
          {t("contact.alternative")} {" "}
          <a
            href="https://instagram.com/tattoomatha"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gold-400 hover:underline"
          >
            <FaInstagram size={14} /> Instagram
          </a>
        </motion.p>
      </div>
    </section>
  );
}
