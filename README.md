# Gourmandises By Nani — Site web

Site vitrine premium pour une pâtisserie artisanale sur commande, construit avec
**Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion,
GSAP, Swiper, React Hook Form + Zod**.

## ⚠️ Important — pourquoi pas WAMP ?

Ce projet est une application **Next.js**, qui a besoin de **Node.js** pour
tourner (que ce soit en développement avec `npm run dev` ou en production).
**WAMP ne sait servir que du PHP et des fichiers statiques** : il ne peut pas
exécuter d'application Next.js/React. Il faut donc installer Node.js (voir
ci-dessous) — WAMP n'est pas nécessaire pour ce projet.

## 🚀 Installation

1. **Installer Node.js** (version 20 ou plus récente) : https://nodejs.org
   Vérifie avec :
   ```bash
   node -v
   npm -v
   ```

2. **Installer les dépendances du projet** (à la racine du dossier, là où se
   trouve `package.json`) :
   ```bash
   npm install
   ```

3. **Lancer le site en développement** :
   ```bash
   npm run dev
   ```
   Puis ouvre http://localhost:3000 dans ton navigateur.

4. **Construire la version de production** (optimisée, avant mise en ligne) :
   ```bash
   npm run build
   npm run start
   ```

## ✏️ Personnaliser les informations réelles

Toutes les informations de contact / localisation sont centralisées dans un
seul fichier, à modifier en priorité :

```
lib/site-config.ts
```

Remplace : téléphone, WhatsApp, email, liens Instagram / Facebook / Messenger,
ville, coordonnées GPS (pour la carte), et notes de livraison/retrait.

## 🗂️ Structure du projet

```
app/                  Pages (App Router) : accueil, mentions légales, etc.
  api/order/           Route API qui reçoit les demandes du formulaire
components/            Composants réutilisables (Header, Hero, Gallery...)
data/                  Contenus éditoriaux (créations, galerie, avis, FAQ...)
lib/                   Config du site, schéma de validation, client Supabase
types/                 Types TypeScript partagés
public/images/gallery/ Toutes les photos des créations
```

## 🖼️ Ajouter / remplacer des photos

Dépose tes images dans `public/images/gallery/`, puis référence-les dans :
- `data/creations.ts` (photos des catégories de la page d'accueil)
- `data/gallery.ts` (galerie filtrable + lightbox)

## 🗄️ Connecter Supabase (optionnel, pour enregistrer les commandes)

1. Crée un projet sur https://supabase.com
2. Crée la table `orders` (le SQL est fourni en commentaire dans `lib/supabase.ts`)
3. Copie `.env.example` en `.env.local` et renseigne tes clés :
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
Sans Supabase configuré, les demandes de commande sont simplement journalisées
côté serveur — à connecter avant la mise en production pour ne rien perdre.

## 🌐 Mise en ligne (hébergement)

Ce projet est prêt à être déployé sur n'importe quel hébergeur compatible
Next.js (Vercel, Netlify, un VPS avec Node.js, etc.). Vercel est la solution
la plus simple et gratuite pour démarrer : connecte ton dépôt GitHub sur
https://vercel.com et le déploiement se fait automatiquement.

## ✅ Ce qui est déjà en place

- Design premium rose poudré / doré / brun chocolat, typographies Playfair
  Display + Poppins
- Hero plein écran animé (GSAP + parallax)
- Sections : À propos, Créations, Galerie filtrable avec lightbox, Processus
  de commande (timeline), Formulaire de commande (validation Zod), Avis
  clients (carousel Swiper), FAQ, Localisation (Google Maps) + zone de
  livraison, Contact (téléphone, WhatsApp, réseaux sociaux)
- SEO : metadata, Open Graph, JSON-LD (Schema.org Bakery), sitemap.xml,
  robots.txt
- Accessibilité : focus clavier visible, `prefers-reduced-motion` respecté,
  contrastes soignés
- Pages Mentions légales & Politique de confidentialité
