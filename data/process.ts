import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "p1",
    step: 1,
    title: "Choisissez votre création",
    description:
      "Parcourez nos réalisations et imaginez votre pièce sur-mesure : forme, saveur, couleurs, décor.",
    icon: "Sparkles",
  },
  {
    id: "p2",
    step: 2,
    title: "Envoyez votre demande",
    description:
      "Remplissez le formulaire avec vos préférences et, si besoin, une photo d'inspiration.",
    icon: "Send",
  },
  {
    id: "p3",
    step: 3,
    title: "Validation",
    description:
      "Nous échangeons avec vous pour confirmer les détails, le devis et la date de votre événement.",
    icon: "CheckCircle2",
  },
  {
    id: "p4",
    step: 4,
    title: "Préparation",
    description:
      "Votre création prend vie dans notre atelier, avec des ingrédients frais et un soin artisanal.",
    icon: "ChefHat",
  },
  {
    id: "p5",
    step: 5,
    title: "Livraison ou retrait",
    description:
      "Réception à domicile ou retrait sur rendez-vous, le jour J, pour une création impeccable.",
    icon: "Truck",
  },
];
