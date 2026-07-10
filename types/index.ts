export type CreationCategory =
  | "anniversaire"
  | "mariage"
  | "sucre"
  | "sale"
  | "bapteme"
  | "naissance"
  | "entreprise";

export interface Creation {
  id: string;
  emoji: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: CreationCategory;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface OrderFormData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  guestCount: string;
  cakeType: string;
  flavor: string;
  colors: string;
  decoration: string;
  customText?: string;
  message?: string;
  inspirationPhoto?: FileList;
}
