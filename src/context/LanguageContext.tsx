"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    "nav.work": "Portfolio",
    "nav.painmap": "Douleur",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    
    // Hero
    "hero.title1": "L'Art Qui",
    "hero.title2": "Vit Sur Toi",
    "hero.description": "Tatoueur professionnel à St-Jean-de-Matha, au cœur de Lanaudière. Transformer votre vision en art corporel intemporel. Chaque pièce est une histoire unique, créée avec précision et passion.",
    "hero.location": "St-Jean-de-Matha, Lanaudière",
    "hero.cta.book": "Réserver une Consultation",
    "hero.cta.work": "Voir Mon Portfolio",
    
    // Social Feed
    "social.title1": "Dernières ",
    "social.title2": "Créations",
    "social.description": "Suivez mon parcours sur les réseaux sociaux. Cliquez sur une publication pour la voir sur la plateforme d'origine.",
    "social.all": "Tout",
    "social.viewOn": "Voir sur",
    "social.followIg": "Suivre sur Instagram",
    "social.followTt": "Suivre sur TikTok",
    "social.followFb": "Suivre sur Facebook",
    
    // Contact Form
    "contact.title1": "Réserver Votre ",
    "contact.title2": "Session",
    "contact.description": "Prêt à donner vie à votre vision? Remplissez le formulaire ci-dessous avec le plus de détails possible, et je vous répondrai dans les 48 heures.",
    "contact.name": "Nom Complet",
    "contact.email": "Adresse Courriel",
    "contact.phone": "Numéro de Téléphone",
    "contact.style": "Style de Tatouage",
    "contact.style.select": "Sélectionner un style",
    "contact.placement": "Emplacement sur le Corps",
    "contact.placement.placeholder": "ex: Avant-bras intérieur, haut du dos",
    "contact.size": "Taille Approximative",
    "contact.size.select": "Sélectionner une taille",
    "contact.budget": "Budget Approximatif",
    "contact.budget.placeholder": "ex: 500$ - 1000$",
    "contact.availability": "Disponibilités Préférées",
    "contact.availability.placeholder": "ex: Fins de semaine, Mars 2026",
    "contact.description.label": "Décrivez Votre Idée de Tatouage",
    "contact.description.placeholder": "Parlez-moi de votre vision. Incluez des détails sur le design, la signification, les couleurs, et tout élément spécifique que vous souhaitez intégrer...",
    "contact.references": "Images de Référence (URLs)",
    "contact.references.placeholder": "Collez des liens Pinterest, Instagram, ou toute image de référence...",
    "contact.references.note": "Vous pouvez aussi m'envoyer vos références par DM sur Instagram après avoir soumis ce formulaire",
    "contact.submit": "Envoyer la Demande",
    "contact.sending": "Envoi en cours...",
    "contact.success": "Merci! Votre demande a été envoyée avec succès. Je vous répondrai dans les 48 heures.",
    "contact.error": "Oups! Une erreur s'est produite. Veuillez réessayer ou me contacter directement sur Instagram.",
    "contact.alternative": "Vous préférez me contacter directement? Envoyez-moi un DM sur",
    
    // Footer
    "footer.description": "Créer un art intemporel qui raconte votre histoire. Chaque pièce est réalisée avec passion, précision et un profond respect pour le métier.",
    "footer.links": "Liens Rapides",
    "footer.viewWork": "Voir le Portfolio",
    "footer.bookSession": "Réserver une Session",
    "footer.connect": "Me Suivre",
    "footer.connectDesc": "Suivez-moi sur les réseaux sociaux pour du contenu quotidien et les coulisses.",
    "footer.rights": "Tous droits réservés.",
    "footer.madeWith": "Fait avec",
    "footer.forLovers": "pour les amateurs d'encre",
    
    // Tattoo Styles
    "style.traditional": "Traditionnel / Old School",
    "style.neoTraditional": "Néo-Traditionnel",
    "style.japanese": "Japonais / Irezumi",
    "style.blackwork": "Blackwork",
    "style.geometric": "Géométrique",
    "style.dotwork": "Dotwork",
    "style.realism": "Réalisme",
    "style.microRealism": "Micro Réalisme",
    "style.fineLine": "Fine Line",
    "style.watercolor": "Aquarelle",
    "style.tribal": "Tribal",
    "style.lettering": "Lettrage / Script",
    "style.illustrative": "Illustratif",
    "style.other": "Autre",
    
    // Sizes
    "size.tiny": "Minuscule (< 5 cm)",
    "size.small": "Petit (5-10 cm)",
    "size.medium": "Moyen (10-15 cm)",
    "size.large": "Grand (15-25 cm)",
    "size.extraLarge": "Très Grand (25+ cm)",
    "size.fullSleeve": "Manchette Complète",
    "size.halfSleeve": "Demi-Manchette",
    "size.fullBack": "Dos Complet",
    "size.notSure": "Pas encore sûr",
    
    // Gallery
    "gallery.title": "Réalisations",
    "gallery.description": "Quelques-uns de mes tatouages préférés",
    "gallery.viewMore": "Voir plus",
    "gallery.viewLess": "Voir moins",
    "gallery.moreCount": "de plus",
    "gallery.magnifier.desktop": "Survolez une image avec votre souris pour voir les détails 🔍",
    "gallery.magnifier.mobile": "Maintenez votre doigt sur une image pour voir les détails 🔍",

    // Legal
    "legal.lastUpdated": "Dernière mise à jour",
    "legal.terms.title": "Conditions d'utilisation",
    "legal.privacy.title": "Politique de confidentialité",
  },
  en: {
    // Navbar
    "nav.work": "Work",
    "nav.painmap": "Pain Map",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    
    // Hero
    "hero.title1": "Art That",
    "hero.title2": "Lives On You",
    "hero.description": "Professional tattoo artist in St-Jean-de-Matha, in the heart of Lanaudière. Transforming your vision into timeless body art. Each piece is a unique story, crafted with precision and passion.",
    "hero.location": "St-Jean-de-Matha, Lanaudière",
    "hero.cta.book": "Book Consultation",
    "hero.cta.work": "View My Work",
    
    // Social Feed
    "social.title1": "Latest ",
    "social.title2": "Work",
    "social.description": "Follow my journey on social media. Click on any post to view it on the original platform.",
    "social.all": "All",
    "social.viewOn": "View on",
    "social.followIg": "Follow on Instagram",
    "social.followTt": "Follow on TikTok",
    "social.followFb": "Follow on Facebook",
    
    // Contact Form
    "contact.title1": "Book Your ",
    "contact.title2": "Session",
    "contact.description": "Ready to bring your vision to life? Fill out the form below with as much detail as possible, and I'll get back to you within 48 hours.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.style": "Tattoo Style",
    "contact.style.select": "Select a style",
    "contact.placement": "Body Placement",
    "contact.placement.placeholder": "e.g., Inner forearm, upper back",
    "contact.size": "Approximate Size",
    "contact.size.select": "Select size",
    "contact.budget": "Budget Range",
    "contact.budget.placeholder": "e.g., $500 - $1000",
    "contact.availability": "Preferred Dates/Availability",
    "contact.availability.placeholder": "e.g., Weekends, March 2026",
    "contact.description.label": "Describe Your Tattoo Idea",
    "contact.description.placeholder": "Tell me about your vision. Include details about the design, meaning, colors, and any specific elements you want incorporated...",
    "contact.references": "Reference Images (URLs)",
    "contact.references.placeholder": "Paste links to Pinterest, Instagram, or any reference images...",
    "contact.references.note": "You can also DM me reference images on Instagram after submitting this form",
    "contact.submit": "Send Inquiry",
    "contact.sending": "Sending...",
    "contact.success": "Thank you! Your inquiry has been sent successfully. I'll be in touch within 48 hours.",
    "contact.error": "Oops! Something went wrong. Please try again or contact me directly on Instagram.",
    "contact.alternative": "Prefer to reach out directly? DM me on",
    
    // Footer
    "footer.description": "Creating timeless art that tells your story. Each piece is crafted with passion, precision, and a deep respect for the craft.",
    "footer.links": "Quick Links",
    "footer.viewWork": "View Work",
    "footer.bookSession": "Book a Session",
    "footer.connect": "Connect",
    "footer.connectDesc": "Follow me on social media for daily content, and behind-the-scenes.",
    "footer.rights": "All rights reserved.",
    "footer.madeWith": "Made with",
    "footer.forLovers": "for ink lovers",
    
    // Tattoo Styles
    "style.traditional": "Traditional / Old School",
    "style.neoTraditional": "Neo-Traditional",
    "style.japanese": "Japanese / Irezumi",
    "style.blackwork": "Blackwork",
    "style.geometric": "Geometric",
    "style.dotwork": "Dotwork",
    "style.realism": "Realism",
    "style.microRealism": "Micro Realism",
    "style.fineLine": "Fine Line",
    "style.watercolor": "Watercolor",
    "style.tribal": "Tribal",
    "style.lettering": "Lettering / Script",
    "style.illustrative": "Illustrative",
    "style.other": "Other",
    
    // Sizes
    "size.tiny": "Tiny (< 2 inches)",
    "size.small": "Small (2-4 inches)",
    "size.medium": "Medium (4-6 inches)",
    "size.large": "Large (6-10 inches)",
    "size.extraLarge": "Extra Large (10+ inches)",
    "size.fullSleeve": "Full Sleeve",
    "size.halfSleeve": "Half Sleeve",
    "size.fullBack": "Full Back",
    "size.notSure": "Not sure yet",    
    // Gallery
    "gallery.title": "Featured Work",
    "gallery.description": "Some of my favorite tattoos",
    "gallery.viewMore": "View more",
    "gallery.viewLess": "View less",
    "gallery.moreCount": "more",
    "gallery.magnifier.desktop": "Hover over an image with your mouse to see details 🔍",
    "gallery.magnifier.mobile": "Hold your finger on an image to see details 🔍",

    // Legal
    "legal.lastUpdated": "Last Updated",
    "legal.terms.title": "Terms of Service",
    "legal.privacy.title": "Privacy Policy",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
