import Image from "next/image";
import { Sprout, Home, Palette, Award, Clock } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const values = [
  { icon: Sprout, label: "Produits frais", desc: "Ingrédients sélectionnés avec soin, sans compromis." },
  { icon: Home, label: "Fabrication maison", desc: "Chaque pièce est réalisée à la main, dans notre atelier." },
  { icon: Palette, label: "Personnalisation", desc: "Couleurs, saveurs et décor pensés pour votre événement." },
  { icon: Award, label: "Qualité Premium", desc: "Un souci du détail digne des plus belles pâtisseries." },
  { icon: Clock, label: "Respect des délais", desc: "Votre création prête, à l'heure, pour le grand jour." },
];

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ScrollReveal>
          <div className="relative">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl shadow-elegant">
              <Image
                src="/images/gallery/gateau-fondant-roses-rouges.png"
                alt="Gâteau en fondant blanc décoré de roses rouges, création signée Gourmandises By Nani"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden w-40 rounded-2xl bg-cream p-4 shadow-elegant sm:block md:-right-10 md:w-48">
              <p className="font-display text-3xl text-rose-700 md:text-4xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-chocolate-700/70">
                Créations artisanales &amp; sur-mesure
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div>
          <ScrollReveal delay={0.1}>
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
              Notre histoire
            </span>
            <h2 className="mt-4 font-display text-4xl leading-tight text-chocolate-700 md:text-5xl">
              La gourmandise comme art de recevoir
            </h2>
            <p className="mt-6 text-base leading-relaxed text-chocolate-700/80 md:text-lg">
              Gourmandises By Nani est née d&apos;une passion : transformer chaque
              événement en souvenir gourmand. Sans boutique physique, notre
              atelier travaille exclusivement sur commande, pour offrir à
              chaque client une création unique, pensée et façonnée à la
              main — du premier croquis jusqu&apos;à la dernière touche dorée.
            </p>
            <p className="mt-4 text-base leading-relaxed text-chocolate-700/80 md:text-lg">
              Anniversaires, mariages, fiançailles, baptêmes ou événements
              d&apos;entreprise : chaque pièce est réalisée avec des produits
              frais, un savoir-faire artisanal et une attention méticuleuse
              à vos envies.
            </p>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <ScrollReveal key={v.label} delay={0.05 * i}>
                <div className="group flex items-start gap-4 rounded-2xl border border-beige bg-white/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700 transition-colors group-hover:bg-gold-500 group-hover:text-cream">
                    <v.icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium text-chocolate-700">{v.label}</p>
                    <p className="mt-1 text-sm text-chocolate-700/70">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
