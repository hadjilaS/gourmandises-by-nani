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
    instagram: "https://www.instagram.com/gourmandises_by_nani?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    facebook: "https://www.facebook.com/share/1ChWCLW96v/?mibextid=wwXIfr",
    messenger: "https://www.facebook.com/share/1ChWCLW96v/?mibextid=wwXIfr",
  },

// Localisation de Gourmandises By Nani
location: {
  city: "Tizi-Ouzou",
  addressLine: "Tizi-Ouzou, Algérie",
  note: "Boutique ouverte. Commandes sur place, retrait et livraison disponibles selon votre localisation.",
  deliveryZone: "Livraison à Tizi-Ouzou et ses environs",
  lat: 36.712591,
  lng: 4.197309,
},
  hours: "Sur rendez-vous — 7j/7, 9h à 20h",
} as const;
