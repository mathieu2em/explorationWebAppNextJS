"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiDollarSign, FiClock, FiHeart, FiAlertCircle, FiCalendar, FiShield, FiDroplet } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FAQItem {
  question: string;
  answer: string | string[];
  icon: React.ReactNode;
}

const faqData: Record<string, FAQItem[]> = {
  fr: [
    {
      question: "Combien coûte un tatouage?",
      answer: "Mon taux horaire est de 70$/heure. Le prix final dépend de la taille, de la complexité et de l'emplacement de votre tatouage. Je vous fournis toujours une estimation avant de commencer.",
      icon: <FiDollarSign className="w-6 h-6" />,
    },
    {
      question: "Combien de temps dure une séance?",
      answer: "La durée varie selon le projet. Un petit tatouage peut prendre 1-2 heures, tandis qu'une pièce plus élaborée peut nécessiter plusieurs séances de 3-4 heures. Je vous donnerai une estimation lors de la consultation.",
      icon: <FiClock className="w-6 h-6" />,
    },
    {
      question: "Comment me préparer avant mon rendez-vous?",
      answer: [
        "🍽️ Mangez un bon repas avant votre séance - ne venez pas le ventre vide!",
        "💧 Restez bien hydraté(e) les jours précédant votre rendez-vous",
        "🚫 Évitez l'alcool 24h avant votre séance",
        "☀️ Ne prenez pas de coup de soleil sur la zone à tatouer",
        "😴 Dormez bien la veille pour être en forme",
        "👕 Portez des vêtements confortables qui permettent l'accès à la zone",
        "💊 J'offre de la crème anesthésiante à mon studio pour votre confort",
      ],
      icon: <FiCalendar className="w-6 h-6" />,
    },
    {
      question: "Est-ce que ça fait mal?",
      answer: "La douleur varie selon l'emplacement et votre tolérance personnelle. Certaines zones sont plus sensibles (côtes, pieds, intérieur du bras). J'offre de la crème anesthésiante à mon studio pour réduire l'inconfort. La plupart des clients trouvent que c'est plus supportable qu'ils ne le pensaient!",
      icon: <FiAlertCircle className="w-6 h-6" />,
    },
    {
      question: "Comment prendre soin de mon nouveau tatouage?",
      answer: [
        "🧴 J'utilise et recommande la crème Tattoo Goo, disponible à mon studio",
        "🧼 Lavez délicatement avec un savon antibactérien sans parfum",
        "💧 Appliquez une fine couche de crème 2-3 fois par jour",
        "🚿 Évitez les bains, piscines et saunas pendant 2-3 semaines",
        "☀️ Protégez du soleil pendant la guérison et appliquez du SPF après",
        "🙅 Ne grattez pas et ne pelez pas la peau qui s'écaille",
        "⏰ La guérison complète prend environ 2-4 semaines",
      ],
      icon: <FiHeart className="w-6 h-6" />,
    },
    {
      question: "Puis-je apporter mon propre design?",
      answer: "Absolument! J'adore travailler avec vos idées. Apportez des images de référence, des croquis ou même juste une description. Je créerai un design personnalisé basé sur votre vision. On peut aussi partir de zéro si vous voulez quelque chose d'unique!",
      icon: <FiDroplet className="w-6 h-6" />,
    },
    {
      question: "Quelles sont vos politiques d'annulation?",
      answer: "Si vous devez reporter votre rendez-vous, prévenez-moi au moins 48h à l'avance par respect pour mon temps. Les annulations de dernière minute répétées peuvent affecter vos futures réservations.",
      icon: <FiShield className="w-6 h-6" />,
    },
  ],
  en: [
    {
      question: "How much does a tattoo cost?",
      answer: "My hourly rate is $70/hour. The final price depends on the size, complexity, and placement of your tattoo. I always provide an estimate before starting.",
      icon: <FiDollarSign className="w-6 h-6" />,
    },
    {
      question: "How long does a session last?",
      answer: "Duration varies by project. A small tattoo might take 1-2 hours, while a more elaborate piece may require multiple 3-4 hour sessions. I'll give you an estimate during the consultation.",
      icon: <FiClock className="w-6 h-6" />,
    },
    {
      question: "How should I prepare before my appointment?",
      answer: [
        "🍽️ Eat a good meal before your session - don't come on an empty stomach!",
        "💧 Stay well hydrated in the days leading up to your appointment",
        "🚫 Avoid alcohol 24h before your session",
        "☀️ Don't get sunburned on the area to be tattooed",
        "😴 Get a good night's sleep to be in good shape",
        "👕 Wear comfortable clothes that allow access to the area",
        "💊 I offer numbing cream at my studio for your comfort",
      ],
      icon: <FiCalendar className="w-6 h-6" />,
    },
    {
      question: "Does it hurt?",
      answer: "Pain varies depending on location and your personal tolerance. Some areas are more sensitive (ribs, feet, inner arm). I offer numbing cream at my studio to reduce discomfort. Most clients find it more bearable than they expected!",
      icon: <FiAlertCircle className="w-6 h-6" />,
    },
    {
      question: "How do I take care of my new tattoo?",
      answer: [
        "🧴 I use and recommend Tattoo Goo cream, available at my studio",
        "🧼 Gently wash with fragrance-free antibacterial soap",
        "💧 Apply a thin layer of cream 2-3 times daily",
        "🚿 Avoid baths, pools and saunas for 2-3 weeks",
        "☀️ Protect from sun during healing and apply SPF after",
        "🙅 Don't scratch or peel flaking skin",
        "⏰ Complete healing takes about 2-4 weeks",
      ],
      icon: <FiHeart className="w-6 h-6" />,
    },
    {
      question: "Can I bring my own design?",
      answer: "Absolutely! I love working with your ideas. Bring reference images, sketches, or even just a description. I'll create a custom design based on your vision. We can also start from scratch if you want something unique!",
      icon: <FiDroplet className="w-6 h-6" />,
    },
    {
      question: "What are your cancellation policies?",
      answer: "If you need to reschedule your appointment, please let me know at least 48h in advance out of respect for my time. Repeated last-minute cancellations may affect your future bookings.",
      icon: <FiShield className="w-6 h-6" />,
    },
  ],
};

