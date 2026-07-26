import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().min(2, "Merci d'indiquer votre nom complet."),
  phone: z
    .string()
    .min(9, "Numéro de téléphone invalide.")
    .regex(/^[0-9+\s().-]+$/, "Numéro de téléphone invalide."),
  email: z.string().email("Adresse email invalide."),
  eventDate: z.string().min(1, "Merci de choisir une date d'événement."),
  guestCount: z.string().min(1, "Merci d'indiquer le nombre de personnes."),
  cakeType: z.string().min(1, "Merci de choisir un type de création."),
  flavor: z.string().min(1, "Merci d'indiquer une saveur."),
  colors: z.string().min(1, "Merci d'indiquer vos couleurs souhaitées."),
  decoration: z.string().min(1, "Merci de décrire la décoration souhaitée."),
  customText: z.string().optional(),
  message: z.string().optional(),
  inspirationPhotoUrl: z.string().optional(),
});

export type OrderSchema = z.infer<typeof orderSchema>;
