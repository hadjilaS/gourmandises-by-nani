/**
 * Configuration centrale du site.
 * ⚠️ À PERSONNALISER : remplace les valeurs ci-dessous (téléphone, adresse,
 * réseaux sociaux) par les vraies informations de "Gourmandises By Nani".
 */
export const siteConfig = {
  name: "Gourmandises By Nani",
  tagline: "Pâtisserie artisanale sur commande",
  description:
    "Des créations gourmandes faites avec passion pour rendre chaque événement inoubliable. Gâteaux d'anniversaire, wedding cakes, number cakes, buffets sucrés & salés — uniquement sur commande.",
  url: "https://www.gourmandises-by-nani.com",

  // Coordonnées — à mettre à jour avec les vraies informations
  phone: "+213 5XX XX XX XX",
  phoneDisplay: "05 XX XX XX XX",
  whatsapp: "2135XXXXXXXX",
  email: "contact@gourmandisesbynani.com",

  // Réseaux sociaux — remplace par les vrais liens
  socials: {
    instagram: "https://instagram.com/gourmandises.by.nani",
    facebook: "https://facebook.com/gourmandisesbynani",
    messenger: "https://m.me/gourmandisesbynani",
  },

  // Localisation — atelier privé, retrait sur rendez-vous uniquement
  location: {
    city: "Alger",
    addressLine: "Adresse communiquée lors de la confirmation de commande",
    note: "Atelier privé — pas de boutique physique. Retrait uniquement sur rendez-vous.",
    deliveryZone: "Livraison à Alger et environs (Grand Alger)",
    lat: 36.7538,
    lng: 3.0588,
  },

  hours: "Sur rendez-vous — 7j/7, 9h à 20h",
} as const;