function FAQAccordion({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-ink-700 rounded-xl overflow-hidden bg-ink-800/50 backdrop-blur-sm"
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-ink-700/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
            {item.icon}
          </div>
          <span className="text-lg font-medium text-white">{item.question}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-gold-400"
        >
          <FiChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-2 ml-14">
              {Array.isArray(item.answer) ? (
                <ul className="space-y-2">
                  {item.answer.map((line, index) => (
                    <li key={index} className="text-gray-300 leading-relaxed">
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-300 leading-relaxed">{item.answer}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = faqData[language] || faqData.fr;
  
  const pageContent = {
    fr: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir avant votre tatouage",
      cta: "Vous avez d'autres questions?",
      ctaButton: "Contactez-moi",
    },
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before your tattoo",
      cta: "Have more questions?",
      ctaButton: "Contact me",
    },
  };
  
  const content = pageContent[language] || pageContent.fr;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-900 pt-24 pb-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent mb-4"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            {content.subtitle}
          </motion.p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {faqs.map((item, index) => (
            <FAQAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-ink-800 via-ink-700 to-ink-800 rounded-2xl p-8 border border-gold-500/20">
            <h2 className="text-2xl font-display font-bold text-white mb-4">
              {content.cta}
            </h2>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-ink-900 font-semibold px-8 py-3 rounded-full hover:from-gold-400 hover:to-gold-500 transition-all transform hover:scale-105"
            >
              {content.ctaButton}
            </a>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed bottom-1/4 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      </main>
      <Footer />
    </>
  );
}
