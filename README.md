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

## 🔐 Espace admin

Accessible sur `/admin` une fois le site lancé.

1. Génère ton mot de passe admin :
   ```bash
   node scripts/hash-password.mjs "TonMotDePasse"
   ```
2. Copie `.env.example` en `.env.local` et renseigne :
   ```
   ADMIN_EMAIL=ton-email@exemple.com
   ADMIN_PASSWORD_HASH=... (collé tel quel depuis la commande précédente, avec les \$)
   SESSION_SECRET=... (chaîne aléatoire longue, ex : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
   ```
   ⚠️ Ne retire pas les `\$` dans `ADMIN_PASSWORD_HASH` : Next.js les interprète sinon comme des variables et casse le mot de passe.
3. Lance le site (`npm run dev`) et connecte-toi sur `http://localhost:3000/admin`.

**Identifiants par défaut fournis dans `.env.example`** (à changer absolument avant mise en ligne) :
- Email : `admin@gourmandisesbynani.com`
- Mot de passe : `GourmandisesByNani2026!`

**Fonctionnalités de l'espace admin :**
- Tableau de bord : statistiques (commandes, nouvelles demandes, événements à venir)
- Commandes : liste filtrable/recherchable, détail complet, changement de statut, suppression
- Créations : gérer les 9 cartes de la page d'accueil (ajout avec upload d'image, suppression)
- Galerie : gérer les photos filtrables par catégorie (ajout avec upload d'image, suppression)

Les données sont stockées automatiquement dans Supabase si tu l'as
configuré (voir section "Mise en ligne sur Vercel" ci-dessous), sinon
en local dans `data/db/*.json` (créés automatiquement, pratique pour
tester sans rien configurer — mais ne persiste pas sur Vercel).

## 🌐 Mise en ligne sur Vercel (important)

Vercel est **serverless** : le système de fichiers n'est pas persistant.
Sans Supabase + Cloudinary configurés, tout ce que l'admin ajoute
(commandes, nouvelles photos) **disparaîtra** au prochain déploiement.

**Checklist avant/après déploiement sur Vercel :**

1. **Supabase** (stockage des commandes, créations, galerie)
   - Crée un projet sur https://supabase.com
   - Va dans SQL Editor, colle et exécute le contenu de `supabase/schema.sql`
   - Récupère l'URL et la clé `service_role` dans Project Settings → API
   - (Optionnel mais recommandé) Transfère tes créations/photos actuelles :
     ```bash
     npx tsx scripts/seed-supabase.ts
     ```
     (nécessite un `.env.local` local avec tes clés Supabase au préalable)

2. **Cloudinary** (stockage des images uploadées depuis l'admin)
   - Crée un compte sur https://cloudinary.com
   - Récupère Cloud Name, API Key, API Secret sur le Dashboard

3. **Dans Vercel → Project → Settings → Environment Variables**, ajoute :
   ```
   ADMIN_EMAIL
   ADMIN_PASSWORD_HASH   (garde les \$ !)
   SESSION_SECRET
   NEXT_PUBLIC_SUPABASE_URL
   SUPABASE_SERVICE_ROLE_KEY
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   ```
   Puis redéploie (Vercel → Deployments → ⋯ → Redeploy).

4. Vérifie sur le site en ligne : connecte-toi sur `/admin`, ajoute une
   commande test depuis le formulaire public, vérifie qu'elle apparaît
   bien dans `/admin/commandes` — puis redéploie une seconde fois pour
   confirmer qu'elle est toujours là (preuve que ça persiste vraiment).

Sans Supabase/Cloudinary configurés, le site fonctionne quand même
(mode local automatique), mais uniquement pour développer/tester en
local — pas pour un usage réel en production sur Vercel.

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
- Espace admin sécurisé (`/admin`) : tableau de bord, gestion des commandes,
  gestion des créations et de la galerie, upload d'images
