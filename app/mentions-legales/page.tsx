import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales de ${siteConfig.name}.`,
};

export default function MentionsLegales() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 md:px-10">
      <h1 className="font-display text-4xl text-chocolate-700">Mentions légales</h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-chocolate-700/80">
        <p>
          Le présent site est édité par {siteConfig.name}, atelier de
          pâtisserie artisanale fonctionnant exclusivement sur commande,
          sans boutique physique ouverte au public.
        </p>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Éditeur du site</h2>
          <p className="mt-2">
            {siteConfig.name} — {siteConfig.location.city}, Algérie
            <br />
            Email : {siteConfig.email}
            <br />
            Téléphone : {siteConfig.phoneDisplay}
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Hébergement</h2>
          <p className="mt-2">
            Informations d&apos;hébergement à compléter lors de la mise en
            ligne du site (nom de l&apos;hébergeur, adresse, contact).
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Propriété intellectuelle</h2>
          <p className="mt-2">
            L&apos;ensemble des contenus (textes, photographies, visuels)
            présents sur ce site est la propriété de {siteConfig.name} et ne
            peut être reproduit sans autorisation préalable.
          </p>
        </div>
      </div>
    </section>
  );
}
