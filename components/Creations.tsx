import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { creations } from "@/data/creations";
import ScrollReveal from "./ScrollReveal";

export default function Creations() {
  return (
    <section id="creations" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-rose-700">
          Notre savoir-faire
        </span>
        <h2 className="mt-4 font-display text-4xl text-chocolate-700 md:text-5xl">
          Nos créations
        </h2>
        <p className="mt-5 text-base leading-relaxed text-chocolate-700/75 md:text-lg">
          Du sucré au salé, chaque création est pensée sur-mesure pour
          sublimer votre événement, petit ou grand.
        </p>
      </ScrollReveal>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {creations.map((c, i) => (
          <ScrollReveal key={c.id} delay={(i % 3) * 0.1}>
            <a
              href={c.href}
              className="group relative block h-95 overflow-hidden rounded-[1.75rem] shadow-soft transition-all duration-500 hover:shadow-elegant"
            >
              <Image
                src={c.image}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-chocolate-900/85 via-chocolate-900/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                <span className="text-2xl">{c.emoji}</span>
                <h3 className="font-display text-2xl text-cream">{c.title}</h3>
                <p className="max-h-0 overflow-hidden text-sm leading-relaxed text-cream/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {c.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gold-300">
                  Voir plus
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
