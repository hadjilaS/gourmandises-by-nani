import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité de ${siteConfig.name}.`,
};

export default function PolitiqueConfidentialite() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-32 md:px-10">
      <h1 className="font-display text-4xl text-chocolate-700">
        Politique de confidentialité
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-chocolate-700/80">
        <p>
          {siteConfig.name} accorde une grande importance à la protection de
          vos données personnelles. Cette page décrit les informations
          collectées via le formulaire de commande et leur utilisation.
        </p>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Données collectées</h2>
          <p className="mt-2">
            Nom, téléphone, email, date d&apos;événement et détails de la
            commande (type de création, saveur, décoration, photo
            d&apos;inspiration) sont collectés uniquement dans le but de
            traiter votre demande.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Utilisation des données</h2>
          <p className="mt-2">
            Ces informations servent exclusivement à vous recontacter, établir
            un devis et préparer votre commande. Elles ne sont ni vendues ni
            partagées avec des tiers à des fins commerciales.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-chocolate-700">Vos droits</h2>
          <p className="mt-2">
            Vous pouvez à tout moment demander l&apos;accès, la rectification
            ou la suppression de vos données en nous contactant à{" "}
            {siteConfig.email}.
          </p>
        </div>
      </div>
    </section>
  );
}
