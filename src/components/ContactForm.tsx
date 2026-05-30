"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaExclamationCircle,
  FaPaperPlane,
  FaPhoneAlt,
  FaRedo,
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

type QuestionType = "text" | "email" | "tel" | "textarea" | "options";

type Question = {
  id: keyof FormData;
  eyebrow: string;
  title: string;
  subtitle: string;
  placeholder?: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  helper?: string;
};

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

export default function ContactForm() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [mode, setMode] = useState<"project" | "callback">("project");
  const [direction, setDirection] = useState(1);

  const copy = useMemo(() => {
    if (language === "en") {
      return {
        intro: "A few quick questions, one at a time. If you would rather skip this, leave your number and I will call you.",
        next: "Next",
        back: "Back",
        choose: "Choose",
        send: "Send request",
        sending: "Sending...",
        restart: "Start over",
        skipTitle: "Skip the form",
        skipText: "Just call me instead",
        skipCta: "Request a call",
        callbackTitle: "Want me to call you?",
        callbackSubtitle: "Leave your name and number. I will reach out so we can talk through the tattoo idea together.",
        phonePlaceholder: "Your phone number",
        namePlaceholder: "Your name",
        success: "Done. Your request was sent. I will get back to you soon.",
        error: "Something went wrong. Try again or DM me on Instagram.",
        required: "This one helps me answer properly.",
        progress: "Question",
      };
    }

    return {
      intro: "Quelques questions simples, une à la fois. Si tu préfères skipper ça, laisse ton numéro et je t'appelle.",
      next: "Suivant",
      back: "Retour",
      choose: "Choisir",
      send: "Envoyer la demande",
      sending: "Envoi...",
      restart: "Recommencer",
      skipTitle: "Skip le formulaire",
      skipText: "Demande juste que je t'appelle",
      skipCta: "J'aimerais être appelé",
      callbackTitle: "Tu veux que je t'appelle?",
      callbackSubtitle: "Laisse ton nom et ton numéro. Je vais te contacter pour qu'on parle de ton idée ensemble.",
      phonePlaceholder: "Ton numéro de téléphone",
      namePlaceholder: "Ton nom",
      success: "C'est envoyé. Je te reviens bientôt.",
      error: "Oups, ça n'a pas fonctionné. Réessaie ou écris-moi sur Instagram.",
      required: "Cette réponse m'aide à mieux te répondre.",
      progress: "Question",
    };
  }, [language]);

  const tattooStyles = useMemo(
    () =>
      language === "fr"
        ? [
            "Noir, contraste, blackwork",
            "Géométrique / ornemental",
            "Fin, délicat, minimaliste",
            "Réaliste / illustratif",
            "Lettrage / symbole",
            "Je ne suis pas sûr",
          ]
        : [
            "Blackwork / high contrast",
            "Geometric / ornamental",
            "Fine, delicate, minimal",
            "Realistic / illustrative",
            "Lettering / symbol",
            "Not sure yet",
          ],
    [language]
  );

  const sizes = useMemo(
    () =>
      language === "fr"
        ? ["Petit", "Moyen", "Grand", "Manchette / gros projet", "Je ne sais pas encore"]
        : ["Small", "Medium", "Large", "Sleeve / big project", "Not sure yet"],
    [language]
  );

  const budgetOptions = useMemo(
    () =>
      language === "fr"
        ? ["Moins de 300$", "300$ à 600$", "600$ à 1000$", "1000$+", "À discuter"]
        : ["Under $300", "$300 to $600", "$600 to $1000", "$1000+", "Let's discuss"],
    [language]
  );

  const availabilityOptions = useMemo(
    () =>
      language === "fr"
        ? ["Soirs de semaine", "Weekend", "Flexible", "J'ai des dates précises"]
        : ["Weeknights", "Weekend", "Flexible", "I have specific dates"],
    [language]
  );

  const questions: Question[] = useMemo(() => {
    if (language === "en") {
      return [
        {
          id: "tattooStyle",
          eyebrow: "Quick start",
          title: "What kind of tattoo are we talking about?",
          subtitle: "One tap is enough. You can choose “not sure” and keep going.",
          type: "options",
          required: true,
          options: tattooStyles,
        },
        {
          id: "description",
          eyebrow: "The idea",
          title: "Now, what is the idea?",
          subtitle: "A sentence is enough. Theme, symbol, mood, story, anything.",
          type: "textarea",
          required: true,
          placeholder: "Example: a blackwork raven with geometric details, connected to my family story...",
        },
        {
          id: "placement",
          eyebrow: "Body placement",
          title: "Where would it go?",
          subtitle: "Mention the body part and side if you know it.",
          type: "text",
          required: true,
          placeholder: "Inner forearm, shoulder, calf, ribs...",
        },
        {
          id: "size",
          eyebrow: "Scale",
          title: "How big are we thinking?",
          subtitle: "Approximate is perfect.",
          type: "options",
          required: true,
          options: sizes,
        },
        {
          id: "referenceImages",
          eyebrow: "References",
          title: "Do you have references?",
          subtitle: "Paste links or describe them. You can also send them later on Instagram.",
          type: "textarea",
          placeholder: "Pinterest / Instagram links, or a quick description...",
        },
        {
          id: "budget",
          eyebrow: "Budget",
          title: "Do you have a budget in mind?",
          subtitle: "Optional, but useful to suggest the right scope.",
          type: "options",
          options: budgetOptions,
        },
        {
          id: "availability",
          eyebrow: "Timing",
          title: "When are you usually available?",
          subtitle: "I mostly tattoo in the evening, so tell me what works for you.",
          type: "options",
          options: availabilityOptions,
        },
        {
          id: "name",
          eyebrow: "Contact",
          title: "What is your name?",
          subtitle: "So I know who I am replying to.",
          type: "text",
          required: true,
          placeholder: "Your name",
        },
        {
          id: "email",
          eyebrow: "Contact",
          title: "Where should I reply?",
          subtitle: "Email is best for a clean project follow-up.",
          type: "email",
          required: true,
          placeholder: "you@example.com",
        },
        {
          id: "phone",
          eyebrow: "Optional",
          title: "Want to leave a phone number too?",
          subtitle: "Optional, but useful if a quick call is easier.",
          type: "tel",
          placeholder: "Your phone number",
        },
      ];
    }

    return [
      {
        id: "tattooStyle",
        eyebrow: "Départ rapide",
        title: "On part sur quel genre de tattoo?",
        subtitle: "Un clic suffit. Tu peux choisir “pas sûr” et continuer.",
        type: "options",
        required: true,
        options: tattooStyles,
      },
      {
        id: "description",
        eyebrow: "L'idée",
        title: "Maintenant, c'est quoi l'idée?",
        subtitle: "Une phrase suffit. Thème, symbole, vibe, histoire, peu importe.",
        type: "textarea",
        required: true,
        placeholder: "Ex: un corbeau blackwork avec des détails géométriques, lié à mon histoire familiale...",
      },
      {
        id: "placement",
        eyebrow: "Emplacement",
        title: "Tu le veux où sur le corps?",
        subtitle: "Mets la zone et le côté si tu le sais déjà.",
        type: "text",
        required: true,
        placeholder: "Avant-bras intérieur, épaule, mollet, côtes...",
      },
      {
        id: "size",
        eyebrow: "Format",
        title: "On parle de quelle grandeur environ?",
        subtitle: "Une approximation est parfaite.",
        type: "options",
        required: true,
        options: sizes,
      },
      {
        id: "referenceImages",
        eyebrow: "Références",
        title: "As-tu des images de référence?",
        subtitle: "Colle des liens ou décris-les. Tu peux aussi me les envoyer ensuite sur Instagram.",
        type: "textarea",
        placeholder: "Liens Pinterest / Instagram, ou une petite description...",
      },
      {
        id: "budget",
        eyebrow: "Budget",
        title: "As-tu un budget en tête?",
        subtitle: "Optionnel, mais utile pour proposer une bonne ampleur de projet.",
        type: "options",
        options: budgetOptions,
      },
      {
        id: "availability",
        eyebrow: "Timing",
        title: "Tu es disponible quand en général?",
        subtitle: "Je tatoue surtout en soirée, donc dis-moi ce qui marche pour toi.",
        type: "options",
        options: availabilityOptions,
      },
      {
        id: "name",
        eyebrow: "Contact",
        title: "C'est quoi ton nom?",
        subtitle: "Pour savoir à qui je réponds.",
        type: "text",
        required: true,
        placeholder: "Ton nom",
      },
      {
        id: "email",
        eyebrow: "Contact",
        title: "Je te réponds où?",
        subtitle: "Le courriel est le plus simple pour garder le projet clair.",
        type: "email",
        required: true,
        placeholder: "toi@exemple.com",
      },
      {
        id: "phone",
        eyebrow: "Optionnel",
        title: "Tu veux laisser ton numéro aussi?",
        subtitle: "Optionnel, mais pratique si un appel rapide est plus simple.",
        type: "tel",
        placeholder: "Ton numéro",
      },
    ];
  }, [availabilityOptions, budgetOptions, language, sizes, tattooStyles]);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const currentValue = currentQuestion ? formData[currentQuestion.id] : "";
  const canContinue = currentQuestion?.required ? currentValue.trim().length > 0 : true;

  const updateField = (id: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
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
      setStep(0);
      setMode("project");
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 6000);
    }
  };

  const handleNext = () => {
    if (!canContinue) return;

    if (step === questions.length - 1) {
      submitPayload(formData);
      return;
    }

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (step === 0) return;
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleCallbackSubmit = () => {
    if (!formData.phone.trim()) return;

    const payload: FormData = {
      ...emptyForm,
      name: formData.name || (language === "fr" ? "Client à rappeler" : "Callback request"),
      email: formData.email,
      phone: formData.phone,
      tattooStyle: language === "fr" ? "À discuter par téléphone" : "To discuss by phone",
      placement: language === "fr" ? "À discuter" : "To discuss",
      size: language === "fr" ? "À discuter" : "To discuss",
      description:
        language === "fr"
          ? "Le client a skippé le questionnaire et demande à être appelé pour discuter du projet."
          : "The client skipped the questionnaire and requested a call to discuss the project.",
      availability: language === "fr" ? "À confirmer par téléphone" : "To confirm by phone",
    };

    submitPayload(payload);
  };

  const renderQuestionInput = (question: Question) => {
    if (question.type === "options") {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {question.options?.map((option, index) => {
            const selected = formData[question.id] === option;
            const isFirstQuestion = step === 0;
            return (
              <motion.button
                key={option}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: isFirstQuestion && !selected ? [0, -3, 0] : 0,
                  boxShadow: isFirstQuestion && !selected
                    ? [
                        "0 0 0 rgba(212, 175, 55, 0)",
                        "0 0 22px rgba(212, 175, 55, 0.18)",
                        "0 0 0 rgba(212, 175, 55, 0)",
                      ]
                    : selected
                      ? "0 12px 34px rgba(212, 175, 55, 0.18)"
                      : "0 0 0 rgba(212, 175, 55, 0)",
                }}
                transition={{
                  opacity: { duration: 0.2, delay: index * 0.045 },
                  y: isFirstQuestion ? { duration: 2.2, repeat: Infinity, delay: index * 0.16, ease: "easeInOut" } : { duration: 0.18 },
                  boxShadow: isFirstQuestion ? { duration: 2.2, repeat: Infinity, delay: index * 0.16, ease: "easeInOut" } : { duration: 0.18 },
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  updateField(question.id, option);
                  if (step < questions.length - 1) {
                    window.setTimeout(() => {
                      setDirection(1);
                      setStep((prev) => Math.min(prev + 1, questions.length - 1));
                    }, 180);
                  }
                }}
                className={`group relative overflow-hidden text-left rounded-2xl border p-4 transition-colors ${
                  selected
                    ? "border-gold-400 bg-gold-400/15"
                    : isFirstQuestion
                      ? "border-gold-400/35 bg-gradient-to-br from-ink-800/95 to-ink-700/75 hover:border-gold-400/80 hover:bg-ink-700/90"
                      : "border-ink-600 bg-ink-800/70 hover:border-gold-400/50 hover:bg-ink-700/80"
                }`}
              >
                {isFirstQuestion && !selected && (
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                )}
                <span className="relative flex items-center justify-between gap-3">
                  <span className="text-gray-100 font-medium">{option}</span>
                  <motion.span
                    animate={isFirstQuestion && !selected ? { x: [0, 4, 0] } : { x: 0 }}
                    transition={isFirstQuestion ? { duration: 1.25, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" } : { duration: 0.18 }}
                    className={`h-7 w-7 rounded-full border flex items-center justify-center transition-colors ${
                      selected ? "border-gold-400 bg-gold-400 text-ink-900" : "border-gold-400/50 text-gold-400 group-hover:bg-gold-400 group-hover:text-ink-900"
                    }`}
                  >
                    {selected ? <FaCheck size={12} /> : <FaArrowRight size={11} />}
                  </motion.span>
                </span>
              </motion.button>
            );
          })}
        </div>
      );
    }

    if (question.type === "textarea") {
      return (
        <textarea
          value={formData[question.id]}
          onChange={(event) => updateField(question.id, event.target.value)}
          rows={5}
          className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10 resize-none"
          placeholder={question.placeholder}
        />
      );
    }

    return (
      <input
        type={question.type}
        value={formData[question.id]}
        onChange={(event) => updateField(question.id, event.target.value)}
        className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
        placeholder={question.placeholder}
      />
    );
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-ink-900 scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-96 w-96 rounded-full bg-gold-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
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

          {mode === "project" ? (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                  <span>{copy.progress} {step + 1}/{questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink-700 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-amber-200"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentQuestion.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 40 : -40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction > 0 ? -40 : 40, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="min-h-[360px]"
                >
                  <div className="mb-6">
                    <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.25em] mb-3">
                      {currentQuestion.eyebrow}
                    </p>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-100 mb-3">
                      {currentQuestion.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{currentQuestion.subtitle}</p>
                  </div>

                  {renderQuestionInput(currentQuestion)}

                  {!canContinue && (
                    <p className="mt-3 text-sm text-gold-400/80">{copy.required}</p>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0 || isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-600 px-5 py-3 text-gray-300 transition-all hover:border-gold-400/50 hover:text-gold-400 disabled:opacity-30 disabled:hover:border-ink-600 disabled:hover:text-gray-300"
                >
                  <FaArrowLeft size={13} />
                  {copy.back}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canContinue || isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                    !canContinue || isSubmitting
                      ? "bg-ink-600 text-gray-400 cursor-not-allowed"
                      : "bg-gold-400 text-ink-900 hover:bg-gold-500 hover:scale-[1.02] shadow-lg shadow-gold-400/20"
                  }`}
                >
                  {isSubmitting ? copy.sending : step === questions.length - 1 ? copy.send : copy.next}
                  {step === questions.length - 1 ? <FaPaperPlane size={14} /> : <FaArrowRight size={13} />}
                </button>
              </div>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="min-h-[360px]">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-400/15 text-gold-400 border border-gold-400/30">
                <FaPhoneAlt size={24} />
              </div>
              <div className="text-center mb-8">
                <p className="text-gold-400 text-sm font-semibold uppercase tracking-[0.25em] mb-3">
                  {copy.skipTitle}
                </p>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-100 mb-3">
                  {copy.callbackTitle}
                </h3>
                <p className="text-gray-400 max-w-xl mx-auto">{copy.callbackSubtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                  placeholder={copy.namePlaceholder}
                />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className="w-full rounded-2xl border border-ink-600 bg-ink-800/80 px-5 py-4 text-white placeholder-gray-500 outline-none transition-all focus:border-gold-400 focus:ring-4 focus:ring-gold-400/10"
                  placeholder={copy.phonePlaceholder}
                />
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setMode("project")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-600 px-5 py-3 text-gray-300 transition-all hover:border-gold-400/50 hover:text-gold-400"
                >
                  <FaRedo size={13} />
                  {copy.restart}
                </button>
                <button
                  type="button"
                  onClick={handleCallbackSubmit}
                  disabled={!formData.phone.trim() || isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-all ${
                    !formData.phone.trim() || isSubmitting
                      ? "bg-ink-600 text-gray-400 cursor-not-allowed"
                      : "bg-gold-400 text-ink-900 hover:bg-gold-500 hover:scale-[1.02] shadow-lg shadow-gold-400/20"
                  }`}
                >
                  {isSubmitting ? copy.sending : copy.skipCta}
                  <FaPhoneAlt size={14} />
                </button>
              </div>
            </motion.div>
          )}

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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="sticky bottom-4 z-20 mt-6"
        >
          <button
            type="button"
            onClick={() => setMode("callback")}
            className="mx-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-2xl border border-gold-400/25 bg-ink-800/95 px-5 py-4 text-left shadow-2xl shadow-black/30 backdrop-blur-xl transition-all hover:border-gold-400/60 hover:bg-ink-700/95"
          >
            <span>
              <span className="block text-sm font-semibold text-gray-100">{copy.skipTitle}</span>
              <span className="block text-xs text-gray-400">{copy.skipText}</span>
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-ink-900">
              <FaPhoneAlt size={15} />
            </span>
          </button>
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
            className="text-gold-400 hover:underline"
          >
            Instagram
          </a>
        </motion.p>
      </div>
    </section>
  );
}
